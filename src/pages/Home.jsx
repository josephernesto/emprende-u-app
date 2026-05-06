import {
  Camera,
  CheckCircle2,
  Clock3,
  Flag,
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
import FilterChips from '../components/FilterChips'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import EntrepreneurDashboard from './EntrepreneurDashboard'
import {
  categories,
  currentPurchase,
  entrepreneurs,
  filterChips,
  missions,
  navItems,
  pendingOrder,
  purchaseHistory,
  products as mockProducts,
  universities,
  user,
} from '../data/mockData'

const CHAT_DURATION_MS = 10 * 60 * 1000
const getPriceValue = (price) => Number(price.replace('S/', '').trim())
const formatPrice = (value) => `S/ ${value.toFixed(2)}`
const normalizeText = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
const getOrderProgress = (order) =>
  `${order.items.filter((item) => item.status === 'Aprobado').length}/${order.items.length}`

function ProductImage({ image, name, className }) {
  const isPhoto = typeof image === 'string' && image.startsWith('data:')

  return (
    <div className={className}>
      {isPhoto ? (
        <img src={image} alt={name} className="h-full w-full object-cover" />
      ) : (
        image
      )}
    </div>
  )
}

function ProfileModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState({
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    studentCode: profile.studentCode || '',
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
      studentCode: form.studentCode.trim(),
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

          {!profile.accessIp ? (
            <label className="mt-3 block">
              <span className="mb-1.5 block text-sm font-extrabold text-black">
                CodigoEstudiante
              </span>
              <input
                type="text"
                value={form.studentCode}
                onChange={(event) =>
                  updateField('studentCode', event.target.value)
                }
                className="h-[50px] w-full rounded-2xl bg-white px-4 text-sm font-bold text-black shadow-sm outline-none"
              />
            </label>
          ) : null}

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
  confirmedOrders,
  onClose,
  onUpdateQuantity,
  onConfirmOrder,
  onOpenChat,
  onOpenOrder,
}) {
  const currentCartTotal = cartItems.reduce(
    (sum, item) => sum + getPriceValue(item.price) * item.quantity,
    0,
  )
  const confirmedOrdersTotal = confirmedOrders.reduce(
    (sum, order) =>
      sum +
      order.items.reduce(
        (orderSum, item) => orderSum + getPriceValue(item.price) * item.quantity,
        0,
      ),
    0,
  )
  const grandTotal = currentCartTotal + confirmedOrdersTotal

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
          {confirmedOrders.length ? (
            <section className="mb-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-black">
                  Pedidos en proceso
                </h3>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-500">
                  {confirmedOrders.length}
                </span>
              </div>

              <div className="mt-3 space-y-3">
                {confirmedOrders.map((order) => (
                  <article
                    key={order.id}
                    className="rounded-[26px] bg-white p-4 shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => onOpenOrder(order)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-black text-black">
                          Pedido {order.number}
                        </p>
                        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-black uppercase text-orange-500">
                          {getOrderProgress(order)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs font-black text-zinc-500">
                        <span>{order.items.length} producto(s)</span>
                        <span className="text-black">{order.total}</span>
                      </div>
                    </button>

                    <div className="mt-3 space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-50 px-3 py-2"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-xs font-black text-black">
                              {item.name}
                            </p>
                            <p className="truncate text-[11px] font-bold text-zinc-500">
                              {item.entrepreneur}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onOpenChat(item)}
                            className="flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-black px-3 text-[11px] font-black text-white"
                          >
                            <MessageCircle size={14} />
                            Chat
                          </button>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {cartItems.length ? (
            <section>
              <h3 className="mb-3 text-base font-black text-black">
                Nuevo pedido
              </h3>
              <div className="space-y-3">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[26px] bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <ProductImage
                      image={item.image}
                      name={item.name}
                      className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-orange-50 text-3xl"
                    />
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
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black shadow-sm"
                      >
                        <Minus size={17} strokeWidth={2.6} />
                      </button>
                      <span className="w-8 text-center text-sm font-black text-black">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="grid h-9 w-9 place-items-center rounded-xl bg-orange-500 text-white shadow-sm"
                      >
                        <Plus size={17} strokeWidth={2.6} />
                      </button>
                    </div>

                  </div>
                </article>
              ))}
              </div>
            </section>
          ) : !confirmedOrders.length ? (
            <div className="rounded-[26px] bg-white p-5 text-center shadow-sm">
              <p className="text-sm font-black text-black">Tu carrito está vacío.</p>
              <p className="mt-2 text-sm font-semibold text-zinc-500">
                Agrega productos para continuar con tu pedido.
              </p>
            </div>
          ) : null}

          <div className="mt-5 rounded-[26px] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-zinc-500">Total general</p>
              <p className="text-2xl font-black text-black">
                {formatPrice(grandTotal)}
              </p>
            </div>
            <p className="mt-2 text-xs font-bold text-zinc-500">
              Incluye pedidos en proceso y el nuevo pedido sin confirmar.
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            <button
              type="button"
              disabled={!cartItems.length}
              onClick={onConfirmOrder}
              className="h-14 rounded-2xl bg-orange-500 text-sm font-black uppercase text-white shadow-[0_16px_35px_rgba(255,122,26,0.32)] disabled:bg-zinc-300 disabled:text-zinc-500 disabled:shadow-none"
            >
              Confirmar compra
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function OrderDetailModal({ order, onClose, onOpenChat }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10">
      <section className="max-h-[88svh] w-full max-w-[400px] overflow-hidden rounded-[30px] bg-[#f7f7f7] shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Pedido {order.number}
            </p>
            <h2 className="mt-1 text-xl font-black uppercase text-black">
              Informe del pedido
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar pedido"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-100 text-black"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="max-h-[74svh] overflow-y-auto px-5 py-5">
          <section className="rounded-[26px] bg-orange-500 p-4 text-white shadow-[0_16px_35px_rgba(255,122,26,0.3)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black">Estado general</p>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-orange-500">
                {getOrderProgress(order)}
              </span>
            </div>
            <p className="mt-3 text-2xl font-black">{order.total}</p>
            <p className="mt-1 text-xs font-semibold text-orange-100">
              {order.items.length} producto(s) confirmado(s)
            </p>
          </section>

          <div className="mt-4 space-y-3">
            {order.items.map((item) => (
              <article
                key={item.id}
                className="rounded-[26px] bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <ProductImage
                    image={item.image}
                    name={item.name}
                    className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-orange-50 text-3xl"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="min-w-0 flex-1 text-sm font-black text-black">
                        {item.name}
                      </h3>
                      <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-black uppercase text-orange-500">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-zinc-500">
                      Emprendedor: {item.entrepreneur}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm font-black text-black">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="text-sm font-black text-orange-500">
                        {formatPrice(getPriceValue(item.price) * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenChat(item)}
                  className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-black px-3 text-xs font-black uppercase text-white"
                >
                  <MessageCircle size={16} />
                  Chatear con emprendedor
                </button>
              </article>
            ))}
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

function SupportModal({ onClose }) {
  const [form, setForm] = useState({
    reportType: 'Problema en la app',
    message: '',
    screenshotName: '',
  })
  const [sent, setSent] = useState(false)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setSent(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10">
      <section className="max-h-[88svh] w-full max-w-[400px] overflow-hidden rounded-[30px] bg-[#f7f7f7] shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Soporte
            </p>
            <h2 className="mt-1 text-xl font-black uppercase text-black">
              Contáctanos
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar soporte"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-100 text-black"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[74svh] overflow-y-auto px-5 py-5">
          <div className="rounded-[26px] bg-white p-4 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-black text-black">
              <Flag size={18} className="text-orange-500" />
              Reporta un problema, estafa o perfil falso.
            </p>
            <p className="mt-2 text-sm font-semibold leading-snug text-zinc-500">
              Cuéntanos qué ocurrió y agrega una captura si la tienes.
            </p>
          </div>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-extrabold text-black">
              Tipo de reporte
            </span>
            <select
              value={form.reportType}
              onChange={(event) => updateField('reportType', event.target.value)}
              className="min-h-[50px] w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-black shadow-sm outline-none"
            >
              <option>Problema en la app</option>
              <option>Reportar estafa</option>
              <option>Perfil falso</option>
              <option>Pedido o pago</option>
              <option>Otro problema</option>
            </select>
          </label>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-extrabold text-black">
              Describe tu problema
            </span>
            <textarea
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              required
              rows="5"
              placeholder="Escribe qué pasó, con quién ocurrió y cualquier detalle importante."
              className="w-full resize-none rounded-2xl bg-white px-4 py-3 text-sm font-bold text-black shadow-sm outline-none placeholder:text-zinc-400"
            />
          </label>

          <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-500">
              <Camera size={20} strokeWidth={2.5} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-black text-black">
                Adjuntar captura
              </span>
              <span className="block truncate text-xs font-bold text-zinc-500">
                {form.screenshotName || 'Imagen opcional del problema'}
              </span>
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) =>
                updateField(
                  'screenshotName',
                  event.target.files?.[0]?.name || '',
                )
              }
            />
          </label>

          {sent ? (
            <p className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
              Reporte enviado. Revisaremos tu caso lo antes posible.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-4 h-14 w-full rounded-2xl bg-orange-500 text-sm font-black uppercase text-white shadow-[0_16px_35px_rgba(255,122,26,0.32)] transition active:scale-[0.98]"
          >
            Enviar reporte
          </button>
        </form>
      </section>
    </div>
  )
}

function EntrepreneurCommentsModal({
  entrepreneur,
  reviews,
  averageRating,
  draft,
  onClose,
  onDraftChange,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10">
      <section className="max-h-[90svh] w-full max-w-[400px] overflow-hidden rounded-[30px] bg-[#f7f7f7] shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              {averageRating} estrellas promedio
            </p>
            <h2 className="mt-1 text-xl font-black uppercase text-black">
              Comentarios
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar comentarios"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-100 text-black"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="max-h-[78svh] overflow-y-auto px-5 py-5">
          <section className="rounded-[28px] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-3xl">
                {entrepreneur.logo}
              </div>
              <div>
                <p className="text-lg font-black text-black">
                  {entrepreneur.name}
                </p>
                <p className="text-xs font-bold text-zinc-500">
                  {reviews.length} opiniones publicadas
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-4 rounded-2xl bg-zinc-50 p-3">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-400">
                Publicar opinion
              </p>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => onDraftChange('rating', rating)}
                    className={`text-2xl leading-none ${
                      rating <= draft.rating ? 'text-orange-500' : 'text-zinc-300'
                    }`}
                    aria-label={`${rating} estrellas`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                value={draft.comment}
                onChange={(event) => onDraftChange('comment', event.target.value)}
                rows="3"
                placeholder="Cuenta si estuvo rico, si llego bien o que mejoraria."
                className="mt-2 w-full resize-none rounded-xl bg-white px-3 py-2 text-xs font-bold text-black outline-none placeholder:text-zinc-400"
              />
              <button
                type="submit"
                className="mt-2 h-11 w-full rounded-xl bg-black text-xs font-black uppercase text-white"
              >
                Publicar opinion
              </button>
            </form>
          </section>

          <div className="mt-4 space-y-3">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-black text-orange-500">
                  {'★'.repeat(review.rating)}
                  <span className="text-zinc-300">
                    {'★'.repeat(5 - review.rating)}
                  </span>
                </p>
                <p className="mt-2 text-sm font-semibold leading-snug text-zinc-600">
                  "{review.comment}"
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function EntrepreneurProductsModal({
  entrepreneur,
  productCatalog,
  onClose,
  onAddToCart,
}) {
  const entrepreneurProducts = productCatalog.filter(
    (product) => product.entrepreneur === entrepreneur.name,
  )

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10">
      <section className="max-h-[90svh] w-full max-w-[400px] overflow-hidden rounded-[30px] bg-[#f7f7f7] shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              {entrepreneur.name}
            </p>
            <h2 className="mt-1 text-xl font-black uppercase text-black">
              Productos
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar productos"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-100 text-black"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="max-h-[78svh] space-y-3 overflow-y-auto px-5 py-5">
          {entrepreneurProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function EntrepreneursModal({ productCatalog, onClose, onAddToCart }) {
  const [query, setQuery] = useState('')
  const [selectedCommentsEntrepreneur, setSelectedCommentsEntrepreneur] =
    useState(null)
  const [selectedProductsEntrepreneur, setSelectedProductsEntrepreneur] =
    useState(null)
  const [reviewDrafts, setReviewDrafts] = useState({})
  const [reviewsByEntrepreneur, setReviewsByEntrepreneur] = useState(() =>
    Object.fromEntries(
      entrepreneurs.map((entrepreneur) => [
        entrepreneur.id,
        entrepreneur.reviews || [],
      ]),
    ),
  )
  const normalizedQuery = normalizeText(query)
  const filteredEntrepreneurs = entrepreneurs.filter((entrepreneur) =>
    normalizeText(
      `${entrepreneur.name} ${entrepreneur.description} ${entrepreneur.university}`,
    ).includes(normalizedQuery),
  )
  const getReviews = (entrepreneurId) => reviewsByEntrepreneur[entrepreneurId] || []
  const getAverageRating = (reviews) => {
    if (!reviews.length) return '0.0'

    return (
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    ).toFixed(1)
  }
  const updateReviewDraft = (entrepreneurId, field, value) => {
    setReviewDrafts((current) => ({
      ...current,
      [entrepreneurId]: {
        rating: 5,
        comment: '',
        ...current[entrepreneurId],
        [field]: value,
      },
    }))
  }
  const submitReview = (event, entrepreneurId) => {
    event.preventDefault()

    const draft = reviewDrafts[entrepreneurId] || { rating: 5, comment: '' }
    if (!draft.comment.trim()) return

    setReviewsByEntrepreneur((current) => ({
      ...current,
      [entrepreneurId]: [
        { id: `R-${Date.now()}`, rating: draft.rating, comment: draft.comment.trim() },
        ...(current[entrepreneurId] || []),
      ],
    }))
    setReviewDrafts((current) => ({
      ...current,
      [entrepreneurId]: { rating: 5, comment: '' },
    }))
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10">
      <section className="max-h-[96svh] w-full max-w-[400px] overflow-hidden rounded-t-[30px] bg-[#f7f7f7] shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Catalogo
            </p>
            <h2 className="mt-1 text-xl font-black uppercase text-black">
              Emprendimientos
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar emprendimientos"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-100 text-black"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="max-h-[84svh] overflow-y-auto px-5 py-5">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Buscar emprendimiento"
          />

          <div className="mt-4 space-y-4">
            {filteredEntrepreneurs.length ? (
              filteredEntrepreneurs.map((entrepreneur) => {
                const reviews = getReviews(entrepreneur.id)
                const averageRating = getAverageRating(reviews)
                const fiveStarReview = reviews.find((review) => review.rating === 5)

                return (
                  <article
                    key={entrepreneur.id}
                    className="rounded-[28px] bg-white p-4 shadow-[0_14px_30px_rgba(15,15,15,0.07)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-20 w-20 shrink-0 place-items-center rounded-[24px] bg-orange-50 text-5xl">
                        {entrepreneur.logo}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="truncate text-lg font-black text-black">
                              {entrepreneur.name}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-xs font-bold text-zinc-500">
                              {entrepreneur.university}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-500">
                            {averageRating} ★
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full bg-black px-3 py-1 text-[10px] font-black uppercase text-white">
                            {entrepreneur.type === 'nuevo'
                              ? 'Nuevo'
                              : 'Experiencia'}
                          </span>
                          <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-black uppercase text-zinc-500">
                            {reviews.length} comentarios
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm font-semibold leading-snug text-zinc-600">
                      {entrepreneur.description}
                    </p>

                    {fiveStarReview ? (
                      <div className="mt-4 rounded-2xl bg-zinc-50 p-3">
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-400">
                          Comentario de 5 estrellas
                        </p>
                        <p className="mt-2 text-sm font-black text-orange-500">
                          ★★★★★
                        </p>
                        <p className="mt-1 text-xs font-semibold leading-snug text-zinc-600">
                          "{fiveStarReview.comment}"
                        </p>
                      </div>
                    ) : null}

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedCommentsEntrepreneur(entrepreneur)}
                        className="h-12 rounded-2xl bg-black text-xs font-black uppercase text-white"
                      >
                        Comentarios
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedProductsEntrepreneur(entrepreneur)}
                        className="h-12 rounded-2xl bg-orange-500 text-xs font-black uppercase text-white shadow-[0_12px_24px_rgba(255,122,26,0.25)]"
                      >
                        Productos que ofrece
                      </button>
                    </div>
                  </article>
                )
              })
            ) : (
              <div className="rounded-[26px] bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-black text-black">
                  No encontramos ese emprendimiento.
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-500">
                  Prueba buscar por nombre, universidad o tipo de comida.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedCommentsEntrepreneur ? (
        <EntrepreneurCommentsModal
          entrepreneur={selectedCommentsEntrepreneur}
          reviews={getReviews(selectedCommentsEntrepreneur.id)}
          averageRating={getAverageRating(
            getReviews(selectedCommentsEntrepreneur.id),
          )}
          draft={
            reviewDrafts[selectedCommentsEntrepreneur.id] || {
              rating: 5,
              comment: '',
            }
          }
          onClose={() => setSelectedCommentsEntrepreneur(null)}
          onDraftChange={(field, value) =>
            updateReviewDraft(selectedCommentsEntrepreneur.id, field, value)
          }
          onSubmit={(event) =>
            submitReview(event, selectedCommentsEntrepreneur.id)
          }
        />
      ) : null}

      {selectedProductsEntrepreneur ? (
        <EntrepreneurProductsModal
          entrepreneur={selectedProductsEntrepreneur}
          productCatalog={productCatalog}
          onClose={() => setSelectedProductsEntrepreneur(null)}
          onAddToCart={onAddToCart}
        />
      ) : null}
    </div>
  )
}

function Home({
  student,
  onLogout,
  onUpdateProfile,
  productCatalog = mockProducts,
  onPublishProduct,
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isPurchasesOpen, setIsPurchasesOpen] = useState(false)
  const [isMissionsOpen, setIsMissionsOpen] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [isEntrepreneursOpen, setIsEntrepreneursOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [chatProduct, setChatProduct] = useState(null)
  const [chatSessions, setChatSessions] = useState({})
  const [activeTab, setActiveTab] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [favoriteIds, setFavoriteIds] = useState([1])
  const [confirmedOrders, setConfirmedOrders] = useState([])
  const [cartItems, setCartItems] = useState([])

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

  if (student?.role === 'entrepreneur') {
    return (
      <EntrepreneurDashboard
        profile={student}
        products={productCatalog.filter(
          (product) =>
            product.entrepreneur === (student.businessName || 'Mi emprendimiento'),
        )}
        onLogout={onLogout}
        onPublishProduct={onPublishProduct}
      />
    )
  }

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

  const toggleFavorite = (productId) => {
    setFavoriteIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  const favoriteProducts = productCatalog.filter((product) =>
    favoriteIds.includes(product.id),
  )
  const relatedProducts = productCatalog.filter(
    (product) => !favoriteIds.includes(product.id),
  )
  const selectedCategoryFilter = categories.find(
    (category) => category.name === selectedCategory,
  )?.filter
  const normalizedSearch = normalizeText(searchTerm.trim())

  const matchesFilter = (product, filterId) => {
    const priceValue = getPriceValue(product.price)
    const categoryName = normalizeText(product.category)

    if (filterId === 'all') return true
    if (filterId === 'best-seller') return product.soldCount >= 50
    if (filterId === 'available') return product.isAvailable
    if (filterId === 'promo') return product.specialPromo
    if (filterId === 'nuevo') return product.entrepreneurType === 'nuevo'
    if (filterId === 'experiencia') return product.entrepreneurType === 'experiencia'
    if (filterId === 'fit') return product.isHealthy
    if (filterId === 'economico') return priceValue <= 14
    if (filterId === 'costoso') return priceValue >= 20
    if (filterId === 'postres') return categoryName === 'postres'
    if (filterId === 'bebidas') return categoryName === 'bebidas'
    if (filterId === 'comida-rapida') return categoryName === 'comida rapida'
    if (filterId === 'menus') return categoryName === 'menus universitarios'
    if (filterId === 'snacks') return categoryName === 'snacks'

    return true
  }

  const filteredProducts = productCatalog
    .filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        product.category,
        product.entrepreneur,
        product.specialDay,
      ]
        .filter(Boolean)
        .join(' ')
      const normalizedProductText = normalizeText(searchableText)

      return (
        (!normalizedSearch || normalizedProductText.includes(normalizedSearch)) &&
        (!selectedCategoryFilter ||
          matchesFilter(product, selectedCategoryFilter)) &&
        matchesFilter(product, activeFilter)
      )
    })
    .sort((first, second) => {
      if (first.isAvailable !== second.isAvailable) {
        return Number(second.isAvailable) - Number(first.isAvailable)
      }

      if (first.specialPromo !== second.specialPromo) {
        return Number(second.specialPromo) - Number(first.specialPromo)
      }

      return second.soldCount - first.soldCount
    })
  const specialPromoProducts = productCatalog.filter((product) => product.specialPromo)
  const hasConfirmedOrders = confirmedOrders.length > 0
  const recommendedProducts = filteredProducts.slice(0, 4)

  const confirmCurrentOrder = () => {
    const confirmedItems = cartItems.map((item) => ({
      ...item,
      status: 'En proceso',
    }))

    setConfirmedOrders((orders) => [
      ...orders,
      {
        id: `PED-${orders.length + 1}`,
        number: orders.length + 1,
        status: 'En proceso',
        total: formatPrice(
          confirmedItems.reduce(
            (sum, item) => sum + getPriceValue(item.price) * item.quantity,
            0,
          ),
        ),
        items: confirmedItems,
      },
    ])
    setCartItems([])
  }

  const addProductToCart = (product) => {
    setCartItems((current) => {
      const productInCart = current.find((item) => item.id === product.id)

      if (productInCart) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...current, { ...product, quantity: 1, status: 'Seleccionado' }]
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

      <section className={`${activeTab === 'home' ? '' : 'hidden'} px-5 pt-8`}>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
          Emprende U
        </p>
        <h2 className="mt-3 max-w-[310px] text-[36px] font-black uppercase leading-[0.95] text-black">
          ¿QUÉ SE TE ANTOJA HOY?
        </h2>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterChips
          filters={filterChips}
          activeFilter={activeFilter}
          onChange={(filterId) => {
            setActiveFilter(filterId)
            setSelectedCategory('')
          }}
        />
      </section>

      <section className={`${activeTab === 'home' ? '' : 'hidden'} px-5 pt-6`}>
        <article className="overflow-hidden rounded-[30px] bg-orange-500 p-5 text-white shadow-[0_18px_40px_rgba(255,122,26,0.33)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold">
                <Clock3 size={17} />
                {hasConfirmedOrders ? 'Pedidos pendientes' : pendingOrder.status}
              </p>
              <p className="mt-2 text-xs font-semibold text-orange-100">
                {hasConfirmedOrders
                  ? 'Revisa el estado de tus compras confirmadas'
                  : pendingOrder.label}
              </p>
            </div>
            <p className="rounded-full bg-white px-3 py-1.5 text-sm font-black text-orange-500">
              {hasConfirmedOrders ? `${confirmedOrders.length} activo(s)` : pendingOrder.price}
            </p>
          </div>

          {hasConfirmedOrders ? (
            <div className="-mx-5 mt-4 cursor-grab overflow-x-auto px-5 active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-3 pb-1">
                {confirmedOrders.map((order) => (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => setSelectedOrder(order)}
                    className="w-[146px] shrink-0 rounded-2xl bg-white/15 p-3 text-left backdrop-blur transition active:scale-95"
                  >
                    <p className="text-sm font-black">Pedido {order.number}</p>
                    <span
                      className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${
                        order.status === 'Aprobado'
                          ? 'bg-green-50 text-green-700'
                          : order.status === 'Cancelado'
                            ? 'bg-red-50 text-red-600'
                            : 'bg-white text-orange-500'
                      }`}
                    >
                      {getOrderProgress(order)}
                    </span>
                    <p className="mt-3 text-lg font-black leading-none">
                      {order.total}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </section>

      <section className={`${activeTab === 'home' ? '' : 'hidden'} px-5 pt-7`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-black">Categorías</h2>
          <button
            type="button"
            onClick={() => setIsEntrepreneursOpen(true)}
            className="text-sm font-extrabold text-orange-500"
          >
            Ver todo
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              active={selectedCategory === category.name}
              onClick={() => {
                setSelectedCategory((current) =>
                  current === category.name ? '' : category.name,
                )
                setActiveFilter('all')
              }}
            />
          ))}
        </div>
      </section>

      <section className={`${activeTab === 'home' ? '' : 'hidden'} px-5 pt-7`}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-black">
              Promos por días especiales
            </h2>
            <p className="mt-1 text-xs font-bold text-zinc-500">
              Ideas de comida para fechas importantes en la universidad.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('promo')
              setSelectedCategory('')
            }}
            className="shrink-0 text-sm font-extrabold text-orange-500"
          >
            Ver promos
          </button>
        </div>

        <div className="-mx-5 mt-4 overflow-x-auto px-5">
          <div className="flex gap-3 pb-1">
            {specialPromoProducts.map((product) => (
              <article
                key={product.id}
                className="w-[158px] shrink-0 rounded-[26px] bg-white p-3 shadow-[0_14px_30px_rgba(15,15,15,0.07)]"
              >
                <div className="grid h-20 place-items-center rounded-2xl bg-orange-50 text-4xl">
                  {product.image}
                </div>
                <p className="mt-3 truncate text-sm font-black text-black">
                  {product.name}
                </p>
                <p className="mt-1 line-clamp-1 text-xs font-bold text-orange-500">
                  {product.specialDay}
                </p>
                <p className="mt-2 text-sm font-black text-black">
                  {product.price}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${activeTab === 'home' ? '' : 'hidden'} px-5 pt-7`}>
        <h2 className="text-xl font-black text-black">Recomendados</h2>
        <div className="mt-4 space-y-3">
          {recommendedProducts.length ? (
            recommendedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favoriteIds.includes(product.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addProductToCart}
              />
            ))
          ) : (
            <div className="rounded-[26px] bg-white p-5 text-center shadow-sm">
              <p className="text-sm font-black text-black">
                No encontramos productos con esos filtros.
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-500">
                Prueba otra búsqueda o vuelve a Todos.
              </p>
            </div>
          )}
        </div>
      </section>

      {activeTab === 'favorites' ? (
        <section className="px-5 pt-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
            Tus favoritos
          </p>
          <h2 className="mt-3 text-[32px] font-black uppercase leading-none text-black">
            Productos que te gustan
          </h2>
          <p className="mt-3 text-sm font-semibold leading-snug text-zinc-500">
            Aquí verás los productos a los que diste corazón en el catálogo y si
            el emprendedor los marcó como disponibles.
          </p>

          <div className="mt-5 space-y-3">
            {favoriteProducts.length ? (
              favoriteProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite
                  onToggleFavorite={toggleFavorite}
                  onAddToCart={addProductToCart}
                />
              ))
            ) : (
              <div className="rounded-[26px] bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-black text-black">
                  Aún no tienes favoritos.
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-500">
                  En Inicio, toca el corazón de un producto para guardarlo aquí.
                </p>
              </div>
            )}
          </div>

          {favoriteProducts.length && relatedProducts.length ? (
            <section className="mt-7">
              <h3 className="text-xl font-black text-black">
                Productos relacionados
              </h3>
              <p className="mt-2 text-sm font-semibold leading-snug text-zinc-500">
                Recomendados según los productos que marcaste como favoritos.
              </p>

              <div className="mt-4 space-y-3">
                {relatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favoriteIds.includes(product.id)}
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={addProductToCart}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </section>
      ) : null}

      {activeTab === 'options' ? (
        <section className="px-5 pt-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
            Opciones
          </p>
          <h2 className="mt-3 text-[32px] font-black uppercase leading-none text-black">
            Ajustes rápidos
          </h2>
          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="h-14 w-full rounded-2xl bg-white px-4 text-left text-sm font-black text-black shadow-sm"
            >
              Ver y editar perfil
            </button>
            <button
              type="button"
              onClick={() => setIsPurchasesOpen(true)}
              className="h-14 w-full rounded-2xl bg-white px-4 text-left text-sm font-black text-black shadow-sm"
            >
              Registro de compras
            </button>
            <button
              type="button"
              onClick={() => setIsMissionsOpen(true)}
              className="h-14 w-full rounded-2xl bg-white px-4 text-left text-sm font-black text-black shadow-sm"
            >
              Misiones
            </button>
            <button
              type="button"
              onClick={() => setIsSupportOpen(true)}
              className="h-14 w-full rounded-2xl bg-white px-4 text-left text-sm font-black text-black shadow-sm"
            >
              Contáctanos / reportar problema
            </button>
          </div>
        </section>
      ) : null}

      <BottomNav items={navItems} activeTab={activeTab} onChange={setActiveTab} />

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

      {isSupportOpen ? (
        <SupportModal onClose={() => setIsSupportOpen(false)} />
      ) : null}

      {isEntrepreneursOpen ? (
        <EntrepreneursModal
          productCatalog={productCatalog}
          onClose={() => setIsEntrepreneursOpen(false)}
          onAddToCart={addProductToCart}
        />
      ) : null}

      {isCartOpen ? (
        <CartModal
          cartItems={cartItems}
          confirmedOrders={confirmedOrders}
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
          onConfirmOrder={confirmCurrentOrder}
          onOpenChat={openChat}
          onOpenOrder={(order) => {
            setSelectedOrder(order)
            setIsCartOpen(false)
          }}
        />
      ) : null}

      {selectedOrder ? (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
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
