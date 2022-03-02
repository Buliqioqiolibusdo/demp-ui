import {RouteRecordRaw} from 'vue-router';
import iframsViews from '@/views/ifm/index.vue';

const endpoint = 'ifm';

export default [
  {
    name: 'iframsViews',
    path: endpoint,
    component: iframsViews
  },
] as Array<RouteRecordRaw>;
