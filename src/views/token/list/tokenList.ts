import useList from '@/layouts/content/list/list';
import {useStore} from 'vuex';
import {computed} from 'vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';
import {ElMessage, ElMessageBox} from 'element-plus';
import useClipboard from 'vue-clipboard3';
import {translate} from '@/utils/i18n';
import {sendEvent} from '@/admin/umeng';

// i18n
const t = translate;

const useTokenList = () => {
  const ns = 'token';
  const store = useStore<RootStoreState>();

  // use list
  const {
    actionFunctions,
  } = useList<Token>(ns, store);

  // action functions
  const {
    deleteByIdConfirm,
  } = actionFunctions;

  // clipboard
  const {toClipboard} = useClipboard();

  // nav actions
  const navActions = computed<ListActionGroup[]>(() => [
    {
      name: 'common',
      children: [
        {
          buttonType: 'label',
          label: t('views.tokens.navActions.new.label'),
          tooltip: t('views.tokens.navActions.new.tooltip'),
          icon: ['fa', 'plus'],
          type: 'success',
          onClick: async () => {
            sendEvent('click_token_list_new');

            const res = await ElMessageBox.prompt(
              t('views.tokens.messageBox.prompt.create'),
              t('common.actions.create'),
            );

            sendEvent('click_token_list_new_confirm');

            const name = res.value;
            const token = {
              name,
            } as Token;
            await store.dispatch(`${ns}/create`, token);
            await store.dispatch(`${ns}/getList`);
          },
        }
      ]
    }
  ]);

  // table columns
  const tableColumns = computed<TableColumns<Token>>(() => [
    {
      key: 'name',
      label: t('views.tokens.table.columns.name'),
      icon: ['fa', 'font'],
      width: '160',
      hasFilter: true,
      allowFilterSearch: true,
    },
    {
      key: 'token',
      label: t('views.tokens.table.columns.token'),
      icon: ['fa', 'key'],
      width: 'auto',
      value: (row: Token) => {
        if (!row._visible) {
          return (() => {
            const arr = [] as string[];
            for (let i = 0; i < 100; i++) {
              arr.push('*');
            }
            return arr.join('');
          })();
        } else {
          return row.token;
        }
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
          icon: !row._visible ? ['fa', 'eye'] : ['fa', 'eye-slash'],
          tooltip: !row._visible ? t('common.actions.view') : t('common.actions.hide'),
          onClick: async (row: Token) => {
            row._visible = !row._visible;

            row._visible ? sendEvent('click_token_list_actions_hide') : sendEvent('click_token_list_actions_show');
          },
        },
        {
          type: 'info',
          size: 'mini',
          icon: ['far', 'clipboard'],
          tooltip: t('common.actions.copy'),
          onClick: async (row: Token) => {
            if (!row.token) return;
            await toClipboard(row.token);
            await ElMessage.success(t('common.message.success.copy'));

            sendEvent('click_token_list_actions_copy');
          },
        },
        {
          type: 'danger',
          size: 'mini',
          icon: ['fa', 'trash-alt'],
          tooltip: t('common.actions.edit'),
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
  } as UseListOptions<Token>;

  return {
    ...useList<Token>(ns, store, opts),
  };
};

export default useTokenList;
