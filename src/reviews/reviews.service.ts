import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
// import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private productsService: ProductsService,
  ) {}

  private async findOneByUserAndProduct(
    userId: number,
    productId: number,
  ): Promise<Review> {
    return await this.reviewRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
      relations: { user: true, product: { category: true } },
    });
  }

  async create(createReviewDto: CreateReviewDto, user: User) {
    const product = await this.productsService.findOne(
      createReviewDto.productId,
    );

    let review = await this.findOneByUserAndProduct(
      user.id,
      createReviewDto.productId,
    );
    if (!review) {
      review = this.reviewRepository.create({
        ...createReviewDto,
        user,
        product,
      });
    } else {
      review.ratings = createReviewDto.ratings;
      review.comment = createReviewDto.comment;
    }

    return this.reviewRepository.save(review);
  }

  findAll() {
    return this.reviewRepository.find({
      relations: { user: true, product: { category: true } },
    });
  }

  async findAllByProduct(id: number) {
    const product = await this.productsService.findOne(id);

    return await this.reviewRepository.find({
      where: { product: { id: product.id } },
      relations: { user: true, product: { category: true } },
    });
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: { user: true, product: { category: true } },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  // update(id: number, updateReviewDto: UpdateReviewDto) {
  //   return `This action updates a #${id} review`;
  // }

  async remove(id: number) {
    const review = await this.findOne(id);
    return this.reviewRepository.remove(review);
  }
}
