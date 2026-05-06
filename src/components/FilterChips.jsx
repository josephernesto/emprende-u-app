function FilterChips({ filters, activeFilter, onChange }) {
  return (
    <div className="-mx-5 mt-4 cursor-grab overflow-x-auto px-5 active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex gap-2 pb-1">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onChange(filter.id)}
              className={`h-10 shrink-0 rounded-full px-4 text-xs font-black transition active:scale-95 ${
                isActive
                  ? 'bg-black text-white shadow-[0_12px_24px_rgba(0,0,0,0.18)]'
                  : 'bg-white text-zinc-600 shadow-sm'
              }`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default FilterChips
