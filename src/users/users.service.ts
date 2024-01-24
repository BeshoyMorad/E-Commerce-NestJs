import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSigInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async signup(userSignUpDto: UserSignUpDto): Promise<User> {
    const userExists = await this.findUserByEmail(userSignUpDto.email);

    if (userExists) {
      throw new BadRequestException('Email already exists');
    }

    const newPassword = await hash(userSignUpDto.password, 10);

    let newUser = this.userRepository.create({
      ...userSignUpDto,
      password: newPassword,
    });

    newUser = await this.userRepository.save(newUser);
    delete newUser.password;

    return newUser;
  }

  async signin(userSignInDto: UserSigInDto) {
    const userExists = await this.userRepository
      .createQueryBuilder('user')
      .addSelect(['user.password'])
      .where('user.email = :email', { email: userSignInDto.email })
      .getOne();

    if (!userExists) {
      throw new BadRequestException('Wrong email or password');
    }

    const matchPasswords = await compare(
      userSignInDto.password,
      userExists.password,
    );

    if (!matchPasswords) {
      throw new BadRequestException('Wrong email or password');
    }

    delete userExists.password;
    return userExists;
  }

  accessToken(user: User): string {
    return sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE_TIME },
    );
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
