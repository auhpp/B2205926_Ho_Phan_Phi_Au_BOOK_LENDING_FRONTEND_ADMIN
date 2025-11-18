<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import categoryService from "@/services/category.service";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import authorService from "@/services/author.service";
import publisherService from "@/services/publisher.service";

export default {
  components: {
    Form,
    Field,
    VueMultiselect,
    ErrorMessage,
  },
  emits: ["submit:book", "delete:book"],
  props: {
    book: { type: Object, required: true },
  },
  data() {
    const bookFormSchema = yup.object().shape({
      name: yup.string().required("Tên phải có giá trị"),
      price: yup.string().required("Giá không được để trống"),
      categories: yup
        .array()
        .min(1, "Phải chọn ít nhất một danh mục")
        .required("Danh mục không được để trống"),
      authors: yup
        .array()
        .min(1, "Phải chọn ít nhất một tác giả")
        .required("Tác giả không được để trống"),
      publisher: yup.object().required("Nhà xuất bản không được để trống"),
      bookCopyQuantity: yup
        .number()
        .typeError("Số lượng phải là một con số")
        .integer("Số lượng phải là số nguyên")
        .min(1, "Số lượng bản sao phải ít nhất là 1")
        .required("Số lượng bản sao không được để trống"),
      images: yup.array().when("$isEditMode", {
        is: (isEditMode) => isEditMode === true,
        then: (schema) => schema.optional(),
        otherwise: (schema) =>
          schema
            .min(1, "Phải tải ít nhất một ảnh")
            .required("Ảnh không được để trống"),
      }),
    });
    return {
      bookFormSchema,
      categories: [],
      authors: [],
      publishers: [],
      previewImages: this.book && this.book.images ? [...this.book.images] : [],
      fileImages: [],
    };
  },
  computed: {
    isEditMode() {
      return (
        this.book &&
        this.book._id != null &&
        this.book._id != undefined &&
        this.book._id != ""
      );
    },
  },
  methods: {
    submitBook(values) {
      const categoryIds = values.categories.map((e) => e._id);
      const authorIds = values.authors.map((e) => e._id);
      values.categoryIds = categoryIds;
      values.authorIds = authorIds;
      values.publisherId = values.publisher._id;
      var formData = {
        ...values,
        fileImages: this.fileImages,
      };
      if (this.isEditMode) {
        formData.id = this.book._id;
        formData.images = this.book.images;
      }
      console.log("submit:", formData);
      this.$emit("submit:book", formData);
    },
    deleteBook() {
      this.$emit("delete:book", this.book._id);
    },
    async getAllCategoy() {
      this.categories = (await categoryService.findAll({})).result;
    },
    async getAllAuthor() {
      this.authors = (await authorService.findAll({})).result;
    },
    async getAllPublisher() {
      this.publishers = (await publisherService.findAll({})).result;
    },

    handleFileChange(event) {
      const files = event.target.files;
      if (!files || files.length == 0) return;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        this.previewImages.push(url);
        this.fileImages.push(files[i]);
      }
    },

    deleteFile(index) {
      const urlToDelete = this.previewImages.splice(index, 1)[0];
      const oldFileIndex = this.book.images.indexOf(urlToDelete);
      if (oldFileIndex > -1) {
        this.book.images.splice(oldFileIndex, 1);
      }
      this.fileImages.splice(index, 1);
    },
  },
  mounted() {
    this.getAllCategoy();
    this.getAllAuthor();
    this.getAllPublisher();
  },
};
</script>

