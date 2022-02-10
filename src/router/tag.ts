import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW} from '@/constants/tab';
import TagList from '@/views/tag/list/TagList.vue';
import TagDetail from '@/views/tag/detail/TagDetail.vue';
import TagDetailTabOverview from '@/views/tag/detail/tabs/TagDetailTabOverview.vue';

const endpoint = 'tags';

export default [
  {
    name: 'TagList',
    path: endpoint,
    component: TagList
  },
  {
    name: 'TagDetail',
    path: `${endpoint}/:id`,
    redirect: to => {
      return {path: to.path + '/overview'};
    },
    component: TagDetail,
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: TagDetailTabOverview
      },
    ]
  }
] as Array<RouteRecordRaw>;
