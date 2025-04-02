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
exports.WorkflowService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const prisma_service_1 = require("../prisma.service");
const rxjs_1 = require("rxjs");
let WorkflowService = class WorkflowService {
    prisma;
    http;
    constructor(prisma, http) {
        this.prisma = prisma;
        this.http = http;
    }
    getWorkflow() {
        return this.prisma.workflow.findMany();
    }
    async executeWorkflow(workflow) {
        const result = await this.prisma.workflow.findFirst({
            where: {
                name: workflow.name_flujo,
            },
        });
        if (!result) {
            throw new common_1.NotFoundException('Workflow no encontrado');
        }
        const nodes = await this.prisma.workflowNode.findMany({
            where: {
                workflowId: result.id,
            },
        });
        if (!nodes || nodes.length === 0) {
            throw new common_1.NotFoundException('No se encontraron nodos para este workflow');
        }
        for (const node of nodes) {
            console.log('Procesando nodo', node);
            if (node.tipo === 'Texto') {
                const url = `https://${workflow.urlevo}/message/sendText/${workflow.instanciaid}`;
                const body = {
                    number: workflow.remoteJid,
                    options: {
                        delay: 100,
                        presence: "composing"
                    },
                    textMessage: {
                        text: node.message
                    }
                };
                await (0, rxjs_1.firstValueFrom)(this.http.post(url, body, { headers: { 'Content-Type': 'application/json', 'apikey': workflow.apikey } }));
                console.log(`✅ Texto enviado (nodo ${node.id})`);
            }
            else if (node.tipo === 'Imagen' || node.tipo === 'Video' || node.tipo === 'Documento') {
            }
        }
        return { message: 'Workflow ejecutado', workflow: result.name, totalNodes: nodes.length };
    }
};
exports.WorkflowService = WorkflowService;
exports.WorkflowService = WorkflowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, axios_1.HttpService])
], WorkflowService);
//# sourceMappingURL=workflow.service.js.map