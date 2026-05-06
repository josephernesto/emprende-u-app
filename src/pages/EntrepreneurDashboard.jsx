import {
  Camera,
  CheckCircle2,
  DollarSign,
  ImagePlus,
  LogOut,
  MessageCircle,
  PackagePlus,
  Star,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'

const initialProductForm = {
  name: '',
  description: '',
  price: '',
  category: 'Menús universitarios',
  availableDate: '',
  availableTime: '',
  stock: '',
  isAvailable: true,
  image: '🍱',
}

const readImage = (file, callback) => {
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => callback(reader.result)
  reader.readAsDataURL(file)
}

function FinanceModal({ onClose }) {
  const [form, setForm] = useState({
    soldUnits: '',
    unitPrice: '',
    unitCost: '',
    extraCosts: '',
  })
  const soldUnits = Number(form.soldUnits || 0)
  const unitPrice = Number(form.unitPrice || 0)
  const unitCost = Number(form.unitCost || 0)
  const extraCosts = Number(form.extraCosts || 0)
  const revenue = soldUnits * unitPrice
  const cost = soldUnits * unitCost + extraCosts
  const profit = revenue - cost

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10">
      <section className="max-h-[88svh] w-full max-w-[400px] overflow-hidden rounded-[30px] bg-[#f7f7f7] shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Opcional
            </p>
            <h2 className="mt-1 text-xl font-black uppercase text-black">
              Cotización
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-100 text-black"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="max-h-[74svh] overflow-y-auto px-5 py-5">
          <div className="grid grid-cols-2 gap-3">
            {[
              ['soldUnits', 'Pedidos vendidos'],
              ['unitPrice', 'Precio por unidad'],
              ['unitCost', 'Costo por unidad'],
              ['extraCosts', 'Gastos extra'],
            ].map(([field, label]) => (
              <label key={field} className="block">
                <span className="mb-1.5 block text-xs font-black text-black">
                  {label}
                </span>
                <input
                  type="number"
                  value={form[field]}
                  onChange={(event) => updateField(field, event.target.value)}
                  className="h-12 w-full rounded-2xl bg-white px-4 text-sm font-bold text-black shadow-sm outline-none"
                />
              </label>
            ))}
          </div>

          <div className="mt-4 rounded-[26px] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-zinc-500">Ingresos</p>
              <p className="text-lg font-black text-black">S/ {revenue.toFixed(2)}</p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-black text-zinc-500">Costos</p>
              <p className="text-lg font-black text-black">S/ {cost.toFixed(2)}</p>
            </div>
            <div className="mt-3 rounded-2xl bg-orange-50 px-4 py-3">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-orange-500">
                Ganancia estimada
              </p>
              <p className="mt-1 text-2xl font-black text-black">
                S/ {profit.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function EntrepreneurDashboard({
  profile,
  products,
  onLogout,
  onPublishProduct,
}) {
  const businessName = profile.businessName || 'Mi emprendimiento'
  const [logo, setLogo] = useState(profile.logo || '')
  const [gallery, setGallery] = useState([])
  const [productForm, setProductForm] = useState(initialProductForm)
  const [isFinanceOpen, setIsFinanceOpen] = useState(false)
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      studentName: 'ALVARO VASQUEZ',
      productName: 'Box de brownies',
      quantity: 2,
      total: 'S/ 48.00',
      status: 'En proceso',
      messages: ['Hola, ¿puedes entregar a las 3 pm?'],
      rating: 0,
    },
    {
      id: 'ORD-002',
      studentName: 'MARIANA QUISPE',
      productName: 'Desayuno sorpresa',
      quantity: 1,
      total: 'S/ 28.00',
      status: 'En proceso',
      messages: ['Quiero confirmar disponibilidad.'],
      rating: 0,
    },
  ])

  const totalRevenue = useMemo(
    () =>
      orders.reduce(
        (sum, order) => sum + Number(order.total.replace('S/', '').trim()),
        0,
      ),
    [orders],
  )

  const updateProductField = (field, value) => {
    setProductForm((current) => ({ ...current, [field]: value }))
  }

  const approveOrder = (orderId) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status: 'Aprobado' } : order,
      ),
    )
  }

  const rateStudent = (orderId, rating) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, rating } : order,
      ),
    )
  }

  const submitProduct = (event) => {
    event.preventDefault()

    onPublishProduct({
      id: Date.now(),
      name: productForm.name.trim(),
      description: productForm.description.trim(),
      price: `S/ ${Number(productForm.price || 0).toFixed(2)}`,
      category: productForm.category,
      entrepreneur: businessName,
      entrepreneurType: 'nuevo',
      soldCount: 0,
      isAvailable: productForm.isAvailable,
      isHealthy: productForm.category === 'Fit y saludable',
      specialPromo: false,
      specialDay: null,
      availableDate: productForm.availableDate,
      availableTime: productForm.availableTime,
      stock: productForm.stock,
      image: productForm.image,
    })
    setProductForm(initialProductForm)
  }

  return (
    <main className="mx-auto min-h-svh w-full max-w-[400px] bg-[#f7f7f7] pb-8">
      <section className="bg-black px-5 pb-6 pt-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-400">
              Emprendedor
            </p>
            <h1 className="mt-2 text-2xl font-black uppercase leading-none">
              {businessName}
            </h1>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10"
          >
            <LogOut size={20} />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <label className="grid h-20 w-20 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-[24px] bg-white/10 text-4xl">
            {logo ? (
              <img src={logo} alt={businessName} className="h-full w-full object-cover" />
            ) : (
              <Camera size={28} />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => readImage(event.target.files?.[0], setLogo)}
            />
          </label>
          <div className="min-w-0">
            <p className="text-sm font-black">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="mt-1 text-xs font-semibold text-zinc-300">
              {profile.university}
            </p>
            <p className="mt-1 text-xs font-semibold text-zinc-300">
              Celular: {profile.phone || 'Sin registrar'}
            </p>
            <p className="mt-1 text-xs font-semibold text-orange-300">
              IP: {profile.accessIp}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pt-5">
        <div className="grid grid-cols-2 gap-3">
          <article className="rounded-[24px] bg-white p-4 shadow-sm">
            <p className="text-xs font-black uppercase text-zinc-400">Pedidos</p>
            <p className="mt-2 text-2xl font-black text-black">{orders.length}</p>
          </article>
          <article className="rounded-[24px] bg-orange-500 p-4 text-white shadow-[0_16px_35px_rgba(255,122,26,0.28)]">
            <p className="text-xs font-black uppercase text-orange-100">Generado</p>
            <p className="mt-2 text-2xl font-black">S/ {totalRevenue.toFixed(2)}</p>
          </article>
        </div>
      </section>

      <section className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-black">Fotos del emprendimiento</h2>
          <label className="grid h-10 w-10 cursor-pointer place-items-center rounded-2xl bg-white text-orange-500 shadow-sm">
            <ImagePlus size={20} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) =>
                readImage(event.target.files?.[0], (image) =>
                  setGallery((current) => [image, ...current]),
                )
              }
            />
          </label>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          {[logo, ...gallery].filter(Boolean).map((photo) => (
            <img
              key={photo}
              src={photo}
              alt="Foto del emprendimiento"
              className="h-24 w-24 shrink-0 rounded-2xl object-cover shadow-sm"
            />
          ))}
          {!logo && !gallery.length ? (
            <div className="rounded-2xl bg-white p-4 text-sm font-bold text-zinc-500 shadow-sm">
              Sube tu logo o fotos para que el estudiante conozca tu negocio.
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-5 pt-5">
        <h2 className="text-lg font-black text-black">Publicar producto</h2>
        <form onSubmit={submitProduct} className="mt-3 space-y-3 rounded-[28px] bg-white p-4 shadow-sm">
          <label className="grid h-28 cursor-pointer place-items-center overflow-hidden rounded-2xl bg-orange-50 text-4xl">
            {productForm.image?.startsWith?.('data:') ? (
              <img
                src={productForm.image}
                alt="Producto"
                className="h-full w-full object-cover"
              />
            ) : (
              <PackagePlus size={30} className="text-orange-500" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) =>
                readImage(event.target.files?.[0], (image) =>
                  updateProductField('image', image),
                )
              }
            />
          </label>

          <input
            type="text"
            value={productForm.name}
            onChange={(event) => updateProductField('name', event.target.value)}
            required
            placeholder="Nombre del producto"
            className="h-12 w-full rounded-2xl bg-zinc-50 px-4 text-sm font-bold outline-none"
          />
          <textarea
            value={productForm.description}
            onChange={(event) =>
              updateProductField('description', event.target.value)
            }
            required
            rows="3"
            placeholder="Características, ingredientes o descripción"
            className="w-full resize-none rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-bold outline-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={productForm.price}
              onChange={(event) => updateProductField('price', event.target.value)}
              required
              placeholder="Precio"
              className="h-12 rounded-2xl bg-zinc-50 px-4 text-sm font-bold outline-none"
            />
            <input
              type="number"
              value={productForm.stock}
              onChange={(event) => updateProductField('stock', event.target.value)}
              placeholder="Stock"
              className="h-12 rounded-2xl bg-zinc-50 px-4 text-sm font-bold outline-none"
            />
          </div>
          <select
            value={productForm.category}
            onChange={(event) => updateProductField('category', event.target.value)}
            className="h-12 w-full rounded-2xl bg-zinc-50 px-4 text-sm font-bold outline-none"
          >
            <option>Menús universitarios</option>
            <option>Postres</option>
            <option>Bebidas</option>
            <option>Snacks</option>
            <option>Comida rápida</option>
            <option>Fit y saludable</option>
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={productForm.availableDate}
              onChange={(event) =>
                updateProductField('availableDate', event.target.value)
              }
              className="h-12 rounded-2xl bg-zinc-50 px-4 text-sm font-bold outline-none"
            />
            <input
              type="time"
              value={productForm.availableTime}
              onChange={(event) =>
                updateProductField('availableTime', event.target.value)
              }
              className="h-12 rounded-2xl bg-zinc-50 px-4 text-sm font-bold outline-none"
            />
          </div>
          <label className="flex items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-black text-black">
            <input
              type="checkbox"
              checked={productForm.isAvailable}
              onChange={(event) =>
                updateProductField('isAvailable', event.target.checked)
              }
              className="h-4 w-4 accent-orange-500"
            />
            Disponible para estudiantes
          </label>
          <button
            type="submit"
            className="h-13 w-full rounded-2xl bg-orange-500 py-4 text-sm font-black uppercase text-white shadow-[0_16px_35px_rgba(255,122,26,0.32)]"
          >
            Publicar en menú estudiante
          </button>
        </form>
      </section>

      <section className="px-5 pt-5">
        <h2 className="text-lg font-black text-black">Mis productos publicados</h2>
        <div className="mt-3 space-y-3">
          {products.length ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="rounded-2xl bg-white p-4 text-sm font-bold text-zinc-500 shadow-sm">
              Aún no publicaste productos.
            </p>
          )}
        </div>
      </section>

      <section className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-black">Pedidos y chats</h2>
          <button
            type="button"
            onClick={() => setIsFinanceOpen(true)}
            className="flex h-10 items-center gap-2 rounded-2xl bg-black px-3 text-xs font-black text-white"
          >
            <DollarSign size={15} />
            Cotización
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {orders.map((order) => (
            <article key={order.id} className="rounded-[26px] bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-black">{order.productName}</p>
                  <p className="mt-1 text-xs font-bold text-zinc-500">
                    {order.studentName} - Cantidad {order.quantity}
                  </p>
                </div>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-black uppercase text-orange-500">
                  {order.status}
                </span>
              </div>

              <div className="mt-3 rounded-2xl bg-zinc-50 p-3">
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-zinc-400">
                  <MessageCircle size={14} />
                  Chat del pedido
                </p>
                {order.messages.map((message) => (
                  <p key={message} className="mt-2 text-sm font-semibold text-zinc-600">
                    "{message}"
                  </p>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => approveOrder(order.id)}
                  className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-600 text-xs font-black uppercase text-white"
                >
                  <CheckCircle2 size={16} />
                  Aprobar
                </button>
                <p className="grid h-11 place-items-center rounded-2xl bg-orange-50 text-sm font-black text-orange-500">
                  {order.total}
                </p>
              </div>

              <div className="mt-3">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-400">
                  Calificar estudiante
                </p>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => rateStudent(order.id, rating)}
                      className={`text-2xl leading-none ${
                        rating <= order.rating ? 'text-orange-500' : 'text-zinc-300'
                      }`}
                    >
                      <Star
                        size={22}
                        className={rating <= order.rating ? 'fill-orange-500' : ''}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {isFinanceOpen ? <FinanceModal onClose={() => setIsFinanceOpen(false)} /> : null}
    </main>
  )
}

export default EntrepreneurDashboard
