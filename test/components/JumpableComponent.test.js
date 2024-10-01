import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import JumpableComponent from '../../src/components/JumpableComponent';



describe('JumpableComponent', () => {
  it('渲染成功', () => {
    const container = render(<JumpableComponent />);
    expect(container.baseElement).toBeInTheDocument();
  });
  it('默认className', () => {
    const { getByTestId } = render(<JumpableComponent />);
    const componentDiv = getByTestId('jumpable-div');
    expect(componentDiv.className).toBe('');
  });
  it('点击事件', () => {
    const { getByTestId } = render(<JumpableComponent />);
    const componentDiv = getByTestId('jumpable-div');
    fireEvent.click(componentDiv);
    expect(componentDiv.className).toMatch(/animate__animated animate__bounce/);
  });
  
  it('空格事件', () => {
    const { getByTestId } = render(<JumpableComponent />);
    const componentDiv = getByTestId('jumpable-div');
    fireEvent.keyDown(document.body, { key: ' ', code: 'Space' });
    expect(componentDiv.className).toMatch(/animate__animated animate__bounce/);
  });
  
  it('非空格事件', () => {
    const { getByTestId } = render(<JumpableComponent />);
    const componentDiv = getByTestId('jumpable-div');
    fireEvent.keyDown(document.body, { key: 'A', code: 'KeyA' });
    expect(componentDiv.className).toBe('');
  });
})