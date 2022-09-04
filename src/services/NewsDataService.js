import http from "../http-common";
import auth from "../services/authService";

class NewsDataService {
    getAll() {
        return http.get("/news");
    }

    async getAllNewsSitemap(){
        const result = await http.get("/news");
        let array = [];
        result.data.forEach(item => {
            array.push({
                    id:item.id
            })
        });
        return array;
    }

    get(id) {
        return http.get(`/news/id/${id}`);
    }

    create(data) {
        return http.post("/news", data, {headers: auth()});
    }

    update(id, data) {
        return http.put(`/news/id/${id}`, data, {headers: auth()});
    }

    updateViews(id, data) {
        return http.put(`/news/${id}`, data);
    }

    delete(id) {
        return http.delete(`/news/${id}`, {headers: auth()});
    }

    deleteAll() {
        return http.delete(`/news`, {headers: auth()});
    }

    findByTitle(title) {
        return http.get(`/news/title/${title}`);
    }
    addNewsCategory(data){
        return http.post(`news/category`, data);
    }
    findByCategory(category) {
        return http.get(`/news/newsCategory/${category}`);
    }

    findNewest() {
        return http.get(`/news/newest`);
    }
    findPopular() {
        return http.get(`/news/popular`);
    }
    publishNews(id,data){
        return http.put(`/news/id/${id}`, data, {headers: auth()});
    }
}

export default new NewsDataService();
