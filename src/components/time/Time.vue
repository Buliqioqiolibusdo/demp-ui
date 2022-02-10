<template>
  <div class="time">
    {{ label }}
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import zh from 'javascript-time-ago/locale/zh';
import dayjs from 'dayjs';
import i18n from '@/i18n';

TimeAgo.addLocale(en);
TimeAgo.addLocale(zh);

export default defineComponent({
  name: 'Time',
  props: {
    time: {
      type: [Date, String] as PropType<Date | string>,
      required: false,
      default: () => new Date(),
    },
    ago: {
      type: Boolean,
      required: false,
      default: true,
    },
    format: {
      type: String,
      required: false,
      default: 'YYYY-MM-DD HH:mm:ssZ',
    }
  },
  setup(props: TimeProps, {emit}) {
    const label = computed<string | undefined>(() => {
      const {time, ago, format} = props;
      if (!time) return;

      if (ago) {
        const timeAgo = new TimeAgo(i18n.global.locale.value === 'zh' ? 'zh' : 'en');
        return timeAgo.format(new Date(time));
      } else {
        return dayjs(time).format(format);
      }
    });

    return {
      label,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
