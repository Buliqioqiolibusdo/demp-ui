import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW, TAB_NAME_TASKS} from '@/constants/tab';
import NodeList from '@/views/node/list/NodeList.vue';
import NodeDetail from '@/views/node/detail/NodeDetail.vue';
import NodeDetailTabOverview from '@/views/node/detail/tabs/NodeDetailTabOverview.vue';
import NodeDetailTabTasks from '@/views/node/detail/tabs/NodeDetailTabTasks.vue';

const endpoint = 'nodes';

export default [
  {
    name: 'NodeList',
    path: endpoint,
    component: NodeList
  },
  {
    name: 'NodeDetail',
    path: `${endpoint}/:id`,
    redirect: to => {
      return {path: to.path + '/' + TAB_NAME_OVERVIEW};
    },
    component: NodeDetail,
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: NodeDetailTabOverview
      },
      {
        path: TAB_NAME_TASKS,
        component: NodeDetailTabTasks
      }
    ]
  },
] as Array<RouteRecordRaw>;
