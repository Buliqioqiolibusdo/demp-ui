import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW, TAB_NAME_SPIDERS} from '@/constants/tab';
import ProjectDetail from '@/views/project/detail/ProjectDetail.vue';
import ProjectList from '@/views/project/list/ProjectList.vue';
import ProjectDetailTabOverview from '@/views/project/detail/tabs/ProjectDetailTabOverview.vue';
import ProjectDetailTabSpiders from '@/views/project/detail/tabs/ProjectDetailTabSpiders.vue';

const endpoint = 'projects';

export default [
  {
    name: 'ProjectList',
    path: endpoint,
    component: ProjectList,
  },
  {
    name: 'ProjectDetail',
    path: `${endpoint}/:id`,
    redirect: to => {
      return {path: to.path + '/overview'};
    },
    component: ProjectDetail,
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: ProjectDetailTabOverview
      },
      {
        path: TAB_NAME_SPIDERS,
        component: ProjectDetailTabSpiders
      },
    ]
  },
] as Array<RouteRecordRaw>;
