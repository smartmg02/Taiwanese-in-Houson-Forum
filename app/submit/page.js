import Link from "next/link";

export default function SubmitPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link href="/weekend" className="text-sm text-slate-500">
          ← 回到活動
        </Link>
        <h1 className="text-2xl font-semibold text-slate-900">提交活動</h1>
        <p className="text-sm text-slate-600">提交後會先進入待審核列表。</p>
      </div>

      <form className="card grid gap-4" method="post" action="/api/events">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-600">
            活動名稱
            <input
              name="title"
              required
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-slate-600">
            主辦單位
            <input
              name="organizer_name"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-slate-600">
            活動類型
            <select
              name="source_type"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="community">社團活動</option>
              <option value="merchant">商家活動</option>
            </select>
          </label>
          <label className="text-sm text-slate-600">
            分類
            <input
              name="category"
              placeholder="例：文化、手作、戶外"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-slate-600">
            開始時間
            <input
              name="start_time"
              type="datetime-local"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-slate-600">
            結束時間
            <input
              name="end_time"
              type="datetime-local"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-slate-600">
            地點名稱
            <input
              name="location_name"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-slate-600">
            地址
            <input
              name="address"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-slate-600">
            費用類型
            <select
              name="cost_type"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="free">免費</option>
              <option value="paid">付費</option>
              <option value="donation">自由捐款</option>
            </select>
          </label>
          <label className="text-sm text-slate-600">
            報名連結
            <input
              name="registration_url"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-slate-600">
            年齡範圍
            <input
              name="age_range"
              placeholder="例：3-10歲"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-slate-600">
            標籤 (用逗號分隔)
            <input
              name="tags"
              placeholder="例：手作,文化"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" name="indoor" value="1" />
            室內活動
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" name="kid_friendly" value="1" />
            親子友善
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          送出活動
        </button>
      </form>
    </div>
  );
}
