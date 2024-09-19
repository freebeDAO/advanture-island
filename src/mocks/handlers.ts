import { http, HttpResponse } from 'msw'

export const reqestHandlers = [
  http.get('/api/nodes/queryNode', () => {
    return HttpResponse.json({
      data:[{ id: 1, x: 3, y: 4 },{ id: 2, x: 3, y: 6 }],
      msg: 'success',
      code: 200
    });
  }),

  http.post('/api/nodes/addNode', () => {
    return HttpResponse.json({
      data:[{ id: 1, x: 2, y: 5 }],
      msg: 'success',
      code: 200
    });
  }),

  http.put('/api/nodes/updateNode', () => {
    return HttpResponse.json({
      data:[{ id: 1, x: 5, y: 6 }],
      msg: 'success',
      code: 200
    });
  }),

  http.delete('/api/nodes/deleteNode', () => {
    return HttpResponse.json({
      data:[{ id: 1, x: 3, y: 4 }],
      msg: 'success',
      code: 200
    });
  }),
]