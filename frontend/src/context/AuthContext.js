//setup context to manage authentication state across MULTIPLE components- not passing props
//Manually passing props and nested componenets would get difficult to manage 
import React, { createContext, useState, useContext } from 'react'; //import functions from react to create, use context, manage state and access context values

//context object AuthContext cerated
const AuthContext = createContext();

//provider component: AuthProvider to 'wrap' parts of application that need access to authentication state
//State of isAuthenticated set to false initially
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
//authContextProvider provides isAuthenticated state nad setIsAuthrnticated function to any child component that consumes context

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

