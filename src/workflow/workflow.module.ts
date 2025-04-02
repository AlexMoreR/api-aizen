import { Module } from '@nestjs/common';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WorkflowController],
  providers: [WorkflowService, PrismaService]
})
export class WorkflowModule {}
