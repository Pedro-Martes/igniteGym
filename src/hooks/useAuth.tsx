import { useContext } from "react";
import { AuthCOntext } from "../context/AuthContext";

export function useAuth(){
    const context = useContext(AuthCOntext);
    return context;
}