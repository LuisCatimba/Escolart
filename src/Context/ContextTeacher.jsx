import { createContext, useState } from 'react';
import { ContextUser } from './ContextUser';

export const ContextTeacher = createContext();

export const ContextTeacherProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(null);

  return (
    <ContextTeacher.Provider value={{ teacher, setTeacher }}>
      {children}
    </ContextTeacher.Provider>
  );
};
