import DefaultLayout from "@/components/DefaultLayout.vue";
import routePaths from "@/config/routes";
import AuthorListSearch from "@/views/AuthorListSearch.vue";
import BookEdit from "@/views/BookEdit.vue";
import BookListSearch from "@/views/BookListSearch.vue";
import CategoryListSearch from "@/views/CategoryListSearch.vue";
import ConfigurationListSearch from "@/views/ConfigurationListSearch.vue";
import LoanSlipDetail from "@/views/LoanSlipDetail.vue";
import LoanSlipListSearch from "@/views/LoanSlipListSearch.vue";
import PenaltyTicketDetail from "@/views/PenaltyTicketDetail.vue";
import PenaltyTicketListSearch from "@/views/PenaltyTicketListSearch.vue";
import Profile from "@/views/Profile.vue";
import PublisherListSearch from "@/views/PublisherListSearch.vue";
import ReaderListSearch from "@/views/ReaderListSearch.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import StaffListSearch from "@/views/StaffListSearch.vue";
import { createWebHistory, createRouter } from "vue-router";

const ifLoggedInRedirectToHome = (to, from, next) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        next({ name: 'books' });
    } else {
        next();
    }
};

const ifNotLoggedInRedirectToSignin = (to, from, next) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        next({ name: 'signin' });
    } else {
        next();
    }
};

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        beforeEnter: ifNotLoggedInRedirectToSignin,
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
            {
                path: routePaths.loanSlip,
                name: "loanSlip",
                component: LoanSlipListSearch,
            },
            {
                path: routePaths.loanSlip + "/:id",
                name: "loanSlip.detail",
                component: LoanSlipDetail,
                props: true
            },
            {
                path: routePaths.penaltyTicket,
                name: "penaltyTicket",
                component: PenaltyTicketListSearch,
            },
            {
                path: routePaths.penaltyTicket + "/:id",
                name: "penaltyTicket.detail",
                component: PenaltyTicketDetail,
                props: true
            },
            {
                path: routePaths.staffs,
                name: "staff",
                component: StaffListSearch,
            },
            {
                path: routePaths.readers,
                name: "reader",
                component: ReaderListSearch,
            },
            {
                path: routePaths.profile,
                name: "profile",
                component: Profile,
            },
        ]
    },
    {
        path: routePaths.signup,
        name: "signup",
        component: SignUp,
        beforeEnter: ifLoggedInRedirectToHome
    },
    {
        path: routePaths.signin,
        name: "signin",
        component: SignIn,
        beforeEnter: ifLoggedInRedirectToHome
    },
    {
        path: routePaths.password + "/reset",
        name: "password.reset",
        component: ResetPassword,
        beforeEnter: ifLoggedInRedirectToHome
    }

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;