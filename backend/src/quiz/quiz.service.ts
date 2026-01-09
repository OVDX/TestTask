import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: createQuizDto.title,
        questions: {
          create: createQuizDto.questions.map((q) => ({
            type: q.type,
            text: q.text,
            options: q.options ?? undefined,
            answer: q.answer ?? undefined,
            order: q.order,
          })),
        },
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async findAll() {
    const quizzes = await this.prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz._count.questions,
      createdAt: quiz.createdAt,
    }));
  }

  async findOne(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return quiz;
  }

  async remove(id: string) {
    try {
      await this.prisma.quiz.delete({
        where: { id },
      });
      return { message: 'Quiz deleted successfully' };
    } catch {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
  }
}
