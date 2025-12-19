import { createRouter, createWebHistory } from "vue-router";

import Layout from "../layouts/Layout.vue";
import Landing from "../pages/Landing.vue";
import JobDetails from "../pages/JobDetails.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/Akfa-Medline-Social",
      component: Layout,
      children: [
        {
          path: ":language?",
          name: "landing",
          component: Landing,
        },
        {
          path: ":language?/jobs/:jobid",
          name: "job-details",
          component: JobDetails,
          props: true, 
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
