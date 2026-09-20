// Conecta la app con la base de datos usando Prisma
import { PrismaClient } from '@prisma/client'

// Evita crear múltiples conexiones en desarrollo
const paraDesarrollo = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Reutiliza la conexión si ya existe
export const prisma = paraDesarrollo.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') paraDesarrollo.prisma = prisma
