"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./controllers/app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const administrator_service_1 = require("./services/administrator/administrator.service");
const database_configuration_1 = require("../config/database.configuration");
const Administrator_1 = require("../entities/Administrator");
const article_feature_entity_1 = require("../entities/article-feature.entity");
const article_price_entity_1 = require("../entities/article-price.entity");
const article_entity_1 = require("../entities/article.entity");
const cart_article_entity_1 = require("../entities/cart-article.entity");
const cart_entity_1 = require("../entities/cart.entity");
const category_entity_1 = require("../entities/category.entity");
const feature_entity_1 = require("../entities/feature.entity");
const order_entity_1 = require("../entities/order.entity");
const photo_entity_1 = require("../entities/photo.entity");
const user_entity_1 = require("../entities/user.entity");
const adminstrator_controller_1 = require("./controllers/api/adminstrator.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: database_configuration_1.DatabaseConfiguration.hostname,
                port: 3307,
                username: database_configuration_1.DatabaseConfiguration.username,
                password: database_configuration_1.DatabaseConfiguration.password,
                database: database_configuration_1.DatabaseConfiguration.database,
                entities: [
                    Administrator_1.Administrator,
                    article_feature_entity_1.ArticleFeature,
                    article_price_entity_1.ArticlePrice,
                    article_entity_1.Article,
                    cart_article_entity_1.CartArticle,
                    cart_entity_1.Cart,
                    category_entity_1.Category,
                    feature_entity_1.Feature,
                    order_entity_1.Order,
                    photo_entity_1.Photo,
                    user_entity_1.User,
                ]
            }),
            typeorm_1.TypeOrmModule.forFeature([Administrator_1.Administrator])
        ],
        controllers: [
            app_controller_1.AppController,
            adminstrator_controller_1.AdminstratorController
        ],
        providers: [administrator_service_1.AdministratorService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map