<template>
  <NavTabs
      :active-key="activeTabKey"
      :items="tabItems"
      @select="onTabSelect"
  >
    <template #extra>
      <div
          class="actions"
      >
        <el-radio-group
            v-if="activeTabKey === 'references'"
            v-model="internalGitRefType"
            size="mini"
            class="ref-type-select"
            @change="onRefTypeChange"
        >
          <el-radio-button :label="GIT_REF_TYPE_BRANCH">
            <el-tooltip :content="t('components.git.references.type.branch')">
              <font-awesome-icon :icon="['fa', 'code-branch']"/>
            </el-tooltip>
          </el-radio-button>
          <el-radio-button :label="GIT_REF_TYPE_TAG">
            <el-tooltip :content="t('components.git.references.type.tag')">
              <font-awesome-icon :icon="['fa', 'tag']"/>
            </el-tooltip>
          </el-radio-button>
        </el-radio-group>
        <LabelButton
            :type="!loading.checkout ? 'primary' : 'warning'"
            :icon="!loading.checkout ? ['fa', 'code-branch'] : null"
            :label="t('components.git.actions.label.checkout')"
            :tooltip="t('components.git.actions.tooltip.checkout')"
            :disabled="!gitForm.url || !gitForm.auth_type"
            :loading="loading.checkout"
            @click="onClickCheckout"
        />
        <LabelButton
            :type="!loading.pull ? 'primary' : 'warning'"
            :icon="!loading.pull ? ['fa', 'download'] : null"
            :label="t('components.git.actions.label.pull')"
            :tooltip="t('components.git.actions.tooltip.pull')"
            :disabled="!gitForm.url || !gitForm.auth_type"
            :loading="loading.pull"
            @click="onClickPull"
        />
        <LabelButton
            :type="!loading.commit ? 'success' : 'warning'"
            :icon="!loading.commit ? ['fa', 'paper-plane'] : null"
            :label="t('components.git.actions.label.commit')"
            :tooltip="t('components.git.actions.tooltip.commit')"
            :disabled="!gitChangeSelection?.length"
            :loading="loading.commit"
            @click="onClickCommit"
        />
      </div>
    </template>
  </NavTabs>
  <div class="tab-content">
    <SpiderDetailTabGitRemote v-if="activeTabKey === 'remote'"/>
    <SpiderDetailTabGitReferences v-else-if="activeTabKey === 'references'"/>
    <SpiderDetailTabGitLogs v-else-if="activeTabKey === 'logs'"/>
    <SpiderDetailTabGitChanges v-else-if="activeTabKey === 'changes'"/>
    <SpiderDetailTabGitIgnore v-else-if="activeTabKey === 'ignore'"/>
  </div>
  <Dialog
      :visible="dialogVisible.checkout"
      title="Checkout"
      @confirm="onDialogCheckoutConfirm"
      @close="onDialogCheckoutClose"
  >
    <Form ref="checkoutFormRef" :model="checkoutForm">
      <FormItem :span="4" :label="t('components.git.checkout.type')" prop="type" required>
        <el-radio-group
            v-model="checkoutForm.type"
            size="small"
            class="ref-type-select"
        >
          <el-radio-button :label="GIT_REF_TYPE_BRANCH">
            <font-awesome-icon :icon="['fa', 'code-branch']"/>
            {{ t('components.git.references.type.branch') }}
          </el-radio-button>
          <el-radio-button :label="GIT_REF_TYPE_TAG" disabled>
            <font-awesome-icon :icon="['fa', 'tag']"/>
            {{ t('components.git.references.type.tag') }}
          </el-radio-button>
        </el-radio-group>
      </FormItem>
      <FormItem :span="4" :label="t('components.git.checkout.reference')" prop="name" required>
        <el-select size="small" v-model="checkoutForm.name">
          <el-option
              v-for="(op, $index) in gitRemoteRefs"
              :key="$index"
              :label="op.label"
              :value="op.value"
          />
        </el-select>
      </FormItem>
    </Form>
  </Dialog>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, onBeforeUnmount, ref, watch} from 'vue';
import {useStore} from 'vuex';
import {useRoute} from 'vue-router';
import LabelButton from '@/components/button/LabelButton.vue';
import NavTabs from '@/components/nav/NavTabs.vue';
import useSpiderDetail from '@/views/spider/detail/spiderDetail';
import SpiderDetailTabGitChanges from '@/views/spider/detail/tabs/git/SpiderDetailTabGitChanges.vue';
import SpiderDetailTabGitLogs from '@/views/spider/detail/tabs/git/SpiderDetailTabGitLogs.vue';
import SpiderDetailTabGitIgnore from '@/views/spider/detail/tabs/git/SpiderDetailTabGitIgnore.vue';
import SpiderDetailTabGitRemote from '@/views/spider/detail/tabs/git/SpiderDetailTabGitRemote.vue';
import SpiderDetailTabGitReferences from '@/views/spider/detail/tabs/git/SpiderDetailTabGitReferences.vue';
import Dialog from '@/components/dialog/Dialog.vue';
import {GIT_REF_TYPE_BRANCH, GIT_REF_TYPE_TAG} from '@/constants/git';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import {useI18n} from 'vue-i18n';
import {sendEvent} from '@/admin/umeng';

