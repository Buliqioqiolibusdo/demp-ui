<template>
  <div class="check-tag-group">
    <CheckTag
        v-for="op in options"
        :key="{v: op.value, c: checkedMap[op.value]}"
        v-model="checkedMap[op.value]"
        :disabled="disabled"
        :label="op.label"
        clickable
        style="margin-right: 10px"
        @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, reactive, watch} from 'vue';
import CheckTag from '@/components/tag/CheckTag.vue';

export default defineComponent({
  name: 'CheckTagGroup',
  components: {
    CheckTag,
  },
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => {
        return [];
      }
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  emits: [
    'update:model-value',
    'change',
  ],
  setup(props: CheckTagGroupProps, {emit}) {
    const checkedMap = reactive<{ [key: string]: boolean }>({});

    const checkedKeys = computed<string[]>(() => {
      return Object.keys(checkedMap).filter(k => checkedMap[k]);
    });

    const onChange = () => {
      emit('update:model-value', checkedKeys.value);
      emit('change', checkedKeys.value);
    };

    watch(() => props.modelValue, () => {
      if (props.modelValue) {
        props.modelValue.forEach(key => {
          checkedMap[key] = true;
        });
      }
    });

    return {
      checkedMap,
      onChange,
    };
  },
});
</script>

<style scoped>
.check-tag-group >>> .check-tag:not(:last-child) {
  margin-right: 10px;
}
</style>
