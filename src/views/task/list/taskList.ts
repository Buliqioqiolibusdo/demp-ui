import useList from '@/layouts/content/list/list';
import {useStore} from 'vuex';
import {computed, h} from 'vue';
import NavLink from '@/components/nav/NavLink.vue';
import TaskStatus from '@/components/task/TaskStatus.vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';
import {useRouter} from 'vue-router';
import {ElMessage, ElMessageBox} from 'element-plus';
import useRequest from '@/services/request';
import TaskPriority from '@/components/task/TaskPriority.vue';
import NodeType from '@/components/node/NodeType.vue';
import Time from '@/components/time/Time.vue';
import Duration from '@/components/time/Duration.vue';
import {setupListComponent} from '@/utils/list';
import {isCancellable} from '@/utils/task';
import TaskResults from '@/components/task/TaskResults.vue';
import useNode from '@/components/node/node';
import useSpider from '@/components/spider/spider';
import {
  TASK_STATUS_CANCELLED,
  TASK_STATUS_ERROR,
  TASK_STATUS_FINISHED,
  TASK_STATUS_PENDING,
  TASK_STATUS_RUNNING
} from '@/constants/task';
import useTask from '@/components/task/task';
import {translate} from '@/utils/i18n';
import {sendEvent} from '@/admin/umeng';

const {
  post,
} = useRequest();

