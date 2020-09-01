import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorService } from './services/administrator/administrator.service';
import { DatabaseConfiguration } from '../config/database.configuration';
import { Administrator } from '../entities/Administrator';
import { ArticleFeature } from '../entities/article-feature.entity';
import { ArticlePrice } from '../entities/article-price.entity';
import { Article } from '../entities/article.entity';
import { CartArticle } from '../entities/cart-article.entity';
import { Cart } from '../entities/cart.entity';
import { Category } from '../entities/category.entity';
import { Feature } from '../entities/feature.entity';
import { Order } from '../entities/order.entity';
import { Photo } from '../entities/photo.entity';
import { User } from '../entities/user.entity';
import { AdminstratorController } from './controllers/api/adminstrator.controller';
import { CategoryController } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: DatabaseConfiguration.hostname,
      port: 3307,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [ 
        Administrator,
        ArticleFeature,
        ArticlePrice,
        Article,
        CartArticle,
        Cart,
        Category,
        Feature,
        Order,
        Photo,
        User, 
      ]
    }),
    TypeOrmModule.forFeature([ 
      Administrator,
      Category
    ])
  ],
  controllers: [
    AppController,
    AdminstratorController,
    CategoryController
  ],
  providers: [
    AdministratorService,
    CategoryService
  ],
})
export class AppModule {}
