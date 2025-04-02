import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { ExecuteWorkflowDto } from './dto/executeWorkflow-dto';
export declare class WorkflowService {
    private prisma;
    private http;
    constructor(prisma: PrismaService, http: HttpService);
    getWorkflow(): Prisma.PrismaPromise<{
        id: string;
        userId: string;
        name: string;
        description: string | null;
        definition: string;
        status: string;
        createdAt: Date;
        updateAt: Date;
    }[]>;
    executeWorkflow(workflow: ExecuteWorkflowDto): Promise<{
        message: string;
        workflow: string;
        totalNodes: number;
    }>;
}
