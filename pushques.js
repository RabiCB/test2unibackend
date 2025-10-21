const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const readAloudQuestions = [
    {
      passage:
        'The rise of artificial intelligence is transforming industries around the world, enabling machines to perform tasks that once required human intelligence.',
      difficulty: 'Medium',
      category: 'Technology',
    },
    {
      passage:
        'Photosynthesis is the process by which green plants convert sunlight into chemical energy, forming the basis of life on Earth.',
      difficulty: 'Easy',
      category: 'Science',
    },
    {
      passage:
        'Economic globalization has connected markets and people more closely than ever before, creating both opportunities and challenges for nations.',
      difficulty: 'Medium',
      category: 'Economics',
    },
    {
      passage:
        'The theory of evolution, proposed by Charles Darwin, explains how species adapt and change over time through natural selection.',
      difficulty: 'Medium',
      category: 'Biology',
    },
    {
      passage:
        'Cloud computing allows users to access data and applications over the internet instead of relying solely on local hardware or servers.',
      difficulty: 'Easy',
      category: 'Technology',
    },
    {
      passage:
        'The Renaissance marked a period of renewed interest in art, science, and literature, leading to profound cultural and intellectual advancements in Europe.',
      difficulty: 'Hard',
      category: 'History',
    },
    {
      passage:
        'In recent years, renewable energy sources like solar and wind have gained popularity as sustainable alternatives to fossil fuels.',
      difficulty: 'Easy',
      category: 'Environment',
    },
    {
      passage:
        'Quantum computing leverages the principles of quantum mechanics to perform calculations far faster than traditional computers.',
      difficulty: 'Hard',
      category: 'Technology',
    },
    {
      passage:
        'Social media platforms have reshaped the way people communicate, share information, and form communities across the globe.',
      difficulty: 'Easy',
      category: 'Communication',
    },
    {
      passage:
        'Climate change poses a significant threat to ecosystems, economies, and human health, demanding urgent global cooperation and policy action.',
      difficulty: 'Hard',
      category: 'Environment',
    },
  ]

  for (const q of readAloudQuestions) {
    await prisma.readAloudQuestion.create({ data: q })
  }

  console.log('✅ Seed data inserted successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
