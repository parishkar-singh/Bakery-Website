// import { createContext, useContext, useState } from "react";

// const UserContext = createContext(null);

// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }:{children:React.ReactNode}) => {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };