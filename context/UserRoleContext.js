import React, { createContext, useState } from 'react';

export const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState('');

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole, username, setUsername }}>
      {children}
    </UserRoleContext.Provider>
  );
};
