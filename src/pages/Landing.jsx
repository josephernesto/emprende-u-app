import { GraduationCap } from 'lucide-react'

function ActionButton({ children, variant = 'primary', onClick }) {
  const styles =
    variant === 'primary'
      ? 'bg-orange-500 text-white shadow-[0_14px_28px_rgba(255,122,26,0.28)]'
      : 'bg-white text-black shadow-sm'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-11 rounded-2xl text-sm font-black transition active:scale-[0.98] ${styles}`}
    >
      {children}
    </button>
  )
}

function Landing({
  onStudentRegister,
  onStudentLogin,
  onSellerRegister,
  onSellerLogin,
}) {
  return (
    <main className="mx-auto grid h-svh w-full max-w-[400px] grid-rows-[1fr_auto_1fr] overflow-hidden bg-[#f7f7f7] px-5 py-5">
      <section className="flex flex-col justify-end pb-5 text-center">
        <h1 className="text-[29px] font-black uppercase leading-none text-black">
          Soy estudiante
        </h1>
        <p className="mx-auto mt-2 max-w-[260px] text-sm font-semibold leading-snug text-zinc-500">
          Compra comida, bebidas y antojos dentro de tu universidad.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <ActionButton onClick={onStudentRegister}>Registrarme</ActionButton>
          <ActionButton variant="secondary" onClick={onStudentLogin}>
            Iniciar sesión
          </ActionButton>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center py-3">
        <div className="grid h-20 w-20 place-items-center rounded-[26px] bg-black text-white shadow-[0_18px_34px_rgba(0,0,0,0.2)]">
          <GraduationCap size={36} strokeWidth={2.3} />
        </div>
        <p className="mt-3 text-center text-xl font-black uppercase text-orange-500">
          Emprende U
        </p>
      </section>

      <section className="flex flex-col justify-start pt-5 text-center">
        <h2 className="text-[29px] font-black uppercase leading-none text-black">
          ¿Quieres emprender?
        </h2>
        <p className="mx-auto mt-2 max-w-[270px] text-sm font-semibold leading-snug text-zinc-500">
          Vende tus productos a estudiantes de tu campus.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <ActionButton onClick={onSellerRegister}>Registrarme</ActionButton>
          <ActionButton variant="secondary" onClick={onSellerLogin}>
            Iniciar sesión
          </ActionButton>
        </div>
      </section>
    </main>
  )
}

export default Landing
