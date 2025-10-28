import createApiClient from "./api.service";

class BookCopyService {
    constructor(baseUrl = "/api/bookCopy") {
        this.api = createApiClient(baseUrl);
    }

    async findAll(data) {
        return (await this.api.get("", { params: data })).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;

    }

    async findById(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new BookCopyService();