import DefaultLayout from "@/components/DefaultLayout.vue";
import routePaths from "@/config/routes";
import AuthorListSearch from "@/views/AuthorListSearch.vue";
import BookEdit from "@/views/BookEdit.vue";
import BookListSearch from "@/views/BookListSearch.vue";
import CategoryListSearch from "@/views/CategoryListSearch.vue";
import ConfigurationListSearch from "@/views/ConfigurationListSearch.vue";
import PublisherListSearch from "@/views/PublisherListSearch.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                path: routePaths.books,
                name: "books",
                component: BookListSearch,
            },
            {
                path: routePaths.bookAdd,
                name: "book-add",
                component: BookEdit,
            },
            {
                path: routePaths.bookEdit,
                name: "book-edit",
                component: BookEdit,
                props: true
            },
            {
                path: routePaths.categories,
                name: "categories",
                component: CategoryListSearch,
            },
            {
                path: routePaths.authors,
                name: "authors",
                component: AuthorListSearch,
            },
            {
                path: routePaths.publishers,
                name: "publisher",
                component: PublisherListSearch,
            },
            {
                path: routePaths.configurations,
                name: "configurations",
                component: ConfigurationListSearch,
            },


        ]
    },
    {
        path: routePaths.signup,
        name: "signup",
        component: SignUp
    },
    {
        path: routePaths.signin,
        name: "signin",
        component: SignIn
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;