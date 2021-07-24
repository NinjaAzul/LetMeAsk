import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {

      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.")
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })


    return () => {
      unsubscribe();
    }
  }, [])


  const [user, setUser] = useState<User>();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.")
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("shoulbe use with AuthContextProvider");

//   const {
//     user,
//     signInWithGoogle,
//   } = context;

//   return {
//     user,
//     signInWithGoogle,
//   };
// };

