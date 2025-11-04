import createApiClient from "./api.service";

class AuthorService {
    constructor(baseUrl = "/api/author") {
        this.api = createApiClient(baseUrl);
    }


    async findAll({ page, limit }) {
        return (await this.api.get("/", { params: { page, limit } })).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;

    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new AuthorService();