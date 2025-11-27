import createApiClient from "./api.service";

class StaffService {
    constructor(baseUrl = "/api/staff") {
        this.api = createApiClient(baseUrl);
    }

    async findAll() {
        return (await this.api.get("/all")).data;
    }

    async findPagination({ page, limit, userName }) {
        return (await this.api.get("/", { params: { page, limit, userName } })).data;
    }

    async create(data) {
        if (data._id) {
            return (await this.api.put("/" + data._id, data)).data;
        }
        return (await this.api.post("/", data)).data;
    }


}

export default new StaffService();