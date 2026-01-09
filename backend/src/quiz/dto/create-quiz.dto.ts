import { IsString, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionDto } from './question.dto';

export class CreateQuizDto {
  @ApiProperty({
    description: 'Quiz title',
    example: 'JavaScript Basics Quiz',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Array of questions',
    type: [CreateQuestionDto],
    example: [
      {
        type: 'BOOLEAN',
        text: 'Is JavaScript a compiled language?',
        answer: false,
        order: 1,
      },
      {
        type: 'CHECKBOX',
        text: 'Which are JavaScript frameworks?',
        options: ['React', 'Vue', 'Angular', 'Django'],
        answer: ['React', 'Vue', 'Angular'],
        order: 2,
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
