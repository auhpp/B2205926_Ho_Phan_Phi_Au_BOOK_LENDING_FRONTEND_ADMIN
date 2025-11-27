import createApiClient from "./api.service";

class PenaltyTicketService {
    constructor(baseUrl = "/api/penaltyTicket") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        if (data._id) {
            return (await this.api.put("/" + data._id, data)).data;
        }
        return (await this.api.post("/", data)).data;
    }

    async findAll({ page, limit, id, paymentStatus }) {
        return (await this.api.get("/", { params: { page, limit, id, paymentStatus } })).data;
    }

    async findById(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new PenaltyTicketService();