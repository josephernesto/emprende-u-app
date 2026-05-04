import {
  ClipboardList,
  LogOut,
  MapPin,
  Menu,
  ShoppingCart,
  Sparkles,
  Star,
  UserRound,
  X,
} from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { id: 'profile', label: 'Perfil', icon: UserRound },
  { id: 'purchases', label: 'Registro de compras', icon: ClipboardList },
  { id: 'missions', label: 'Misiones', icon: Sparkles },
]

function StudentRating({ rating = 5 }) {
  return (
    <div className="mt-3 rounded-[22px] bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
            Calificación
          </p>
          <p className="mt-1 text-sm font-black text-black">
            Evaluación de emprendedores
          </p>
        </div>
        <p className="rounded-full bg-orange-50 px-3 py-1 text-sm font-black text-orange-500">
          {rating.toFixed(1)}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={22}
            strokeWidth={2.3}
            className={
              index < Math.round(rating)
                ? 'fill-orange-400 text-orange-400'
                : 'text-zinc-200'
            }
          />
        ))}
      </div>
    </div>
  )
}

function Header({
  user,
  onLogout,
  onOpenProfile,
  onOpenPurchases,
  onOpenMissions,
  onOpenCart,
  cartCount = 0,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between gap-4 px-5 pt-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setIsMenuOpen(true)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-black shadow-sm"
          >
            <Menu size={22} strokeWidth={2.4} />
          </button>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-orange-500">Menú</p>
            <h1 className="truncate text-[15px] font-black leading-tight text-black">
              {user.name}
            </h1>
            <p className="mt-1 flex items-center gap-1 truncate text-xs font-medium text-zinc-500">
              <MapPin size={13} className="shrink-0 text-orange-500" />
              {user.location}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Ver carrito"
          onClick={onOpenCart}
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-black text-white shadow-sm"
        >
          <ShoppingCart size={21} strokeWidth={2.3} />
          {cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-[#f7f7f7] bg-orange-500 px-1 text-[10px] font-black leading-none text-white">
              {cartCount}
            </span>
          ) : null}
        </button>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-30 flex justify-start bg-black/50">
          <aside className="h-full w-[82%] max-w-[330px] rounded-r-[34px] bg-[#f7f7f7] px-5 py-6 shadow-[24px_0_55px_rgba(0,0,0,0.24)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                  Emprende U
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase leading-none text-black">
                  Perfil
                </h2>
              </div>

              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setIsMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-black shadow-sm"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className="mt-6 rounded-[26px] bg-white p-4 shadow-sm">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-500 text-white">
                <UserRound size={27} strokeWidth={2.5} />
              </div>
              <h3 className="mt-4 text-base font-black uppercase leading-tight text-black">
                {user.name}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-snug text-zinc-500">
                {user.location}
              </p>
            </div>

            <StudentRating rating={user.rating} />

            <nav className="mt-3 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false)

                      if (item.id === 'profile') {
                        onOpenProfile()
                      }

                      if (item.id === 'purchases') {
                        onOpenPurchases()
                      }

                      if (item.id === 'missions') {
                        onOpenMissions()
                      }
                    }}
                    className="flex h-13 w-full items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left text-sm font-black text-black shadow-sm transition active:scale-[0.98]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-50 text-orange-500">
                      <Icon size={19} strokeWidth={2.5} />
                    </span>
                    {item.label}
                  </button>
                )
              })}
            </nav>

            <button
              type="button"
              onClick={onLogout}
              className="mt-5 flex h-13 w-full items-center gap-3 rounded-2xl bg-black px-4 py-3 text-left text-sm font-black text-white shadow-sm transition active:scale-[0.98]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-orange-400">
                <LogOut size={19} strokeWidth={2.5} />
              </span>
              Salir
            </button>
          </aside>

          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsMenuOpen(false)}
            className="flex-1"
          />
        </div>
      ) : null}
    </>
  )
}

export default Header
