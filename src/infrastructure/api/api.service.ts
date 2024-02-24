import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL

let token: ''|any;
function getToken(): void {
  const tokenLocal = JSON.parse(localStorage.getItem('user') as string);
  token = tokenLocal ? `bearer ${tokenLocal.token}` : '';
}
getToken();
export const setToken=(token:string)=>{
token = `bearer ${token}`
}

export const APISERVICE = {
  get: async (url: string) => {
    try {
      return await axios.get(`${API_URL}${url}`, {
        headers: {
          Authorization: token,
        },
      });
     
     
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  post: async (body: any, url: string) => {
    try {
      const response = await axios.post(`${API_URL}${url}`, body, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  posWithImage: async (body: any, url: string,method:string) => {
    try {
        const response = await fetch(`${API_URL + url}`, {
            method: method,
            headers: {
                'authorization': token,
            },
            body: body
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error; 
    }
},
  delete: async (url: string)=> {
    try {
      return await axios.delete(`${API_URL + url}`, {
        headers: {
          Authorization: token,
        },
      });

    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  put: async (body: any, url: string) => {
    try {
      return await axios.put(`${API_URL}${url}`, body, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
