import { setIdioma } from './actions'
import { IDIOMAS } from '@/lib/types'

export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="font-display text-2xl font-bold">Bem-vindo!</h1>
      <p className="mt-2 max-w-sm text-gray-400">
        Em qual idioma você quer receber o feedback do seu coach?
      </p>

      <form action={setIdioma} className="mt-8 w-full max-w-xs space-y-3">
        {IDIOMAS.map((idioma) => (
          <button
            key={idioma.value}
            type="submit"
            name="idioma"
            value={idioma.value}
            className="btn-secondary w-full"
          >
            {idioma.label}
          </button>
        ))}
      </form>
    </div>
  )
}
