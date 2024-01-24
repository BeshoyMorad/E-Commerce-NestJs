import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Title can not be empty' })
  @IsString({ message: 'Title must be a string' })
  readonly title: string;

  @IsNotEmpty({ message: 'Description can not be empty' })
  @IsString({ message: 'Description must be a string' })
  readonly description: string;

  @IsNotEmpty({ message: 'Price can not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with max 2 decimal places' },
  )
  @IsPositive({ message: 'Price must be a positive number' })
  readonly price: number;

  @IsNotEmpty({ message: 'Stock can not be empty' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock can not be less than 0' })
  readonly stock: number;

  @IsNotEmpty({ message: 'Images can not be empty' })
  @IsArray({ message: 'Images should be an array of strings' })
  readonly images: string[];

  @IsNotEmpty({ message: 'Category can not be empty' })
  @IsNumber({}, { message: 'Category must be a number' })
  categoryId: number;
}
