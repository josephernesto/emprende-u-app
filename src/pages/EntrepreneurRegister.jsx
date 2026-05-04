import {
  ArrowLeft,
  BadgeCheck,
  LockKeyhole,
  Phone,
  UserRound,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { universities } from '../data/mockData'

const initialForm = {
  firstName: '',
  lastName: '',
  age: '',
  phone: '',
  password: '',
  university: universities[0],
  acceptedTerms: false,
}

function TermsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10">
      <section className="max-h-[86svh] w-full max-w-[400px] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_55px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
          <h2 className="text-base font-black uppercase text-black">
            Cuenta del emprendedor
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-9 w-9 place-items-center rounded-2xl bg-zinc-100 text-black"
          >
            <X size={19} strokeWidth={2.5} />
          </button>
        </div>

        <div className="max-h-[70svh] overflow-y-auto px-5 py-4 text-sm font-medium leading-relaxed text-zinc-600">
          <p className="font-black text-black">
            🧾 CUENTA DEL EMPRENDEDOR - EMPRENDE U
          </p>
          <p className="mt-3">
            La cuenta del emprendedor permite a estudiantes universitarios crear
            y gestionar su negocio dentro de la plataforma de forma segura y
            confiable.
          </p>
          <p className="mt-3">
            Para registrarse, el usuario debe ingresar información real como
            nombre del emprendimiento, datos personales, universidad, redes
            sociales y su logo. Al crear la cuenta, se genera un identificador
            único y se registra la IP para mejorar la seguridad. El acceso se
            realiza mediante usuario y contraseña.
          </p>
          <p className="mt-3">
            La cuenta será eliminada automáticamente si permanece inactiva
            durante 30 días, con el fin de mantener la plataforma actualizada y
            evitar perfiles abandonados.
          </p>
          <p className="mt-3">
            Una vez aprobado, el emprendedor podrá publicar sus productos
            agregando fotos, descripciones, precios y stock disponible por día.
            Además, deberá configurar sus días y horarios de atención dentro de
            la universidad, indicando cuándo estará disponible para entregar
            pedidos.
          </p>
          <p className="mt-3">
            El sistema mostrará automáticamente si el emprendimiento está activo
            o inactivo según su horario y disponibilidad de productos.
          </p>
          <p className="mt-3">
            Antes de aparecer en la plataforma, cada cuenta pasa por un proceso
            de validación para garantizar seguridad y evitar estafas.
          </p>
        </div>
      </section>
    </div>
  )
}

function EntrepreneurRegister({ onBack, onRegister }) {
  const [form, setForm] = useState(initialForm)
  const [showTerms, setShowTerms] = useState(false)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    onRegister({
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      role: 'entrepreneur',
    })
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-[400px] flex-col bg-[#f7f7f7] px-5 py-5">
      <section className="pt-1">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver"
          className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-black shadow-sm"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>

        <div className="mt-5 grid h-12 w-12 place-items-center rounded-2xl bg-black text-white shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
          <BadgeCheck size={25} strokeWidth={2.4} />
        </div>

        <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-orange-500">
          Emprende U
        </p>
        <h1 className="mt-2 text-[30px] font-black uppercase leading-none text-black">
          Registro emprendedor
        </h1>
        <p className="mt-3 text-sm font-medium leading-snug text-zinc-500">
          Crea tu cuenta para empezar a vender dentro de la universidad.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-1 flex-col gap-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-extrabold text-black">
            Nombres
          </span>
          <div className="flex h-[50px] items-center gap-3 rounded-2xl bg-white px-4 shadow-sm">
            <UserRound size={19} className="shrink-0 text-orange-500" />
            <input
              type="text"
              value={form.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
              required
              placeholder="Escribe tus nombres"
              className="min-w-0 flex-1 bg-transparent text-sm font-bold text-black outline-none placeholder:text-zinc-400"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-extrabold text-black">
            Apellidos
          </span>
          <div className="flex h-[50px] items-center gap-3 rounded-2xl bg-white px-4 shadow-sm">
            <UserRound size={19} className="shrink-0 text-orange-500" />
            <input
              type="text"
              value={form.lastName}
              onChange={(event) => updateField('lastName', event.target.value)}
              required
              placeholder="Escribe tus apellidos"
              className="min-w-0 flex-1 bg-transparent text-sm font-bold text-black outline-none placeholder:text-zinc-400"
            />
          </div>
        </label>

        <div className="grid grid-cols-[0.7fr_1.3fr] gap-3">
          <label className="block">
            <span className="mb-1.5 block text-sm font-extrabold text-black">
              Edad
            </span>
            <input
              type="number"
              min="15"
              max="80"
              value={form.age}
              onChange={(event) => updateField('age', event.target.value)}
              required
              placeholder="18"
              className="h-[50px] w-full rounded-2xl bg-white px-4 text-sm font-bold text-black shadow-sm outline-none placeholder:text-zinc-400"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-extrabold text-black">
              Celular
            </span>
            <div className="flex h-[50px] items-center gap-3 rounded-2xl bg-white px-4 shadow-sm">
              <Phone size={18} className="shrink-0 text-orange-500" />
              <input
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                required
                placeholder="999 999 999"
                className="min-w-0 flex-1 bg-transparent text-sm font-bold text-black outline-none placeholder:text-zinc-400"
              />
            </div>
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-extrabold text-black">
            Universidad
          </span>
          <select
            value={form.university}
            onChange={(event) => updateField('university', event.target.value)}
            required
            className="min-h-[50px] w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-snug text-black shadow-sm outline-none"
          >
            {universities.map((university) => (
              <option key={university} value={university}>
                {university}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-extrabold text-black">
            Contraseña
          </span>
          <div className="flex h-[50px] items-center gap-3 rounded-2xl bg-white px-4 shadow-sm">
            <LockKeyhole size={18} className="shrink-0 text-orange-500" />
            <input
              type="password"
              minLength="6"
              value={form.password}
              onChange={(event) => updateField('password', event.target.value)}
              required
              placeholder="Mínimo 6 caracteres"
              className="min-w-0 flex-1 bg-transparent text-sm font-bold text-black outline-none placeholder:text-zinc-400"
            />
          </div>
        </label>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            className="text-left text-sm font-black text-orange-500"
          >
            Leer descripción de la cuenta del emprendedor
          </button>

          <label className="mt-3 flex items-start gap-3">
            <input
              type="checkbox"
              checked={form.acceptedTerms}
              onChange={(event) =>
                updateField('acceptedTerms', event.target.checked)
              }
              required
              className="mt-1 h-4 w-4 accent-orange-500"
            />
            <span className="text-sm font-bold leading-snug text-zinc-600">
              Acepto las condiciones de la cuenta del emprendedor.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!form.acceptedTerms}
          className="mt-auto h-13 rounded-2xl bg-orange-500 py-4 text-sm font-black uppercase text-white shadow-[0_16px_35px_rgba(255,122,26,0.32)] transition active:scale-[0.98] disabled:bg-zinc-300 disabled:text-zinc-500 disabled:shadow-none"
        >
          Registrarme
        </button>
      </form>

      {showTerms ? <TermsModal onClose={() => setShowTerms(false)} /> : null}
    </main>
  )
}

export default EntrepreneurRegister
