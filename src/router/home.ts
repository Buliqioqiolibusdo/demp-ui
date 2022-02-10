import {RouteRecordRaw} from 'vue-router';
import Home from '@/views/home/Home.vue';

const endpoint = '';

export default [
  {
    name: 'Home',
    path: endpoint,
    component: Home,
  },
] as Array<RouteRecordRaw>;
