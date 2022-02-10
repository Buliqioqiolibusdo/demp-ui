<template>
  <div class="duration">
    {{ label }}
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import humanizeDuration from 'humanize-duration';
import {getLanguage} from '@/utils/i18n';

export default defineComponent({
  name: 'Duration',
  props: {
    duration: {
      type: Number,
      required: false,
    },
  },
  setup(props: DurationProps, {emit}) {
    const label = computed<string>(() => {
      const {duration} = props;

      const d = Math.ceil((duration as number) / 1000) * 1000;

      const language = getLanguage();

      return humanizeDuration(d, {
        spacer: ' ',
        language,
      });
    });

    return {
      label,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
