import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schemas';
import { CreateProductDTO } from './dto/create-product.dto';
import { FilterProductDTO } from './dto/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getFilteredProducts(
    filterProductDTO: FilterProductDTO,
  ): Promise<Product[]> {
    const { category, search } = filterProductDTO;
    let products = await this.getAllProducts();

    if (search) {
      products = products.filter(
        (product) =>
          product.name.includes(search) || product.description.includes(search),
      );
    }

    if (category) {
      products = products.filter((product) => product.category === category);
    }

    return products;
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.productModel.find().exec();
      return products;
    } catch (error) {
      console.log('Error en el servidor: ', error);
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id).exec();
      return product;
    } catch (error) {
      console.log('Error en el servidor: ', error);
    }
  }

  async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    try {
      const newProduct = await this.productModel.create(createProductDTO);
      return newProduct.save();
    } catch (error) {
      console.log('Error en el servicio: ', error._message);
    }
  }

  async updateProduct(
    id: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        createProductDTO,
        { new: true },
      );
      return updatedProduct;
    } catch (error) {
      console.log('Error en el servicio: ', error);
    }
  }

  async deleteProduct(id: string): Promise<any> {
    try {
      const deletedProduct = await this.productModel.findByIdAndRemove(id);
      return deletedProduct;
    } catch (error) {
      console.log('Error en el servicio:', error);
    }
  }
}
