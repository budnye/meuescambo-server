import { InputType, PartialType } from '@nestjs/graphql';
import { inputUser } from './user.input';

@InputType()
export class inputUserUpdate extends PartialType(inputUser) {}
