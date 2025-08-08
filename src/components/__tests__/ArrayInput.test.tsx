import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ArrayInput } from '../ArrayInput';

describe('ArrayInput component', () => {
  it('adds and removes items', () => {
    const Wrapper = () => {
      const [items, setItems] = React.useState<string[]>([]);
      return <ArrayInput label="Tags" items={items} onChange={setItems} placeholder="Add" />;
    };

    render(<Wrapper />);

    const input = screen.getByLabelText('Tags');
    fireEvent.change(input, { target: { value: 'Item 1' } });
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Remove'));
    expect(screen.queryByText('Item 1')).toBeNull();
  });
});
