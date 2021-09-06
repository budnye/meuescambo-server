import { Field, ObjectType, HideField } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserDto {
  @Field() readonly id?: string;
  @Field() readonly name?: string;
  @Field() readonly email?: string;
  @HideField() readonly password?: string;
}
