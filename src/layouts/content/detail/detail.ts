import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {computed, onBeforeMount, onBeforeUnmount, onMounted, provide, ref} from 'vue';
import variables from '@/styles/variables.scss';
import {plainClone} from '@/utils/object';
import {getRoutePathByDepth, getTabName} from '@/utils/route';
import {ElMessage} from 'element-plus';
import {sendEvent} from '@/admin/umeng';
import {translate} from '@/utils/i18n';

// i18n
const t = translate;

const IGNORE_GET_ALL_NS = [
  'task',
];

const useDetail = <T = BaseModel>(ns: ListStoreNamespace) => {
  const router = useRouter();
  const route = useRoute();

  // store state
  const store = useStore();
  const state = store.state[ns] as BaseStoreState;
  const {
    form,
  } = state;

  const navSidebar = ref<NavSidebar | null>(null);

  const navActions = ref<NavActions | null>(null);

  const showActionsToggleTooltip = ref<boolean>(false);

  const navItems = computed<NavItem<T>[]>(() => state.allList.map((d: BaseModel) => {
    return {
      id: d._id,
      title: d.name,
    } as NavItem;
  }));

  const activeId = computed<string>(() => {
    const {id} = route.params;
    return id as string || form._id || '';
  });

  const activeTabName = computed<string>(() => getTabName(router));

  const sidebarCollapsed = computed<boolean>(() => state.sidebarCollapsed);

  const actionsCollapsed = computed<boolean>(() => state.actionsCollapsed);

  const tabs = computed(() => {
    return plainClone(state.tabs) as NavItem[];
  });

  const contentContainerStyle = computed(() => {
    return {
      height: `calc(100% - ${variables.navTabsHeight} - 1px${navActions.value ? ' - ' + navActions.value.getHeight() : ''})`,
    };
  });

  const primaryRoutePath = computed<string>(() => getRoutePathByDepth(route.path));

  const afterSave = computed<Function[]>(() => state.afterSave);

  const getForm = async () => {
    if (!activeId.value) return;
    return await store.dispatch(`${ns}/getById`, activeId.value);
  };

  const onNavSidebarSelect = async (id: string) => {
    if (!id) {
      console.error(new Error('id is empty'));
      return;
    }
    await router.push(`${primaryRoutePath.value}/${id}`);
    await getForm();

    sendEvent('click_detail_layout_nav_sidebar_select');
  };

  const onNavSidebarToggle = (value: boolean) => {
    if (value) {
      store.commit(`${ns}/collapseSidebar`);
    } else {
      store.commit(`${ns}/expandSidebar`);
    }

    sendEvent('click_detail_layout_nav_sidebar_toggle', {
      collapse: value
    });
  };

  const onActionsToggle = () => {
    showActionsToggleTooltip.value = false;
    if (actionsCollapsed.value) {
      store.commit(`${ns}/expandActions`);
    } else {
      store.commit(`${ns}/collapseActions`);
    }

    sendEvent('click_detail_layout_actions_toggle', {
      collapse: !actionsCollapsed.value,
    });
  };

  const onNavTabsSelect = (tabName: string) => {
    router.push(`${primaryRoutePath.value}/${activeId.value}/${tabName}`);

    sendEvent('click_detail_layout_nav_tabs_select', {
      tabName,
    });
  };

  const onNavTabsToggle = () => {
    if (!sidebarCollapsed.value) {
      store.commit(`${ns}/collapseSidebar`);
    } else {
      store.commit(`${ns}/expandSidebar`);
    }

    sendEvent('click_detail_layout_nav_tabs_toggle', {
      collapse: !sidebarCollapsed.value
    });
  };

  const onBack = () => {
    router.push(`${primaryRoutePath.value}`);

    sendEvent('click_detail_layout_on_back');
  };

  const onSave = async () => {
    if (!activeId.value) {
      console.error('Active id is empty');
      return;
    }
    await store.dispatch(`${ns}/updateById`, {id: activeId.value, form: state.form});
    ElMessage.success(t('common.message.success.save'));
    await Promise.all([
      store.dispatch(`${ns}/getAllList`),
      store.dispatch(`${ns}/getById`, activeId.value),
    ]);

    // after save
    afterSave.value.map(fn => fn());

    sendEvent('click_detail_layout_on_save');
  };

  // get form before mount
  onBeforeMount(getForm);

  // get all list before mount
  onBeforeMount(async () => {
    if (IGNORE_GET_ALL_NS.includes(ns)) return;
    await store.dispatch(`${ns}/getAllList`);
  });

  // scroll nav sidebar after mounted
  onMounted(() => {
    if (!navSidebar.value) return;
    navSidebar.value.scroll(activeId.value);
  });

  // reset form before unmount
  onBeforeUnmount(() => {
    if (!activeTabName.value) {
      store.commit(`${ns}/resetForm`);
    }
  });

  // store context
  provide<DetailStoreContext<T>>('store-context', {
    namespace: ns,
    store,
    state,
  });

  return {
    navItems,
    activeId,
    navSidebar,
    navActions,
    showActionsToggleTooltip,
    tabs,
    activeTabName,
    sidebarCollapsed,
    actionsCollapsed,
    contentContainerStyle,
    onNavSidebarSelect,
    onNavSidebarToggle,
    onActionsToggle,
    onNavTabsSelect,
    onNavTabsToggle,
    onBack,
    onSave,
  };
};

export default useDetail;
