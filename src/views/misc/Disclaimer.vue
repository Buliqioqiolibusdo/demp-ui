<template>
  <SimpleLayout>
    <div class="disclaimer">
      <div class="container">
        <h1 class="title">
          {{ title }}
        </h1>
        <div class="content" v-html="content"/>
      </div>
    </div>
  </SimpleLayout>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {Converter} from 'showdown';
import {useI18n} from 'vue-i18n';
import SimpleLayout from '@/layouts/content/simple/SimpleLayout.vue';

export default defineComponent({
  name: 'Disclaimer',
  components: {SimpleLayout},
  setup() {
    // i18n
    const {t} = useI18n();

    // markdown-to-text converter
    const converter = new Converter();

    // title
    const title = computed<string>(() => t('views.misc.disclaimer.title'));

    // content
    const content = computed<string>(() => {
      return converter.makeHtml(t('views.misc.disclaimer.content'));
    });

    return {
      title,
      content,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.disclaimer {
  min-height: 100%;
  padding: 0 calc((100% - 800px) / 2);
  color: $infoColor;

  .container {
    .title {
    }

    .content {
      font-size: 18px;
      line-height: 1.6;
    }
  }
}
</style>
