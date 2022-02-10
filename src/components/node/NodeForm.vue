<template>
  <Form
      v-if="form"
      ref="formRef"
      :model="form"
      :selective="isSelectiveForm"
  >
    <!--Row-->
    <FormItem
        v-if="readonly"
        :offset="2"
        :span="2"
        :label="t('components.node.form.key')"
        not-editable
        prop="key"
    >
      <el-input :model-value="form.key" disabled/>
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
        :span="2"
        :label="t('components.node.form.name')"
        not-editable
        prop="name"
        required
    >
      <el-input
          v-model="form.name"
          :disabled="isFormItemDisabled('name')"
          :placeholder="t('components.node.form.name')"
      />
    </FormItem>
    <FormItem
        :span="2"
        :label="t('components.node.form.tags')"
        prop="tags"
    >
      <TagInput v-model="form.tags" :disabled="isFormItemDisabled('tags')"/>
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
        :span="2"
        :label="t('components.node.form.type')"
        not-editable
        prop="type"
    >
      <NodeType :is-master="form.is_master"/>
    </FormItem>
    <FormItem
        :span="2"
        :label="t('components.node.form.ip')"
        prop="ip"
    >
      <el-input
          v-model="form.ip"
          :disabled="isFormItemDisabled('ip')"
          :placeholder="t('components.node.form.ip')"
      />
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
        :span="2"
        :label="t('components.node.form.mac')"
        prop="mac"
    >
      <el-input
          v-model="form.mac"
          :disabled="isFormItemDisabled('mac')"
          :placeholder="t('components.node.form.mac')"
      />
    </FormItem>
    <FormItem
        :span="2"
        :label="t('components.node.form.hostname')"
        prop="hostname"
    >
      <el-input
          v-model="form.hostname"
          :disabled="isFormItemDisabled('hostname')"
          :placeholder="t('components.node.form.hostname')"
      />
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
        :span="2"
        :label="t('components.node.form.enabled')"
        prop="enabled"
    >
      <Switch
          v-model="form.enabled"
          :disabled="isFormItemDisabled('enabled')"
          @change="onEnabledChange"
      />
    </FormItem>
    <FormItem
        :span="2"
        :label="t('components.node.form.max_runners')"
        prop="max_runners"
    >
      <el-input-number
          v-model="form.max_runners"
          :disabled="isFormItemDisabled('max_runners')"
          :min="0"
          :placeholder="t('components.node.form.max_runners')"
      />
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
        :span="4"
        :label="t('components.node.form.description')"
        prop="description"
    >
      <el-input
          v-model="form.description"
          :disabled="isFormItemDisabled('description')"
          :placeholder="t('components.node.form.description')"
          type="textarea"
      />
    </FormItem>
  </Form>
  <!--./Row-->
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';
import useNode from '@/components/node/node';
import TagInput from '@/components/input/TagInput.vue';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import NodeType from '@/components/node/NodeType.vue';
import Switch from '@/components/switch/Switch.vue';
import {useI18n} from 'vue-i18n';
import {sendEvent} from '@/admin/umeng';

export default defineComponent({
  name: 'NodeForm',
  props: {
    readonly: {
      type: Boolean,
    }
  },
  components: {
    Switch,
    NodeType,
    Form,
    FormItem,
    TagInput,
  },
  setup(props, {emit}) {
    // i18n
    const {t} = useI18n();

    // store
    const store = useStore();

    const onEnabledChange = (value: boolean) => {
      sendEvent(value ? 'click_node_form_enable' : 'click_node_form_disable');
    };

    return {
      ...useNode(store),
      onEnabledChange,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
