export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-white/40 text-sm flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-emerald-300/20 border-t-emerald-300 rounded-full animate-spin" />
        Loading...
      </div>
    </div>
  );
}
