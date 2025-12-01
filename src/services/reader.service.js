import createApiClient from "./api.service";

class ReaderService {
    constructor(baseUrl = "/api/reader") {
        this.api = createApiClient(baseUrl);
    }


    async findPagination({ page, limit, keyword, active }) {
        return (await this.api.get("/", { params: { page, limit, keyword, active } })).data;
    }

    async updateStatus(data) {
        if (data._id) {
            return (await this.api.put("/admin/" + data._id, data)).data;
        }
    }
}

export default new ReaderService();