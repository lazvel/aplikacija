import { Controller, Get, Param, Put, Body, Post, SetMetadata, UseGuards, Patch } from "@nestjs/common";
import { AdministratorService } from "../../services/administrator/administrator.service";
import { Administrator } from "../../entities/Administrator";
import { AddAdministratorDto } from "../../dtos/adminstrator/add.adminstrator.dto";
import { EditAdminstratorDto } from "../../dtos/adminstrator/edit.adminstrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";


@Controller('api/adminstrator')
export class AdminstratorController {
    constructor(
        private adminstratorService: AdministratorService
    ) {}
    
    @Get() //api/adminstrator
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    getAll(): Promise<Administrator[]> {
        return this.adminstratorService.getAll();
    }

    @Get(':id') //api/adminstrator/4/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    getById(@Param('id') adminstratorId: number): Promise<Administrator | ApiResponse> {
        return new Promise(async (resolve) => {
            const admin = await this.adminstratorService.getById(adminstratorId);
        
            if (admin === undefined ) {
                resolve(new ApiResponse("error", -1002));
            }

            resolve(admin);
        });
        
    }

    @Post() //api/adminstrator/4/ PUT
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    add(@Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        return this.adminstratorService.add(data); // data je Dto, servis transformise username i password u username i hash
    }

    // Post - za editovanje informacija o adminstratoru
    @Patch(':id') //api/adminstrator/4/ POST
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    edit(@Param('id') id: number, @Body() data: EditAdminstratorDto): Promise<Administrator | ApiResponse> {
       return this.adminstratorService.editById(id, data); 
    }
}