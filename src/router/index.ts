import { createRouter, createWebHistory } from "vue-router";

import Layout from "../layouts/layout.vue";
import Landing from "../pages/landing.vue";
import JobDetails from "../pages/jobDetails.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/Akfa-Medline-Social-Vue",
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
        },
      ],
    },
  ],
scrollBehavior(to, from, savedPosition) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (to.hash) {
        resolve({
          el: to.hash,
          behavior: 'smooth',
        })
      } else if (savedPosition) {
        resolve(savedPosition)
      } else {
        resolve({ top: 0 })
      }
      from;
    }, 100)
  })
}
});

export default router;
