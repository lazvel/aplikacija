"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrator = void 0;
const typeorm_1 = require("typeorm");
let Administrator = class Administrator {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'administrator_id', type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], Administrator.prototype, "administratorId", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: '32', unique: true }),
    __metadata("design:type", String)
], Administrator.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ name: 'password_hash', type: 'varchar', length: '128' }),
    __metadata("design:type", String)
], Administrator.prototype, "passwordHash", void 0);
Administrator = __decorate([
    typeorm_1.Entity()
], Administrator);
exports.Administrator = Administrator;
//# sourceMappingURL=administrator.entity.js.map