import { createContext, ReactNode, useState, useEffect } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
}
  
type AuthContextProviderProps = {
    children: ReactNode
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        // Salva o event listener na variável unsubscribe
        const unsubscribe = auth.onAuthStateChanged(user => {
        // Monitora se já existe um usuário autenticado, se sim ele busca as infos do usuário e preenche ela dentro do estado. 
        if (user) {
            const { displayName, photoURL, uid } = user
            if (!displayName || !photoURL) {
            throw new Error('Missing information from Google Account');
            }
    
            setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
            });
        }
        })

        return () => {
        unsubscribe(); // O retorno descadastra do event listener para evitar erro com o usuário já logado.
        }
    }, [])

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider)

        if (result.user) {
        const { displayName, photoURL, uid } = result.user

        if (!displayName || !photoURL) {
            throw new Error('Missing information from Google Account');
        }

        setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
        });
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}