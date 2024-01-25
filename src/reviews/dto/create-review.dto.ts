import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Product id can not be empty' })
  @IsNumber({}, { message: 'Product id must be a number' })
  readonly productId: number;

  @IsNotEmpty({ message: 'Ratings can not be empty' })
  @IsNumber({}, { message: 'Ratings must be a number' })
  readonly ratings: number;

  @IsNotEmpty({ message: 'Comment can not be empty' })
  @IsString({ message: 'Comment must be a string' })
  readonly comment: string;
}
