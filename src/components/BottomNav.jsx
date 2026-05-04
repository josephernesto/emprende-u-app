function BottomNav({ items }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[400px] -translate-x-1/2 px-5 pb-4">
      <div className="grid grid-cols-3 rounded-[28px] bg-black p-2 shadow-[0_16px_35px_rgba(0,0,0,0.25)]">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <button
              key={item.id}
              type="button"
              className={`flex h-14 flex-col items-center justify-center gap-1 rounded-3xl text-[11px] font-bold transition ${
                item.active
                  ? 'bg-orange-500 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Icon size={19} strokeWidth={2.4} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
