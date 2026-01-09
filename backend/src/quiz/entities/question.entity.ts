import { ApiProperty } from '@nestjs/swagger';

export enum QuestionType {
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT',
  CHECKBOX = 'CHECKBOX',
}

export class QuestionEntity {
  @ApiProperty({
    description: 'Question ID (UUID)',
    example: 'q1w2e3r4-t5y6-u7i8-o9p0-qwertyuiop12',
  })
  id: string;

  @ApiProperty({
    enum: QuestionType,
    description: 'Type of question',
    example: 'BOOLEAN',
  })
  type: QuestionType;

  @ApiProperty({ description: 'Question text', example: 'Is JavaScript a compiled language?' })
  text: string;

  @ApiProperty({
    description: 'Options for checkbox questions',
    type: [String],
    required: false,
    example: ['React', 'Vue', 'Angular'],
    nullable: true,
  })
  options?: string[] | null;

  @ApiProperty({
    description: 'Correct answer(s)',
    required: false,
    example: false,
    nullable: true,
  })
  answer?: any;

  @ApiProperty({ description: 'Question order in the quiz', example: 1 })
  order: number;

  @ApiProperty({ description: 'Quiz ID this question belongs to' })
  quizId: string;
}
