import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW} from '@/constants/tab';
import PluginList from '@/views/plugin/list/PluginList.vue';
import PluginDetailTabOverview from '@/views/plugin/detail/tabs/PluginDetailTabOverview.vue';
import PluginDetail from '@/views/plugin/detail/PluginDetail.vue';

const endpoint = 'plugins';

export default [
  {
    name: 'PluginList',
    path: endpoint,
    component: PluginList
  },
  {
    name: 'PluginDetail',
    path: `${endpoint}/:id`,
    redirect: to => {
      return {path: to.path + '/' + TAB_NAME_OVERVIEW};
    },
    component: PluginDetail,
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: PluginDetailTabOverview
      },
    ]
  },
] as Array<RouteRecordRaw>;
