import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Houston Taiwanese Life",
  description: "Weekend activities and community hub for Taiwanese families in Houston."
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <div className="container flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/" className="text-2xl font-semibold text-slate-900">
                Houston Taiwanese Life
              </Link>
              <p className="text-sm text-slate-500">週末出遊、生活資訊、在地台灣人社群</p>
            </div>
            <nav className="flex flex-wrap gap-3 text-sm font-medium text-slate-600">
              <Link href="/weekend">出遊活動</Link>
              <Link href="/food">美食</Link>
              <Link href="/directory">台灣商家</Link>
              <Link href="/submit" className="rounded-full bg-slate-900 px-4 py-2 text-white">
                提交活動
              </Link>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="container flex flex-col gap-2 py-6 text-sm text-slate-500">
            <p>Demo for Houston Taiwanese Life. No login required.</p>
            <p>
              管理員入口：<code>/admin?key=ADMIN_KEY</code>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
