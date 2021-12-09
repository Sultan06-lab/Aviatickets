import axios from "axios";
import config from "../Config/appConfig";

class Api
{
    constructor(config)
    {
        this.url = config.url;
    }

    async getCountries() 
    {
        try {
          const response = await fetch(`${this.url}/countries`,).then(res => res.json());
          return response    
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async getCities() 
    {
        try {
          const response = await fetch(`${this.url}/cities`,).then(res => res.json());
          return response    
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async getAirlines() 
    {
        try {
          const response = await fetch(`${this.url}/airlines`,).then(res => res.json());
          return response    
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async prices(params) 
    {
        try {
          const response = await axios.get(`${this.url}/prices/cheap`, {params,});
          return response.data    
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

const api = new Api(config);

export default api;