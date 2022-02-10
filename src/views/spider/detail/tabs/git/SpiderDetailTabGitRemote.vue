<template>
  <div class="git-remote">
    <GitForm/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import GitForm from '@/components/git/GitForm.vue';

export default defineComponent({
  name: 'SpiderDetailTabGitRemote',
  components: {
    GitForm,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.git-remote {
  margin: 20px;
}
</style>
