import { setupServer } from 'msw/node'
import { reqestHandlers } from './handlers'
 
export const myServer = setupServer(...reqestHandlers)