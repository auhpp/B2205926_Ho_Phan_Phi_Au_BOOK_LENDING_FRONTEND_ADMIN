import createApiClient from "./api.service";

class AuthorService {
    constructor(baseUrl = "/api/author") {
        this.api = createApiClient(baseUrl);
    }

    async findAll() {
        return (await this.api.get("/")).data;
    }
    
    async create(data) {
        return (await this.api.post("/", data)).data;

    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new AuthorService();