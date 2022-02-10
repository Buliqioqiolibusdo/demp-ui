import {computed, h} from 'vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';
import {useStore} from 'vuex';
import {ElMessageBox} from 'element-plus';
import useList from '@/layouts/content/list/list';
import useUserService from '@/services/user/userService';
import NavLink from '@/components/nav/NavLink.vue';
import {useRouter} from 'vue-router';
import UserRole from '@/components/user/UserRole.vue';
import {ROLE_ADMIN, ROLE_NORMAL, USERNAME_ADMIN} from '@/constants/user';
import {translate} from '@/utils/i18n';
import {sendEvent} from '@/admin/umeng';

// i18n
const t = translate;

const useUserList = () => {
  // router
  const router = useRouter();

  // store
  const ns = 'user';
  const store = useStore<RootStoreState>();
  const {commit} = store;

  // services
  const {
    deleteById,
    getList,
  } = useUserService(store);

  // nav actions
  const navActions = computed<ListActionGroup[]>(() => [
    {
      name: 'common',
      children: [
        {
          buttonType: 'label',
          label: t('views.users.navActions.new.label'),
          tooltip: t('views.users.navActions.new.tooltip'),
          icon: ['fa', 'plus'],
          type: 'success',
          onClick: () => {
            commit(`${ns}/showDialog`, 'create');

            sendEvent('click_user_list_new');
          }
        }
      ]
    }
  ]);

  // table columns
  const tableColumns = computed<TableColumns<User>>(() => [
    {
      key: 'username',
      label: t('views.users.table.columns.username'),
      icon: ['fa', 'font'],
      width: '180',
      value: (row: User) => h(NavLink, {
        path: `/users/${row._id}`,
        label: row.username,
      }),
      hasSort: true,
      hasFilter: true,
      allowFilterSearch: true,
    },
    {
      key: 'email',
      label: t('views.users.table.columns.email'),
      icon: ['fa', 'at'],
      width: '180',
      hasSort: true,
      hasFilter: true,
      allowFilterSearch: true,
    },
    {
      key: 'role',
      label: t('views.users.table.columns.role'),
      icon: ['fa', 'font'],
      width: '150',
      value: (row: User) => h(UserRole, {role: row.role} as UserRoleProps),
      hasFilter: true,
      allowFilterItems: true,
      filterItems: [
        {label: t('components.user.role.admin'), value: ROLE_ADMIN},
        {label: t('components.user.role.normal'), value: ROLE_NORMAL},
      ],
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
            router.push(`/users/${row._id}`);

            sendEvent('click_user_list_actions_view');
          },
        },
        {
          type: 'danger',
          size: 'mini',
          icon: ['fa', 'trash-alt'],
          tooltip: (row: User) => row.username === USERNAME_ADMIN ? t('components.user.delete.tooltip.adminUserNonDeletable') : t('common.actions.delete'),
          disabled: (row: User) => row.username === USERNAME_ADMIN,
          onClick: async (row: User) => {
            sendEvent('click_user_list_actions_delete');

            const res = await ElMessageBox.confirm(
              t('common.messageBox.confirm.delete'),
              t('common.actions.delete'),
              {
                type: 'warning',
                confirmButtonClass: 'el-button--danger',
              }
            );

            sendEvent('click_user_list_actions_delete_confirm');

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

  const selectableFunction = (row: User) => {
    return row.username !== USERNAME_ADMIN;
  };

  // options
  const opts = {
    navActions,
    tableColumns,
  } as UseListOptions<User>;

  return {
    ...useList<User>(ns, store, opts),
    selectableFunction,
  };
};

export default useUserList;
