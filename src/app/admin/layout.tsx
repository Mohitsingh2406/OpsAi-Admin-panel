import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { getSession } from "@/lib/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <div className="min-h-screen bg-[#050606] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar email={session?.email || "admin@opsai.co.in"} />
        <main className="flex-1 px-6 py-7 lg:px-9 overflow-x-hidden">
          <div className="max-w-[1480px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
