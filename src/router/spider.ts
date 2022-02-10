import {RouteRecordRaw} from 'vue-router';
import {
  TAB_NAME_DATA,
  TAB_NAME_FILES, TAB_NAME_GIT,
  TAB_NAME_OVERVIEW,
  TAB_NAME_SCHEDULES,
  TAB_NAME_SETTINGS,
  TAB_NAME_TASKS
} from '@/constants/tab';
import SpiderList from '@/views/spider/list/SpiderList.vue';
import SpiderDetail from '@/views/spider/detail/SpiderDetail.vue';
import SpiderDetailTabOverview from '@/views/spider/detail/tabs/SpiderDetailTabOverview.vue';
import SpiderDetailTabFiles from '@/views/spider/detail/tabs/SpiderDetailTabFiles.vue';
import SpiderDetailTabGit from '@/views/spider/detail/tabs/SpiderDetailTabGit.vue';
import SpiderDetailTabTasks from '@/views/spider/detail/tabs/SpiderDetailTabTasks.vue';
import SpiderDetailTabSchedules from '@/views/spider/detail/tabs/SpiderDetailTabSchedules.vue';
import SpiderDetailTabData from '@/views/spider/detail/tabs/SpiderDetailTabData.vue';
import SpiderDetailTabSettings from '@/views/spider/detail/tabs/SpiderDetailTabSettings.vue';

export default [
  {
    name: 'SpiderList',
    path: 'spiders',
    component: SpiderList
  },
  {
    name: 'SpiderDetail',
    path: 'spiders/:id',
    redirect: to => {
      return {path: to.path + '/' + TAB_NAME_OVERVIEW};
    },
    component: SpiderDetail,
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: SpiderDetailTabOverview
      },
      {
        path: TAB_NAME_FILES,
        component: SpiderDetailTabFiles
      },
      {
        path: TAB_NAME_GIT,
        component: SpiderDetailTabGit
      },
      {
        path: TAB_NAME_TASKS,
        component: SpiderDetailTabTasks
      },
      {
        path: TAB_NAME_SCHEDULES,
        component: SpiderDetailTabSchedules
      },
      {
        path: TAB_NAME_DATA,
        component: SpiderDetailTabData
      },
      {
        path: TAB_NAME_SETTINGS,
        component: SpiderDetailTabSettings
      },
    ]
  },
] as Array<RouteRecordRaw>;
