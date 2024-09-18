import { NextApiRequest, NextApiResponse } from 'next';
import Node from '../../../models/Node';
// import sequelize from 'src/lib/db';
// 
// 通过 ID 获取，更新或删除节点
// eslint-disable-next-line import/no-anonymous-default-export
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;

//   if (req.method === 'GET') {
//     try {
//       const node = await Node.findByPk(id as string);
//       if (!node) return res.status(404).json({ error: 'Node not found' });
//       res.status(200).json(node);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch node' });
//     }
//   } else if (req.method === 'PUT') {
//     const { x, y } = req.body;
    
//     try {
//       const node = await Node.findByPk(id as string);
//       if (!node) return res.status(404).json({ error: 'Node not found' });
//       node.x = (typeof x === 'number') ? x : node.x;
//       node.y = (typeof y === 'number') ? y : node.y;
      
//       await node.save();
//       res.status(200).json(node);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to update node' });
//     }
//   } else if (req.method === 'DELETE') {
//     try {
//       const node = await Node.findByPk(id as string);
//       if (!node) return res.status(404).json({ error: 'Node not found' });
//       await node.destroy();
//       res.status(204).end();
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to delete node' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };
// 更新 Node 的位置
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const { id } = req.query;
  
    if (req.method === 'PUT') {
    //   const { x, y } = req.body;
  
      try {
        const node = await Node.findByPk(1);
        if (!node) {
          return res.status(404).json({ error: 'Node not found' });
        }
  
        // node.x = x ?? node.x;
        // node.y = y ?? node.y;
        await node.save();
  
        return res.status(200).json(node);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to update Node' });
      }
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  }