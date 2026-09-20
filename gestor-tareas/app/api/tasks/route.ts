// Rutas de la API para crear, leer, editar y borrar tareas
import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

// GET: obtiene todas las tareas de la base de datos
export async function GET() {
  const tareas = await prisma.task.findMany()
  return NextResponse.json(tareas)
}

// POST: recibe datos del navegador y crea una tarea nueva
export async function POST(peticion: Request) {
  const datos = await peticion.json()
  const tarea = await prisma.task.create({
    data: {
      title: datos.title,
      description: datos.description,
      userId: 1
    }
  })
  return NextResponse.json(tarea)
}

// DELETE: recibe el id de una tarea y la borra de la base de datos
export async function DELETE(peticion: Request) {
  const url = new URL(peticion.url)
  const id = parseInt(url.searchParams.get('id') || '0')
  await prisma.task.delete({ where: { id } })
  return NextResponse.json({ exito: true })
}

// PUT: recibe el id y el nuevo estado, y actualiza la tarea
export async function PUT(peticion: Request) {
  const datos = await peticion.json()
  const tarea = await prisma.task.update({
    where: { id: datos.id },
    data: { completed: datos.completed }
  })
  return NextResponse.json(tarea)
}