export default defineComponent({
  name: 'SpiderDetailTabGit',
  components: {
    Dialog,
    LabelButton,
    NavTabs,
    Form,
    FormItem,
    SpiderDetailTabGitRemote,
    SpiderDetailTabGitReferences,
    SpiderDetailTabGitLogs,
    SpiderDetailTabGitChanges,
    SpiderDetailTabGitIgnore,
  },
  setup() {
    // i18n
    const {t} = useI18n();

    // store
    const ns = 'spider';
    const gitNs = 'git';
    const store = useStore();
    const {
      spider: state,
      git: gitState,
    } = store.state as RootStoreState;

    // git form
    const gitForm = computed<Git>(() => gitState.form);

    // route
    const route = useRoute();

    // id
    const id = computed<string>(() => route.params.id as string);

    // active tab key
    const activeTabKey = ref<string>('remote');

    const {
      gitDialogVisible,
      gitCheckoutFormRef,
      gitCheckoutForm,
      gitLoading,
      gitActions,
    } = useSpiderDetail();

    // git changes
    const gitChanges = computed<GitChange[]>(() => state.gitData?.changes || []);

    // tab items
    const tabItems = computed<NavItem[]>(() => [
      {id: 'remote', title: t('components.git.tabs.remote')},
      {id: 'references', title: t('components.git.tabs.references')},
      {id: 'logs', title: t('components.git.tabs.logs')},
      {
        id: 'changes',
        title: gitChanges.value?.length > 0 ? `${t('components.git.tabs.changes')} (${gitChanges.value.length})` : t('components.git.tabs.changes')
      },
      {id: 'ignore', title: t('components.git.tabs.ignore')},
    ]);

    const onTabSelect = (key: string) => {
      activeTabKey.value = key;

      sendEvent('click_spider_detail_git_tab_select', {tabKey: key});
    };

    const gitChangeSelection = computed<TableData<GitChange>>(() => state.gitChangeSelection);


    watch(() => gitDialogVisible.value.checkout, async () => {
      if (state.currentGitBranch) {
        gitCheckoutForm.value.name = state.currentGitBranch;
      }
      await store.dispatch(`${ns}/getGitRemoteRefs`, {id: id.value});
    });

    const internalGitRefType = ref<string>(GIT_REF_TYPE_BRANCH);

    watch(() => internalGitRefType.value, () => {
      store.commit(`${ns}/setGitRefType`, internalGitRefType.value);
    });

    const onClickCheckout = async () => {
      gitDialogVisible.value.checkout = true;

      sendEvent('click_spider_detail_git_checkout');
    };

    const gitRemoteRefs = computed<SelectOption[]>(() => state.gitRemoteRefs
        .filter(d => d.type === gitCheckoutForm.value.type)
        .map(d => {
          return {
            label: d.name,
            value: d.name,
          };
        }) as SelectOption[]);

    const onDialogCheckoutClose = () => {
      gitDialogVisible.value.checkout = false;
      gitCheckoutForm.value = {
        type: GIT_REF_TYPE_BRANCH,
        name: '',
      };

      sendEvent('click_spider_detail_git_checkout_close');
    };

    const onRefTypeChange = (refType: string) => {
      sendEvent('click_spider_detail_git_reftype_change', {refType});
    };

    onBeforeMount(async () => {
      // get git
      await Promise.all([
        store.dispatch(`${ns}/getGit`, {id: id.value})
      ]);

      // git
      const git = state.gitData?.git;
      if (!git) return;

      // set git form if git data exists
      if (git?._id) {
        store.commit(`${gitNs}/setForm`, git);
      }

      // request remote references if url and auth type are set
      if (git?.url && git?.auth_type) {
        await store.dispatch(`${ns}/getGitRemoteRefs`, {id: id.value});
      }
    });

    onBeforeUnmount(() => store.commit(`${ns}/resetGitRefType`));

    return {
      dialogVisible: gitDialogVisible,
      gitForm,
      activeTabKey,
      tabItems,
      onTabSelect,
      gitChangeSelection,
      gitRemoteRefs,
      internalGitRefType,
      checkoutFormRef: gitCheckoutFormRef,
      checkoutForm: gitCheckoutForm,
      GIT_REF_TYPE_BRANCH,
      GIT_REF_TYPE_TAG,
      onClickCheckout,
      onDialogCheckoutClose,
      onRefTypeChange,
      loading: gitLoading,
      ...gitActions,
      t,
    };
  },
});
</script>
<style scoped lang="scss">
.actions {
  display: flex;
  align-items: center;
}

.tab-content {
  height: calc(100% - 41px);
}

.ref-type-select {
  margin-right: 10px;
}
</style>
