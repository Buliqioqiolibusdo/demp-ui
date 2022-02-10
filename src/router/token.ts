import {RouteRecordRaw} from 'vue-router';
import TokenList from '@/views/token/list/TokenList.vue';

const endpoint = 'tokens';

export default [
  {
    name: 'TokenList',
    path: endpoint,
    component: TokenList
  },
] as Array<RouteRecordRaw>;
