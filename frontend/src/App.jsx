import { Rocket } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">
            <Rocket />
            Meu projeto
          </h1>

          <p>React + Vite + Tailwind + DaisyUI + Lucide</p>

          <button className="btn btn-primary">
            Começar
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
