import Link from "next/link";
import { getEventById, getVisitSummary } from "../../../lib/data";

export default function EventDetailPage({ params }) {
  const event = getEventById(params.id);
  if (!event) {
    return (
      <div className="card text-sm text-slate-500">找不到活動，可能已被移除。</div>
    );
  }

  const summary = getVisitSummary(event.id);
  const tags = JSON.parse(event.tags_json || "[]");

  return (
    <div className="space-y-8">
      <Link href="/weekend" className="text-sm text-slate-500">
        ← 返回活動列表
      </Link>

      <section className="card space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-slate-900">{event.title}</h1>
            <p className="text-sm text-slate-600">主辦單位：{event.organizer_name}</p>
          </div>
          <div className="text-sm text-slate-500">
            {new Date(event.start_time).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short"
            })}
            {event.end_time && (
              <div>
                至 {new Date(event.end_time).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short"
                })}
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-slate-600">
          地點：{event.location_name} · {event.address}
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          {event.cost_type === "free" && <span className="badge badge-green">Free</span>}
          {event.kid_friendly === 1 && <span className="badge badge-blue">Kid-friendly</span>}
          {event.indoor === 1 && <span className="badge badge-orange">Indoor</span>}
          {tags.map((tag) => (
            <span key={tag} className="badge">{tag}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <span>年齡範圍：{event.age_range || "不限"}</span>
          <span>費用：{event.cost_type || "free"}</span>
          <span>類別：{event.category || "-"}</span>
        </div>
        <a
          href={event.registration_url || "#"}
          className="inline-flex w-fit rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          報名/詳情連結
        </a>
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">參加回饋</h2>
        <div className="flex flex-wrap gap-6 text-sm text-slate-600">
          <div>
            <div className="text-2xl font-semibold text-slate-900">
              {summary.avg_rating ?? "-"}
            </div>
            <div>平均評分</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-slate-900">{summary.count}</div>
            <div>回饋數量</div>
          </div>
        </div>
        {summary.highlights.length === 0 ? (
          <p className="text-sm text-slate-500">目前還沒有回饋。</p>
        ) : (
          <div className="space-y-2">
            {summary.highlights.map((item, index) => (
              <div key={`${item.notes}-${index}`} className="rounded-lg border border-slate-200 p-3 text-sm">
                <div className="font-semibold text-slate-700">評分：{item.rating ?? "-"}</div>
                <div className="text-slate-600">{item.notes}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">我參加過（回饋）</h2>
        <form className="grid gap-4" method="post" action="/api/visit-reports">
          <input type="hidden" name="event_id" value={event.id} />
          <label className="text-sm text-slate-600">
            是否參加
            <select name="attended" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="1">有</option>
              <option value="0">沒有</option>
            </select>
          </label>
          <label className="text-sm text-slate-600">
            評分 (1-5)
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-slate-600">
            實際花費
            <input
              type="number"
              name="actual_cost"
              defaultValue="0"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-slate-600">
            人潮狀況
            <select name="crowd_level" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
            </select>
          </label>
          <label className="text-sm text-slate-600">
            親子友善
            <select name="kid_friendly" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="1">是</option>
              <option value="0">否</option>
            </select>
          </label>
          <label className="text-sm text-slate-600">
            心得
            <textarea
              name="notes"
              rows="4"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            送出回饋
          </button>
        </form>
      </section>
    </div>
  );
}
