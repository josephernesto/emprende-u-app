import { ArrowLeft, GraduationCap, LockKeyhole, Phone, UserRound } from 'lucide-react'
import { useState } from 'react'
import { universities } from '../data/mockData'

const initialForm = {
  firstName: '',
  lastName: '',
  age: '',
  phone: '',
  password: '',
  university: universities[0],
}

function StudentRegister({ onBack, onRegister }) {
  const [form, setForm] = useState(initialForm)

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

        <div className="mt-4 grid h-12 w-12 place-items-center rounded-2xl bg-orange-500 text-white shadow-[0_14px_30px_rgba(255,122,26,0.28)]">
          <GraduationCap size={25} strokeWidth={2.4} />
        </div>

        <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-orange-500">
          Emprende U
        </p>
        <h1 className="mt-2 text-[30px] font-black uppercase leading-none text-black">
          Regístrate como estudiante
        </h1>
      </section>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-1 flex-col gap-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-extrabold text-black">
            Nombre
          </span>
          <div className="flex h-13 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <UserRound size={19} className="shrink-0 text-orange-500" />
            <input
              type="text"
              value={form.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
              required
              placeholder="Escribe tu nombre"
              className="min-w-0 flex-1 bg-transparent text-sm font-bold text-black outline-none placeholder:text-zinc-400"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-extrabold text-black">
            Apellidos
          </span>
          <div className="flex h-13 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
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
              Teléfono
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

        <button
          type="submit"
          className="mt-auto h-13 rounded-2xl bg-orange-500 py-4 text-sm font-black uppercase text-white shadow-[0_16px_35px_rgba(255,122,26,0.32)] transition active:scale-[0.98]"
        >
          Registrarme
        </button>
      </form>
    </main>
  )
}

export default StudentRegister
