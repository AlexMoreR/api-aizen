import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { ExecuteWorkflowDto } from './dto/executeWorkflow-dto';

@Controller('workflow')
export class WorkflowController {

    constructor (private workflowService: WorkflowService) {}

    @Get('')
    getWorkflow(){
        return this.workflowService.getWorkflow();
    }

    @Post('')
    @UsePipes(new ValidationPipe())
    executeWorkflow(@Body() workflow: ExecuteWorkflowDto){
        return this.workflowService.executeWorkflow(workflow);
    }
}