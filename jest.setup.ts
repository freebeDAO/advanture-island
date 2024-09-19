// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { myServer } from 'src/mocks/server'

beforeAll(() => {
  
  myServer.listen()

  
  
});

afterAll
    (() => myServer
        .close())

// Reset handlers after each test `important for test isolation`
afterEach
    (() => myServer
        .resetHandlers())