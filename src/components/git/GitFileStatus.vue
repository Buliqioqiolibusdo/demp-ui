<template>
  <div class="git-file-status">
    <span class="file-name" :style="fileNameStyle">
      {{ fileStatus.name }}
    </span>
    <span class="file-path">
      {{ fileStatus.path }}
    </span>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import {emptyObjectFunc} from '@/utils/func';
import variables from '@/styles/variables.scss';

export default defineComponent({
  name: 'GitFileStatus',
  props: {
    fileStatus: {
      type: Object as PropType<GitChange>,
      default: emptyObjectFunc,
    },
  },
  setup(props: GitFileProps, {emit}) {
    const fileNameStyle = computed<Partial<CSSStyleDeclaration>>(() => {
      const {fileStatus} = props;
      switch (fileStatus?.worktree) {
        case '?':
          return {color: variables.dangerColor};
        case 'M':
          return {color: variables.primaryColor};
        case 'A':
          return {color: variables.successColor};
        case 'D':
          return {color: variables.infoColor};
        case 'R':
          return {color: variables.primaryColor};
        case 'C':
          return {color: variables.primaryColor};
        case 'U':
          return {color: variables.dangerColor};
        default:
          return {};
      }
    });

    return {
      fileNameStyle,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";

.git-file-status {
  .file-name {
  }

  .file-path {
    margin-left: 10px;
    font-size: 11px;
    color: $infoMediumLightColor;
  }
}
</style>
