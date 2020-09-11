import { Photo } from "src/entities/photo.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

@Injectable()
export class PhotoService extends TypeOrmCrudService<Photo> {
    constructor( 
        @InjectRepository(Photo) 
        private readonly photo: Repository<Photo>, // !!! cim ga pomenem, evidentiraj u app module typeorm za feature..
    ) {
        super(photo);
    }

    add(newPhoto: Photo): Promise<Photo> {
        return this.photo.save(newPhoto);
    }
}