
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios.js";
import { useNavigate } from "react-router";
import { Trash } from "lucide-react";

const CreatePage = () => {
  const [NomeCompleto, setNomeCompleto] = useState("");
  const [Email, setEmail] = useState("");
  const [Telefone, setTelefone] = useState("");
  const [CargoDesejado, setCargoDesejado] = useState("");
  const [ResumoProfissional, setResumoProfissional] = useState("");
  const [anexo, setAnexo] = useState(null);
  const [loadingFormulario, setLoadingFormulario] = useState(false);
  const [loadingAnexo, setLoadingAnexo] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!NomeCompleto.trim() || !Email.trim()) {
      toast.error("Nome e e-mail são obrigatórios.");
      return;
    }

    setLoadingFormulario(true);

    try {
      await api.post("/candidatos", {
        NomeCompleto: NomeCompleto.trim(),
        Email: Email.trim(),
        Telefone: Telefone.trim() || null,
        CargoDesejado: CargoDesejado.trim() || null,
        ResumoProfissional: ResumoProfissional.trim() || null,
      });

      toast.success("Candidato criado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Erro ao criar candidato."
      );
    } finally {
      setLoadingFormulario(false);
    }
  };

  const handleAnalyzeAttachment = async () => {
    if (!anexo) {
      toast.error("Selecione um arquivo PDF primeiro.");
      return;
    }

    setLoadingAnexo(true);

    try {
      console.log("1. Iniciando análise");

      const formData = new FormData();
      formData.append("arquivo", anexo);

      console.log("2. Enviando requisição para o backend");

      const response = await api.post("/pdf/analisar", formData);

      console.log("3. Resposta recebida:", response.data);
      
      setNomeCompleto(response.data.NomeCompleto || "");
      setEmail(response.data.Email || "");
      setTelefone(response.data.Telefone || "");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erro ao analisar o PDF."
      );
    } finally {
      setLoadingAnexo(false);
    }
  };

  const handleRemoveAttachment = () => {
    setAnexo(null);
    document.getElementById("anexo").value = "";
};

  return (
    <main className="w-full max-w-6xl mx-auto px-4 pt-4 md:px-6">
      <div className="card bg-base-200/50 border border-base-300 shadow-md">
        <div className="card-body p-5 md:p-6">
          <h1 className="text-2xl font-bold">
            Cadastrar candidato
          </h1>

          <p className="text-base-content/60 text-sm mb-2">
            Preencha os dados ou selecione um currículo para análise.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Anexo */}
            <section className="rounded-lg border border-base-300 p-4">
            <h2 className="font-semibold mb-3">
                Currículo em PDF
            </h2>

            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <input
                id="anexo"
                type="file"
                accept=".pdf"
                className="file-input file-input-bordered w-full lg:flex-1"
                onChange={(e) => {
                    const arquivo = e.target.files?.[0] || null;
                    
                    if (arquivo.size > 5 * 1024 * 1024) {
                        toast.error("O arquivo deve ter no máximo 5 MB.");
                        setAnexo(null);
                        e.target.value = "";
                        return;
                    }

                    setAnexo(arquivo);
                }}
                />

                <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={handleRemoveAttachment}
                    disabled={!anexo}
                >
                    <Trash className={`size-5 ${!anexo ? "text-gray-400" : "text-gray-700"}`} />
                </button>

                <button
                type="button"
                className="btn btn-outline btn-secondary"
                onClick={handleAnalyzeAttachment}
                disabled={!anexo || loadingAnexo}>
                {loadingAnexo ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Analisando...
                  </>
                ) : (
                  "Analisar anexo"
                )}
                </button>
            </div>
            </section>

            {/* Nome e e-mail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label" htmlFor="nome">
                  <span className="label-text font-medium">
                    Nome completo *
                  </span>
                </label>

                <input
                  id="nome"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Nome completo"
                  value={NomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                  maxLength={200}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text font-medium">
                    E-mail *
                  </span>
                </label>

                <input
                  id="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="candidato@email.com"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={254}
                  required
                />
              </div>
            </div>

            {/* Telefone e cargo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label" htmlFor="telefone">
                  <span className="label-text font-medium">
                    Telefone
                  </span>
                </label>

                <input
                  id="telefone"
                  type="tel"
                  className="input input-bordered w-full"
                  placeholder="(41) 99999-9999"
                  value={Telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  maxLength={30}
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="cargo">
                  <span className="label-text font-medium">
                    Cargo desejado
                  </span>
                </label>

                <input
                  id="cargo"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Ex.: Desenvolvedor Full Stack"
                  value={CargoDesejado}
                  onChange={(e) => setCargoDesejado(e.target.value)}
                  maxLength={150}
                />
              </div>
            </div>

            {/* Resumo profissional */}
            <div className="form-control">
              <label className="label" htmlFor="resumo">
                <span className="label-text font-medium">
                  Resumo profissional
                </span>
              </label>

              <textarea
                id="resumo"
                className="textarea textarea-bordered w-full min-h-24"
                placeholder="Experiência, habilidades e qualificações..."
                value={ResumoProfissional}
                onChange={(e) => setResumoProfissional(e.target.value)}
              />
            </div>

            {/* Botão de cadastro */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto"
                disabled={loadingFormulario}
              >
                {loadingFormulario ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Cadastrando...
                  </>
                ) : (
                  "Cadastrar candidato"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreatePage;