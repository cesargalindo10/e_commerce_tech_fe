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
      throw error; // Puedes manejar el error aquí o dejarlo propagar
    }
  },
  post: async (body: any, url: string) => {
    try {
      const response = await axios.post(`${API_URL}${url}`, body, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error(error);
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
export const AxiosService = {
  get: (url: string, params: any) => {
    console.log(`${API_URL + url}`)
    return axios.get(`${API_URL + url}`, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Puedes ajustar el tipo de contenido según tus necesidades
      },
    });
  },

  post: <T>(body: T, url: string, params: string) => {
    return axios.post(`${API_URL + url + params}`, body);
  },

  patch: <T>(body: T, url: string, params: string) => {
    return axios.patch(`${API_URL + url + params}`, body);
  },
};
