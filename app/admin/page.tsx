"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

/* ------------------------------------------------------------------ *
 * JM COMPUTERS — Admin panel (client UI)
 * Talks to /api/admin/* route handlers. Cookie auth is automatic
 * (same-origin), so fetch just needs to run from this page.
 * ------------------------------------------------------------------ */

type Product = { name: string; price: number; mrp: number; path: string; oos?: boolean };
type Cat = { slug: string; count: number };
type Analytics = {
  views: { total: number; last24h: number; last7d: number };
  visitors: { total: number; last24h: number; last7d: number };
  topPages: { path: string; count: number }[];
  referrers: { source: string; count: number }[];
  devices: { name: string; count: number }[];
  byDay: { day: string; views: number; visitors: number }[];
  recent: { ts: number; path: string; ref: string; ua: string; dev?: string }[];
};

const api = (url: string, opts?: RequestInit) =>
  fetch(url, { credentials: "same-origin", ...opts });

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [tab, setTab] = useState<"products" | "home" | "pages" | "analytics">("products");

  useEffect(() => {
    api("/api/admin/login")
      .then((r) => r.json())
      .then((d) => setAuthed(!!d.authed))
      .catch(() => setAuthed(false));
  }, []);

  async function doLogin(e: FormEvent) {
    e.preventDefault();
    setLoginErr("");
    const r = await api("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (r.ok) {
      setAuthed(true);
      setPassword("");
    } else {
      const d = await r.json().catch(() => ({}));
      setLoginErr(d.error || "Login failed");
    }
  }

  async function doLogout() {
    await api("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
  }

  return (
    <div className="jm-admin">
      <style>{CSS}</style>
      {authed === null ? (
        <div className="ja-center">Loading…</div>
      ) : !authed ? (
        <form className="ja-login" onSubmit={doLogin}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ja-logo" src="/images/jm.jpeg" alt="JM Computers" />
          <h1>
            JM COMPUTERS <span>Admin</span>
          </h1>
          <p>Sign in to manage products &amp; view traffic.</p>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {loginErr && <div className="ja-err">{loginErr}</div>}
          <button type="submit">Sign in</button>
        </form>
      ) : (
        <>
          <header className="ja-top">
            <div className="ja-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ja-logo-sm" src="/images/jm.jpeg" alt="JM Computers" />
              <span className="ja-brand-txt">
                JM COMPUTERS <b>Admin</b>
              </span>
            </div>
            <nav>
              <button className={tab === "products" ? "on" : ""} onClick={() => setTab("products")}>
                Products
              </button>
              <button className={tab === "home" ? "on" : ""} onClick={() => setTab("home")}>
                Home sections
              </button>
              <button className={tab === "pages" ? "on" : ""} onClick={() => setTab("pages")}>
                Pages &amp; SEO
              </button>
              <button className={tab === "analytics" ? "on" : ""} onClick={() => setTab("analytics")}>
                Analytics
              </button>
            </nav>
            <div className="ja-actions">
              <a href="/" target="_blank" rel="noopener">
                View site ↗
              </a>
              <button onClick={doLogout}>Log out</button>
            </div>
          </header>
          {tab === "products" && <Products />}
          {tab === "home" && <HomeView />}
          {tab === "pages" && <PagesView />}
          {tab === "analytics" && <AnalyticsView />}
        </>
      )}
    </div>
  );
}

/* ----------------------------- Products --------------------------- */

