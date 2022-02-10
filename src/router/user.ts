import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW} from '@/constants/tab';
import UserDetail from '@/views/user/detail/UserDetail.vue';
import UserList from '@/views/user/list/UserList.vue';
import UserDetailTabOverview from '@/views/user/detail/tabs/UserDetailTabOverview.vue';

export default [
  {
    name: 'UserList',
    path: 'users',
    component: UserList
  },
  {
    name: 'UserDetail',
    path: 'users/:id',
    redirect: to => {
      return {path: to.path + '/' + TAB_NAME_OVERVIEW};
    },
    component: UserDetail,
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: UserDetailTabOverview
      },
    ]
  },
] as Array<RouteRecordRaw>;
