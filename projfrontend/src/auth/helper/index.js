import { API } from "../../backend";
import { cartEmpty } from "../../core/helper/cartHelper";


export const signup = user => {
    return fetch(`${API}user/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json(response)
    })
    .catch(error => console.log(error))
}


export const signin = user => {
    const formData = new FormData()

    for (const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}user/login/`, {
        method: "POST",
        body: formData
    })
    .then(response =>{
        console.log("Success", response)
        return response.json();
    })
    .catch(error => console.log(error))
}


export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}


export const isAuthenticated = () => {
    if (typeof window == undefined){
        return false
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}


export const signout = (next) => {
    const userId = isAuthenticated() && isAuthenticated().user.id
    
    if (typeof window !== undefined){
         localStorage.removeItem("jwt")
         cartEmpty(() => {})
         next();

         return fetch(`${API}user/logout/${userId}`, {
             method: "GET"
         })
         .then(response =>{ 
            console.log("signout successful")
            next();
        })
         .catch(error => console.log(error))
    }
}