<template>
  <Form
    class="p-4"
    @submit="submitBook"
    :validation-schema="bookFormSchema"
    :initial-values="book"
    :enable-reinitialize="true"
    :validation-context="{ isEditMode: isEditMode }"
  >
    <div class="d-flex justify-content-between mb-2">
      <i
        class="fa-solid fa-arrow-left icon-back"
        @click="this.$router.back()"
      ></i>
      <template v-if="isEditMode">
        <div class="col-2 text-end">
          <button type="submit" class="col me-1 btn btn-success btn-sm">
            Cập nhật
          </button>
          <button
            @click="deleteBook"
            type="button"
            class="me-1 btn btn-danger btn-sm"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </template>
      <template v-else>
        <button type="submit" class="col-1 me-1 btn btn-primary btn-sm">
          Tạo sách
        </button>
      </template>
    </div>
    <div class="d-flex gap-2">
      <div class="form-group col-8">
        <label for="name">Tên sách</label>
        <Field name="name" type="text" class="form-control" />
        <ErrorMessage name="name" class="text-danger" />
      </div>
      <div class="form-group col-2">
        <label for="price">Giá</label>
        <Field name="price" type="text" class="form-control" />
        <ErrorMessage name="price" class="text-danger" />
      </div>
      <div v-if="!isEditMode" class="form-group col-2">
        <label for="bookCopyQuantity">Số lượng bản sao</label>
        <Field
          name="bookCopyQuantity"
          :readonly="isEditMode"
          type="number"
          min="1"
          class="form-control"
        />
        <ErrorMessage name="bookCopyQuantity" class="text-danger" />
      </div>
    </div>
    <div class="d-flex gap-2 mt-3">
      <div class="form-group col-4">
        <label for="categories">Danh mục</label>
        <Field
          name="categories"
          v-slot="{ value, handleChange, handleBlur, errors }"
        >
          <vue-multiselect
            id="categories"
            :modelValue="value"
            @update:modelValue="handleChange"
            @blur="handleBlur"
            :options="categories"
            :multiple="true"
            label="name"
            track-by="_id"
            placeholder="Chọn danh mục"
            :class="{ 'is-invalid': errors.length > 0 }"
          >
          </vue-multiselect>
        </Field>
        <ErrorMessage name="categories" class="text-danger" />
      </div>
      <div class="form-group col-4">
        <label for="authors">Tác giả</label>
        <Field
          name="authors"
          v-slot="{ value, handleChange, handleBlur, errors }"
        >
          <vue-multiselect
            id="authors"
            :modelValue="value"
            @update:modelValue="handleChange"
            @blur="handleBlur"
            :options="authors"
            :multiple="true"
            label="name"
            track-by="_id"
            placeholder="Chọn tác giả"
            :class="{ 'is-invalid': errors.length > 0 }"
          >
          </vue-multiselect>
        </Field>
        <ErrorMessage name="authors" class="text-danger" />
      </div>
      <div class="form-group col-4">
        <label for="publisher">Nhà xuất bản</label>
        <Field
          name="publisher"
          v-slot="{ value, handleChange, handleBlur, errors }"
        >
          <vue-multiselect
            id="publishers"
            :modelValue="value"
            @update:modelValue="handleChange"
            @blur="handleBlur"
            :options="publishers"
            :multiple="false"
            label="name"
            track-by="_id"
            placeholder="Chọn nhà xuất bản"
            :class="{ 'is-invalid': errors.length > 0 }"
          >
          </vue-multiselect>
        </Field>
        <ErrorMessage name="publisher" class="text-danger" />
      </div>
    </div>
    <div class="form-group col-2 mt-2">
      <label for="images" class="d-block btn btn-outline-success">
        <i class="fa-solid fa-square-caret-up"></i> Thêm ảnh
      </label>

      <Field
        hidden
        name="images"
        id="images"
        type="file"
        class="form-control"
        multiple
        @change="handleFileChange"
      />
      <ErrorMessage name="images" class="text-danger" />
    </div>
    <div v-if="previewImages.length" class="mt-3 d-flex flex-wrap gap-2">
      <div
        v-for="(url, index) in previewImages"
        :key="index"
        class="image-preview-wrapper"
      >
        <img :src="url" class="image-preview" alt="" />
        <button type="button" class="close-btn" @click="deleteFile(index)">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  </Form>
</template>

<style>
.image-preview-wrapper {
  width: 140px;
  aspect-ratio: 1 / 1.5;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.close-btn {
  border: none;
  border-radius: 50%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2px;
  right: 2px;
}

.icon-back {
  font-size: 20px;
  cursor: pointer;
}
</style>
