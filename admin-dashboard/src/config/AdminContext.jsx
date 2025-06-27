import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

const URL = import.meta.env.VITE_BACKEND_URL;

export const AdminProvider = ({ children }) => {
  const [response, setResponse] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch(URL);
    const data = await res.json();
    setResponse(data.message);
  };
  return (
    <AdminContext.Provider
      value={{
        response,
        handleClick,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
