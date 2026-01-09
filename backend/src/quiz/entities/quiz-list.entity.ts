import { ApiProperty } from '@nestjs/swagger';

export class QuizListEntity {
  @ApiProperty({ description: 'Quiz ID (UUID)', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ description: 'Quiz title', example: 'JavaScript Basics Quiz' })
  title: string;

  @ApiProperty({ description: 'Number of questions in the quiz', example: 5 })
  questionCount: number;

  @ApiProperty({ description: 'Creation date', example: '2025-01-09T10:30:00.000Z' })
  createdAt: Date;
}
