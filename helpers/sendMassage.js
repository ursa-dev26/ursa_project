import { types } from "pg"

/**
 * @param 
 * @param {boolean}   
 * @param 
 * toast d'affichage de message  
 */
export const toastSms = (res, message, body,type) => {

    const isTrue = {
        message: message ? "succes" : "error",
        data: body
    }
    const isFalse = {
        message: message ? "succes" : "error",
        type:type,
        description: body
    }

    message ? res.send(isTrue) : res.send(isFalse)

}