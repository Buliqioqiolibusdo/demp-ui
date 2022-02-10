<template>
  <div class="plugin-status">
    <Tag
        :key="data"
        :icon="data.icon"
        :label="data.label"
        :spinning="data.spinning"
        :type="data.type"
        :size="size"
        @click="$emit('click')"
    >
      <template #tooltip>
        <div v-html="data.tooltip"/>
      </template>
    </Tag>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import {
  PLUGIN_STATUS_INSTALLING,
  PLUGIN_STATUS_STOPPED,
  PLUGIN_STATUS_RUNNING,
  PLUGIN_STATUS_ERROR,
} from '@/constants/plugin';
import Tag from '@/components/tag/Tag.vue';
import colors from '@/styles/color.scss';
import {emptyArrayFunc} from '@/utils/func';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'PluginStatus',
  components: {
    Tag,
  },
  props: {
    status: {
      type: String as PropType<string>,
      required: false,
      default: emptyArrayFunc,
    },
    size: {
      type: String as PropType<BasicSize>,
      required: false,
      default: 'mini',
    },
    error: {
      type: String as PropType<string>,
      required: false,
    },
  },
  emits: ['click'],
  setup(props: PluginStatusProps, {emit}) {
    // i18n
    const {t} = useI18n();

    const data = computed<TagData>(() => {
      const {status, error} = props;
      switch (status) {
        case PLUGIN_STATUS_INSTALLING:
          return {
            label: t('components.plugin.status.label.installing'),
            tooltip: t('components.plugin.status.tooltip.installing'),
            type: 'warning',
            icon: ['fa', 'spinner'],
            spinning: true,
          };
        case PLUGIN_STATUS_STOPPED:
          return {
            label: t('components.plugin.status.label.stopped'),
            tooltip: t('components.plugin.status.tooltip.stopped'),
            type: 'info',
            icon: ['fa', 'stop'],
          };
        case PLUGIN_STATUS_RUNNING:
          return {
            label: t('components.plugin.status.label.running'),
            tooltip: t('components.plugin.status.tooltip.running'),
            type: 'success',
            icon: ['fa', 'check'],
          };
        case PLUGIN_STATUS_ERROR:
          return {
            label: t('components.plugin.status.label.error'),
            tooltip: `${t('components.plugin.status.tooltip.error')}:<br><span style="color: ${colors.red}">${error}</span>`,
            type: 'danger',
            icon: ['fa', 'times'],
          };
        default:
          return {
            label: t('components.plugin.status.label.unknown'),
            tooltip: t('components.plugin.status.tooltip.unknown'),
            type: 'info',
            icon: ['fa', 'question'],
          };
      }
    });

    return {
      data,
    };
  },
});
</script>

<style lang="scss" scoped>
.plugin-status {
}
</style>
