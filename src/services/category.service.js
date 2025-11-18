import createApiClient from "./api.service";

class CategoryService {
    constructor(baseUrl = "/api/category") {
        this.api = createApiClient(baseUrl);
    }
    async findPagination({ page, limit, name }) {
        return (await this.api.get("/", { params: { page, limit, name } })).data;
    }

    async findAll() {
        return (await this.api.get("/all")).data;
    }
    async create(data) {
        if (data._id) {
            return (await this.api.put("/" + data._id, data)).data;
        }
        return (await this.api.post("/", data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new CategoryService();