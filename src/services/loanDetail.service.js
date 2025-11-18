import createApiClient from "./api.service";

class LoanDetailService {
    constructor(baseUrl = "/api/loanDetail") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        if (data._id) {
            return (await this.api.put("/" + data._id, data)).data;
        }
    }
}

export default new LoanDetailService();