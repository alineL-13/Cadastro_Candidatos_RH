import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'
import CardCandidato from '../components/cardCandidato.jsx'

const CandidatesList = () => {
  const [candidatos, setCandidatos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCandidatos = async () => {
    try {
      const res = await api.get('/candidatos')
      console.log(res.data)
      setCandidatos(res.data)
    } catch (error) {
      console.log(error)
      toast.error('Falha ao carregar candidatos: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCandidatos()
  }, [])

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 mt-6">

        {loading && (
          <div className="text-center text-secondary py-10">
            Carregando candidatos...
          </div>
        )}

        {!loading && candidatos.length === 0 && (
          <div className="text-center py-10">
            Nenhum candidato encontrado.
          </div>
        )}

        {candidatos.length > 0 && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...candidatos]
              .sort(
                (a, b) =>
                  new Date(b.DataCriacao) - new Date(a.DataCriacao)
              )
              .map(candidato => (
                <CardCandidato
                  key={candidato.ID}
                  candidato={candidato}
                />
              ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default CandidatesList
