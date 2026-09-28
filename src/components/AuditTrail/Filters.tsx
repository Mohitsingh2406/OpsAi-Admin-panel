import { Search } from "lucide-react";

interface FiltersProps {
  search: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  actionFilter: string;
  setActionFilter: (s: string) => void;
}

export default function Filters({ search, setSearch, statusFilter, setStatusFilter, actionFilter, setActionFilter }: FiltersProps) {
  return (
    <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
      <div className="flex-1 h-9 rounded-lg bg-white/[0.025] border border-white/[0.06] flex items-center gap-2 px-3">
        <Search size={13} className="text-white/25" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search activity..." 
          className="bg-transparent border-none text-[12px] text-white/80 placeholder-white/25 focus:outline-none w-full"
        />
      </div>
      
      <select 
        value={actionFilter}
        onChange={(e) => setActionFilter(e.target.value)}
        className="h-9 rounded-lg bg-white/[0.025] border border-white/[0.06] px-3 text-[11px] text-white/60 focus:outline-none focus:border-white/20"
      >
        <option value="ALL">Action</option>
        <option value="LOGIN">Login</option>
        <option value="LOGOUT">Logout</option>
        <option value="CREATE">Create</option>
        <option value="UPDATE">Update</option>
        <option value="DELETE">Delete</option>
        <option value="EXPORT">Export</option>
      </select>

      <select 
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="h-9 rounded-lg bg-white/[0.025] border border-white/[0.06] px-3 text-[11px] text-white/60 focus:outline-none focus:border-white/20"
      >
        <option value="ALL">Status</option>
        <option value="SUCCESS">Success</option>
        <option value="FAILED">Failed</option>
      </select>
    </div>
  );
}
