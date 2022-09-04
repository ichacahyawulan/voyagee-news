import CategoryDataService from "./services/CategoryDataService.js"
import NewsDataService from "./services/NewsDataService.js"

export const routes = [
    {
        path: '/login',
        name: 'login',
        component:() => import("./components/Login.vue"),
    },
    {
        path: '/signup',
        name: 'signup',
        component:() => import("./components/SignUp.vue"),
    },
    {
        path: '/admin',
        component:() => import("./components/admin/Cms.vue"),
        meta: { sitemap: { ignoreRoute: true } },
        children: [
            {
                path: '/admin/dashboard',
                name: 'Dashboard',
                component: () => import("./components/admin/Dashboard.vue"),
            },
            {
                path: '/admin/addCategories',
                name: 'addCategories',
                component: () => import("./components/admin/AddCategories2.vue"),
            },
            {
                path: '/admin/postArticle',
                name: 'PostArticle',
                component: () => import("./components/admin/PostArticle.vue"),
            },
            {
                path: '/admin/listArticle',
                name: 'ListArticle',
                component: () => import("./components/admin/ListArticle.vue"),
            },
            {
                path: '/admin/listCategories',
                name: 'ListCategories',
                component: () => import("./components/admin/ListCategories.vue"),
            },
            {
                path: '/admin/listUser',
                name: 'ListUser',
                component: () => import("./components/admin/ListUser.vue"),
            },
            {
                path: '/admin/addAdmin',
                name: 'AddAdmin',
                component: () => import("./components/admin/AddAdmin.vue"),
            },
            {
                path: '/admin/news/:id',
                name: 'news-details',
                component: () => import("./components/admin/EditArticle.vue"),
            },
        ]
    },

    {
        path: '/',
        component: () => import("./components/user/NavBar.vue"),
        children: [
            {
                path: '/',
                name: 'news-list-first',
                component: () => import("./components/user/LandingPage.vue")
            },
            {
                path: '/news',
                name: 'news-list',
                component: () => import("./components/user/LandingPage.vue")
            },
            // {
            //     path: '/userProfil',
            //     name: 'user',
            //     component: () => import("./components/user/UserProfil.vue")
            // },
            {
                path: '/editProfil',
                name: 'editUser',
                component: () => import("./components/user/userEditProfil.vue")
            },
            {
                path: '/news/id/:id',
                meta: {
                    sitemap: {
                        // Slugs can also be provided asynchronously
                        // The callback must always return an array
                        slugs: async () => await NewsDataService.getAllNewsSitemap(),
                    }},
                name: 'News',
                component: () => import("./components/user/News.vue")
            },
            {
                path: '/newsList/:category',
                meta: {
                    sitemap: {
                        // Slugs can also be provided asynchronously
                        // The callback must always return an array
                        slugs: async () => await CategoryDataService.getAllCategorySitemap(),
                    }},
                name: 'NewsList',
                component: () => import("./components/user/NewsList.vue")
            },
            {
                path: '/users',
                name: 'userProfile',
                component: () => import("./components/user/UserProfile.vue")
            },
        ]
    }

]