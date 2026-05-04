import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Gift,
  LockKeyhole,
  MessageCircle,
  Minus,
  Plus,
  Send,
  Ticket,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import BottomNav from '../components/BottomNav'
import CategoryCard from '../components/CategoryCard'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import {
  categories,
  currentPurchase,
  missions,
  navItems,
  pendingOrder,
  purchaseHistory,
  products,
  universities,
  user,
} from '../data/mockData'

const CHAT_DURATION_MS = 10 * 60 * 1000
const getPriceValue = (price) => Number(price.replace('S/', '').trim())
const formatPrice = (value) => `S/ ${value.toFixed(2)}`

function ProfileModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState({
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    age: profile.age || '',
    phone: profile.phone || '',
    university: profile.university || universities[0],
    currentPassword: '',
    newPassword: '',
  })
  const [message, setMessage] = useState('')

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (form.newPassword && form.currentPassword !== profile.password) {
      setMessage('La contraseña actual no es correcta.')
      return
    }

    const updatedProfile = {
      ...profile,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age,
      phone: form.phone.trim(),
      university: form.university,
      password: form.newPassword || profile.password,
    }

    onSave(updatedProfile)
    setMessage('Perfil actualizado correctamente.')
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10">
      <section className="max-h-[90svh] w-full max-w-[400px] overflow-hidden rounded-[30px] bg-[#f7f7f7] shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Emprende U
            </p>
            <h2 className="mt-1 text-xl font-black uppercase text-black">
              Mi perfil
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar perfil"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-100 text-black"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[76svh] overflow-y-auto px-5 py-5"
        >
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-sm font-extrabold text-black">
                Nombre
              </span>
              <input
                type="text"
                value={form.firstName}
                onChange={(event) => updateField('firstName', event.target.value)}
                required
                className="h-[50px] w-full rounded-2xl bg-white px-4 text-sm font-bold text-black shadow-sm outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-extrabold text-black">
                Apellido
              </span>
              <input
                type="text"
                value={form.lastName}
                onChange={(event) => updateField('lastName', event.target.value)}
                required
                className="h-[50px] w-full rounded-2xl bg-white px-4 text-sm font-bold text-black shadow-sm outline-none"
              />
            </label>
          </div>

          <div className="mt-3 grid grid-cols-[0.7fr_1.3fr] gap-3">
            <label className="block">
              <span className="mb-1.5 block text-sm font-extrabold text-black">
                Edad
              </span>
              <input
                type="number"
                value={form.age}
                onChange={(event) => updateField('age', event.target.value)}
                className="h-[50px] w-full rounded-2xl bg-white px-4 text-sm font-bold text-black shadow-sm outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-extrabold text-black">
                Celular
              </span>
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                className="h-[50px] w-full rounded-2xl bg-white px-4 text-sm font-bold text-black shadow-sm outline-none"
              />
            </label>
          </div>

          <label className="mt-3 block">
            <span className="mb-1.5 block text-sm font-extrabold text-black">
              Universidad
            </span>
            <select
              value={form.university}
              onChange={(event) => updateField('university', event.target.value)}
              className="min-h-[50px] w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-black shadow-sm outline-none"
            >
              {universities.map((university) => (
                <option key={university} value={university}>
                  {university}
                </option>
              ))}
            </select>
          </label>

          {profile.accessIp ? (
            <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
                IP registrada
              </p>
              <p className="mt-1 text-sm font-black text-black">
                {profile.accessIp}
              </p>
            </div>
          ) : null}

          <div className="mt-4 rounded-[24px] bg-white p-4 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-black text-black">
              <LockKeyhole size={18} className="text-orange-500" />
              Cambiar contraseña
            </p>

            <label className="mt-3 block">
              <span className="mb-1.5 block text-sm font-extrabold text-black">
                Contraseña actual
              </span>
              <input
                type="password"
                value={form.currentPassword}
                onChange={(event) =>
                  updateField('currentPassword', event.target.value)
                }
                placeholder="Obligatoria si cambias contraseña"
                className="h-[50px] w-full rounded-2xl bg-zinc-50 px-4 text-sm font-bold text-black outline-none placeholder:text-zinc-400"
              />
            </label>

            <label className="mt-3 block">
              <span className="mb-1.5 block text-sm font-extrabold text-black">
                Nueva contraseña
              </span>
              <input
                type="password"
                minLength="6"
                value={form.newPassword}
                onChange={(event) => updateField('newPassword', event.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="h-[50px] w-full rounded-2xl bg-zinc-50 px-4 text-sm font-bold text-black outline-none placeholder:text-zinc-400"
              />
            </label>
          </div>

          {message ? (
            <p
              className={`mt-3 rounded-2xl px-4 py-3 text-sm font-bold ${
                message.includes('correctamente')
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-4 h-14 w-full rounded-2xl bg-orange-500 text-sm font-black uppercase text-white shadow-[0_16px_35px_rgba(255,122,26,0.32)] transition active:scale-[0.98]"
          >
            Guardar cambios
          </button>
        </form>
      </section>
    </div>
  )
}

function PurchasesModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10">
      <section className="max-h-[88svh] w-full max-w-[400px] overflow-hidden rounded-[30px] bg-[#f7f7f7] shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Emprende U
            </p>
            <h2 className="mt-1 text-xl font-black uppercase text-black">
              Registro de compras
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar compras"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-100 text-black"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="max-h-[74svh] overflow-y-auto px-5 py-5">
          <section className="rounded-[26px] bg-orange-500 p-4 text-white shadow-[0_16px_35px_rgba(255,122,26,0.3)]">
            <p className="flex items-center gap-2 text-sm font-black">
              <Clock3 size={18} />
              Pedido actual
            </p>
            <h3 className="mt-3 text-lg font-black">{currentPurchase.productName}</h3>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm font-bold">
              <p>Fecha: {currentPurchase.purchaseDate}</p>
              <p className="text-right">{currentPurchase.amount}</p>
            </div>
            <p className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-orange-500">
              {currentPurchase.status}
            </p>
            <button
              type="button"
              className="mt-4 h-12 w-full rounded-2xl bg-black text-sm font-black uppercase text-white"
            >
              Realizar pago pendiente
            </button>
          </section>

          <section className="mt-5">
            <h3 className="text-base font-black uppercase text-black">
              Cancelados y entregados
            </h3>

            <div className="mt-3 space-y-3">
              {purchaseHistory.map((purchase) => {
                const isDelivered = purchase.status === 'Entregado'

                return (
                  <article
                    key={purchase.id}
                    className="rounded-[24px] bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-black">
                          {purchase.productName}
                        </p>
                        <p className="mt-1 text-xs font-bold text-zinc-500">
                          Fecha de compra: {purchase.purchaseDate}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-black text-black">
                        {purchase.amount}
                      </p>
                    </div>

                    <p
                      className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ${
                        isDelivered
                          ? 'bg-green-50 text-green-700'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {isDelivered ? <CheckCircle2 size={14} /> : null}
                      {purchase.status}
                    </p>
                  </article>
                )
              })}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}

function MissionsModal({ onClose }) {
  const [claimedCodes, setClaimedCodes] = useState({})

  const claimMission = (mission) => {
    setClaimedCodes((current) => ({
      ...current,
      [mission.id]: mission.code,
    }))
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10">
      <section className="max-h-[88svh] w-full max-w-[400px] overflow-hidden rounded-[30px] bg-[#f7f7f7] shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Emprende U
            </p>
            <h2 className="mt-1 text-xl font-black uppercase text-black">
              Misiones
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar misiones"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-100 text-black"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="max-h-[74svh] overflow-y-auto px-5 py-5">
          <section className="rounded-[26px] bg-black p-4 text-white shadow-[0_16px_35px_rgba(0,0,0,0.22)]">
            <p className="flex items-center gap-2 text-sm font-black text-orange-400">
              <Gift size={18} />
              Recompensas por comprar
            </p>
            <h3 className="mt-3 text-2xl font-black uppercase leading-none">
              Gana ofertas cumpliendo misiones
            </h3>
          </section>

          <div className="mt-4 space-y-3">
            {missions.map((mission) => {
              const completed = mission.progress >= mission.goal
              const progressPercent = Math.min(
                100,
                (mission.progress / mission.goal) * 100,
              )
              const claimedCode = claimedCodes[mission.id]

              return (
                <article
                  key={mission.id}
                  className="rounded-[26px] bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-black text-black">
                        {mission.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold leading-snug text-zinc-500">
                        {mission.description}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-500">
                      {mission.reward}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-black text-zinc-500">
                      <span>
                        {mission.progress}/{mission.goal} compras
                      </span>
                      <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="h-full rounded-full bg-orange-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {claimedCode ? (
                    <div className="mt-4 rounded-2xl bg-green-50 p-3">
                      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-green-700">
                        <Ticket size={16} />
                        Código canjeable
                      </p>
                      <p className="mt-2 text-xl font-black text-green-800">
                        {claimedCode}
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={!completed}
                      onClick={() => claimMission(mission)}
                      className="mt-4 h-12 w-full rounded-2xl bg-orange-500 text-sm font-black uppercase text-white shadow-[0_12px_24px_rgba(255,122,26,0.25)] transition active:scale-[0.98] disabled:bg-zinc-200 disabled:text-zinc-500 disabled:shadow-none"
                    >
                      {completed ? 'Canjear recompensa' : 'Misión en progreso'}
                    </button>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

function CartModal({
  cartItems,
  onClose,
  onUpdateQuantity,
  onConfirmOrder,
  onOpenChat,
  isOrderConfirmed,
}) {
  const total = cartItems.reduce(
    (sum, item) => sum + getPriceValue(item.price) * item.quantity,
    0,
  )

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10">
      <section className="max-h-[90svh] w-full max-w-[400px] overflow-hidden rounded-[30px] bg-[#f7f7f7] shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Emprende U
            </p>
            <h2 className="mt-1 text-xl font-black uppercase text-black">
              Carrito
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-100 text-black"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="max-h-[76svh] overflow-y-auto px-5 py-5">
          {cartItems.length ? (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[26px] bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-orange-50 text-3xl">
                      {item.image}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="min-w-0 flex-1 text-sm font-black text-black">
                          {item.name}
                        </h3>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${
                            item.status === 'En proceso'
                              ? 'bg-orange-50 text-orange-500'
                              : item.status === 'Aprobado'
                                ? 'bg-green-50 text-green-700'
                                : item.status === 'Cancelado'
                                  ? 'bg-red-50 text-red-600'
                                  : 'bg-zinc-100 text-zinc-500'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-bold text-zinc-500">
                        Emprendedor: {item.entrepreneur}
                      </p>
                      <p className="mt-2 text-sm font-black text-orange-500">
                        {item.price}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-2xl bg-zinc-50 p-1">
                      <button
                        type="button"
                        disabled={isOrderConfirmed}
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black shadow-sm disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none"
                      >
                        <Minus size={17} strokeWidth={2.6} />
                      </button>
                      <span className="w-8 text-center text-sm font-black text-black">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        disabled={isOrderConfirmed}
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="grid h-9 w-9 place-items-center rounded-xl bg-orange-500 text-white shadow-sm disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none"
                      >
                        <Plus size={17} strokeWidth={2.6} />
                      </button>
                    </div>

                    <button
                      type="button"
                      disabled={!isOrderConfirmed}
                      onClick={() => onOpenChat(item)}
                      className="flex h-11 items-center gap-2 rounded-2xl bg-black px-3 text-xs font-black text-white disabled:bg-zinc-200 disabled:text-zinc-500"
                    >
                      <MessageCircle size={16} />
                      Chat
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[26px] bg-white p-5 text-center shadow-sm">
              <p className="text-sm font-black text-black">Tu carrito está vacío.</p>
              <p className="mt-2 text-sm font-semibold text-zinc-500">
                Agrega productos para continuar con tu pedido.
              </p>
            </div>
          )}

          <div className="mt-5 rounded-[26px] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-zinc-500">Total</p>
              <p className="text-2xl font-black text-black">{formatPrice(total)}</p>
            </div>
            {isOrderConfirmed ? (
              <p className="mt-3 rounded-2xl bg-orange-50 px-4 py-3 text-sm font-bold text-orange-600">
                Pedido confirmado. Cada producto queda en proceso hasta que el
                emprendedor lo apruebe o cancele.
              </p>
            ) : null}
          </div>

          <div className="mt-4 grid gap-3">
            <button
              type="button"
              disabled={!cartItems.length || isOrderConfirmed}
              onClick={onConfirmOrder}
              className="h-14 rounded-2xl bg-orange-500 text-sm font-black uppercase text-white shadow-[0_16px_35px_rgba(255,122,26,0.32)] disabled:bg-zinc-300 disabled:text-zinc-500 disabled:shadow-none"
            >
              Confirmar compra
            </button>
            <button
              type="button"
              disabled={!isOrderConfirmed || !cartItems.length}
              onClick={() => onOpenChat(cartItems[0])}
              className="h-14 rounded-2xl bg-black text-sm font-black uppercase text-white disabled:bg-zinc-300 disabled:text-zinc-500"
            >
              Escribir a emprendedores
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function OrderChatModal({ product, messages, expiresAt, onClose, onSendMessage }) {
  const [message, setMessage] = useState('')
  const [remainingMs, setRemainingMs] = useState(CHAT_DURATION_MS)
  const minutesLeft = Math.max(0, Math.ceil(remainingMs / 60000))

  useEffect(() => {
    const updateRemainingTime = () => {
      setRemainingMs(Math.max(0, expiresAt - Date.now()))
    }

    updateRemainingTime()
    const intervalId = window.setInterval(updateRemainingTime, 1000)

    return () => window.clearInterval(intervalId)
  }, [expiresAt])

  const sendMessage = (event) => {
    event.preventDefault()

    if (!message.trim()) return

    onSendMessage(product.id, message.trim())
    setMessage('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10">
      <section className="max-h-[88svh] w-full max-w-[400px] overflow-hidden rounded-[30px] bg-[#f7f7f7] shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Chat activo: {minutesLeft} min
            </p>
            <h2 className="mt-1 text-lg font-black uppercase text-black">
              {product.entrepreneur}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar chat"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-100 text-black"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="rounded-2xl bg-orange-50 px-4 py-3">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">
              Producto
            </p>
            <p className="mt-1 text-sm font-black text-black">{product.name}</p>
          </div>

          <div className="mt-4 h-64 space-y-3 overflow-y-auto">
            {messages.map((chatMessage) => (
              <div
                key={chatMessage.id}
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm font-semibold leading-snug ${
                  chatMessage.from === 'estudiante'
                    ? 'ml-auto bg-orange-500 text-white'
                    : 'bg-white text-black shadow-sm'
                }`}
              >
                {chatMessage.text}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="mt-4 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Escribe sobre el estado del pedido"
              className="h-12 min-w-0 flex-1 rounded-2xl bg-white px-4 text-sm font-bold text-black shadow-sm outline-none placeholder:text-zinc-400"
            />
            <button
              type="submit"
              className="grid h-12 w-12 place-items-center rounded-2xl bg-black text-white"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

function Home({ student, onLogout, onUpdateProfile }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isPurchasesOpen, setIsPurchasesOpen] = useState(false)
  const [isMissionsOpen, setIsMissionsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [chatProduct, setChatProduct] = useState(null)
  const [chatSessions, setChatSessions] = useState({})
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
  const [cartItems, setCartItems] = useState(() =>
    products.map((product, index) => ({
      ...product,
      quantity: index === 0 ? 1 : 2,
      status: 'Seleccionado',
    })),
  )

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const now = Date.now()

      setChatSessions((current) =>
        Object.fromEntries(
          Object.entries(current).filter(([, session]) => session.expiresAt > now),
        ),
      )
    }, 30000)

    return () => window.clearInterval(intervalId)
  }, [])

  const openChat = (product) => {
    const now = Date.now()

    setChatSessions((current) => {
      const currentSession = current[product.id]

      if (currentSession && currentSession.expiresAt > now) {
        return current
      }

      return {
        ...current,
        [product.id]: {
          expiresAt: now + CHAT_DURATION_MS,
          messages: [
            {
              id: `${product.id}-welcome`,
              from: 'emprendedor',
              text: `Hola, soy ${product.entrepreneur}. Confirmaré el estado de tu pedido pronto.`,
            },
          ],
        },
      }
    })
    setChatProduct(product)
  }

  const sendChatMessage = (productId, text) => {
    setChatSessions((current) => {
      const session = current[productId]

      if (!session || session.expiresAt <= Date.now()) {
        return current
      }

      return {
        ...current,
        [productId]: {
          ...session,
          messages: [
            ...session.messages,
            { id: Date.now(), from: 'estudiante', text },
          ],
        },
      }
    })
  }

  const activeUser = student
    ? {
        name: `${student.firstName} ${student.lastName}`.toUpperCase(),
        location: student.university,
        rating: student.rating || 5,
      }
    : user

  return (
    <main className="mx-auto min-h-svh w-full max-w-[400px] bg-[#f7f7f7] pb-28">
      <Header
        user={activeUser}
        onLogout={onLogout}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenPurchases={() => setIsPurchasesOpen(true)}
        onOpenMissions={() => setIsMissionsOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <section className="px-5 pt-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
          Emprende U
        </p>
        <h2 className="mt-3 max-w-[310px] text-[36px] font-black uppercase leading-[0.95] text-black">
          ¿QUÉ SE TE ANTOJA HOY?
        </h2>
      </section>

      <section className="px-5 pt-6">
        <article className="overflow-hidden rounded-[30px] bg-orange-500 p-5 text-white shadow-[0_18px_40px_rgba(255,122,26,0.33)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold">
                <Clock3 size={17} />
                {pendingOrder.status}
              </p>
              <p className="mt-2 text-xs font-semibold text-orange-100">
                {pendingOrder.label}
              </p>
            </div>
            <p className="rounded-full bg-white px-3 py-1.5 text-sm font-black text-orange-500">
              {pendingOrder.price}
            </p>
          </div>

          <button
            type="button"
            className="mt-5 flex h-11 w-full items-center justify-between rounded-2xl bg-black px-4 text-sm font-extrabold text-white"
          >
            Ver detalle
            <ArrowRight size={18} strokeWidth={2.6} />
          </button>
        </article>
      </section>

      <section className="px-5 pt-7">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-black">Categorías</h2>
          <button type="button" className="text-sm font-extrabold text-orange-500">
            Ver todo
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="px-5 pt-7">
        <h2 className="text-xl font-black text-black">Recomendados</h2>
        <div className="mt-4 space-y-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <BottomNav items={navItems} />

      {isProfileOpen && student ? (
        <ProfileModal
          profile={student}
          onClose={() => setIsProfileOpen(false)}
          onSave={onUpdateProfile}
        />
      ) : null}

      {isPurchasesOpen ? (
        <PurchasesModal onClose={() => setIsPurchasesOpen(false)} />
      ) : null}

      {isMissionsOpen ? (
        <MissionsModal onClose={() => setIsMissionsOpen(false)} />
      ) : null}

      {isCartOpen ? (
        <CartModal
          cartItems={cartItems}
          isOrderConfirmed={isOrderConfirmed}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={(productId, change) => {
            setCartItems((current) =>
              current
                .map((item) =>
                  item.id === productId
                    ? { ...item, quantity: item.quantity + change }
                    : item,
                )
                .filter((item) => item.quantity > 0),
            )
          }}
          onConfirmOrder={() => {
            setIsOrderConfirmed(true)
            setCartItems((current) =>
              current.map((item) => ({ ...item, status: 'En proceso' })),
            )
          }}
          onOpenChat={openChat}
        />
      ) : null}

      {chatProduct && chatSessions[chatProduct.id] ? (
        <OrderChatModal
          product={chatProduct}
          messages={chatSessions[chatProduct.id].messages}
          expiresAt={chatSessions[chatProduct.id].expiresAt}
          onClose={() => setChatProduct(null)}
          onSendMessage={sendChatMessage}
        />
      ) : null}
    </main>
  )
}

export default Home
