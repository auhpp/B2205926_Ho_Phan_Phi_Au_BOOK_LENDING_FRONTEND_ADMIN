import createApiClient from "./api.service";

class LoanSlipService {
    constructor(baseUrl = "/api/loanSlip") {
        this.api = createApiClient(baseUrl);
    }

    async findAll({ page, limit, id, status }) {
        return (await this.api.get("/", { params: { page, limit, id, status } })).data;
    }

    async findById(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async create(data) {
        if (data._id) {
            return (await this.api.put("/" + data._id, data)).data;
        }
        return (await this.api.post("/", data)).data;
    }
}

export default new LoanSlipService();