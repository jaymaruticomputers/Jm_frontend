"use client";

import { useEffect, useRef } from "react";

type Props = {
  widgetId: string;
  targetId?: string;
};

export default function TrustindexWidget({ widgetId, targetId }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = targetId ? document.getElementById(targetId) : ref.current;
    if (!host) return;
    if (host.querySelector("script[data-trustindex-loader]")) return;
    const script = document.createElement("script");
    script.defer = true;
    script.async = true;
    script.src = `https://cdn.trustindex.io/loader.js?${widgetId}`;
    script.setAttribute("data-trustindex-loader", widgetId);
    host.appendChild(script);
  }, [widgetId, targetId]);

  if (targetId) return null;
  return <div ref={ref} className="trustindex-host" />;
}
