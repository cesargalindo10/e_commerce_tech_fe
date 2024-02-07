import axios, { AxiosRequestConfig } from 'axios';
//import { getValidationError } from '../utilities/get-validation-error';

export const AxiosInterceptor = () => {
  //saveInLocalStorage(LocalStorageKeys.TOKEN, '123123123123');

  const updateHeader = (request: AxiosRequestConfig) => {
    //const token = getInLocalStorage(LocalStorageKeys.TOKEN);
    const token = JSON.parse(localStorage.getItem('user') as string);
    const tokenFull = `bearer ${token?.token}`;
    const newHeaders = {
      Authorization: tokenFull,
      'Content-Type': 'application/json'
    };
    request.headers = newHeaders;
    return request;
  };

  axios.interceptors.request.use((request: any) => {
    if (request.url?.includes('assets')) return request;
    return updateHeader(request);
  });

  axios.interceptors.response.use(
    (response) => {
      //if(response?.data.message.includes('existosamente')){
        //toast.success(response.data.message);
      //}
      return response.data;
    },
    (error) => {
        //toast.error(getValidationError(error.code));
      return Promise.reject(error);
    }
  );
};