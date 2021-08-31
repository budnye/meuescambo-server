import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginAuthDto {
  @Field() readonly token: string;
}
