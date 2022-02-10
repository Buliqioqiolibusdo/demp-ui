import {Router} from 'vue-router';
import {sendPv} from '@/utils/admin';

export const initRouterStats = (router: Router) => {
  router.afterEach(async (to, from, next) => {
    if (to.path) {
      sendPv(to.path);
    }
  });
};
