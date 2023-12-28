import { ReactNode, createContext } from "react";
import { userDTO } from '@dtos/userDTO'


export type AuthContextDataProps = {
    user: userDTO;
}
export const AuthCOntext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: ReactNode;
}


export function AuthContextProvider({ children }: AuthContextProviderProps) {
    return (

        <AuthCOntext.Provider value={{
            user: {
                id: '1',
                name: 'Pedro',
                email: 'pedro@email.com',
                avatar: 'pedro.png'
            }

        }}>

            {children}


        </AuthCOntext.Provider>
    );
}