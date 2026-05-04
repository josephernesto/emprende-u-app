import { ArrowLeft, LockKeyhole, Network } from 'lucide-react'
import { useState } from 'react'

const initialForm = {
  accessIp: '',
  password: '',
}

function EntrepreneurLogin({ onBack, onLogin, onCreateAccount }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const success = onLogin(form)

    if (!success) {
      setError('IP o contraseña incorrectas.')
    }
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-[400px] flex-col bg-[#f7f7f7] px-5 py-6">
      <button
        type="button"
        onClick={onBack}
        aria-label="Volver"
        className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-black shadow-sm"
      >
        <ArrowLeft size={21} strokeWidth={2.5} />
      </button>

      <section className="flex flex-1 flex-col justify-center">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
          Emprende U
        </p>
        <h1 className="mt-3 text-[34px] font-black uppercase leading-none text-black">
          Acceso emprendedor
        </h1>
        <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-500">
          Ingresa la IP registrada y tu contraseña para administrar tu cuenta.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="block">
            <span className="mb-2 block text-sm font-extrabold text-black">
              IP registrada
            </span>
            <div className="flex h-14 items-center gap-3 rounded-2xl bg-white px-4 shadow-sm">
              <Network size={20} className="shrink-0 text-orange-500" />
              <input
                type="text"
                value={form.accessIp}
                onChange={(event) => updateField('accessIp', event.target.value)}
                required
                placeholder="Ej. 192.168.1.10"
                className="min-w-0 flex-1 bg-transparent text-sm font-bold text-black outline-none placeholder:text-zinc-400"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-extrabold text-black">
              Contraseña
            </span>
            <div className="flex h-14 items-center gap-3 rounded-2xl bg-white px-4 shadow-sm">
              <LockKeyhole size={20} className="shrink-0 text-orange-500" />
              <input
                type="password"
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                required
                placeholder="Escribe tu contraseña"
                className="min-w-0 flex-1 bg-transparent text-sm font-bold text-black outline-none placeholder:text-zinc-400"
              />
            </div>
          </label>

          {error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="h-14 rounded-2xl bg-orange-500 text-sm font-black uppercase text-white shadow-[0_16px_35px_rgba(255,122,26,0.32)] transition active:scale-[0.98]"
          >
            Entrar
          </button>
        </form>

        <button
          type="button"
          onClick={onCreateAccount}
          className="mt-5 text-sm font-black text-orange-500"
        >
          Crear cuenta emprendedora
        </button>
      </section>
    </main>
  )
}

export default EntrepreneurLogin
