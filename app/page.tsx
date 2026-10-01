"use client"

import { useEffect, useState } from "react";
import { createClinica, getClinicas, Clinica, getTutores, getPets, getVeterinarios, createTutor, createPet, createVeterinario, Tutor, Pet, Veterinario, updateClinica, updateTutor } from "./services/api";

export default function Home(){
  const [abaAtiva,setAbaAtiva] = useState("clinicas")
  const [editandoId,setEditandoId] = useState<number | null>(null)
  const [clinicas,setClinicas] = useState<Clinica[]>([])
  const [tutores,setTutores] = useState<Tutor[]>([])
  const [pets,setPets] = useState<Pet[]>([])
  const [veterinarios,setVeterinarios] = useState<Veterinario[]>([])

  const [formClinica,setFormClinica] = useState({
    nome:"",
    telefone:"",
    endereco:""
  })

  const [formTutor,setFormTutor] = useState({
    nome:"",
    telefone:"",
    email:"",
    endereco:""
  })

  const [formPet,setFormPet] = useState({
    nome:"",
    especie:"",
    raca:"",
    tutorId:""
  })

  const [formVet,setFormVet] = useState({
    nome:"",
    crmv:"",
    telefone:""
  })

  useEffect(()=>{
    carregarDados()
  },[abaAtiva])

  async function carregarDados() {
    try{
      if(abaAtiva === "clinicas")setClinicas(await getClinicas())
      if(abaAtiva === "tutores")setClinicas(await getTutores())
      if(abaAtiva === "pets"){
        setPets(await getPets())
        setTutores(await getTutores())
      }
      if(abaAtiva === "veterinarios")setVeterinarios(await getVeterinarios())
    } catch(error){
      console.error(error)
    }
  }

  function limparFormularios(){
    setEditandoId(null)
    setFormClinica({nome:"", telefone:"", endereco:""})
    setFormTutor({nome:"", telefone:"", email:"", endereco:""})
    setFormPet({nome:"", especie:"", raca:"", tutorId:""})
    setFormVet({nome:"", crmv:"", telefone:""})
  }

  async function handleClinicaSubmit(e:any) {
    e.preventDefault()
    if (editandoId) {
      await updateClinica(editandoId, formClinica)
    } else {
      await createClinica(formClinica)
    }
    limparFormularios()
    carregarDados()
  }

  async function handleTutorSubmit(e:any) {
    e.preventDefault()
    if (editandoId) {
      await updateTutor(editandoId, formTutor)
    } else {
      await createTutor(formTutor)
    }
    limparFormularios()
    carregarDados()
  }

  async function handlePetSubmit(e:any) {
    e.preventDefault()
    const payload = {
      nome: formPet.nome,
      especie: formPet.especie,
      raca: formPet.raca,
      tutorModel: {id: Number(formPet.tutorId)}
    }
    try {
      await createPet(payload)
      setFormPet({
      nome:"",
      especie:"",
      raca:"",
      tutorId:""
      })
      carregarDados()
    } catch (error) {
      console.error("Erro ao salvar pet:",error)
    }
  }

  async function handleVetSubmit(e:any) {
    e.preventDefault()
    await createVeterinario(formVet)
    setFormVet({
      nome:"",
      crmv:"",
      telefone:""
    })
    carregarDados()
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-blue-600">CliniPet Manager</h1>
          <p className="text-slate-500">Sistema de Gestão para Rede Veterinária</p>
        </header>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {['clinicas', 'tutores', 'pets', 'veterinarios'].map((aba) => (
            <button
              key={aba}
              onClick={() => setAbaAtiva(aba)}
              className={`px-5 py-2.5 rounded-lg font-medium capitalize transition-all shadow-sm ${
                abaAtiva === aba
                  ? 'bg-blue-600 text-white shadow-blue-200'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {aba}
            </button>
          ))}
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div>
            <h2 className="text-xl font-bold mb-4 capitalize text-slate-700">Cadastrar Novo {abaAtiva.slice(0, -1)}</h2>

            {abaAtiva === 'clinicas' && (
              <form onSubmit={handleClinicaSubmit} className="space-y-4">
                <input type="text" placeholder="Nome da Clínica" value={formClinica.nome} onChange={e => setFormClinica({...formClinica, nome: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                <input type="text" placeholder="Telefone" value={formClinica.telefone} onChange={e => setFormClinica({...formClinica, telefone: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="text" placeholder="Endereço" value={formClinica.endereco} onChange={e => setFormClinica({...formClinica, endereco: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Salvar Clínica</button>
              </form>
            )}

            {abaAtiva === 'tutores' && (
              <form onSubmit={handleTutorSubmit} className="space-y-4">
                <input type="text" placeholder="Nome do Tutor" value={formTutor.nome} onChange={e => setFormTutor({...formTutor, nome: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                <input type="text" placeholder="Telefone" value={formTutor.telefone} onChange={e => setFormTutor({...formTutor, telefone: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="email" placeholder="E-mail" value={formTutor.email} onChange={e => setFormTutor({...formTutor, email: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="text" placeholder="Endereço" value={formTutor.endereco} onChange={e => setFormTutor({...formTutor, endereco: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Salvar Tutor</button>
              </form>
            )}

            {abaAtiva === 'pets' && (
              <form onSubmit={handlePetSubmit} className="space-y-4">
                <input type="text" placeholder="Nome do Pet" value={formPet.nome} onChange={e => setFormPet({...formPet, nome: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                <input type="text" placeholder="Espécie (ex: Cachorro, Gato)" value={formPet.especie} onChange={e => setFormPet({...formPet, especie: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="text" placeholder="Raça" value={formPet.raca} onChange={e => setFormPet({...formPet, raca: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <select value={formPet.tutorId} onChange={e => setFormPet({...formPet, tutorId: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white" required>
                  <option value="">Selecione o Tutor</option>
                  {tutores.map(t => (
                    <option key={t.id} value={t.id}>{t.nome}</option>
                  ))}
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Salvar Pet</button>
              </form>
            )}

            {abaAtiva === 'veterinarios' && (
              <form onSubmit={handleVetSubmit} className="space-y-4">
                <input type="text" placeholder="Nome do Veterinário" value={formVet.nome} onChange={e => setFormVet({...formVet, nome: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                <input type="text" placeholder="CRMV" value={formVet.crmv} onChange={e => setFormVet({...formVet, crmv: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                <input type="text" placeholder="Telefone" value={formVet.telefone} onChange={e => setFormVet({...formVet, telefone: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Salvar Veterinário</button>
              </form>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-slate-700 capitalize">Lista de {abaAtiva}</h2>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              
              {abaAtiva === 'clinicas' && clinicas.map(c => (
                <div key={c.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <h3 className="font-bold text-slate-800">{c.nome}</h3>
                  <p className="text-sm text-slate-500">Tel: {c.telefone || 'N/A'}</p>
                  <p className="text-sm text-slate-500">End: {c.endereco || 'N/A'}</p>
                </div>
              ))}

              {abaAtiva === 'tutores' && tutores.map(t => (
                <div key={t.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <h3 className="font-bold text-slate-800">{t.nome}</h3>
                  <p className="text-sm text-slate-500">Email: {t.email || 'N/A'}</p>
                  <p className="text-sm text-slate-500">Tel: {t.telefone || 'N/A'}</p>
                </div>
              ))}

              {abaAtiva === 'pets' && pets.map(p => (
                <div key={p.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <h3 className="font-bold text-slate-800">{p.nome} <span className="text-xs font-normal bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{p.especie}</span></h3>
                  <p className="text-sm text-slate-500">Tutor: {p.tutorModel?.nome || 'Desconhecido'}</p>
                </div>
              ))}

              {abaAtiva === 'veterinarios' && veterinarios.map(v => (
                <div key={v.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <h3 className="font-bold text-slate-800">{v.nome}</h3>
                  <p className="text-sm text-blue-600 font-medium">CRMV: {v.crmv}</p>
                </div>
              ))}

              {((abaAtiva === 'clinicas' && clinicas.length === 0) ||
                (abaAtiva === 'tutores' && tutores.length === 0) ||
                (abaAtiva === 'pets' && pets.length === 0) ||
                (abaAtiva === 'veterinarios' && veterinarios.length === 0)) && (
                <p className="text-slate-400 text-center py-8">Nenhum registro encontrado.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}