<template>
  <ContextMenu :clicking="clicking" :placement="placement" :visible="visible" @hide="$emit('hide')">
    <template #default>
      <ContextMenuList :items="items" @hide="$emit('hide')"/>
    </template>
    <template #reference>
      <slot></slot>
    </template>
  </ContextMenu>
</template>

<script lang="ts">
import {defineComponent, readonly} from 'vue';
import ContextMenu, {contextMenuDefaultProps} from '@/components/context-menu/ContextMenu.vue';
import ContextMenuList from '@/components/context-menu/ContextMenuList.vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'FileEditorNavTabsContextMenu',
  components: {ContextMenuList, ContextMenu},
  props: contextMenuDefaultProps,
  emits: [
    'hide',
    'close',
    'close-others',
    'close-all',
  ],
  setup(props, {emit}) {
    const {t} = useI18n();

    const items = readonly<ContextMenuItem[]>([
      {title: t('components.file.editor.navTabs.close'), icon: ['fa', 'times'], action: () => emit('close')},
      {title: t('components.file.editor.navTabs.closeOthers'), action: () => emit('close-others')},
      {title: t('components.file.editor.navTabs.closeAll'), action: () => emit('close-all')},
    ]);

    return {
      items,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
