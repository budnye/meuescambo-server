import { Optional } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class inputProductUpdate {
  @Field()
  readonly id: string;

  @Field({ nullable: true })
  @Optional()
  readonly name: string;

  @Field({ nullable: true })
  @Optional()
  readonly description?: string;

  @Field({ nullable: true })
  @Optional()
  readonly image_url?: string;

  @Field(() => [String], { nullable: true })
  @Optional()
  readonly categories?: string[];
}
