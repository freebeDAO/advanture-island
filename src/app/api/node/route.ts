
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import { NextRequest } from "next/server";
import { Node } from "src/entities/Node";
import { AppDataSource } from "src/lib/utils/dbconfig";
import { Repository } from "typeorm";

async function getNodeRepository(): Promise<Repository<Node>> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource.getRepository(Node);
}

export async function GET(request: NextRequest) {

  const id = request.nextUrl.searchParams.get('id');
  let where = {};
  if (id) {
    where = { id: id }
  }
  const repository = await getNodeRepository();
  const nodes = await repository.findBy(where)
  return Response.json(nodes)
}
export async function PUT(request: NextRequest) {
  const node = await request.json()
  if (node) {
    const repository = await getNodeRepository();
    await repository.insert(node)
  }
  return Response.json({})
}
export async function POST(request: NextRequest) {
  const node = await request.json()
  if (node) {
    const repository = await getNodeRepository();
    const oldNode = await repository.findOneBy({ id: node.id });
    if (oldNode) {
      await repository.update(oldNode.id, { ...oldNode, ...node })

    }
    await repository.insert(node)
  }
  return Response.json({})
}



export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (id) {
    const repository = await getNodeRepository();
    await repository.delete(id);
  }
  return Response.json({})
}

