import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Category } from "src/entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
    constructor( @InjectRepository(Category) private readonly category: Repository<Category> // !!! cim ga pomenem, evidentiraj u app module typeorm za feature..
    ) {
        super(category);
    }
}