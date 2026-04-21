import { Field, ObjectType, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  category: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;

  @Field()
  status: string;

  @Field()
  lastUpdated: Date;

  @Field()
  createdAt: Date;
}
