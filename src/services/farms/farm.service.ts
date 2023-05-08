
import axiosInstance from '../../config/http/HttpInterceptor'
import { FARM_API } from "../../config/index";

class FarmService {
  async listFarms():Promise<any> {
    return await axiosInstance
      .get(FARM_API+'/farms')
      .then(response => {
        return response.data.data;
      });
  };
  async getFarmInfo(farmId):Promise<any> {
    return await axiosInstance
      .get(FARM_API+'/farms/'+farmId)
      .then(response => {
        return response.data.data;
      });
  };
  async createFarms(data:any):Promise<any> {
    return await axiosInstance
      .post(FARM_API+'/farms',data)
      .then(response => {
        return response.data;
      });
  };
}
export default new FarmService();