function Products() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [active, setActive] = useState<string>("");
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [draft, setDraft] = useState<Product>({ name: "", price: 0, mrp: 0, path: "" });

  const loadCats = useCallback(async () => {
    const d = await api("/api/admin/categories").then((r) => r.json());
    setCats(d.categories || []);
    if (!active && d.categories?.length) selectCat(d.categories[0].slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    loadCats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function selectCat(slug: string) {
    setActive(slug);
    setLoading(true);
    setMsg("");
    const d = await api(`/api/admin/products?category=${slug}`).then((r) => r.json());
    setItems(d.items || []);
    setLoading(false);
  }

  function flash(t: string) {
    setMsg(t);
    setTimeout(() => setMsg(""), 2500);
  }

  async function uploadFor(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append("category", active);
    fd.append("file", file);
    const r = await api("/api/admin/upload", { method: "POST", body: fd });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) {
      flash(d.error || "Upload failed");
      return null;
    }
    return d.path as string;
  }

  async function saveRow(i: number) {
    const r = await api("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: active, index: i, product: items[i] }),
    });
    const d = await r.json().catch(() => ({}));
    if (r.ok) {
      setItems(d.items);
      flash("Saved ✓");
    } else flash(d.error || "Save failed");
  }

  async function deleteRow(i: number) {
    if (!confirm(`Delete "${items[i].name}"?`)) return;
    const r = await api(`/api/admin/products?category=${active}&index=${i}`, { method: "DELETE" });
    const d = await r.json().catch(() => ({}));
    if (r.ok) {
      setItems(d.items);
      loadCats();
      flash("Deleted");
    } else flash(d.error || "Delete failed");
  }

  async function addProduct() {
    if (!draft.name.trim()) {
      flash("Name required");
      return;
    }
    const r = await api("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: active, product: draft }),
    });
    const d = await r.json().catch(() => ({}));
    if (r.ok) {
      setItems(d.items);
      setDraft({ name: "", price: 0, mrp: 0, path: "" });
      loadCats();
      flash("Added to top ✓");
    } else flash(d.error || "Add failed");
  }

  function patch(i: number, p: Partial<Product>) {
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, ...p } : it)));
  }

  return (
    <div className="ja-body">
      <aside className="ja-cats">
        <div className="ja-cats-head">Categories</div>
        {cats.map((c) => (
          <button
            key={c.slug}
            className={c.slug === active ? "on" : ""}
            onClick={() => selectCat(c.slug)}
          >
            <span>{c.slug}</span>
            <em>{c.count}</em>
          </button>
        ))}
      </aside>

      <main className="ja-main">
        <div className="ja-main-head">
          <h2>{active || "—"}</h2>
          {msg && <span className="ja-flash">{msg}</span>}
        </div>

        {active && (
          <div className="ja-add">
            <div className="ja-add-title">Add new product (goes to top)</div>
            <div className="ja-add-row">
              <input
                placeholder="Product name"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                value={draft.price || ""}
                onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
              />
              <input
                type="number"
                placeholder="MRP"
                value={draft.mrp || ""}
                onChange={(e) => setDraft({ ...draft, mrp: Number(e.target.value) })}
              />
            </div>
            <div className="ja-add-row">
              <input
                placeholder="Image path or URL (/eh-images/…)"
                value={draft.path}
                onChange={(e) => setDraft({ ...draft, path: e.target.value })}
              />
              <label className="ja-upload">
                Upload image
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      const p = await uploadFor(f);
                      if (p) setDraft((d) => ({ ...d, path: p }));
                    }
                    e.currentTarget.value = "";
                  }}
                />
              </label>
              <button className="ja-primary" onClick={addProduct}>
                + Add
              </button>
            </div>
            {draft.path && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="ja-preview" src={draft.path} alt="" />
            )}
          </div>
        )}

        {loading ? (
          <div className="ja-center">Loading products…</div>
        ) : (
          <div className="ja-list">
            {items.map((it, i) => (
              <div className="ja-card" key={i}>
                <div className="ja-thumb" style={{ backgroundImage: `url('${it.path}')` }}>
                  {!it.path && <span>no image</span>}
                </div>
                <div className="ja-fields">
                  <input
                    className="ja-name"
                    value={it.name}
                    onChange={(e) => patch(i, { name: e.target.value })}
                  />
                  <div className="ja-nums">
                    <label>
                      ₹ Price
                      <input
                        type="number"
                        value={it.price || 0}
                        onChange={(e) => patch(i, { price: Number(e.target.value) })}
                      />
                    </label>
                    <label>
                      ₹ MRP
                      <input
                        type="number"
                        value={it.mrp || 0}
                        onChange={(e) => patch(i, { mrp: Number(e.target.value) })}
                      />
                    </label>
                    <label className="ja-oos">
                      <input
                        type="checkbox"
                        checked={!!it.oos}
                        onChange={(e) => patch(i, { oos: e.target.checked })}
                      />
                      Out of stock
                    </label>
                  </div>
                  <div className="ja-imgrow">
                    <input
                      value={it.path}
                      onChange={(e) => patch(i, { path: e.target.value })}
                      placeholder="Image path / URL"
                    />
                    <label className="ja-upload sm">
                      Change image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            const p = await uploadFor(f);
                            if (p) patch(i, { path: p });
                          }
                          e.currentTarget.value = "";
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="ja-rowbtns">
                  <button className="ja-primary" onClick={() => saveRow(i)}>
                    Save
                  </button>
                  <button className="ja-danger" onClick={() => deleteRow(i)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {!items.length && <div className="ja-center">No products in this category yet.</div>}
          </div>
        )}
      </main>
    </div>
  );
}

/* ------------------------- Home sections -------------------------- */

type Card = { title: string; desc: string; link: string; img: string };
type Tile = { title: string; link: string; img: string };
type Stat = { count: number; suffix: string; label: string };
type HomeData = {
  gpu: Card[];
  components: Card[];
  shopCategory: Tile[];
  bigStat: { count: number; suffix: string };
  stats: Stat[];
};

function HomeView() {
  const [d, setD] = useState<HomeData | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api("/api/admin/home")
      .then((r) => r.json())
      .then(setD)
      .catch(() => setD(null));
  }, []);

  function flash(t: string) {
    setMsg(t);
    setTimeout(() => setMsg(""), 2500);
  }
  async function upload(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append("category", "home");
    fd.append("file", file);
    const r = await api("/api/admin/upload", { method: "POST", body: fd });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      flash(j.error || "Upload failed");
      return null;
    }
    return j.path as string;
  }
  async function save(patch: Partial<HomeData>) {
    const r = await api("/api/admin/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const j = await r.json().catch(() => ({}));
    if (r.ok) {
      setD(j);
      flash("Saved ✓ — refresh the home page to see it");
    } else flash(j.error || "Save failed");
  }

  if (!d) return <div className="ja-center">Loading home content…</div>;

  type ListKey = "gpu" | "components" | "shopCategory";
  const patchItem = (k: ListKey, i: number, obj: Partial<Card & Tile>) =>
    setD((p) => (p ? { ...p, [k]: (p[k] as (Card | Tile)[]).map((c, idx) => (idx === i ? { ...c, ...obj } : c)) } : p));
  const addItem = (k: ListKey) =>
    setD((p) => {
      if (!p) return p;
      const blank = k === "shopCategory" ? { title: "", link: "", img: "" } : { title: "", desc: "", link: "", img: "" };
      return { ...p, [k]: [blank, ...(p[k] as object[])] } as HomeData;
    });
  const delItem = (k: ListKey, i: number) =>
    setD((p) => (p ? ({ ...p, [k]: (p[k] as object[]).filter((_, idx) => idx !== i) } as HomeData) : p));

  function CardList({ k, label, withDesc }: { k: ListKey; label: string; withDesc: boolean }) {
    const items = d![k] as (Card & Tile)[];
    return (
      <div className="ja-panel">
        <div className="ja-sec-head">
          <h3>{label}</h3>
          <div>
            <button className="ja-danger" onClick={() => addItem(k)}>
              + Add
            </button>
            <button className="ja-primary" onClick={() => save({ [k]: d![k] } as Partial<HomeData>)}>
              Save section
            </button>
          </div>
        </div>
        <div className="ja-list">
          {items.map((c, i) => (
            <div className="ja-card" key={i}>
              <div className="ja-thumb" style={{ backgroundImage: `url('${c.img}')` }}>
                {!c.img && <span>no image</span>}
              </div>
              <div className="ja-fields">
                <input
                  className="ja-name"
                  placeholder="Title"
                  value={c.title}
                  onChange={(e) => patchItem(k, i, { title: e.target.value })}
                />
                {withDesc && (
                  <input
                    placeholder="Description"
                    value={c.desc}
                    onChange={(e) => patchItem(k, i, { desc: e.target.value })}
                  />
                )}
                <div className="ja-imgrow">
                  <input
                    placeholder="Link (e.g. /nvidia-graphics-card)"
                    value={c.link}
                    onChange={(e) => patchItem(k, i, { link: e.target.value })}
                  />
                </div>
                <div className="ja-imgrow">
                  <input
                    placeholder="Image path / URL"
                    value={c.img}
                    onChange={(e) => patchItem(k, i, { img: e.target.value })}
                  />
                  <label className="ja-upload sm">
                    Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                          const p = await upload(f);
                          if (p) patchItem(k, i, { img: p });
                        }
                        e.currentTarget.value = "";
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="ja-rowbtns">
                <button className="ja-danger" onClick={() => delItem(k, i)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {!items.length && <div className="ja-center">No cards. Click “+ Add”.</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="ja-analytics">
      <div className="ja-main-head">
        <h2>Home page content</h2>
        {msg && <span className="ja-flash">{msg}</span>}
      </div>

      <div className="ja-panel">
        <div className="ja-sec-head">
          <h3>Big stats / counters</h3>
          <button className="ja-primary" onClick={() => save({ bigStat: d.bigStat, stats: d.stats })}>
            Save stats
          </button>
        </div>
        <div className="ja-stats-edit">
          <div className="ja-statrow">
            <span className="ja-statlbl">Headline number</span>
            <input
              type="number"
              value={d.bigStat.count}
              onChange={(e) => setD({ ...d, bigStat: { ...d.bigStat, count: Number(e.target.value) } })}
            />
            <input
              className="ja-suffix"
              value={d.bigStat.suffix}
              onChange={(e) => setD({ ...d, bigStat: { ...d.bigStat, suffix: e.target.value } })}
            />
          </div>
          {d.stats.map((s, i) => (
            <div className="ja-statrow" key={i}>
              <input
                value={s.label}
                onChange={(e) =>
                  setD({ ...d, stats: d.stats.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)) })
                }
              />
              <input
                type="number"
                value={s.count}
                onChange={(e) =>
                  setD({ ...d, stats: d.stats.map((x, idx) => (idx === i ? { ...x, count: Number(e.target.value) } : x)) })
                }
              />
              <input
                className="ja-suffix"
                value={s.suffix}
                onChange={(e) =>
                  setD({ ...d, stats: d.stats.map((x, idx) => (idx === i ? { ...x, suffix: e.target.value } : x)) })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {CardList({ k: "gpu", label: "GPU carousel (NVIDIA & AMD)", withDesc: true })}
      {CardList({ k: "components", label: "PC Components cards", withDesc: true })}
      {CardList({ k: "shopCategory", label: "Shop by Category tiles", withDesc: false })}
    </div>
  );
}

/* --------------------------- Pages & SEO -------------------------- */

type PageInfo = { slug: string; title: string; description: string };
type PageDetail = PageInfo & { heroHeading: string | null; heroLead: string | null };

function PagesView() {
  const [list, setList] = useState<PageInfo[]>([]);
  const [sel, setSel] = useState<string>("");
  const [d, setD] = useState<PageDetail | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api("/api/admin/pages")
      .then((r) => r.json())
      .then((j) => {
        setList(j.pages || []);
        if (j.pages?.length) select(j.pages[0].slug);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function select(slug: string) {
    setSel(slug);
    setD(null);
    const j = await api(`/api/admin/pages?slug=${encodeURIComponent(slug)}`).then((r) => r.json());
    setD(j.slug ? j : null);
  }
  function flash(t: string) {
    setMsg(t);
    setTimeout(() => setMsg(""), 2500);
  }
  async function save() {
    if (!d) return;
    const r = await api("/api/admin/pages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: d.slug,
        title: d.title,
        description: d.description,
        heroHeading: d.heroHeading ?? undefined,
        heroLead: d.heroLead ?? undefined,
      }),
    });
    const j = await r.json().catch(() => ({}));
    if (r.ok) {
      setD(j.page);
      flash("Saved ✓");
    } else flash(j.error || "Save failed");
  }

  return (
    <div className="ja-body">
      <aside className="ja-cats">
        <div className="ja-cats-head">Pages</div>
        {list.map((p) => (
          <button key={p.slug} className={p.slug === sel ? "on" : ""} onClick={() => select(p.slug)}>
            <span>{p.slug === "index" ? "home" : p.slug}</span>
          </button>
        ))}
      </aside>
      <main className="ja-main">
        <div className="ja-main-head">
          <h2>{sel === "index" ? "home" : sel || "—"}</h2>
          {msg && <span className="ja-flash">{msg}</span>}
        </div>
        {!d ? (
          <div className="ja-center">Select a page…</div>
        ) : (
          <div className="ja-panel ja-pageform">
            <label>
              SEO title
              <input value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} />
            </label>
            <label>
              SEO description
              <textarea
                rows={3}
                value={d.description}
                onChange={(e) => setD({ ...d, description: e.target.value })}
              />
            </label>
            <label>
              Hero heading
              {d.heroHeading === null ? (
                <span className="ja-note">This page has no editable hero heading.</span>
              ) : (
                <input value={d.heroHeading} onChange={(e) => setD({ ...d, heroHeading: e.target.value })} />
              )}
            </label>
            <label>
              Hero intro text
              {d.heroLead === null ? (
                <span className="ja-note">This page has no editable hero text.</span>
              ) : (
                <textarea
                  rows={3}
                  value={d.heroLead}
                  onChange={(e) => setD({ ...d, heroLead: e.target.value })}
                />
              )}
            </label>
            <div>
              <button className="ja-primary" onClick={save}>
                Save page
              </button>
              <a className="ja-viewlink" href={sel === "index" ? "/" : `/${sel}`} target="_blank" rel="noopener">
                View page ↗
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------------------------- Analytics --------------------------- */

function AnalyticsView() {
  const [a, setA] = useState<Analytics | null>(null);
  useEffect(() => {
    api("/api/admin/analytics")
      .then((r) => r.json())
      .then(setA)
      .catch(() => setA(null));
  }, []);
  if (!a) return <div className="ja-center">Loading analytics…</div>;
  const max = Math.max(1, ...a.byDay.map((d) => d.views));
  const devTotal = Math.max(1, a.devices.reduce((s, d) => s + d.count, 0));
  const avg = a.visitors.total ? (a.views.total / a.visitors.total).toFixed(1) : "0";
  const fmt = (n: number) => n.toLocaleString("en-IN");

  return (
    <div className="ja-analytics">
      <div className="ja-statgroup-lbl">Unique visitors (users)</div>
      <div className="ja-stats">
        <div className="ja-stat ja-stat-hi">
          <b>{fmt(a.visitors.total)}</b>
          <span>Total unique visitors</span>
        </div>
        <div className="ja-stat ja-stat-hi">
          <b>{fmt(a.visitors.last24h)}</b>
          <span>Visitors · last 24 hours</span>
        </div>
        <div className="ja-stat ja-stat-hi">
          <b>{fmt(a.visitors.last7d)}</b>
          <span>Visitors · last 7 days</span>
        </div>
      </div>

      <div className="ja-statgroup-lbl">Page views</div>
      <div className="ja-stats ja-stats-4">
        <div className="ja-stat">
          <b>{fmt(a.views.total)}</b>
          <span>Total page views</span>
        </div>
        <div className="ja-stat">
          <b>{fmt(a.views.last24h)}</b>
          <span>Views · last 24 hours</span>
        </div>
        <div className="ja-stat">
          <b>{fmt(a.views.last7d)}</b>
          <span>Views · last 7 days</span>
        </div>
        <div className="ja-stat">
          <b>{avg}</b>
          <span>Avg pages / visitor</span>
        </div>
      </div>

      <div className="ja-panel">
        <div className="ja-sec-head">
          <h3>Last 14 days</h3>
          <div className="ja-legend">
            <span><i className="lg-views" /> Page views</span>
            <span><i className="lg-visitors" /> Unique visitors</span>
          </div>
        </div>
        <div className="ja-chart">
          {a.byDay.map((d) => (
            <div className="ja-bar" key={d.day} title={`${d.day} — ${d.views} views, ${d.visitors} visitors`}>
              <div className="ja-bar-val">{d.views || ""}</div>
              <div className="ja-bar-pair">
                <div className="ja-bar-fill views" style={{ height: `${(d.views / max) * 100}%` }} />
                <div className="ja-bar-fill visitors" style={{ height: `${(d.visitors / max) * 100}%` }} />
              </div>
              <span>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ja-cols">
        <div className="ja-panel">
          <h3>Top pages</h3>
          <table className="ja-table">
            <tbody>
              {a.topPages.map((p) => (
                <tr key={p.path}>
                  <td>{p.path}</td>
                  <td className="num">{p.count}</td>
                </tr>
              ))}
              {!a.topPages.length && (
                <tr>
                  <td>No visits recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="ja-panel">
          <h3>Traffic sources</h3>
          <table className="ja-table">
            <tbody>
              {a.referrers.map((r) => (
                <tr key={r.source}>
                  <td>{r.source}</td>
                  <td className="num">{r.count}</td>
                </tr>
              ))}
              {!a.referrers.length && (
                <tr>
                  <td>No data yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="ja-cols">
        <div className="ja-panel">
          <h3>Devices</h3>
          <div className="ja-devs">
            {a.devices.map((d) => (
              <div className="ja-dev" key={d.name}>
                <div className="ja-dev-top">
                  <span>{d.name}</span>
                  <span>
                    {d.count} · {Math.round((d.count / devTotal) * 100)}%
                  </span>
                </div>
                <div className="ja-dev-bar">
                  <div style={{ width: `${(d.count / devTotal) * 100}%` }} />
                </div>
              </div>
            ))}
            {!a.devices.length && <div className="ja-center">No data yet.</div>}
          </div>
        </div>
        <div className="ja-panel">
          <h3>Recent visits</h3>
          <table className="ja-table">
            <tbody>
              {a.recent.map((v, i) => (
                <tr key={i}>
                  <td>{new Date(v.ts).toLocaleString("en-IN")}</td>
                  <td>{v.path}</td>
                  <td className="num">{v.dev || ""}</td>
                </tr>
              ))}
              {!a.recent.length && (
                <tr>
                  <td>No visits recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- CSS ------------------------------ */

const CSS = `
.jm-admin{position:fixed;inset:0;z-index:99999;overflow:auto;background:#f4f4f5;color:#0a0a0a;
  font-family:Inter,system-ui,sans-serif;font-size:14px;-webkit-font-smoothing:antialiased}
.jm-admin *{box-sizing:border-box}
.jm-admin input,.jm-admin button{font-family:inherit}
.ja-center{display:flex;align-items:center;justify-content:center;min-height:200px;color:#71717a;padding:40px}

/* ---- Login ---- */
.ja-login{max-width:380px;margin:11vh auto;background:#fff;border:1px solid #e4e4e7;border-radius:18px;
  padding:38px 34px;display:flex;flex-direction:column;gap:13px;box-shadow:0 18px 50px rgba(0,0,0,.10)}
.ja-logo{width:64px;height:64px;border-radius:14px;object-fit:cover;border:1px solid #e4e4e7;align-self:center;margin-bottom:4px}
.ja-login h1{margin:0;font-size:22px;letter-spacing:-.01em;text-align:center}
.ja-login h1 span{color:#71717a;font-weight:600}
.ja-login p{margin:0 0 8px;color:#71717a;text-align:center}
.ja-login input{padding:12px 14px;border-radius:11px;border:1px solid #d4d4d8;background:#fafafa;color:#0a0a0a}
.ja-login input:focus{outline:none;border-color:#0a0a0a;background:#fff}
.ja-login button{padding:13px;border:0;border-radius:11px;background:#0a0a0a;color:#fff;font-weight:600;cursor:pointer;transition:.15s}
.ja-login button:hover{background:#27272a}
.ja-err{color:#b91c1c;font-size:13px;text-align:center}

/* ---- Top bar ---- */
.ja-top{display:flex;align-items:center;gap:20px;padding:12px 24px;background:#0a0a0a;color:#fff;
  position:sticky;top:0;z-index:5;border-bottom:1px solid #000}
.ja-brand{display:flex;align-items:center;gap:11px;font-size:16px;letter-spacing:.01em}
.ja-logo-sm{width:34px;height:34px;border-radius:9px;object-fit:cover}
.ja-brand-txt{font-weight:500;color:#d4d4d8}.ja-brand-txt b{color:#fff;font-weight:800;margin-left:2px}
.ja-top nav{display:flex;gap:4px}
.ja-top nav button{background:transparent;border:0;color:#a1a1aa;padding:8px 16px;border-radius:9px;cursor:pointer;font-weight:600;transition:.15s}
.ja-top nav button:hover{color:#fff}
.ja-top nav button.on{background:#fff;color:#0a0a0a}
.ja-actions{margin-left:auto;display:flex;gap:10px;align-items:center}
.ja-actions a{color:#a1a1aa;text-decoration:none;font-size:13px}
.ja-actions a:hover{color:#fff}
.ja-actions button{background:transparent;border:1px solid #3f3f46;color:#e4e4e7;padding:8px 14px;border-radius:9px;cursor:pointer;transition:.15s}
.ja-actions button:hover{background:#fff;color:#0a0a0a;border-color:#fff}

/* ---- Products layout ---- */
.ja-body{display:flex;min-height:calc(100% - 59px)}
.ja-cats{width:240px;flex:0 0 240px;border-right:1px solid #e4e4e7;background:#fff;padding:12px;overflow:auto;max-height:calc(100vh - 59px)}
.ja-cats-head{font-size:11px;text-transform:uppercase;letter-spacing:.09em;color:#a1a1aa;padding:8px 10px;font-weight:700}
.ja-cats button{width:100%;display:flex;justify-content:space-between;align-items:center;gap:8px;background:transparent;border:0;color:#3f3f46;padding:9px 11px;border-radius:9px;cursor:pointer;text-align:left;text-transform:capitalize;font-weight:500}
.ja-cats button:hover{background:#f4f4f5}
.ja-cats button.on{background:#0a0a0a;color:#fff}
.ja-cats button em{font-style:normal;font-size:12px;color:#71717a;background:#f4f4f5;border-radius:20px;padding:1px 9px;font-weight:600}
.ja-cats button.on em{background:#27272a;color:#fff}
.ja-main{flex:1;padding:24px;overflow:auto;max-height:calc(100vh - 59px)}
.ja-main-head{display:flex;align-items:center;gap:14px;margin-bottom:16px}
.ja-main-head h2{margin:0;text-transform:capitalize;font-size:22px;letter-spacing:-.01em}
.ja-flash{background:#0a0a0a;color:#fff;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600}

/* ---- Inputs ---- */
.jm-admin input[type=text],.jm-admin input[type=number],.jm-admin input:not([type]){padding:10px 12px;border-radius:9px;border:1px solid #d4d4d8;background:#fff;color:#0a0a0a;width:100%}
.jm-admin input:focus{outline:none;border-color:#0a0a0a}

/* ---- Add product ---- */
.ja-add{background:#fff;border:1px solid #e4e4e7;border-radius:14px;padding:16px;margin-bottom:20px}
.ja-add-title{font-size:12px;color:#71717a;margin-bottom:12px;text-transform:uppercase;letter-spacing:.06em;font-weight:700}
.ja-add-row{display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap}
.ja-add-row>input{flex:1;min-width:120px}

/* ---- Buttons ---- */
.ja-upload{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;background:#fff;border:1px solid #d4d4d8;color:#0a0a0a;border-radius:9px;padding:10px 16px;cursor:pointer;white-space:nowrap;font-weight:500;transition:.15s}
.ja-upload:hover{border-color:#0a0a0a}
.ja-upload.sm{padding:9px 13px;font-size:13px}
.ja-upload input{position:absolute;inset:0;opacity:0;cursor:pointer}
.ja-primary{background:#0a0a0a;border:1px solid #0a0a0a;color:#fff;font-weight:600;border-radius:9px;padding:10px 18px;cursor:pointer;white-space:nowrap;transition:.15s}
.ja-primary:hover{background:#27272a}
.ja-danger{background:#fff;border:1px solid #d4d4d8;color:#0a0a0a;border-radius:9px;padding:10px 18px;cursor:pointer;font-weight:500;transition:.15s}
.ja-danger:hover{background:#0a0a0a;color:#fff;border-color:#0a0a0a}
.ja-preview{height:74px;border-radius:9px;border:1px solid #e4e4e7;margin-top:8px;object-fit:contain;background:#fff;padding:4px}

/* ---- Product cards ---- */
.ja-list{display:flex;flex-direction:column;gap:12px}
.ja-card{display:flex;gap:16px;background:#fff;border:1px solid #e4e4e7;border-radius:14px;padding:14px;transition:.15s}
.ja-card:hover{border-color:#d4d4d8;box-shadow:0 4px 16px rgba(0,0,0,.05)}
.ja-thumb{flex:0 0 100px;width:100px;height:100px;border-radius:11px;background:#fff center/contain no-repeat;border:1px solid #e4e4e7;display:flex;align-items:center;justify-content:center;color:#a1a1aa;font-size:11px;padding:4px}
.ja-fields{flex:1;display:flex;flex-direction:column;gap:9px;min-width:0}
.ja-name{font-weight:600}
.ja-nums{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.ja-nums label{display:flex;flex-direction:column;font-size:11px;color:#71717a;gap:3px;font-weight:600}
.ja-nums input[type=number]{width:120px}
.ja-oos{flex-direction:row!important;align-items:center;gap:6px!important;color:#3f3f46!important}
.ja-oos input{width:auto}
.ja-imgrow{display:flex;gap:10px}
.ja-imgrow input{flex:1}
.ja-rowbtns{display:flex;flex-direction:column;gap:8px;justify-content:center}

/* ---- Analytics ---- */
.ja-analytics{padding:24px;max-width:1120px;margin:0 auto}
.ja-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:18px}
.ja-stat{background:#fff;border:1px solid #e4e4e7;border-radius:14px;padding:20px}
.ja-stat b{display:block;font-size:32px;letter-spacing:-.02em}
.ja-stat span{color:#71717a;font-size:13px}
.ja-panel{background:#fff;border:1px solid #e4e4e7;border-radius:14px;padding:20px;margin-bottom:18px}
.ja-panel h3{margin:0 0 16px;font-size:15px}
.ja-statgroup-lbl{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#71717a;font-weight:700;margin:4px 2px 10px}
.ja-stats-4{grid-template-columns:repeat(4,1fr)}
.ja-stat-hi{background:#0a0a0a;border-color:#0a0a0a;color:#fff}
.ja-stat-hi span{color:#a1a1aa}
.ja-legend{display:flex;gap:16px;font-size:12px;color:#52525b;align-items:center}
.ja-legend span{display:flex;align-items:center;gap:6px}
.ja-legend i{width:11px;height:11px;border-radius:3px;display:inline-block}
.ja-legend .lg-views{background:#0a0a0a}
.ja-legend .lg-visitors{background:#a1a1aa}
.ja-chart{display:flex;align-items:flex-end;gap:8px;height:190px;padding-top:18px;border-bottom:1px solid #e4e4e7}
.ja-bar{flex:1;display:flex;flex-direction:column;align-items:center;height:100%;justify-content:flex-end;gap:6px}
.ja-bar-val{font-size:10px;color:#71717a;font-weight:700;height:14px}
.ja-bar-pair{display:flex;align-items:flex-end;justify-content:center;gap:3px;width:100%;height:100%}
.ja-bar-fill{width:46%;max-width:20px;border-radius:4px 4px 0 0;min-height:2px;transition:.2s}
.ja-bar-fill.views{background:#0a0a0a}
.ja-bar-fill.visitors{background:#a1a1aa}
.ja-bar:hover .ja-bar-fill.views{background:#3f3f46}
.ja-bar span{font-size:11px;color:#a1a1aa}
.ja-devs{display:flex;flex-direction:column;gap:14px}
.ja-dev-top{display:flex;justify-content:space-between;font-size:13px;color:#3f3f46;margin-bottom:6px;font-weight:600}
.ja-dev-bar{height:9px;background:#f0f0f1;border-radius:20px;overflow:hidden}
.ja-dev-bar>div{height:100%;background:#0a0a0a;border-radius:20px;min-width:3px}
.ja-cols{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.ja-table{width:100%;border-collapse:collapse;font-size:13px}
.ja-table td{padding:8px;border-bottom:1px solid #f0f0f1;color:#3f3f46;word-break:break-all}
.ja-table td.num{text-align:right;color:#0a0a0a;font-weight:700;width:60px}
/* ---- Home sections + Pages editors ---- */
.ja-sec-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
.ja-sec-head h3{margin:0;font-size:15px}
.ja-sec-head>div{display:flex;gap:8px}
.ja-stats-edit{display:flex;flex-direction:column;gap:10px}
.ja-statrow{display:flex;gap:10px;align-items:center}
.ja-statrow>input:first-child,.ja-statrow .ja-statlbl{flex:1}
.ja-statlbl{color:#3f3f46;font-weight:600}
.ja-statrow input[type=number]{width:130px}
.ja-suffix{width:70px!important;text-align:center}
.jm-admin textarea{width:100%;padding:10px 12px;border-radius:9px;border:1px solid #d4d4d8;background:#fff;color:#0a0a0a;font-family:inherit;resize:vertical}
.jm-admin textarea:focus{outline:none;border-color:#0a0a0a}
.ja-pageform{display:flex;flex-direction:column;gap:14px;max-width:760px}
.ja-pageform label{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:700;color:#52525b;text-transform:uppercase;letter-spacing:.04em}
.ja-pageform label input,.ja-pageform label textarea{text-transform:none;font-weight:400;font-size:14px;color:#0a0a0a}
.ja-note{font-weight:500;text-transform:none;letter-spacing:0;color:#a1a1aa;font-size:13px}
.ja-viewlink{margin-left:12px;color:#71717a;text-decoration:none;font-size:13px}
.ja-viewlink:hover{color:#0a0a0a}
@media(max-width:760px){.ja-body{flex-direction:column}.ja-cats{width:100%;flex:none;max-height:none;display:flex;flex-wrap:wrap;border-right:0;border-bottom:1px solid #e4e4e7}.ja-cats button{width:auto}.ja-cols,.ja-stats{grid-template-columns:1fr}.ja-card{flex-direction:column}.ja-top{gap:10px;flex-wrap:wrap}}
`;
