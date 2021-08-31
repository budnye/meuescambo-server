import { Field, ObjectType, HideField } from '@nestjs/graphql';

@ObjectType()
export class CreateUserDto {
  @Field() readonly id?: string;
  @Field() readonly name: string;
  @Field() readonly email: string;
  @HideField() readonly password: string;
}