const useTaskList = () => {
  // i18n
  const t = translate;

  // store
  const ns = 'task';
  const store = useStore<RootStoreState>();
  const {commit} = store;

  // router
  const router = useRouter();

  // use list
  const {
    actionFunctions,
  } = useList<Task>(ns, store);

  // action functions
  const {
    deleteByIdConfirm,
  } = actionFunctions;

  // all node dict
  const allNodeDict = computed<Map<string, CNode>>(() => store.getters['node/allDict']);

  // all spider dict
  const allSpiderDict = computed<Map<string, Spider>>(() => store.getters['spider/allDict']);

  // nav actions
  const navActions = computed<ListActionGroup[]>(() => [
    {
      name: 'common',
      children: [
        {
          buttonType: 'label',
          label: t('views.tasks.navActions.new.label'),
          tooltip: t('views.tasks.navActions.new.tooltip'),
          icon: ['fa', 'plus'],
          type: 'success',
          onClick: () => {
            commit(`${ns}/showDialog`, 'create');

            sendEvent('click_task_list_new');
          }
        }
      ]
    }
  ]);

  const {
    allListSelectOptions: allNodeListSelectOptions,
  } = useNode(store);

  const {
    allListSelectOptions: allSpiderListSelectOptions,
  } = useSpider(store);

  const {
    priorityOptions,
  } = useTask(store);

  // table columns
  const tableColumns = computed<TableColumns<Task>>(() => [
    {
      key: 'node_id',
      label: t('views.tasks.table.columns.node'),
      icon: ['fa', 'server'],
      width: '160',
      value: (row: Task) => {
        if (!row.node_id) return;
        const node = allNodeDict.value.get(row.node_id);
        if (!node) return;
        return h(NodeType, {
          isMaster: node?.is_master,
          label: node?.name,
          onClick: () => {
            router.push(`/nodes/${node?._id}`);

            sendEvent('click_task_list_actions_view');
          }
        } as NodeTypeProps);
      },
      hasFilter: true,
      allowFilterSearch: true,
      allowFilterItems: true,
      filterItems: allNodeListSelectOptions.value,
    },
    {
      key: 'spider_id',
      label: t('views.tasks.table.columns.spider'),
      icon: ['fa', 'spider'],
      width: '160',
      value: (row: Task) => {
        if (!row.spider_id) return;
        const spider = allSpiderDict.value.get(row.spider_id);
        return h(NavLink, {
          label: spider?.name,
          path: `/spiders/${spider?._id}`,
        });
      },
      hasFilter: true,
      allowFilterSearch: true,
      allowFilterItems: true,
      filterItems: allSpiderListSelectOptions.value,
    },
    {
      key: 'priority',
      label: t('views.tasks.table.columns.priority'),
      icon: ['fa', 'sort-numeric-down'],
      width: '120',
      value: (row: Task) => {
        return h(TaskPriority, {priority: row.priority} as TaskPriorityProps);
      },
      hasSort: true,
      hasFilter: true,
      allowFilterItems: true,
      filterItems: priorityOptions,
    },
    {
      key: 'status',
      label: t('views.tasks.table.columns.status'),
      icon: ['fa', 'check-square'],
      width: '120',
      value: (row: Task) => {
        return h(TaskStatus, {status: row.status, error: row.error} as TaskStatusProps);
      },
      hasFilter: true,
      allowFilterItems: true,
      filterItems: [
        {label: t('components.task.status.label.pending'), value: TASK_STATUS_PENDING},
        {label: t('components.task.status.label.running'), value: TASK_STATUS_RUNNING},
        {label: t('components.task.status.label.finished'), value: TASK_STATUS_FINISHED},
        {label: t('components.task.status.label.error'), value: TASK_STATUS_ERROR},
        {label: t('components.task.status.label.cancelled'), value: TASK_STATUS_CANCELLED},
      ],
    },
    {
      key: 'priority',
      label: t('views.tasks.table.columns.priority'),
      icon: ['fa', 'sort-numeric-down'],
      width: '120',
      value: (row: Task) => {
        return h(TaskPriority, {priority: row.priority} as TaskPriorityProps);
      },
      hasSort: true,
      hasFilter: true,
      allowFilterItems: true,
      filterItems: priorityOptions,
    },
    {
      key: 'stat.create_ts',
      label: t('views.tasks.table.columns.stat.create_ts'),
      icon: ['fa', 'clock'],
      width: '120',
      value: (row: Task) => {
        if (!row.stat?.create_ts || row.stat?.create_ts.startsWith('000')) return;
        return h(Time, {time: row.stat?.create_ts as string} as TimeProps);
      },
      defaultHidden: true,
    },
    {
      key: 'stat.start_ts',
      label: t('views.tasks.table.columns.stat.start_ts'),
      icon: ['fa', 'clock'],
      width: '120',
      value: (row: Task) => {
        if (!row.stat?.start_ts || row.stat?.start_ts.startsWith('000')) return;
        return h(Time, {time: row.stat?.start_ts as string} as TimeProps);
      },
    },
    {
      key: 'stat.end_ts',
      label: t('views.tasks.table.columns.stat.end_ts'),
      icon: ['fa', 'clock'],
      width: '120',
      value: (row: Task) => {
        if (!row.stat?.end_ts || row.stat?.end_ts.startsWith('000')) return;
        return h(Time, {time: row.stat?.end_ts as string} as TimeProps);
      },
    },
    {
      key: 'stat.wait_duration',
      label: t('views.tasks.table.columns.stat.wait_duration'),
      icon: ['fa', 'stopwatch'],
      width: '160',
      value: (row: Task) => {
        if (!row.stat?.wait_duration) return;
        return h(Duration, {duration: row.stat?.wait_duration as number} as DurationProps);
      },
      defaultHidden: true,
    },
    {
      key: 'stat.runtime_duration',
      label: t('views.tasks.table.columns.stat.runtime_duration'),
      icon: ['fa', 'stopwatch'],
      width: '160',
      value: (row: Task) => {
        if (!row.stat?.runtime_duration) return;
        return h(Duration, {duration: row.stat?.runtime_duration as number} as DurationProps);
      },
      defaultHidden: true,
    },
    {
      key: 'stat.total_duration',
      label: t('views.tasks.table.columns.stat.total_duration'),
      icon: ['fa', 'stopwatch'],
      width: '160',
      value: (row: Task) => {
        if (!row.stat?.total_duration) return;
        return h(Duration, {duration: row.stat?.total_duration as number} as DurationProps);
      },
    },
    {
      key: 'stat.result_count',
      label: t('views.tasks.table.columns.stat.results'),
      icon: ['fa', 'table'],
      width: '150',
      value: (row: Task) => {
        if (row.stat?.result_count === undefined) return;
        return h(TaskResults, {results: row.stat.result_count, status: row.status} as TaskResultsProps);
      },
    },
    {
      key: TABLE_COLUMN_NAME_ACTIONS,
      label: t('components.table.columns.actions'),
      icon: ['fa', 'tools'],
      width: '180',
      fixed: 'right',
      buttons: (row) => [
        {
          type: 'primary',
          size: 'mini',
          icon: ['fa', 'search'],
          tooltip: t('common.actions.view'),
          onClick: (row) => {
            router.push(`/tasks/${row._id}`);

            sendEvent('click_task_list_actions_view');
          }
        },
        {
          type: 'warning',
          size: 'mini',
          icon: ['fa', 'redo'],
          tooltip: t('common.actions.restart'),
          onClick: async (row) => {
            sendEvent('click_task_list_actions_restart');

            await ElMessageBox.confirm(
              t('common.messageBox.confirm.restart'),
              t('common.actions.restart'),
              {type: 'warning'},
            );

            sendEvent('click_task_list_actions_restart_confirm');

            await post(`/tasks/${row._id}/restart`);
            await ElMessage.success(t('common.message.success.restart'));
            await store.dispatch(`task/getList`);
          }
        },
        isCancellable(row.status) ?
          {
            type: 'info',
            size: 'mini',
            icon: ['fa', 'stop'],
            tooltip: t('common.actions.cancel'),
            onClick: async (row: Task) => {
              sendEvent('click_task_list_actions_cancel');

              await ElMessageBox.confirm(
                t('common.messageBox.confirm.cancel'),
                t('common.actions.cancel'),
                {type: 'warning'},
              );

              sendEvent('click_task_list_actions_cancel_confirm');

              await ElMessage.info(t('common.message.info.cancel'));
              await post(`/tasks/${row._id}/cancel`);
              await store.dispatch(`${ns}/getList`);
            },
          }
          :
          {
            type: 'danger',
            size: 'mini',
            icon: ['fa', 'trash-alt'],
            tooltip: t('common.actions.delete'),
            onClick: deleteByIdConfirm,
          },
      ],
      disableTransfer: true,
    },
  ]);

  // options
  const opts = {
    navActions,
    tableColumns,
  } as UseListOptions<Task>;

  // init
  setupListComponent(ns, store, ['node', 'project', 'spider']);

  return {
    ...useList<Task>(ns, store, opts),
  };
};

export default useTaskList;
