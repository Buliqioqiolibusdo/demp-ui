<template>
  <el-dialog
      :class="className"
      :modal-class="modalClass"
      :before-close="onClose"
      :model-value="visible"
      :title="title"
      :top="top"
      :width="width"
      :z-index="zIndex"
  >
    <slot/>
    <template #footer>
      <slot name="prefix"/>
      <Button
          class="cancel"
          plain
          size="mini"
          type="info"
          @click="onClose"
      >
        {{ t('common.actions.cancel') }}
      </Button>
      <Button
          class="confirm"
          :disabled="confirmDisabled"
          :loading="confirmLoading"
          size="mini"
          type="primary"
          @click="onConfirm"
      >
        {{ t('common.actions.confirm') }}
      </Button>
      <slot name="suffix"/>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Button from '@/components/button/Button.vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'Dialog',
  components: {Button},
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
    modalClass: {
      type: String,
    },
    title: {
      type: String,
      required: false,
    },
    top: {
      type: String,
      required: false,
      default: '15vh'
    },
    width: {
      type: String,
      required: false,
    },
    zIndex: {
      type: Number,
      required: false,
    },
    confirmDisabled: {
      type: Boolean,
      default: false,
    },
    confirmLoading: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
    },
  },
  emits: [
    'close',
    'confirm',
  ],
  setup(props: DialogProps, {emit}) {
    // i18n
    const {t} = useI18n();

    const onClose = () => {
      emit('close');
    };

    const onConfirm = () => {
      emit('confirm');
    };

    return {
      onClose,
      onConfirm,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
