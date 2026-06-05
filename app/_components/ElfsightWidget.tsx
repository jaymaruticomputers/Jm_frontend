"use client";

import { useEffect, useRef } from "react";

type Props = {
  appId: string;
  targetId?: string;
};

export default function ElfsightWidget({ appId, targetId }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = targetId ? document.getElementById(targetId) : ref.current;
    if (!host) return;

    const appClass = `elfsight-app-${appId}`;
    if (!host.querySelector(`.${appClass}`)) {
      const app = document.createElement("div");
      app.className = appClass;
      app.setAttribute("data-elfsight-app-lazy", "");
      host.appendChild(app);
    }

    if (!document.querySelector("script[data-elfsight-platform]")) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://elfsightcdn.com/platform.js";
      script.setAttribute("data-elfsight-platform", "");
      document.body.appendChild(script);
    }

    // Hide (never remove) Elfsight's free-plan branding badge. The widget runs
    // inside an OPEN shadow root and, in button mode, renders the badge as the
    // plain text "Free <App> Widget" (no <a>/href) next to a remove button that
    // carries title="Remove Elfsight branding". Mutations inside a shadow root
    // do NOT reach a light-DOM observer, so we discover every open shadow root
    // and observe each one directly, re-hiding on each re-render. We only set
    // display:none (removing nodes crashes Elfsight's renderer) and watch
    // childList/subtree only — not attributes — so our style edits never loop.
    const BADGE_TEXT = "free google reviews widget";
    const hide = (el: Element | null) =>
      el && (el as HTMLElement).style?.setProperty("display", "none", "important");

    const isBadge = (el: Element) =>
      el.textContent?.trim().toLowerCase() === BADGE_TEXT;

    const hideIn = (root: Document | ShadowRoot) => {
      // The remove-branding control — tiny, hidden in place (never its parent).
      root
        .querySelectorAll('[title="Remove Elfsight branding"]')
        .forEach((el) => hide(el));

      // The free link. Find the innermost element whose text is exactly the
      // badge label, then climb up ONLY through wrappers that contain nothing
      // but that label. This can never reach a container holding reviews,
      // because such a container's text would not equal just the badge label.
      const matches = Array.from(root.querySelectorAll("*")).filter(isBadge);
      matches.forEach((el) => {
        if (matches.some((o) => o !== el && el.contains(o))) return; // not innermost
        let target = el;
        while (
          target.parentElement &&
          target.parentElement !== (root as unknown as Element) &&
          isBadge(target.parentElement)
        ) {
          target = target.parentElement;
        }
        hide(target);
      });
    };

    const roots = new WeakSet<Document | ShadowRoot>();
    const observers: MutationObserver[] = [];

    const attach = (root: Document | ShadowRoot) => {
      if (roots.has(root)) return;
      roots.add(root);
      hideIn(root);
      const obs = new MutationObserver(() => {
        hideIn(root);
        discover(root);
      });
      obs.observe(root as Node, { childList: true, subtree: true });
      observers.push(obs);
      discover(root);
    };

    const discover = (root: Document | ShadowRoot) => {
      (root as ParentNode).querySelectorAll("*").forEach((el) => {
        const sr = (el as HTMLElement).shadowRoot;
        if (sr) attach(sr);
      });
    };

    attach(document);

    return () => observers.forEach((o) => o.disconnect());
  }, [appId, targetId]);

  if (targetId) return null;
  return <div ref={ref} className="elfsight-host" />;
}
