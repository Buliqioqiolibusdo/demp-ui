import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW, TAB_NAME_TASKS} from '@/constants/tab';
import ScheduleList from '@/views/schedule/list/ScheduleList.vue';
import ScheduleDetail from '@/views/schedule/detail/ScheduleDetail.vue';
import ScheduleDetailTabOverview from '@/views/schedule/detail/tabs/ScheduleDetailTabOverview.vue';
import ScheduleDetailTabTasks from '@/views/schedule/detail/tabs/ScheduleDetailTabTasks.vue';

export default [
  {
    name: 'ScheduleList',
    path: 'schedules',
    component: ScheduleList
  },
  {
    name: 'ScheduleDetail',
    path: 'schedules/:id',
    redirect: to => {
      return {path: to.path + '/' + TAB_NAME_OVERVIEW};
    },
    component: ScheduleDetail,
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: ScheduleDetailTabOverview
      },
      {
        path: TAB_NAME_TASKS,
        component: ScheduleDetailTabTasks
      },
    ]
  },
] as Array<RouteRecordRaw>;
