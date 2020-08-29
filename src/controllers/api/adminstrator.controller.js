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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminstratorController = void 0;
const common_1 = require("@nestjs/common");
const administrator_service_1 = require("../../services/administrator/administrator.service");
const add_adminstrator_dto_1 = require("../../dtos/adminstrator/add.adminstrator.dto");
const edit_adminstrator_dto_1 = require("../../dtos/adminstrator/edit.adminstrator.dto");
let AdminstratorController = class AdminstratorController {
    constructor(adminstratorService) {
        this.adminstratorService = adminstratorService;
    }
    getAll() {
        return this.adminstratorService.getAll();
    }
    getById(adminstratorId) {
        return this.adminstratorService.getById(adminstratorId);
    }
    add(data) {
        return this.adminstratorService.add(data); // data je Dto, servis transformise username i password u username i hash
    }
    // Post - za editovanje informacija o adminstratoru
    edit(id, data) {
        return this.adminstratorService.editById(id, data);
    }
};
__decorate([
    common_1.Get() //api/adminstrator
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminstratorController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id') //api/adminstrator/4/
    ,
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminstratorController.prototype, "getById", null);
__decorate([
    common_1.Put() //api/adminstrator/4/ PUT
    ,
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_adminstrator_dto_1.AddAdministratorDto]),
    __metadata("design:returntype", Promise)
], AdminstratorController.prototype, "add", null);
__decorate([
    common_1.Post(':id') //api/adminstrator/4/ POST
    ,
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, edit_adminstrator_dto_1.EditAdminstratorDto]),
    __metadata("design:returntype", Promise)
], AdminstratorController.prototype, "edit", null);
AdminstratorController = __decorate([
    common_1.Controller('api/adminstrator'),
    __metadata("design:paramtypes", [administrator_service_1.AdministratorService])
], AdminstratorController);
exports.AdminstratorController = AdminstratorController;
//# sourceMappingURL=adminstrator.controller.js.map