import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/store'), // 1.2 Setup the database
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
