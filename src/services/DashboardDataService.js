import http from "../http-common";
const DASHBOARD_BASE_URL = "/dashboard"

class DashboardDataService{
    getAccessToken(){
        return http.get(DASHBOARD_BASE_URL+"/accessTokens");
    }
}
export default new DashboardDataService();