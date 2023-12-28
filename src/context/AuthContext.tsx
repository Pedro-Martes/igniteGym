import { ReactNode, createContext, useState } from "react";
import { userDTO } from '@dtos/userDTO'
import { api } from "@services/api";


export type AuthContextDataProps = {
    user: userDTO;
    signIn: (email: string, password: string) => Promise<void>
}
export const AuthCOntext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: ReactNode;
}


export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<userDTO>({} as userDTO)

    try {
        async function signIn(email: string, password: string) {
            const { data } = await api.post('sessions', { email, password });
            if (data.user) {

            }

        }

    } catch (error) {
        throw error;
    }
    return (

        <AuthCOntext.Provider value={{ user: user, signIn }}>

            {children}


        </AuthCOntext.Provider>
    );
}