<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import en from 'element-plus/lib/locale/lang/en';
import zh from 'element-plus/lib/locale/lang/zh-cn';
import i18n from '@/i18n';

export default defineComponent({
  name: 'App',
  setup() {
    const locale = computed(() => {
      const lang = i18n.global.locale.value;
      return lang === 'zh' ? zh : en;
    });

    return {
      locale,
    };
  },
});
</script>
