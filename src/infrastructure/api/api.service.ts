import axios from "axios";

const API_URL = "http://localhost:8000/";

export const APISERVICE = {
  get: async (url: string): Promise<any> => {
    try {
      const response = await axios.get(`${API_URL}${url}`);
      return {
        data: response.data.pageInfo,
        status: response.status,
      };
    } catch (error) {
      console.error(error);
      throw error; // Puedes manejar el error aquí o dejarlo propagar
    }
  },
  post: async (body: any, url: string): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}${url}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      data.status = response.status;

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  put: async (body: any, url: string): Promise<any> => {
    try {
      const response = await axios.put(`${API_URL}${url}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      data.status = response.status;
      return data;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  delete: async (url: string): Promise<any> => {
    try {
      const response = await axios.delete(`${API_URL + url}`);
      const data = response.data;
      data.status = response.status;
      return data;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  },
};
