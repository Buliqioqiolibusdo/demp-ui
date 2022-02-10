import useList from '@/layouts/content/list/list';
import {useStore} from 'vuex';
import {getDefaultUseListOptions, setupListComponent} from '@/utils/list';
import {computed, h} from 'vue';
import NodeType from '@/components/node/NodeType.vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';
import {ElMessageBox} from 'element-plus';
import useNodeService from '@/services/node/nodeService';
import NavLink from '@/components/nav/NavLink.vue';
import TagList from '@/components/tag/TagList.vue';
import {useRouter} from 'vue-router';
import NodeRunners from '@/components/node/NodeRunners.vue';
import Switch from '@/components/switch/Switch.vue';
import NodeStatus from '@/components/node/NodeStatus.vue';
import {
  NODE_STATUS_OFFLINE,
  NODE_STATUS_ONLINE,
  NODE_STATUS_REGISTERED,
  NODE_STATUS_UNREGISTERED
} from '@/constants/node';
import {translate} from '@/utils/i18n';
import {sendEvent} from '@/admin/umeng';

type Node = CNode;

const useNodeList = () => {
  // router
  const router = useRouter();

  // store
  const ns = 'node';
  const store = useStore<RootStoreState>();
  const {commit} = store;

  // i18n
  const t = translate;

  // services
  const {
    getList,
    deleteById,
  } = useNodeService(store);

  // nav actions
  const navActions = computed<ListActionGroup[]>(() => [
    {
      name: 'common',
      children: [
        {
          buttonType: 'label',
          label: t('views.nodes.navActions.new.label'),
          tooltip: t('views.nodes.navActions.new.tooltip'),
          icon: ['fa', 'plus'],
          type: 'success',
          onClick: () => {
            commit(`${ns}/showDialog`, 'create');

            sendEvent('click_node_list_new');
          }
        }
      ]
    }
  ]);

  // table columns
  const tableColumns = computed<TableColumns<Node>>(() => [
    {
      key: 'n', // name
      label: t('views.nodes.table.columns.name'),
      icon: ['fa', 'font'],
      width: '150',
      value: (row: Node) => h(NavLink, {
        path: `/nodes/${row._id}`,
        label: row.name,
      }),
      hasSort: true,
      hasFilter: true,
      allowFilterSearch: true,
    },
    {
      key: 'im', // is_master
      label: t('views.nodes.table.columns.nodeType'),
      icon: ['fa', 'list'],
      width: '150',
      value: (row: Node) => {
        return h(NodeType, {isMaster: row.is_master} as NodeTypeProps);
      },
      hasFilter: true,
      allowFilterItems: true,
      filterItems: [
        {label: t('components.node.nodeType.label.master'), value: true},
        {label: t('components.node.nodeType.label.worker'), value: false},
      ],
    },
    {
      key: 's', // status
      label: t('views.nodes.table.columns.status'),
      icon: ['fa', 'heartbeat'],
      width: '150',
      value: (row: Node) => {
        return h(NodeStatus, {status: row.status} as NodeStatusProps);
      },
      hasFilter: true,
      allowFilterItems: true,
      filterItems: [
        {label: t('components.node.nodeStatus.label.unregistered'), value: NODE_STATUS_UNREGISTERED},
        {label: t('components.node.nodeStatus.label.registered'), value: NODE_STATUS_REGISTERED},
        {label: t('components.node.nodeStatus.label.online'), value: NODE_STATUS_ONLINE},
        {label: t('components.node.nodeStatus.label.offline'), value: NODE_STATUS_OFFLINE},
      ],
    },
    {
      key: 'ip',
      label: t('views.nodes.table.columns.ip'),
      icon: ['fa', 'map-marker-alt'],
      width: '150',
      defaultHidden: true,
    },
    {
      key: 'mac',
      label: t('views.nodes.table.columns.mac'),
      icon: ['fa', 'map-marker-alt'],
      width: '150',
      defaultHidden: true,
    },
    {
      key: 'hostname',
      label: t('views.nodes.table.columns.hostname'),
      icon: ['fa', 'map-marker-alt'],
      width: '150',
      defaultHidden: true,
    },
    {
      key: 'runners',
      label: t('views.nodes.table.columns.runners'),
      icon: ['fa', 'play'],
      width: '160',
      value: (row: Node) => {
        if (row.max_runners === undefined ||
          !row.status ||
          ![NODE_STATUS_ONLINE, NODE_STATUS_OFFLINE].includes(row.status)
        ) return;
        return h(NodeRunners, {available: row.available_runners, max: row.max_runners} as NodeRunnersProps);
      },
    },
    {
      key: 'en', // enabled
      label: t('views.nodes.table.columns.enabled'),
      icon: ['fa', 'toggle-on'],
      width: '120',
      value: (row: Node) => {
        return h(Switch, {
          modelValue: row.enabled,
          'onUpdate:modelValue': async (value: boolean) => {
            row.enabled = value;
            await store.dispatch(`${ns}/updateById`, {id: row._id, form: row});

            value ? sendEvent('click_node_list_enable') : sendEvent('click_node_list_disable');
          },
        } as SwitchProps);
      },
      hasFilter: true,
      allowFilterItems: true,
      filterItems: [
        {label: t('common.control.enabled'), value: true},
        {label: t('common.control.disabled'), value: false},
      ]
    },
    {
      key: 'tags',
      label: t('views.nodes.table.columns.tags'),
      icon: ['fa', 'hashtag'],
      value: ({tags}: Node) => {
        return h(TagList, {tags});
      },
      width: '150',
    },
    {
      key: 'description',
      label: t('views.nodes.table.columns.description'),
      icon: ['fa', 'comment-alt'],
      width: 'auto',
      hasFilter: true,
      allowFilterSearch: true,
    },
    {
      key: TABLE_COLUMN_NAME_ACTIONS,
      label: t('components.table.columns.actions'),
      fixed: 'right',
      width: '200',
      buttons: [
        {
          type: 'primary',
          icon: ['fa', 'search'],
          tooltip: t('common.actions.view'),
          onClick: (row) => {
            router.push(`/nodes/${row._id}`);

            sendEvent('click_node_list_actions_view');
          },
        },
        // {
        //   type: 'info',
        //   size: 'mini',
        //   icon: ['fa', 'clone'],
        //   tooltip: 'Clone',
        //   onClick: (row) => {
        //     console.log('clone', row);
        //   }
        // },
        {
          type: 'danger',
          size: 'mini',
          icon: ['fa', 'trash-alt'],
          tooltip: t('common.actions.delete'),
          disabled: (row: Node) => !!row.active,
          onClick: async (row: Node) => {
            sendEvent('click_node_list_actions_delete');

            const res = await ElMessageBox.confirm(
              t('common.messageBox.message'),
              t('common.actions.delete'),
              {
                type: 'warning',
                confirmButtonClass: 'el-button--danger'
              }
            );

            sendEvent('click_node_list_actions_delete_confirm');

            if (res) {
              await deleteById(row._id as string);
            }
            await getList();
          },
        },
      ],
      disableTransfer: true,
    }
  ]);

  // options
  const opts = getDefaultUseListOptions<Node>(navActions, tableColumns);

  // init
  setupListComponent(ns, store, []);

  return {
    ...useList<Node>(ns, store, opts)
  };
};

export default useNodeList;
