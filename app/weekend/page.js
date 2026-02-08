import Link from "next/link";
import { getWeekendRange, listEvents } from "../../lib/data";

const tabs = [
  { id: "community", label: "台灣社團活動" },
  { id: "merchant", label: "商家提供活動" }
];

function buildQuery(params, key, value) {
  const next = new URLSearchParams(params);
  if (value) {
    next.set(key, value);
  } else {
    next.delete(key);
  }
  return next.toString();
}

export default function WeekendPage({ searchParams }) {
  const activeTab = searchParams?.type || "community";
  const weekend = getWeekendRange();
  const filters = {
    source_type: activeTab,
    weekendOnly: true,
    weekendStart: weekend.start,
    weekendEnd: weekend.end,
    freeOnly: searchParams?.free === "1",
    kidFriendly: searchParams?.kid === "1",
    indoor: searchParams?.indoor === "1",
    search: searchParams?.q || "",
    tag: searchParams?.tag || ""
  };
  const events = listEvents(filters);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-slate-900">出遊活動</h1>
        <p className="text-sm text-slate-600">
          This Weekend: {weekend.labelStart} - {weekend.labelEnd} (America/Chicago)
        </p>
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/weekend?${buildQuery(searchParams, "type", tab.id)}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="text-sm font-semibold text-slate-700">篩選</h2>
        <form className="grid gap-4 md:grid-cols-4" method="get">
          <input type="hidden" name="type" value={activeTab} />
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" name="free" value="1" defaultChecked={filters.freeOnly} />
            免費活動
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" name="kid" value="1" defaultChecked={filters.kidFriendly} />
            親子友善
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" name="indoor" value="1" defaultChecked={filters.indoor} />
            室內活動
          </label>
          <div className="text-sm text-slate-500">Distance: (coming soon)</div>
          <input
            name="q"
            placeholder="搜尋活動關鍵字"
            defaultValue={filters.search}
            className="md:col-span-2 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            name="tag"
            placeholder="標籤 (例: 手作)"
            defaultValue={filters.tag}
            className="md:col-span-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="md:col-span-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            更新結果
          </button>
        </form>
      </section>

      <section className="space-y-4">
        {events.length === 0 ? (
          <div className="card text-center text-sm text-slate-500">
            本週末還沒有符合條件的活動。可以到「提交活動」新增！
          </div>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/weekend/${event.id}`}
                className="card flex flex-col gap-3 hover:border-slate-300"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
                    <p className="text-sm text-slate-600">
                      {event.location_name} · {event.address}
                    </p>
                  </div>
                  <div className="text-sm text-slate-500">
                    {new Date(event.start_time).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {event.cost_type === "free" && <span className="badge badge-green">Free</span>}
                  {event.kid_friendly === 1 && <span className="badge badge-blue">Kid-friendly</span>}
                  {event.indoor === 1 && <span className="badge badge-orange">Indoor</span>}
                  {(JSON.parse(event.tags_json || "[]") || []).map((tag) => (
                    <span key={tag} className="badge">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
