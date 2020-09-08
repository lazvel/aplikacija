import { NestMiddleware, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdminstratorDto } from "src/dtos/adminstrator/jwt.data.adminstrator.dto";
import { jwtSecret } from "config/jwt.secret";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor( private readonly adminstratorService: AdministratorService) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        

        if(!req.headers.authorization) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }

        const token = req.headers.authorization;

        const tokenParts = token.split(' ');
        if(tokenParts.length !== 2) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const tokenString = tokenParts[1];

        const jwtData: JwtDataAdminstratorDto = jwt.verify(tokenString, jwtSecret);
        if(!jwtData) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.ip !== req.ip.toString()) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.ua !== req.headers["user-agent"]) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const adminstrator = await this.adminstratorService.getById(jwtData.administratorId);
        if(!adminstrator) {
            throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
        }

        const trenutniTimeStamp = new Date().getTime() / 1000;
        if(trenutniTimeStamp >= jwtData.exp) {
            throw new HttpException('The token has expired', HttpStatus.UNAUTHORIZED);
        }


        next();
    }
    
}