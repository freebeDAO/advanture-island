import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import Joi from "joi";
import { NodeService } from "../services/NodeService";
import { Node } from "../entity/Node"; // 确保导入 Node 模型

const validateNumber = (value: string) => {
    const schema = Joi.string().required().regex(/^\d+$/);
    const { error } = schema.validate(value);
    if (error) {
        throw new Error('id必须是数字');
    }
    return parseInt(value);
};

@Controller('api/node')
export class NodeController {
    constructor(private readonly nodeService: NodeService) { }

    @Get('findall')
    async findAll(): Promise<{ result?: Node[] }> {
        console.log('findAll')
        try {
            const result = await this.nodeService.findNodes();
            return {
                result: result,
            };
        } catch (error: unknown) {
            console.error(error);
        }
        return {
            result: [],
        };
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<{ status: number; message: string; result?: Node }> {
        console.log('findById')
        try {
            const nodeId = validateNumber(id);
            const result = await this.nodeService.findNodeById(nodeId);
            return result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return {
                    status: 400,
                    message: error.message,
                };
            }
            return {
                status: 400,
                message: 'An unknown error occurred.',
            };
        }
    }


    @Post('create')
    async createNode(@Body() node: Node): Promise<{ status: number; message: string; result?: Node }> {
        try {
            const result = await this.nodeService.createNode(node);
            return result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return {
                    status: 400,
                    message: error.message,
                };
            }
            return {
                status: 500,
                message: 'Internal server error',
            };
        }
    }

    @Post('delete')
    async deleteNode(@Body() node: Node): Promise<{ status: number; message: string; result?: Node }> {
        try {
            const result = await this.nodeService.deleteNodeById(node);
            return result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return {
                    status: 400,
                    message: error.message,
                };
            }
            return {
                status: 500,
                message: 'Internal server error',
            };
        }
    }

    @Post('modify')
    async updateNode(@Body() node: Node): Promise<{ status: number; message: string; result?: Node }> {
        try {
            const result = await this.nodeService.updateNode(node);
            return result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return {
                    status: 400,
                    message: error.message,
                };
            }
            return {
                status: 500,
                message: 'Internal server error',
            };
        }
    }

    @Post('saveorupdate')
    async updaterNode(@Body() node: Node): Promise<{ status: number; message: string; result?: Node }> {
        try {
            const result = await this.nodeService.updaterNode(node);
            return result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return {
                    status: 400,
                    message: error.message,
                };
            }
            return {
                status: 500,
                message: 'Internal server error',
            };
        }
    }
}