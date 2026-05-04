function ProductCard({ product }) {
  return (
    <article className="flex items-center gap-3 rounded-[26px] bg-white p-3 shadow-[0_14px_30px_rgba(15,15,15,0.07)]">
      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-orange-50 text-3xl">
        {product.image}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-black text-black">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs font-medium leading-snug text-zinc-500">
          {product.description}
        </p>
      </div>

      <p className="shrink-0 text-sm font-black text-orange-500">{product.price}</p>
    </article>
  )
}

export default ProductCard
