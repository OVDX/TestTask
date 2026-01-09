import { IsEnum, IsString, IsOptional, IsArray, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum QuestionType {
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT',
  CHECKBOX = 'CHECKBOX',
}

export class CreateQuestionDto {
  @ApiProperty({ enum: QuestionType, description: 'Type of question' })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({ description: 'Question text', example: 'What is 2+2?' })
  @IsString()
  text: string;

  @ApiPropertyOptional({
    description: 'Options for checkbox questions',
    type: [String],
    example: ['Option 1', 'Option 2', 'Option 3'],
  })
  @IsOptional()
  @IsArray()
  options?: string[];

  @ApiPropertyOptional({
    description: 'Correct answer(s)',
    example: 'true',
  })
  @IsOptional()
  answer?: boolean | string | string[];

  @ApiProperty({ description: 'Order of the question', example: 1 })
  @IsInt()
  order: number;
}
