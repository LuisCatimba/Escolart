import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Estrela = ({ onClick }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div>
      <FaStar
        onClick={() => {
          setIsSelected(!isSelected), onClick();
        }}
        style={{
          marginRight: '15px',
          cursor: 'pointer',
          ...(isSelected && { color: 'gold' }),
        }}
      />
    </div>
  );
};

export default Estrela;
