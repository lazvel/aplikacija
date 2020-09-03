export class LoginInfoAdminstratorDto {
    adminstratorId: number;
    username: string;
    token: string;

    constructor(id: number, un: string, jwt: string) {
        this.adminstratorId = id;
        this.username = un;
        this.token = jwt;
    }
}