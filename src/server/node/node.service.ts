import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Node } from "./node.entity";

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(Node)
    private nodeRepository: Repository<Node>
  ) {}

  findAll(): Promise<Node[]> {
    return this.nodeRepository.find();
  }

  findOne(id: number): Promise<Node | null> {
    return this.nodeRepository.findOne({ where: { id } });
  }

  async getLatest(): Promise<Node | null> {
    const [latestNode] = await this.nodeRepository.find({
      order: { id: "DESC" },
      take: 1,
    });
    return latestNode || null;
  }

  create(node: Partial<Node>): Promise<Node> {
    return this.nodeRepository.save(node);
  }

  async update(id: number, node: Partial<Node>): Promise<Node | null> {
    await this.nodeRepository.update(id, node);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.nodeRepository.delete(id);
  }
}
