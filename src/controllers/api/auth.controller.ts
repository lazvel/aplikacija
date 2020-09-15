import { Controller, Post, Body, Req, Put } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { LoginAdminstratorDto } from "src/dtos/adminstrator/login.adminstrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { resolve } from "path";
import * as crypto from 'crypto';
import { LoginInfoDto } from "src/dtos/auth/login.info.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { Request } from 'express';
import { jwtSecret } from "config/jwt.secret";
import { UserRegistrationDto } from "src/dtos/user/user.registration.dto";
import { UserService } from "src/services/user/user.service";
import { LoginUserDto } from "src/dtos/user/login.user.dto";

@Controller('auth/')
export class AuthController {
    constructor(public adminstratorService: AdministratorService, public userService: UserService) {}

    @Post('administrator/login') //localhost:3000/auth/administrator/login
    async doAdministratorLogin(@Body() data: LoginAdminstratorDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse> {
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
        
        const jwtData = new JwtDataDto();
        jwtData.role = "administrator";
        jwtData.id = adminstrator.administratorId;
        jwtData.identity = adminstrator.username;
    
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

        const responseObject = new LoginInfoDto(
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

    @Post('user/login') //localhost:3000/auth/administrator/login
    async doUserLogin(@Body() data: LoginUserDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse> {
        const user = await this.userService.getByEmail(data.email);

        if (!user) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3001)));
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
    
        if(user.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
        }

        // moramo vratiti dozirane info kao id, username, token(JWT)
        
        const jwtData = new JwtDataDto();
        jwtData.role = "user";
        jwtData.id = user.userId;
        jwtData.identity = user.email;
    
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

        const responseObject = new LoginInfoDto(
            user.userId,
            user.email,
            token
        );
        return new Promise(resolve => resolve(responseObject));
    }
}