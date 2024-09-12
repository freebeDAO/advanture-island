import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NodeController } from "./node.controller";
import { NodeService } from "./node.service";
import { Node } from "./node.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Node])],
  controllers: [NodeController],
  providers: [NodeService],
})
export class NodeModule {}
