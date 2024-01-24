import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Title can not be empty' })
  @IsString({ message: 'Title must be a string' })
  readonly title: string;

  @IsNotEmpty({ message: 'Description can not be empty' })
  @IsString({ message: 'Description must be a string' })
  readonly description: string;
}
