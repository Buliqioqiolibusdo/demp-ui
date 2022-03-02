   
import {RouteRecordRaw} from 'vue-router';
import MySettings from '@/views/misc/MySettings.vue';

const endpoint = 'misc';

export default [
  {
    name: 'MySettings',
    path: `${endpoint}/my-settings`,
    component: MySettings,
  },
] as Array<RouteRecordRaw>;