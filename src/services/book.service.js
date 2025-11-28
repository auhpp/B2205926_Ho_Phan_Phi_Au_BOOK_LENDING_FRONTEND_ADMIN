import createApiClient from "./api.service";

class BookService {
    constructor(baseUrl = "/api/book") {
        this.api = createApiClient(baseUrl);
    }

    async findAll({ page, limit, name, active }) {
        return (await this.api.get("/", { params: { page, limit, name, active } })).data;
    }

    async create(dataFromForm) {
        const formData = new FormData();
        if (dataFromForm.id) {
            formData.append("id", dataFromForm.id);
            dataFromForm.images.forEach(image => {
                formData.append("images", image);
            });
        }
        formData.append("name", dataFromForm.name);
        formData.append("price", dataFromForm.price);
        formData.append("bookCopyQuantity", dataFromForm.bookCopyQuantity);
        formData.append("publisherId", dataFromForm.publisherId);
        dataFromForm.categoryIds.forEach(id => {
            formData.append("categoryIds", id);
        });
        dataFromForm.authorIds.forEach(id => {
            formData.append("authorIds", id);
        });
        if (dataFromForm.fileImages && dataFromForm.fileImages.length > 0) {
            dataFromForm.fileImages.forEach(file => {
                formData.append("productImages", file);
            });
        }
        console.log("Kiểm tra FormData:");
        if (dataFromForm.id) {
            for (const pair of formData.entries()) {
                console.log(pair[0] + ": ", pair[1]);
            }
            return (await this.api.put("/" + dataFromForm.id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })).data;
        }
        else {
            // for (const pair of formData.entries()) {
            //     console.log(pair[0] + ": ", pair[1]);
            // }
            return (await this.api.post("/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })).data;
        }
    }

    async update(data) {
        return (await this.api.put("/" + data._id, data)).data;
    }


    async findById(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new BookService();