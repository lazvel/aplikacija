export class JwtDataAdminstratorDto {
    administratorId: number;
    username: string;
    exp: number; // UNIX TIMESTAMP
    ip: string;
    ua: string;
}