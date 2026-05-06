import { Search } from 'lucide-react'

function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar comida, emprendimiento o producto',
}) {
  return (
    <label className="mt-5 flex h-14 items-center gap-3 rounded-[22px] bg-white px-4 shadow-[0_14px_30px_rgba(15,15,15,0.07)]">
      <Search size={20} strokeWidth={2.6} className="shrink-0 text-orange-500" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm font-bold text-black outline-none placeholder:text-zinc-400"
      />
    </label>
  )
}

export default SearchBar
