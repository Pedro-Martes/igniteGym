import { ReactNode, createContext, useEffect, useState } from "react";

import { storageRemoveUserLogged, storageUserGet, storageUserSave } from "@storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { userDTO } from '@dtos/userDTO'

import { api } from "../services/api";


export type AuthContextDataProps = {
    user: userDTO;
    updateUserProfile: (userUpdated: userDTO) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean
}
export const AuthCOntext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: ReactNode;
}


export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<userDTO>({} as userDTO)
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

    async function userAndTokenUpdate(userData: userDTO, token: string) {

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser(userData)
    }

    async function storageUserAndTokenSet(userData: userDTO, token: string) {
        try {
            setIsLoadingUserStorageData(true)
            await storageUserSave(userData)
            await storageAuthTokenSave(token)

        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false)
        }
    }

    async function signIn(email: string, password: string) {

        try {

            const { data } = await api.post('/sessions', { email, password });

            if (data.user && data.token) {
                setIsLoadingUserStorageData(true)

                await storageUserAndTokenSet(data.user, data.token);
                userAndTokenUpdate(data.user, data.token)

            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false)
        }

    }

    async function signOut() {

        try {
            setIsLoadingUserStorageData(true)
            setUser({} as userDTO)
            await storageRemoveUserLogged()
            await storageAuthTokenRemove()

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingUserStorageData(false)
        }
    }

    async function updateUserProfile(userUpdated: userDTO) {
        try {
            setUser(userUpdated)
            await storageUserSave(userUpdated)
        } catch (error) {
            throw error
        }
    }

    async function loadUSerData() {


        try {
            const userLogged = await storageUserGet()
            const userToken = await storageAuthTokenGet()
            if (userLogged && userToken) {
                setIsLoadingUserStorageData(true)
                userAndTokenUpdate(userLogged, userToken)


            }


        } catch (error) {
            console.log(error);
            throw error
        } finally {
            setIsLoadingUserStorageData(false)
        }
    }



    useEffect(() => {
        loadUSerData()
    }, [])

    useEffect(() => {
        const subscribe = api.registerIntercepteTokenManager(signOut)
        return() => {
            subscribe();
        }
    }, [signOut])
    
    return (

        <AuthCOntext.Provider value={{ user: user, signIn, isLoadingUserStorageData, signOut, updateUserProfile }}>

            {children}


        </AuthCOntext.Provider>
    );
}