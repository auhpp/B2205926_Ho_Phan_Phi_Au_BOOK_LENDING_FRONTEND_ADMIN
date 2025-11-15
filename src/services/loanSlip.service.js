import createApiClient from "./api.service";

class LoanSlipService {
    constructor(baseUrl = "/api/loanSlip") {
        this.api = createApiClient(baseUrl);
    }

    async findAll({ page, limit }) {
        return (await this.api.get("/", { params: { page, limit } })).data;
    }

    async findById(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }
}

export default new LoanSlipService();