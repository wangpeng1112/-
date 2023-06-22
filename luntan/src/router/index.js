import Vue from "vue";
import VueRouter from "vue-router";
import NotFoundComponent from "../components/NotFoundComponent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "forumhome",
    component: () => import("../components/forumHome/ForumHome.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue")
  },
  {
    path: "/loginbackstage",
    name: "loginbackstage",
    component: () => import("../components/backstagehome/LoginBackStage.vue")
  },

  {
    path: "/backstagehome",
    component: () => import("../components/backstagehome/BackStageHome.vue"),
    children: [
      {
        path: "/usermanger",
        name: "usermanger",
        component: () => import("../components/backstagehome/UserManger.vue")
      },
      {
        path: "/articlemanger",
        name: "articlemanger",
        component: () => import("../components/backstagehome/ArticleManger.vue")
      },
      {
        path: "/typemanger",
        name: "typemanger",
        component: () => import("../components/backstagehome/TypeManger.vue")
      }
    ]
  },
  {
    path: "/userhome",
    meta: { requireAuth: true },
    component: () => import("../components/userhome/UserHome")
  },
  {
    path: "/allarticlehome",
    component: () => import("../components/articlehome/allarticlehome")
  },

  {
    path: "/registerhome",
    component: () => import("../components/register/RegisterHome")
  },

  {
    path: "*",
    component: NotFoundComponent
  },
  {
    path: "/details",
    name: "Details",
    component: () => import("../components/articlehome/Details")
  },
  {
    path: "/postarticle",
    name: "PostArticle",
    component: () => import("../components/articlehome/PostArticle")
  },
  {
    path: "/guanzhu",
    name: "Guanzhu",
    component: () => import("../components/userhome/Guanzhu")
  },
  {
    path: "/fensi",
    name: "Fensi",
    component: () => import("../components/userhome/Fensi")
  },
  {
    path: "/massage",
    name: "massage",
    component: () => import("../components/userhome/massage")
  },
  {
    path: "/allmessage",
    name: "AllMessage",
    component: () => import("../components/userhome/AllMessage")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
