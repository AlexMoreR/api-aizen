import { WorkflowService } from './workflow.service';
import { ExecuteWorkflowDto } from './dto/executeWorkflow-dto';
export declare class WorkflowController {
    private workflowService;
    constructor(workflowService: WorkflowService);
    getWorkflow(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        userId: string;
        name: string;
        description: string | null;
        definition: string;
        status: string;
        createdAt: Date;
        updateAt: Date;
    }[]>;
    executeWorkflow(workflow: ExecuteWorkflowDto): Promise<string>;
}
