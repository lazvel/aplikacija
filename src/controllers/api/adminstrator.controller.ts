import { Controller, Get, Param, Put, Body, Post } from "@nestjs/common";
import { AdministratorService } from "../../services/administrator/administrator.service";
import { Administrator } from "../../../entities/administrator.entity";
import { AddAdministratorDto } from "../../dtos/adminstrator/add.adminstrator.dto";
import { EditAdminstratorDto } from "../../dtos/adminstrator/edit.adminstrator.dto";
import { ApiResponse } from "src/misc/api.response.class";


@Controller('api/adminstrator')
export class AdminstratorController {
    constructor(
        private adminstratorService: AdministratorService
    ) {}
    
    @Get() //api/adminstrator
    getAll(): Promise<Administrator[]> {
        return this.adminstratorService.getAll();
    }

    @Get(':id') //api/adminstrator/4/
    getById(@Param('id') adminstratorId: number): Promise<Administrator | ApiResponse> {
        return new Promise(async (resolve) => {
            const admin = await this.adminstratorService.getById(adminstratorId);
        
            if (admin === undefined ) {
                resolve(new ApiResponse("error", -1002));
            }

            resolve(admin);
        });
        
    }

    @Put() //api/adminstrator/4/ PUT
    add(@Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        return this.adminstratorService.add(data); // data je Dto, servis transformise username i password u username i hash
    }

    // Post - za editovanje informacija o adminstratoru
    @Post(':id') //api/adminstrator/4/ POST
    edit(@Param('id') id: number, @Body() data: EditAdminstratorDto): Promise<Administrator | ApiResponse> {
       return this.adminstratorService.editById(id, data); 
    }
}