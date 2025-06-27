import { createContext, useContext, useState } from "react";

const EmployeeContext = createContext();
const URL = import.meta.env.VITE_BACKEND_URL;

export const EmployeeProvider = ({ children }) => {
  const [response, setResponse] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch(URL);
    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <EmployeeContext.Provider
      value={{
        response,
        handleClick,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
