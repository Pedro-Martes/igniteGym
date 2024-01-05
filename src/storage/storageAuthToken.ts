import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./storageConfig";

export async function storageAuthTokenSave(token: string) {
    try {

        await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
            .then(() => { console.log("Saved Token") })

    } catch (error) {
        console.log('Error Saving Token', error);
    }

}

export async function storageAuthTokenGet() {
    const token = AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
    return token

}

export async function storageAuthTokenRemove() {
    
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
    .then(()=>{console.log("Removed Token");})
}

