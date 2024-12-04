import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    UseGuards,
    Req,
    Query,
  } from '@nestjs/common';
  import { ProductService } from "../service/product.service";
  import { JwtGuard } from '../../auth/guard/jwt.guard';
  import { RolesGuard } from '../guard/roles.guard';
  import { Roles } from '../decorator/roles.decorator';
  import { CreateProductDto } from '../dto/product.dto';
  
  @Controller('products')
  @UseGuards(JwtGuard)
  export class ProductController {
    constructor(private productService: ProductService) {}
  
    @Post()
    async createProduct(@Body() dto: CreateProductDto, @Req() req: any) {
      return this.productService.createProduct(dto, req.user.id);
    }
  
    @Get()
    async getAllProducts(
      @Query('page') page = 1,
      @Query('limit') limit = 10,
    ) {
      return this.productService.getAllProducts(Number(page), Number(limit));
    }

  
    @Get(':id')
    async getProductById(@Param('id') productId: string) {
      return this.productService.getProductById(productId);
    }
  
    @Patch(':id')
    async updateProduct(@Param('id') productId: string, @Body() dto: Partial<CreateProductDto>, @Req() req: any) {
      return this.productService.updateProduct(productId, dto, req.user.id);
    }
  
    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles('Admin')
    async deleteProduct(@Param('id') productId: string) {
      return this.productService.deleteProduct(productId);
    }
  }
  