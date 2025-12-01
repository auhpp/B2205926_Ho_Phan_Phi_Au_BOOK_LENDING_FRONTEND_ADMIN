import createApiClient from "./api.service";

class AuthService {
    constructor(baseUrl = "/api/auth") {
        this.api = createApiClient(baseUrl);
    }

    async signin(data) {
        return (await this.api.post("/admin/signin", data)).data;
    }


    async getCurrentUser() {
        return (await this.api.get("/user")).data;
    }

    async sendotp({ userName, role }) {
        return (await this.api.post("/sendOtp", { userName: userName, role: role })).data;
    }
    async verifyOtp({ userName, otp }) {
        return (await this.api.post("/verifyOtp", { userName: userName, otp: otp })).data;
    }
    async resetPassword({ userName, otp, newPassword, role }) {
        return (await this.api.post("/resetPassword", { userName: userName, otp: otp, newPassword: newPassword, role: role })).data;
    }
    async changePassword({ oldPassword, newPassword }) {
        return (await this.api.post("/changePassword", { oldPassword: oldPassword, newPassword: newPassword })).data;
    }
}

export default new AuthService();