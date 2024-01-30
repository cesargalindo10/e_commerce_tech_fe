import axios from "axios"

const APIURL = import.meta.env.VITE_REACT_APP_API_URL

export const APISERVICE = {
    get: async (url: string, params: string) => {
        const res = await fetch(`${APIURL}${url}${params}`);
        if(!res.ok){
            throw new Error('Error http:' + res.status);
        }
        const data = await res.json();
        return data;
    },
    post: async <T,>(body: T,url: string, params: string) => {
        const response = await fetch(`${APIURL +url + params}`,{
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body)
        })
        if(!response.ok){
            throw(new Error('New error'))
        }

        const data = await response.json();
        return data;
    },
    put: async <T,> (body: T, url: string, params: string) => {
        const reponse = await fetch(`${APIURL + url + params}`, {
            method: 'PUT',
            headers: {
                "content-type": 'aplication/json',
            },
            body: JSON.stringify(body)
        })
        if(!reponse.ok){
            throw(new Error('Error'))
        }
        const data = await reponse.json()
        return data;
    }

    ,
    posWithImage: async(body: any, url: string, params: string, method: string) => {
        const response = await fetch(`${APIURL + url + params}`, {
            method: method,
        /*     headers: {
                "content-type": "application/json",
            }, */
            body: body
        })      
        if(!response.ok){
            throw(new Error('New error'));
        }
        const data = await response.json()
        return data;
    },
}

export const AxiosService = {
    get: (url: string, params: any) => {
        return axios.get(`${APIURL+ url}`, {params: params});
    },
}