"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
}

interface Props {
  children: React.ReactNode;
}

const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: (): string => "",
  userName: "",
  setUserName: (): string => "",
});

export const GlobalContextProvier = ({ children }: Props) => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  return (
    <GlobalContext.Provider
      value={{ userId, setUserId, userName, setUserName }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
