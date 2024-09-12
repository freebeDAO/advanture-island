import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { NodeService } from "./node.service";
import { Node } from "./node.entity";

@Controller("node")
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Get()
  findAll(): Promise<Node[]> {
    return this.nodeService.findAll();
  }

  @Get("latest")
  getLatest(): Promise<Node | null> {
    return this.nodeService.getLatest();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Node | null> {
    return this.nodeService.findOne(+id);
  }

  @Post()
  create(@Body() node: Partial<Node>): Promise<Node> {
    return this.nodeService.create(node);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() node: Partial<Node>
  ): Promise<Node | null> {
    return this.nodeService.update(+id, node);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.nodeService.remove(+id);
  }
}
