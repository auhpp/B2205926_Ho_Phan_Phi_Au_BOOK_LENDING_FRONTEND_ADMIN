import createApiClient from "./api.service";

class ConfigurationService {
    constructor(baseUrl = "/api/configuration") {
        this.api = createApiClient(baseUrl);
    }

    async findAll({ page, limit, name }) {
        return (await this.api.get("/", { params: { page, limit, name } })).data;
    }

    async findByName(name) {
        return (await this.api.get(`/name/${name}`)).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }

}

export default new ConfigurationService();