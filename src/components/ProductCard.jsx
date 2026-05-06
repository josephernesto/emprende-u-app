import { Heart, Plus } from 'lucide-react'

function ProductCard({
  product,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
}) {
  const isAvailable = product.isAvailable ?? product.available
  const isPhoto = typeof product.image === 'string' && product.image.startsWith('data:')

  return (
    <article className="flex items-center gap-3 rounded-[26px] bg-white p-3 shadow-[0_14px_30px_rgba(15,15,15,0.07)]">
      <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-orange-50 text-3xl">
        {isPhoto ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          product.image
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-black text-black">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs font-medium leading-snug text-zinc-500">
          {product.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <p
            className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${
              isAvailable
                ? 'bg-green-50 text-green-700'
                : 'bg-zinc-100 text-zinc-500'
            }`}
          >
            {isAvailable ? 'Disponible' : 'No disponible'}
          </p>
          {product.specialPromo ? (
            <p className="inline-flex rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-black uppercase text-orange-500">
              Promo
            </p>
          ) : null}
        </div>
        <p className="mt-1 truncate text-[11px] font-bold text-zinc-400">
          {product.entrepreneur}
          {product.soldCount ? ` - ${product.soldCount} vendidos` : ''}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => onToggleFavorite?.(product.id)}
          aria-label="Marcar favorito"
          className="grid h-9 w-9 place-items-center rounded-2xl bg-orange-50 text-orange-500"
        >
          <Heart
            size={19}
            strokeWidth={2.5}
            className={isFavorite ? 'fill-orange-500' : ''}
          />
        </button>
        <p className="text-sm font-black text-orange-500">{product.price}</p>
        {onAddToCart ? (
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="flex h-9 items-center gap-1.5 rounded-2xl bg-orange-500 px-3 text-[11px] font-black uppercase text-white shadow-[0_10px_20px_rgba(255,122,26,0.24)] active:scale-95"
          >
            <Plus size={14} strokeWidth={3} />
            Añadir
          </button>
        ) : null}
      </div>
    </article>
  )
}

export default ProductCard
