// Página principal: formulario para agregar tareas y lista para verlas
'use client'
import { useState, useEffect } from 'react'

// Define qué datos tiene cada tarea
interface Tarea {
  id: number
  title: string
  description: string | null
  completed: boolean
}

export default function PaginaPrincipal() {
  // Guarda la lista de tareas
  const [listaTareas, setListaTareas] = useState<Tarea[]>([])
  // Guarda lo que el usuario escribe en el input
  const [textoTarea, setTextoTarea] = useState('')

  // Cuando la página carga, pide las tareas a la API
  useEffect(() => {
    fetch('/api/tasks')
      .then(respuesta => respuesta.json())
      .then(datos => setListaTareas(datos))
  }, [])

  // Agrega una tarea nueva
  const agregarTarea = async () => {
    if (!textoTarea) return
    const respuesta = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: textoTarea })
    })
    const tareaNueva = await respuesta.json()
    setListaTareas([...listaTareas, tareaNueva])
    setTextoTarea('')
  }

  // Marca una tarea como completada o pendiente
  const marcarTarea = async (id: number, completada: boolean) => {
    await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed: !completada })
    })
    setListaTareas(listaTareas.map(tarea =>
      tarea.id === id ? { ...tarea, completed: !completada } : tarea
    ))
  }

  // Borra una tarea
  const borrarTarea = async (id: number) => {
    await fetch(`/api/tasks?id=${id}`, { method: 'DELETE' })
    setListaTareas(listaTareas.filter(tarea => tarea.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Taskly - Gestor de Tareas</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={textoTarea}
            onChange={(e) => setTextoTarea(e.target.value)}
            placeholder="Nueva tarea..."
            className="border p-2 flex-1 rounded"
          />
          <button
            onClick={agregarTarea}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Agregar
          </button>
        </div>

        <ul>
          {listaTareas.map(tarea => (
            <li key={tarea.id} className="flex items-center gap-2 border-b py-2">
              <input
                type="checkbox"
                checked={tarea.completed}
                onChange={() => marcarTarea(tarea.id, tarea.completed)}
              />
              <span className={tarea.completed ? 'line-through text-gray-400' : ''}>
                {tarea.title}
              </span>
              <button
                onClick={() => borrarTarea(tarea.id)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
