import { Controller, Post, Body, Req, Put } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { LoginAdminstratorDto } from "src/dtos/adminstrator/login.adminstrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { resolve } from "path";
import * as crypto from 'crypto';
import { LoginInfoAdminstratorDto } from "src/dtos/adminstrator/login.info.adminstrator.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdminstratorDto } from "src/dtos/adminstrator/jwt.data.adminstrator.dto";
import { Request } from 'express';
import { jwtSecret } from "config/jwt.secret";
import { UserRegistrationDto } from "src/dtos/user/user.registration.dto";
import { UserService } from "src/services/user/user.service";

@Controller('auth/')
export class AuthController {
    constructor(public adminstratorService: AdministratorService, public userService: UserService) {}

    @Post('login') //localhost:3000/auth/login
    async doLogin(@Body() data: LoginAdminstratorDto, @Req() req: Request): Promise<LoginInfoAdminstratorDto | ApiResponse> {
        const adminstrator = await this.adminstratorService.getByUsername(data.username);

        if (!adminstrator) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3001)));
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
    
        if(adminstrator.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
        }

        // moramo vratiti dozirane info kao administratorId, username, token(JWT)
        
        const jwtData = new JwtDataAdminstratorDto();
        jwtData.administratorId = adminstrator.administratorId;
        jwtData.username = adminstrator.username;
    
        // eslint-disable-next-line prefer-const
        let sada = new Date();
        sada.setDate(sada.getDate() + 14);
        const istekTmestamp = sada.getTime() / 1000;
        jwtData.exp = istekTmestamp;

        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];

        // jwt - tajna sifra; json = {adminId, username, expire, ip, ua}
        // eslint-disable-next-line prefer-const
        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret); // potpisi jsonwebtoken

        const responseObject = new LoginInfoAdminstratorDto(
            adminstrator.administratorId,
            adminstrator.username,
            token
        );
        return new Promise(resolve => resolve(responseObject));
    }

    @Put('user/register') // auth/user/register
    async userRegister(@Body() data: UserRegistrationDto) {
        return await this.userService.register(data);
    }

    
}