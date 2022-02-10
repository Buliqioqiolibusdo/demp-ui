<template>
  <Form
      v-if="form"
      ref="formRef"
      :model="form"
      :selective="isSelectiveForm"
  >
    <template v-if="isDialog">
      <!--Row-->
      <FormItem
          :span="2"
          :label="t('components.plugin.form.autoStart')"
      >
        <Switch v-model="form.auto_start"/>
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <template v-if="installType === PLUGIN_INSTALL_TYPE_GIT">
        <FormItem
            :span="4"
            :label="t('components.plugin.form.installUrl')"
            prop="install_url"
            required
        >
          <el-input
              v-model="form.install_url"
              :placeholder="t('components.plugin.form.installUrl')"
          />
        </FormItem>
      </template>
      <template v-else-if="installType === PLUGIN_INSTALL_TYPE_LOCAL">
        <FormItem
            :span="4"
            :label="t('components.plugin.form.installPath')"
            prop="install_url"
            required
        >
          <el-input
              v-model="form.install_url"
              :placeholder="t('components.plugin.form.installPath')"
          />
        </FormItem>
      </template>
      <!--./Row-->
    </template>

    <template v-else>
      <!--Row-->
      <FormItem
          :span="2"
          :offset="2"
          :label="t('components.plugin.form.name')"
          not-editable
          prop="name"
          required
      >
        <el-input
            v-model="form.name"
            disabled
            :placeholder="t('components.plugin.form.name')"
        />
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <FormItem
          :span="2"
          :label="t('components.plugin.form.command')"
          prop="cmd"
      >
        <el-input
            v-model="form.cmd"
            disabled
            :placeholder="t('components.plugin.form.command')"
        />
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <FormItem
          :span="4"
          :label="t('components.plugin.form.description')"
          prop="description"
      >
        <el-input
            v-model="form.description"
            disabled
            :placeholder="t('components.plugin.form.description')"
            type="textarea"
        />
      </FormItem>
    </template>

  </Form>
  <!--./Row-->
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useStore} from 'vuex';
import usePlugin from '@/components/plugin/plugin';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import {
  PLUGIN_INSTALL_TYPE_PUBLIC,
  PLUGIN_INSTALL_TYPE_GIT,
  PLUGIN_INSTALL_TYPE_LOCAL,
} from '@/constants/plugin';
import {useI18n} from 'vue-i18n';
import Switch from '@/components/switch/Switch.vue';

export default defineComponent({
  name: 'PluginForm',
  props: {
    readonly: {
      type: Boolean,
    }
  },
  components: {
    Switch,
    Form,
    FormItem,
  },
  setup(props, {emit}) {
    // i18n
    const {t} = useI18n();

    // store
    const ns = 'plugin';
    const store = useStore();
    const {plugin: state} = store.state as RootStoreState;

    const isDialog = computed<boolean>(() => !!state.activeDialogKey);

    const installFromUrl = ref<boolean>(false);

    return {
      ...usePlugin(store),
      isDialog,
      installFromUrl,
      PLUGIN_INSTALL_TYPE_PUBLIC,
      PLUGIN_INSTALL_TYPE_GIT,
      PLUGIN_INSTALL_TYPE_LOCAL,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
