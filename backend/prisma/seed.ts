import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Очистити існуючі дані
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  console.log('🗑️  Cleared existing data');

  // Квіз 1: JavaScript Basics
  const quiz1 = await prisma.quiz.create({
    data: {
      title: 'JavaScript Basics Quiz',
      questions: {
        create: [
          {
            type: 'BOOLEAN',
            text: 'Is JavaScript a compiled language?',
            answer: false,
            order: 1,
          },
          {
            type: 'INPUT',
            text: 'What keyword is used to declare a constant in JavaScript?',
            answer: 'const',
            order: 2,
          },
          {
            type: 'CHECKBOX',
            text: 'Which of these are JavaScript frameworks?',
            options: ['React', 'Vue', 'Angular', 'Django', 'Flask'],
            answer: ['React', 'Vue', 'Angular'],
            order: 3,
          },
          {
            type: 'BOOLEAN',
            text: 'Does JavaScript support object-oriented programming?',
            answer: true,
            order: 4,
          },
        ],
      },
    },
  });

  // Квіз 2: Web Development
  const quiz2 = await prisma.quiz.create({
    data: {
      title: 'Web Development Fundamentals',
      questions: {
        create: [
          {
            type: 'CHECKBOX',
            text: 'Which are valid HTTP methods?',
            options: ['GET', 'POST', 'DELETE', 'FETCH', 'RETRIEVE'],
            answer: ['GET', 'POST', 'DELETE'],
            order: 1,
          },
          {
            type: 'BOOLEAN',
            text: 'HTML stands for Hyper Text Markup Language?',
            answer: true,
            order: 2,
          },
          {
            type: 'INPUT',
            text: 'What does CSS stand for?',
            answer: 'Cascading Style Sheets',
            order: 3,
          },
        ],
      },
    },
  });

  // Квіз 3: TypeScript
  const quiz3 = await prisma.quiz.create({
    data: {
      title: 'TypeScript Essentials',
      questions: {
        create: [
          {
            type: 'BOOLEAN',
            text: 'TypeScript is a superset of JavaScript?',
            answer: true,
            order: 1,
          },
          {
            type: 'CHECKBOX',
            text: 'Which are valid TypeScript types?',
            options: ['string', 'number', 'boolean', 'float', 'integer'],
            answer: ['string', 'number', 'boolean'],
            order: 2,
          },
          {
            type: 'INPUT',
            text: 'What command compiles TypeScript to JavaScript?',
            answer: 'tsc',
            order: 3,
          },
          {
            type: 'BOOLEAN',
            text: 'Can TypeScript run directly in the browser?',
            answer: false,
            order: 4,
          },
          {
            type: 'CHECKBOX',
            text: 'Which tools can be used with TypeScript?',
            options: ['Webpack', 'Babel', 'Rollup', 'PHP', 'Ruby'],
            answer: ['Webpack', 'Babel', 'Rollup'],
            order: 5,
          },
        ],
      },
    },
  });

  // Квіз 4: React
  const quiz4 = await prisma.quiz.create({
    data: {
      title: 'React Fundamentals',
      questions: {
        create: [
          {
            type: 'INPUT',
            text: 'What hook is used for managing state in functional components?',
            answer: 'useState',
            order: 1,
          },
          {
            type: 'BOOLEAN',
            text: 'React uses a Virtual DOM?',
            answer: true,
            order: 2,
          },
          {
            type: 'CHECKBOX',
            text: 'Which are React hooks?',
            options: ['useState', 'useEffect', 'useContext', 'useDatabase', 'useAPI'],
            answer: ['useState', 'useEffect', 'useContext'],
            order: 3,
          },
        ],
      },
    },
  });

  // Квіз 5: Node.js
  const quiz5 = await prisma.quiz.create({
    data: {
      title: 'Node.js Backend Development',
      questions: {
        create: [
          {
            type: 'BOOLEAN',
            text: 'Node.js is built on Chrome V8 JavaScript engine?',
            answer: true,
            order: 1,
          },
          {
            type: 'INPUT',
            text: 'What package manager is commonly used with Node.js?',
            answer: 'npm',
            order: 2,
          },
          {
            type: 'CHECKBOX',
            text: 'Which are Node.js frameworks?',
            options: ['Express', 'NestJS', 'Koa', 'Django', 'Laravel'],
            answer: ['Express', 'NestJS', 'Koa'],
            order: 3,
          },
          {
            type: 'BOOLEAN',
            text: 'Node.js is single-threaded?',
            answer: true,
            order: 4,
          },
        ],
      },
    },
  });

  console.log('✅ Created quizzes:', {
    quiz1: quiz1.title,
    quiz2: quiz2.title,
    quiz3: quiz3.title,
    quiz4: quiz4.title,
    quiz5: quiz5.title,
  });

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
