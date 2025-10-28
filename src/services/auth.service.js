import createApiClient from "./api.service";

class AuthService {
    constructor(baseUrl = "/api/auth") {
        this.api = createApiClient(baseUrl);
    }

    async signin(data) {
        return (await this.api.post("/admin/signin", data)).data;
    }
}

export default new AuthService();