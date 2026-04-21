import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  createProduct(
    @Args('name') name: string,
    @Args('category') category: string,
    @Args('quantity', { type: () => Int }) quantity: number,
    @Args('unitPrice', { type: () => Float }) unitPrice: number,
    @Args('status') status: string,
  ) {
    return this.productService.create({ name, category, quantity, unitPrice, status });
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('id') id: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('category', { nullable: true }) category?: string,
    @Args('quantity', { type: () => Int, nullable: true }) quantity?: number,
    @Args('unitPrice', { type: () => Float, nullable: true }) unitPrice?: number,
    @Args('status', { nullable: true }) status?: string,
  ) {
    return this.productService.update(id, { name, category, quantity, unitPrice, status });
  }

  @Mutation(() => Product)
  removeProduct(@Args('id') id: string) {
    return this.productService.remove(id);
  }
}
