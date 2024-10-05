'use server';
import { NextApiRequest, NextApiResponse } from 'next';
import { create, getAll } from '@/lib/data/nodes';
import { handlerWrapper } from '@/lib/utils/handler-wrapper';
import { z } from 'zod';

const FormSchema = z.object({
  // id: z.string(),
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
      let data = await getAll();
      return data
    },
    POST: async function handler(req:NextApiRequest, res:NextApiResponse) {
      console.log(req.body);
      let node = req.body;
      const validatedFields = createNode.safeParse({
          x: node.x,
          y: node.y,
      });
      if (!validatedFields.success) {
          throw new Error('error');
      }
      let data = await create(node);
      return data;
    },
});

