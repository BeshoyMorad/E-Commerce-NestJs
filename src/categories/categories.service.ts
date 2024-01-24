import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto, user: User) {
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      addedBy: user,
    });
    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { addedBy: true },
      select: {
        addedBy: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    if (!category) {
      throw new NotFoundException("Category doesn't exist");
    }

    return category;
  }

  async update(id: number, updateCategoryDto: Partial<UpdateCategoryDto>) {
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });

    if (!category) {
      throw new NotFoundException("Category doesn't exist");
    }

    return this.categoryRepository.save(category);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
