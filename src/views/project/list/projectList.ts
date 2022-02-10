import {computed, h} from 'vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';
import {useStore} from 'vuex';
import {ElMessageBox} from 'element-plus';
import useList from '@/layouts/content/list/list';
import useProjectService from '@/services/project/projectService';
import NavLink from '@/components/nav/NavLink.vue';
import {useRouter} from 'vue-router';
import TagList from '@/components/tag/TagList.vue';
import {TAB_NAME_SPIDERS} from '@/constants/tab';
import {translate} from '@/utils/i18n';
import {sendEvent} from '@/admin/umeng';

const useProjectList = () => {
  // router
  const router = useRouter();

  // store
  const ns = 'project';
  const store = useStore<RootStoreState>();
  const {commit} = store;

  // i18n
  const t = translate;

  // services
  const {
    deleteById,
    getList,
  } = useProjectService(store);

  // nav actions
  const navActions = computed<ListActionGroup[]>(() => [
    {
      name: 'common',
      children: [
        {
          buttonType: 'label',
          label: t('views.projects.navActions.new.label'),
          tooltip: t('views.projects.navActions.new.tooltip'),
          icon: ['fa', 'plus'],
          type: 'success',
          onClick: () => {
            commit(`${ns}/showDialog`, 'create');
          }
        }
      ]
    }
  ]);

  // table columns
  const tableColumns = computed<TableColumns<Project>>(() => [
    {
      key: 'name',
      label: t('views.projects.table.columns.name'),
      icon: ['fa', 'font'],
      width: '150',
      value: (row: Project) => h(NavLink, {
        path: `/projects/${row._id}`,
        label: row.name,
      }),
      hasSort: true,
      hasFilter: true,
      allowFilterSearch: true,
    },
    {
      key: 'spiders',
      label: t('views.projects.table.columns.spiders'),
      icon: ['fa', 'spider'],
      value: (row: Project) => h(NavLink, {
        path: `/projects/${row._id}/${TAB_NAME_SPIDERS}`,
        label: row.spiders,
      }),
      width: '120',
    },
    {
      key: 'tags',
      label: t('views.projects.table.columns.tags'),
      icon: ['fa', 'hashtag'],
      value: ({tags}: Project) => {
        return h(TagList, {tags});
      },
      width: '200',
    },
    {
      key: 'description',
      label: t('views.projects.table.columns.description'),
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
            router.push(`/projects/${row._id}`);

            sendEvent('click_project_list_actions_view');
          },
        },
        // {
        //   type: 'warning',
        //   icon: ['fa', 'edit'],
        //   tooltip: t('common.actions.edit'),
        //   onClick: (row) => {
        //     store.commit(`${ns}/setForm`, row);
        //     store.commit(`${ns}/showDialog`, 'edit');
        //   },
        // },
        // {
        //   type: 'info',
        //   size: 'mini',
        //   icon: ['fa', 'clone'],
        //   tooltip: t('common.actions.clone'),
        //   onClick: (row) => {
        //     console.log('clone', row);
        //   }
        // },
        {
          type: 'danger',
          size: 'mini',
          icon: ['fa', 'trash-alt'],
          tooltip: t('common.actions.delete'),
          onClick: async (row: Project) => {
            sendEvent('click_project_list_actions_delete');

            const res = await ElMessageBox.confirm(
              t('common.messageBox.confirm.delete'),
              t('common.actions.delete'),
              {
                type: 'warning',
                confirmButtonClass: 'el-button--danger'
              }
            );

            sendEvent('click_project_list_actions_delete_confirm');

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
  const opts = {
    navActions,
    tableColumns,
  } as UseListOptions<Project>;

  return {
    ...useList<Project>(ns, store, opts),
  };
};

export default useProjectList;
