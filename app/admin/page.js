import { listPendingEvents } from "../../lib/data";

export default function AdminPage({ searchParams }) {
  const adminKey = process.env.ADMIN_KEY;
  const providedKey = searchParams?.key;

  if (!adminKey || providedKey !== adminKey) {
    return (
      <div className="card text-sm text-slate-500">
        無法存取管理後台。請在網址加入正確的 key。
      </div>
    );
  }

  const pending = listPendingEvents();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Admin: 待審核活動</h1>
      {pending.length === 0 ? (
        <div className="card text-sm text-slate-500">目前沒有待審核活動。</div>
      ) : (
        <div className="grid gap-4">
          {pending.map((event) => (
            <form
              key={event.id}
              className="card grid gap-3"
              method="post"
              action={`/api/admin/events/${event.id}?key=${providedKey}`}
            >
              <div className="grid gap-2 md:grid-cols-2">
                <label className="text-sm text-slate-600">
                  標題
                  <input
                    name="title"
                    defaultValue={event.title}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm text-slate-600">
                  主辦單位
                  <input
                    name="organizer_name"
                    defaultValue={event.organizer_name}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm text-slate-600">
                  開始時間
                  <input
                    name="start_time"
                    defaultValue={event.start_time}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm text-slate-600">
                  地點
                  <input
                    name="location_name"
                    defaultValue={event.location_name}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm text-slate-600 md:col-span-2">
                  地址
                  <input
                    name="address"
                    defaultValue={event.address}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </label>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  name="status"
                  value="approved"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  核准
                </button>
                <button
                  type="submit"
                  name="status"
                  value="rejected"
                  className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  拒絕
                </button>
              </div>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}
