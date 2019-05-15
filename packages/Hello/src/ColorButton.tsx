import * as React from 'react';

interface ColorButtonProps {
  /** Buttons background color */
  color: 'blue' | 'green';
  onClick?: () => void;
}

/** A button with a configurable background color. */
export const ColorButton: React.SFC<ColorButtonProps> = ({ color, onClick, children }) => (
  <button
    type="button"
    style={{
      padding: 40,
      color: '#eee',
      backgroundColor: color,
      fontSize: '2rem',
    }}
    onClick={onClick}
  >
    {children}
  </button>
);

export default ColorButton;
