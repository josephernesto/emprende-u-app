function CategoryCard({ category, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(category)}
      className={`flex min-h-28 flex-col items-center justify-center rounded-[28px] p-3 text-center shadow-[0_14px_30px_rgba(15,15,15,0.07)] transition active:scale-95 ${
        active ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <span
        className={`grid h-14 w-14 place-items-center rounded-2xl text-3xl ${
          active ? 'bg-white/10' : 'bg-orange-50'
        }`}
      >
        {category.image}
      </span>
      <span className="mt-3 max-w-full text-sm font-extrabold leading-tight">
        {category.name}
      </span>
    </button>
  )
}

export default CategoryCard
