import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const count = await prisma.service.count()

  if (count > 0) {
    console.log('Services already seeded.')
    return
  }

  await prisma.service.createMany({
    data: [
      {
        name: 'Classic Haircut',
        description: 'Clean, sharp haircut with a polished finish.',
        durationMinutes: 45,
        price: 80
      },
      {
        name: 'Skin Fade',
        description: 'Detailed fade service with premium blending and shape-up.',
        durationMinutes: 60,
        price: 100
      },
      {
        name: 'Haircut + Beard',
        description: 'Complete grooming package with beard shaping and line-up.',
        durationMinutes: 75,
        price: 130
      }
    ]
  })

  console.log('Seeded services.')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
