import React from 'react'
import { useParams } from 'react-router-dom'
import AppLayout from '../../layouts/AppLayout'
// Local animals data (moved from src/api/mockData.js)
const animals = [
  { id:1, name: 'Milo', breed: 'Chien', description: 'Joueur et affectueux' },
  { id:2, name: 'Luna', breed: 'Chat', description: 'Calme et câline' },
  { id:3, name: 'Coco', breed: 'Oiseau', description: 'Plein d’énergie' }
]

export default function AnimalDetails(){
  const { id } = useParams()
  const animal = animals.find(a=> String(a.id) === String(id))
  if(!animal) return <AppLayout><div>Demande non trouvée</div></AppLayout>
  return (
    <AppLayout>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-4 rounded shadow">Photo</div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">{animal.name}</h3>
          <p className="text-sm text-gray-600">{animal.description}</p>
          <div className="mt-4"><button className="bg-green-500 text-white px-4 py-2 rounded">Envoyer une demande</button></div>
        </div>
      </div>
    </AppLayout>
  )
}
