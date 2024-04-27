import { jwtDecode } from "jwt-decode";
import { Role } from "../constants/constants";

declare module "jwt-decode" {
    export interface JwtPayload {
        role: { authority: string }[];
    }
}

export function setToken(token: string): void{
    localStorage.setItem("token", token);
}

export function getToken(): string | null{
    return localStorage.getItem("token");
}

export function validToken(): boolean{
    const token = localStorage.getItem("token");
    if(token === null) return false;
    
    const decodedToken = jwtDecode(token);
    const currentDate = new Date();
    if(decodedToken.exp === undefined || decodedToken.exp * 1000 < currentDate.getTime()) {
        return false;
    }

    return true;
}

export function getRole(): Role{
    const token = localStorage.getItem("token");
    if(token !== null){
        const decodedToken = jwtDecode(token);
        if(decodedToken.role[0].authority !== undefined){
            const role = decodedToken.role[0].authority;
            if(role === "USER") return Role.USER;
            if(role === "ADMIN") return Role.ADMIN;
        }
    }
    return Role.GUEST;
}

/* example of payload:
{
    "sub": "przemek12@gmail.com",
    "role": [
      {
        "authority": "ADMIN"
      }
    ],
    "exp": 1714345981
  }
*/