import {RouteRecordRaw} from 'vue-router';
import Disclaimer from '@/views/misc/Disclaimer.vue';
import MySettings from '@/views/misc/MySettings.vue';

const endpoint = 'misc';

export default [
  {
    name: 'Disclaimer',
    path: `${endpoint}/disclaimer`,
    component: Disclaimer,
  },
  {
    name: 'MySettings',
    path: `${endpoint}/my-settings`,
    component: MySettings,
  },
] as Array<RouteRecordRaw>;
