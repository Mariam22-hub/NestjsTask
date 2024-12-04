import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from '../service/product.service';
import { ProductController } from '../controller/product.controller';
import { Product, ProductSchema } from '../schema/product.schema';
import { RolesGuard } from '../guard/roles.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService, RolesGuard],
})
export class ProductModule {}
