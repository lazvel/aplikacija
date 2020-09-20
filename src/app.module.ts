import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorService } from './services/administrator/administrator.service';
import { DatabaseConfiguration } from '../config/database.configuration';
import { Administrator } from './entities/Administrator';
import { ArticleFeature } from './entities/article-feature.entity';
import { ArticlePrice } from './entities/article-price.entity';
import { Article } from './entities/article.entity';
import { CartArticle } from './entities/cart-article.entity';
import { Cart } from './entities/cart.entity';
import { Category } from './entities/category.entity';
import { Feature } from './entities/feature.entity';
import { Order } from './entities/order.entity';
import { Photo } from './entities/photo.entity';
import { User } from './entities/user.entity';
import { AdminstratorController } from './controllers/api/adminstrator.controller';
import { CategoryController } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';
import { ArticleService } from './services/article/article.service';
import { ArticleController } from './controllers/api/article.controller';
import { FeatureService } from './services/feature/feature.service';
import { FeatureController } from './controllers/api/feature.controller';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './midlewares/auth.middleware';
import { PhotoService } from './services/photo/photo.service';
import { UserService } from './services/user/user.service';
import { CartService } from './services/cart/cart.service';
import { UserCartController } from './controllers/api/user.cart.controller';
import { OrderService } from './services/order/order.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from 'config/mail.config';
import { OrderMailer } from './services/order/order.mailer.service';

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
      Category,
      Article,
      Feature,
      ArticlePrice,
      ArticleFeature,
      Photo,
      User,
      Cart,
      CartArticle,
      Order
    ]),
    MailerModule.forRoot({
      transport: 'smtps://' + MailConfig.username + ':' + MailConfig.password + '@' + MailConfig.hostname,
      defaults: {
        from: MailConfig.senderEmail,
      },
    }),
  ],
  controllers: [
    AppController,
    AdminstratorController,
    CategoryController,
    ArticleController,
    FeatureController,
    AuthController,
    UserCartController
  ],
  providers: [
    AdministratorService,
    CategoryService,
    ArticleService,
    FeatureService,
    PhotoService,
    UserService,
    CartService,
    OrderService,
    OrderMailer
  ],
  exports: [
    AdministratorService,
    UserService
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude('auth/*')
    .forRoutes('api/*');
  }
}
