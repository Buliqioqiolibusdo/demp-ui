import {RouteRecordRaw} from 'vue-router';
import Login from '@/views/login/Login.vue';

const endpoint = '/login';

export default [
  {
    name: 'Login',
    path: endpoint,
    component: Login,
  },
] as Array<RouteRecordRaw>;
