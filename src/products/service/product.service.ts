import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schema/product.schema';
import { CreateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async createProduct(dto: CreateProductDto, userId: string): Promise<Product> {
    const product = new this.productModel({ ...dto, createdBy: userId });
    return product.save();
  }

  async getAllProducts(page: number, limit: number): Promise<Product[]> {
    return this.productModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }
  
  async getProductById(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(productId: string, dto: Partial<CreateProductDto>, userId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (product.createdBy !== userId) {
      throw new ForbiddenException('You are not authorized to update this product');
    }
    Object.assign(product, dto);
    return product.save();
  }

  async deleteProduct(productId: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(productId).exec();
    if (!result) {
      throw new NotFoundException('Product not found');
    }
  }
}
