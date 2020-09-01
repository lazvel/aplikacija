import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Article } from "entities/article.entity";

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article> {
    constructor( @InjectRepository(Article) private readonly article: Repository<Article> // !!! cim ga pomenem, evidentiraj u app module typeorm za feature..
    ) {
        super(article);
    }
}