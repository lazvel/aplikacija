import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { Administrator } from '../../../entities/administrator.entity';
import { AddAdministratorDto } from '../../dtos/adminstrator/add.adminstrator.dto';
import { EditAdminstratorDto } from '../../dtos/adminstrator/edit.adminstrator.dto';
import { resolve } from 'path';
import { ApiResponse } from 'src/misc/api.response.class';

@Injectable()
export class AdministratorService {
    constructor(
       @InjectRepository(Administrator) private readonly administrator: Repository<Administrator> 
    ) {}

    getAll(): Promise<Administrator[]> {
        return this.administrator.find();
    }

    async getByUsername(username: string): Promise<Administrator | undefined> {
        const admin = await this.administrator.findOne({
            username: username
        });

        if (admin) {
            return admin;
        }

        return undefined;
    }

    getById(id: number): Promise<Administrator> {
        return this.administrator.findOne(id);
    }

    add(data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        const newAdmin: Administrator = new Administrator();
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

        return new Promise((resolve) => {
            this.administrator.save(newAdmin)
            .then(data => resolve(data))
            .catch(error => {
                const response: ApiResponse = new ApiResponse("error", -1001);
                resolve(response);
            });
        });

    }

    async editById(id: number, data: EditAdminstratorDto): Promise<Administrator | ApiResponse> {
        const admin: Administrator = await this.administrator.findOne(id);
        
        if (admin === undefined) {
            return new Promise((resolve) => {
                resolve(new ApiResponse("error", -1002));
            });
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
    
        admin.passwordHash = passwordHashString;
        return this.administrator.save(admin);

        // .update(samo strukturu za delimicne podatke, jedine vr koje se apdejtuju)
    }
}
