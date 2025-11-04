import createApiClient from "./api.service";

class ConfigurationService {
    constructor(baseUrl = "/api/configuration") {
        this.api = createApiClient(baseUrl);
    }

    async findAll({ page, limit }) {
        return (await this.api.get("/", { params: { page, limit } })).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;

    }

}

export default new ConfigurationService();