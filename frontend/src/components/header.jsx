import React from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-base-200 border-b border-base-300 py-2">
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
                <Link to={"/"}>
                    <h1 className="text-3xl font-bold text-secondary font-mono tracking-tight">TalentHub</h1>
                </Link>
                <div className="flex items-center gap-4">
                    <Link to={"/create"} className="btn btn-primary">
                        <PlusIcon className="size-5" />
                        <span>Adicionar Candidato</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header