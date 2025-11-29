import createApiClient from "./api.service";

class StaffService {
    constructor(baseUrl = "/api/staff") {
        this.api = createApiClient(baseUrl);
    }

    async findAll() {
        return (await this.api.get("/all")).data;
    }

    async findPagination({ page, limit, userName, active }) {
        return (await this.api.get("/", { params: { page, limit, userName, active } })).data;
    }

    async create(data) {
        if (data._id) {
            return (await this.api.put("/" + data._id, data)).data;
        }
        return (await this.api.post("/", data)).data;
    }

    async update(formData, id) {
        return (await this.api.put("/" + id, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })).data;
    }

    async updateStatus(data) {
        if (data._id) {
            return (await this.api.put("/admin/" + data._id, data)).data;
        }
    }

}

export default new StaffService();