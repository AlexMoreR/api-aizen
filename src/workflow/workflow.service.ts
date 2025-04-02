import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { ExecuteWorkflowDto } from './dto/executeWorkflow-dto';
import { firstValueFrom } from 'rxjs';



@Injectable()
export class WorkflowService {

    constructor(private prisma: PrismaService, private http: HttpService) {}

    getWorkflow(){
        return this.prisma.workflow.findMany();
    }

    async executeWorkflow(workflow: ExecuteWorkflowDto) {
        // Paso 1: Buscar el workflow por nombre
        const result = await this.prisma.workflow.findFirst({
            where: {
                name: workflow.name_flujo,
            },
        });

        if (!result) {
            throw new NotFoundException('Workflow no encontrado');
        }

        // Paso 2: Buscar los WorkflowNode asociados
        const nodes = await this.prisma.workflowNode.findMany({
            where: {
                workflowId: result.id,  // <-- Aquí relacionamos por ID
            },
        });

        if (!nodes || nodes.length === 0) {
            throw new NotFoundException('No se encontraron nodos para este workflow');
        }

        // Paso 3: Recorrer los nodos
        for (const node of nodes) {

            // Aquí es donde harías la llamada a tu API de WhatsApp
            console.log('Procesando nodo', node);

            // ejemplo:
            // await this.whatsappApi.send(node.type, node.content, workflow.remoteJid);

            // Puedes condicionar según el tipo de nodo
            if (node.tipo === 'Texto') {
    
                const url = `https://${workflow.urlevo}/message/sendText/${workflow.instanciaid}`;

                const body = {
                    number: workflow.remoteJid,
                    options: {
                        delay: 100,
                        presence: "composing"
                    },
                    textMessage: {
                        text: node.message // <- aquí el texto que quieras enviar
                    }
                };

                await firstValueFrom(this.http.post(url, body, { headers: { 'Content-Type': 'application/json', 'apikey': workflow.apikey } }));
                console.log(`✅ Texto enviado (nodo ${node.id})`);


            } else if (node.tipo === 'Imagen' || node.tipo === 'Video' || node.tipo === 'Documento'){

            }
        }

        return { message: 'Workflow ejecutado', workflow: result.name, totalNodes: nodes.length };
    }

}
