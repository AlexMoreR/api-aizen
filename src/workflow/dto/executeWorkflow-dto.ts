import { IsString, IsOptional } from 'class-validator';

export class ExecuteWorkflowDto {

    @IsString()
    name_flujo: string;

    @IsString()
    urlevo: string;

    @IsString()
    apikey: string;

    @IsString()
    instanciaid?: string;

    @IsString()
    remoteJid?: string;

    @IsString()
    userId?: string;
}