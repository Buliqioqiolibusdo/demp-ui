<template>
  <Dialog
      :title="t('components.plugin.settings.title')"
      :visible="activeDialogKey === 'settings'"
      @close="onClose"
      @confirm="onConfirm"
  >
    <Form class="settings-form" :model="settings.value">
      <FormItem
          :span="2"
          :offset="2"
          :label="t('components.plugin.settings.label.installSource')"
          prop="plugin_base_url"
      >
        <el-select
            v-model="settings.value.plugin_base_url"
            size="small"
            :placeholder="t('components.plugin.settings.label.installSource')"
        >
          <el-option
              v-for="(op, $index) in baseUrlOptions"
              :key="$index"
              :label="op.label"
              :value="op.value"
          />
        </el-select>
      </FormItem>
      <FormItem
          :span="4"
          label=" "
      >
        <el-alert class="alert-tip" type="info" :closable="false" show-icon>
          {{ t('components.plugin.settings.tips.installSource') }}
        </el-alert>
      </FormItem>
      <FormItem
          :span="2"
          :offset="2"
          :label="t('components.plugin.settings.label.goProxy')"
          prop="plugin_base_url"
      >
        <el-select
            v-model="settings.value.go_proxy"
            size="small"
            :placeholder="t('components.plugin.settings.label.goProxy')"
            clearable
        >
          <el-option
              v-for="(op, $index) in goproxyOptions"
              :key="$index"
              :label="op.label"
              :value="op.value"
          />
        </el-select>
      </FormItem>
      <FormItem
          :span="4"
          label=" "
      >
        <el-alert class="alert-tip" type="info" :closable="false" show-icon>
          {{ t('components.plugin.settings.tips.goProxy') }}
        </el-alert>
      </FormItem>
    </Form>
  </Dialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';
import usePlugin from '@/components/plugin/plugin';
import Dialog from '@/components/dialog/Dialog.vue';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import {useI18n} from 'vue-i18n';
import {sendEvent} from '@/admin/umeng';

export default defineComponent({
  name: 'SettingsPluginDialog',
  components: {
    FormItem,
    Dialog,
    Form,
  },
  setup() {
    // i18n
    const {t} = useI18n();

    // store
    const ns = 'plugin';
    const store = useStore();

    const {
      settings,
    } = usePlugin(store);

    const onClose = () => {
      store.commit(`${ns}/hideDialog`, 'settings');

      sendEvent('click_settings_plugin_dialog_close');
    };

    const onConfirm = async () => {
      await store.dispatch(`${ns}/saveSettings`);
      store.commit(`${ns}/hideDialog`, 'settings');

      sendEvent('click_settings_plugin_dialog_confirm', {
        ...settings.value,
      });
    };

    return {
      ...usePlugin(store),
      onClose,
      onConfirm,
      t,
    };
  },
});
</script>

<style scoped>
/*.settings-form >>> .alert-tip {*/
/*  position: absolute;*/
/*  left: 100%;*/
/*  top: 0;*/
/*  margin: 0 0 0 10px;*/
/*  width: calc(150px + 100%);*/
/*  flex: 1 0 auto;*/
/*}*/
</style>
