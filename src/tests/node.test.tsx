// __tests__Node.test.tsx
import React from 'react';
import { myServer } from 'src/mocks/server'
import { HttpResponse, http } from "msw";
 describe('Test node api', () => {


  test('Query Node', async () => {
    myServer.use(
      http.get("/api/nodes/queryNode", () => {
        return HttpResponse.json({
          data:[{ id: 1, x: 2, y: 5 }],
          msg: 'success',
          code: 200
        });
      })
    );
  });

  test('Add Node', async () => {
    myServer.use(
      http.post("/api/nodes/addNode", () => {
        return HttpResponse.json({
          data:[{ id: 1, x: 2, y: 5 }],
          msg: 'success',
          code: 200
        });
      })
    );
  });

  test('Update Node', async () => {
    myServer.use(
      http.put("/api/nodes/updateNode", () => {
        return HttpResponse.json({
          data:[{ id: 1, x: 2, y: 5 }],
          msg: 'success',
          code: 200
        });
      })
    );
  });

  test('Delete Node', async () => {
    myServer.use(
      http.delete("/api/nodes/deleteNode", () => {
        return HttpResponse.json({
          data:[{ id: 1, x: 2, y: 5 }],
          msg: 'success',
          code: 200
        });
      })
    );
  });

 })