import { createContext, useState } from "react";

export const menuLateral = createContext();

export const MenuLateralProvider = ({ children }) => {
  const [isOpenMenuLateral, setIsOpenMenuLateral] = useState(false);

  return (
    <menuLateral.Provider value={{ isOpenMenuLateral, setIsOpenMenuLateral }}>
      {children}
    </menuLateral.Provider>
  );
};
