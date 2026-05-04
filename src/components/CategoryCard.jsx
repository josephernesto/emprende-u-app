function CategoryCard({ category }) {
  return (
    <button
      type="button"
      className="flex min-h-28 flex-col items-center justify-center rounded-[28px] bg-white p-3 text-center shadow-[0_14px_30px_rgba(15,15,15,0.07)] transition active:scale-95"
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-3xl">
        {category.image}
      </span>
      <span className="mt-3 max-w-full truncate text-sm font-extrabold text-black">
        {category.name}
      </span>
    </button>
  )
}

export default CategoryCard
