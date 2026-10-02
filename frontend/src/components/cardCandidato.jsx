import React from 'react'
import { formatDate } from '../lib/utils.js'
import { Link } from 'react-router-dom'

const CardCandidato = ({ candidato }) => {
  return (
    <Link to={`/candidato/${candidato.ID}`} className="card bg-base-200/50 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-secondary">
        <div className="card-body">
            <h3 className="card-title text-base-content">{candidato.NomeCompleto}</h3>
            <p className="text-base-content/70 line-clamp-3">{candidato.Email} | {candidato.Telefone || 'N/A'}</p>
            <p className="text-base-content/70 line-clamp-3">{candidato.CargoDesejado}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/50">
                    {formatDate(new Date(candidato.DataCriacao))}
                </span>
            </div>
        </div>
    </Link>
  )
}

export default CardCandidato