import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/axios";
import { formatDate } from "../lib/utils";

function CandidateDetails() {
  const { id } = useParams();

  const [candidato, setCandidato] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function buscarCandidato() {
      try {
        const response = await api.get(`/candidatos/${id}`);
        setCandidato(response.data);
      } catch (error) {
        setError("Não foi possível carregar os dados do candidato.");
      } finally {
        setLoading(false);
      }
    }

    buscarCandidato();
  }, [id]);

  if (loading) {
    return <p className="text-center text-secondary py-10">Carregando candidato...</p>;
  }

  if (error) {
    return <p className="text-center text-secondary py-10">{error}</p>;
  }

  if (!candidato) return null;

  return (
    <div className="max-w-4xl min-h-3xl mt-10 mx-auto card bg-base-200/50 border border-base-content/20 shadow-md">
        <div className="card-body gap-6">
          <div>
            <h1 className="text-xl font-bold">
              {candidato.NomeCompleto}
            </h1>

            <p className="text-base-content/60 mt-1">
              Candidato cadastrado em{" "}
              {formatDate(new Date(candidato.DataCriacao))}
            </p>
          </div>

          <div className="divider my-0" />

          <section>
            <h2 className="text-lg font-semibold mb-4">
              Informações pessoais
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-base-content/60">Cargo desejado</p>
                <p>{candidato.CargoDesejado || "Não informado"}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/60">E-mail</p>
                <p>{candidato.Email}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/60">Telefone</p>
                <p>{candidato.Telefone || "Não informado"}</p>
              </div>
            </div>
          </section>

          <div className="divider my-0" />

          <section>
            <h2 className="text-lg font-semibold mb-3">
              Resumo profissional
            </h2>

            <p className="whitespace-pre-wrap">
              {candidato.ResumoProfissional || "Não informado"}
            </p>
          </section>
        </div>
      </div>
  );
}

export default CandidateDetails;