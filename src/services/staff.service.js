import createApiClient from "./api.service";

class StaffService {
    constructor(baseUrl = "/api/staff") {
        this.api = createApiClient(baseUrl);
    }

    async findAll() {
        return (await this.api.get("/")).data;
    }


}

export default new StaffService();