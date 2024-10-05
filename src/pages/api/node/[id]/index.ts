import { NextApiRequest, NextApiResponse} from 'next';
import { deleteById, getById, update } from '@/lib/data/nodes';
import { handlerWrapper } from '@/lib/utils/handler-wrapper';
import { number, z } from 'zod';
import { getId } from 'src/lib/utils/api-helpers';



const FormSchema = z.object({
  // id: z.number({
  //   invalid_type_error: 'Please set id',
  // }), 
  x: z.number({
      invalid_type_error: 'Please set x.',
  }),
  y: z.number({
      invalid_type_error: 'Please set y.',
  })
});
const createNode = FormSchema.omit({ x: true, y: true });
export default handlerWrapper({
    GET: async function handler(req:NextApiRequest, res:NextApiResponse) {
      let id = getId(req);
      let data = await getById(id);
      return data;
    },
    PUT: async function handler(req:NextApiRequest, res:NextApiResponse) {
      let id = getId(req);
      let node = req.body;
      const validatedFields = createNode.safeParse({
          x: node.x,
          y: node.y,
      });
      if (!validatedFields.success) {
          throw new Error('error');
      }
      let data = await update(id, node);
      return data;
    },
    DELETE: async function handler(req:NextApiRequest, res:NextApiResponse) {
      let id = getId(req);
      await deleteById(id);
      return `Delete succeed, id: ${id}`;
    },
});
