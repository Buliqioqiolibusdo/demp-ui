<template>
  <CreateEditDialog
      width="800px"
      :action-functions="actionFunctions"
      :confirm-disabled="confirmDisabled"
      :confirm-loading="confirmLoading"
      :tab-name="createEditDialogTabName"
      :type="activeDialogKey"
      :visible="createEditDialogVisible"
      no-batch
  >
    <template #default>
      <PluginForm/>
    </template>
  </CreateEditDialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';
import CreateEditDialog from '@/components/dialog/CreateEditDialog.vue';
import PluginForm from '@/components/plugin/PluginForm.vue';
import usePlugin from '@/components/plugin/plugin';

export default defineComponent({
  name: 'CreateEditPluginDialog',
  components: {
    CreateEditDialog,
    PluginForm,
  },
  setup() {
    // store
    const store = useStore();

    return {
      ...usePlugin(store),
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
