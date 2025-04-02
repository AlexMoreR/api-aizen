import { Module } from '@nestjs/common';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';
import { PrismaService } from 'src/prisma.service';
import { HttpModule } from '@nestjs/axios'; // <-- FALTA ESTO


@Module({
  imports: [HttpModule],
  controllers: [WorkflowController],
  providers: [WorkflowService, PrismaService] // <-- HttpService se inyecta solo al importar HttpModule
})
export class WorkflowModule {}
