import React, { useState } from 'react';

interface ArrayInputProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({ label, items, onChange, placeholder }) => {
  const [value, setValue] = useState('');

  const addItem = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onChange([...items, trimmed]);
    setValue('');
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label>
        {label}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      </label>
      <button type="button" onClick={addItem}>Add</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button type="button" onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
