// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'


global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};