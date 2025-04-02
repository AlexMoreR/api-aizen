import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma.service';
import { ExecuteWorkflowDto } from './dto/executeWorkflow-dto';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class WorkflowService {

    constructor(
        private prisma: PrismaService,
        private http: HttpService
    ) { }

    getWorkflow() {
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

                // const url = `https://${workflow.urlevo}/message/sendText/${workflow.instanciaid}`;
                const url = `${workflow.urlevo}/message/sendText/${workflow.instanciaid}`;

                const body = {
                    number: workflow.remoteJid,
                    options: {
                        delay: 100,
                        presence: "composing"
                    },
                    text: node.message // <-- aquí va directamente "text", no "textMessage"
                };
                await firstValueFrom(this.http.post(url, body, { headers: { 'Content-Type': 'application/json', 'apikey': workflow.apikey } }));
                console.log(`✅ Texto enviado (nodo ${node.id})`);

                // Texto
                // Imagen
                // Video
                // Archivo/Documento
                // Audio
                
            } else if (node.tipo === 'Imagen' || node.tipo === 'Video' || node.tipo === 'Documento') {
                // const url = `https://${workflow.urlevo}/message/sendText/${workflow.instanciaid}`;
                const url = `${workflow.urlevo}/message/sendMedia/${workflow.instanciaid}`;

                const body = {
                    number: workflow.remoteJid,
                    mediatype: node.tipo, // Opciones: image, video o document
                    mimetype: node.tipo,
                    caption: node.message,
                    media: node.url
                    // fileName: "documento.pdf",
                };
                await firstValueFrom(this.http.post(url, body, { headers: { 'Content-Type': 'application/json', 'apikey': workflow.apikey } }));
                console.log(`✅ Texto enviado (nodo ${node.id})`);
            }
        }

        return { message: 'Workflow ejecutado', workflow: result.name, totalNodes: nodes.length };
    }

}
