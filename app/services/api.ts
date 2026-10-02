const API_URL = 'http://localhost:8080/api'

export interface Clinica {
  id?: number
  nome: string
  telefone?: string
  endereco?: string
}

export interface Tutor {
  id?: number
  nome: string
  telefone?: string
  email?: string
  endereco?: string
}

export interface Pet {
  id?: number
  nome: string
  especie?: string
  raca?: string
  idade?: number
  tutorModel: { 
    id: number
    nome?: string
  }
}

export interface Veterinario {
  id?: number
  nome: string
  crmv: string
  especialidade?: string
  telefone?: string
}

export async function getClinicas(): Promise<Clinica[]> {
  const res = await fetch(`${API_URL}/clinicas`)
  return res.json()
}
export async function createClinica(data: Clinica): Promise<Clinica> {
  const res = await fetch(`${API_URL}/clinicas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
export async function updateClinica(id: number, data: Clinica): Promise<Clinica> {
  const res = await fetch(`${API_URL}/clinicas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
export async function deleteClinica(id: number): Promise<void> {
  await fetch(`${API_URL}/clinicas/${id}`, { method: 'DELETE' })
}

export async function getTutores(): Promise<Tutor[]> {
  const res = await fetch(`${API_URL}/tutores`)
  return res.json()
}
export async function createTutor(data: Tutor): Promise<Tutor> {
  const res = await fetch(`${API_URL}/tutores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
export async function updateTutor(id: number, data: Tutor): Promise<Tutor> {
  const res = await fetch(`${API_URL}/tutores/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
export async function deleteTutor(id: number): Promise<void> {
  await fetch(`${API_URL}/tutores/${id}`, { method: 'DELETE' })
}

export async function getPets(): Promise<Pet[]> {
  const res = await fetch(`${API_URL}/pets`)
  return res.json()
}
export async function createPet(data: Pet): Promise<Pet> {
  const res = await fetch(`${API_URL}/pets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
export async function updatePet(id: number, data: Pet): Promise<Pet> {
  const res = await fetch(`${API_URL}/pets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
export async function deletePet(id: number): Promise<void> {
  await fetch(`${API_URL}/pets/${id}`, { method: 'DELETE' })
}

export async function getVeterinarios(): Promise<Veterinario[]> {
  const res = await fetch(`${API_URL}/veterinarios`)
  return res.json()
}
export async function createVeterinario(data: Veterinario): Promise<Veterinario> {
  const res = await fetch(`${API_URL}/veterinarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
export async function updateVeterinario(id: number, data: Veterinario): Promise<Veterinario> {
  const res = await fetch(`${API_URL}/veterinarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
export async function deleteVeterinario(id: number): Promise<void> {
  await fetch(`${API_URL}/veterinarios/${id}`, { method: 'DELETE' })
}