import { Module } from '@nestjs/common';
import { NodeController } from '../controllers/NodeController';
import { NodeService } from '../services/NodeService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from '../entity/Node';

@Module({
    imports:[
        TypeOrmModule.forFeature([Node]),
    ],
    controllers: [NodeController],
    providers: [NodeService],
})
export class NodeModule { }