import createApiClient from "./api.service";

class LoanDetailService {
    constructor(baseUrl = "/api/loanDetail") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }
}

export default new LoanDetailService();