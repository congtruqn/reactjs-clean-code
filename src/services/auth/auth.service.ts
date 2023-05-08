
import axiosInstance from '../../config/http/HttpInterceptor'
import axios from "axios";
import jwt_decode from "jwt-decode";
const API_URL = "https://api-admin-et.unibiz.io/";

interface Ilogin  {
  access:string,
}

class AuthService {
  async login(client_id :string,username: string, password: string):Promise<Ilogin> {
    return axios
      .post(API_URL + "login/", {
        client_id,
        username,
        password
      })
      .then(response => {
        if (response.data?.data?.access_token) {
          localStorage.setItem("access", JSON.stringify(response.data.data.access_token));
          localStorage.setItem("refresh", JSON.stringify(response.data.data.refresh_token));
        }
        //return response.data;
        return {
          access:response.data.data.access_token
        }
      });
  }
  async logout():Promise<any>{
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    return 'ok'
  }
  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("access");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
