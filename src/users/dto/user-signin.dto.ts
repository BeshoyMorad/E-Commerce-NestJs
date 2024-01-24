import { OmitType } from '@nestjs/mapped-types';
import { UserSignUpDto } from './user-signup.dto';

export class UserSigInDto extends OmitType(UserSignUpDto, ['name']) {}
