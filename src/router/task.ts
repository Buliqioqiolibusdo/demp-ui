import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_DATA, TAB_NAME_LOGS, TAB_NAME_OVERVIEW} from '@/constants/tab';
import TaskList from '@/views/task/list/TaskList.vue';
import TaskDetail from '@/views/task/detail/TaskDetail.vue';
import TaskDetailTabOverview from '@/views/task/detail/tabs/TaskDetailTabOverview.vue';
import TaskDetailTabData from '@/views/task/detail/tabs/TaskDetailTabData.vue';
import TaskDetailTabLogs from '@/views/task/detail/tabs/TaskDetailTabLogs.vue';

const endpoint = 'tasks';

export default [
  {
    name: 'TaskList',
    path: endpoint,
    component: TaskList
  },
  {
    name: 'TaskDetail',
    path: `${endpoint}/:id`,
    redirect: to => {
      return {path: to.path + '/overview'};
    },
    component: TaskDetail,
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: TaskDetailTabOverview
      },
      {
        path: TAB_NAME_LOGS,
        component: TaskDetailTabLogs
      },
      {
        path: TAB_NAME_DATA,
        component: TaskDetailTabData
      },
    ]
  },
] as Array<RouteRecordRaw>;
