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
        :label="t('components.tag.form.name')"
        not-editable
        prop="name"
        required
    >
      <el-input
          v-model="form.name"
          :disabled="isFormItemDisabled('name')"
          :placeholder="t('components.tag.form.name')"
      />
    </FormItem>
    <FormItem
        :span="2"
        :label="t('components.tag.form.color')"
        prop="color"
        required
    >
      <ColorPicker
          v-model="form.color"
          :predefine="predefinedColors"
          class="color-picker"
          show-alpha
      />
    </FormItem>
    <FormItem
        :span="4"
        :label="t('components.tag.form.description')"
        prop="description"
    >
      <el-input
          v-model="form.description"
          :disabled="isFormItemDisabled('description')"
          :placeholder="t('components.tag.form.description')"
          type="textarea"
      />
    </FormItem>
  </Form>
</template>

<script lang="ts">
import {defineComponent, readonly} from 'vue';
import {useStore} from 'vuex';
import useTag from '@/components/tag/tag';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import {getPredefinedColors} from '@/utils/color';
import ColorPicker from '@/components/color/ColorPicker.vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'TagForm',
  components: {ColorPicker, FormItem, Form},
  setup() {
    // i18n
    const {t} = useI18n();

    // store
    const store = useStore();

    // predefined colors
    const predefinedColors = readonly<string[]>(getPredefinedColors());

    return {
      ...useTag(store),
      predefinedColors,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
