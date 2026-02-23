import { useEffect, useState } from 'react';
import styles from './SelectionField.module.scss';

interface SelectionFieldProps {
  selectionType: 'itemsNumber' | 'deviceAge';
  onChange: (T: string) => void;
}

export const SelectionField: React.FC<SelectionFieldProps> = ({
  selectionType,
  onChange,
}) => {
  const [optionsList, setOptionsList] = useState<string[]>([]);
  const [value, setValue] = useState<string>('16');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    setValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    if (selectionType === 'itemsNumber') {
      setOptionsList(['4', '8', '16', '32', '64']);
    } else {
      setOptionsList(['Newest', 'Alphabetically', 'Cheapest']);
    }
  }, [selectionType]);

  return (
    <select
      className={styles.selectionField__Container}
      value={value}
      onChange={handleChange}
    >
      {optionsList.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
