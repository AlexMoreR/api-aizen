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
exports.ExecuteWorkflowDto = void 0;
const class_validator_1 = require("class-validator");
class ExecuteWorkflowDto {
    name_flujo;
    urlevo;
    apikey;
    instanciaid;
    remoteJid;
    userId;
}
exports.ExecuteWorkflowDto = ExecuteWorkflowDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExecuteWorkflowDto.prototype, "name_flujo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExecuteWorkflowDto.prototype, "urlevo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExecuteWorkflowDto.prototype, "apikey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExecuteWorkflowDto.prototype, "instanciaid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExecuteWorkflowDto.prototype, "remoteJid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExecuteWorkflowDto.prototype, "userId", void 0);
//# sourceMappingURL=executeWorkflow-dto.js.map