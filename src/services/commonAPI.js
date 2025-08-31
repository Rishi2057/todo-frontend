import axios from "axios"

export const commonAPI = (httpRequest,url,reqBody)=>{
    const refConfig = {
        method : httpRequest,
        url,
        data : reqBody
    }

    return axios(refConfig).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}