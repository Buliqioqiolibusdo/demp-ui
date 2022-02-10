<template>
  <Form
      v-if="form"
      ref="formRef"
      :model="form"
      :rules="formRules"
      :selective="isSelectiveForm"
  >
    <FormItem
        :span="2"
        :label="t('components.project.form.name')"
        not-editable
        prop="name"
        required
    >
      <el-input
          v-model="form.name"
          :disabled="isFormItemDisabled('name')"
          :placeholder="t('components.project.form.name')"
      />
    </FormItem>
    <FormItem
        :span="2"
        :label="t('components.project.form.tags')"
        prop="tags"
    >
      <TagInput v-model="form.tags" :disabled="isFormItemDisabled('tags')"/>
    </FormItem>
    <FormItem
        :span="4"
        :label="t('components.project.form.description')"
        prop="description"
    >
      <el-input
          v-model="form.description"
          :disabled="isFormItemDisabled('description')"
          :placeholder="t('components.project.form.description')"
          type="textarea"
      />
    </FormItem>
  </Form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';
import useProject from '@/components/project/project';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import TagInput from '@/components/input/TagInput.vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'ProjectForm',
  components: {TagInput, FormItem, Form},
  setup() {
    // i18n
    const {t} = useI18n();

    // store
    const store = useStore();

    return {
      ...useProject(store),
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
