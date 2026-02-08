import Link from "next/link";

const cards = [
  {
    title: "出遊 (Weekend)",
    description: "本週末活動與社團聚會，優先顯示免費活動。",
    href: "/weekend",
    cta: "查看活動"
  },
  {
    title: "美食 (Food)",
    description: "在地台灣小吃、餐廳與甜點名單（示範頁面）。",
    href: "/food",
    cta: "逛美食"
  },
  {
    title: "台灣商家 Listing (Directory)",
    description: "生活服務與台灣商家名單（示範頁面）。",
    href: "/directory",
    cta: "查看商家"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-slate-900 px-6 py-10 text-white md:px-10">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-wide text-slate-300">Weekend Activities Hub</p>
          <h1 className="text-3xl font-semibold md:text-4xl">
            Houston Taiwanese Life
          </h1>
          <p className="text-slate-200">
            週末出遊、生活資訊、台灣社團活動，一站式查看。參加過的朋友也可以留下實際回饋，讓大家更安心。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/weekend"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900"
            >
              查看本週末活動
            </Link>
            <Link
              href="/submit"
              className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white"
            >
              提交新活動
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="card flex h-full flex-col gap-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
              <p className="text-sm text-slate-600">{card.description}</p>
            </div>
            <Link
              href={card.href}
              className="mt-auto inline-flex items-center text-sm font-semibold text-slate-900"
            >
              {card.cta} →
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
