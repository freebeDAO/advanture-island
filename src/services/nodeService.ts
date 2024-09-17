import { Node } from "../entity/Node";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager, IsNull } from 'typeorm';

const buildMessage = (status: number, message: string, result?: Node) => {
    return { status, message, result };
};

@Injectable()
export class NodeService {
    constructor(
        @InjectRepository(Node)
        private nodeRepository: Repository<Node>,
    ) { }

    async findNodeById(id: number): Promise<{ status: number; message: string; result?: Node }> {
        const result = await this.nodeRepository.findOneBy({ id });
        if (result) {
            return buildMessage(200, 'Node found!', result);
        } else {
            return buildMessage(201, 'Node not found!');
        }
    }

    async findNodes(): Promise<Node[]> {
        const result = await this.nodeRepository.find({
            order: {
                id: "ASC"
            }
        });
        return result;
    }

    async createNode(node: Partial<Node>): Promise<{ status: number; message: string; result?: Node }> {
        try {
            const result = await this.nodeRepository.manager.transaction(async (manager: EntityManager) => {
                delete node.id;
                const savedNode = await manager.save(Node, node);
                return savedNode;
            });
            console.log('Transaction committed successfully');
            return buildMessage(200, 'Node created!', result);
        } catch (error) {
            console.error('Transaction failed:', error);
            return buildMessage(500, 'Error creating node!');
        }
    }

    async deleteNodeById(node: Partial<Node>): Promise<{ status: number; message: string; result?: Node }> {
        try {
            const result = await this.nodeRepository.manager.transaction(async (manager: EntityManager) => {
                const deleteNode = await manager.delete(Node, { id: node.id });
                return deleteNode;
            });
            if (1 == result.affected) {
                console.log('Transaction committed successfully');
                return buildMessage(200, 'Node delete!');
            } else {
                return buildMessage(202, 'Node not found!');
            }
        } catch (error) {
            console.error('Transaction failed:', error);
            return buildMessage(500, 'Delete node error!');
        }
    }

    async updateNode(node: Partial<Node>): Promise<{ status: number; message: string; result?: Node }> {
        try {
            const result = await this.nodeRepository.manager.transaction(async (manager: EntityManager) => {
                const savedNode = await manager.update(Node, node.id, node);
                return savedNode;
            });
            if (1 == result.affected) {
                console.log('Transaction committed successfully');
                return buildMessage(200, 'Node updated!');
            } else {
                return buildMessage(203, 'Node not found!');
            }
        } catch (error) {
            console.error('Transaction failed:', error);
            return buildMessage(500, 'Update node error!');
        }
    }

    async updaterNode(node: Partial<Node>): Promise<{ status: number; message: string; result?: Node }> {
        try {
            const result = await this.nodeRepository.manager.transaction(async (manager: EntityManager) => {
                const oldNode = await manager.findOneBy(Node, { id: node.id });
                if (!oldNode) {
                    delete node.id;
                }
                const savedNode = await manager.save(Node, node);
                return savedNode;
            });
            console.log('Transaction committed successfully');
            return buildMessage(200, 'Node saved or updated!', result);
        } catch (error) {
            console.error('Transaction failed:', error);
            return buildMessage(500, 'Update node error!');
        }
    }
}