import Vue from "vue";
import Router from "vue-router";

import VueRouter from "vue-router";
import {routes} from "../routes.js"

Vue.use(Router);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router
/*export default new Router({
    mode: "history",
    routes: [
        {
        path: "/",
        alias: "/news",
        name: "news",
        component: () => import("./components/NewsList")
        },
        {
        path: "/news/:id",
        name: "news-details",
        component: () => import("./components/News")
        },
        // {
        // path: "/add",
        // name: "add",
        // component: () => import("./components/AddTutorial")
        // }
    ]
});*/
