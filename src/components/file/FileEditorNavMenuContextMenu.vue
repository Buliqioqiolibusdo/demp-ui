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
import {computed, defineComponent} from 'vue';
import ContextMenu, {contextMenuDefaultProps} from '@/components/context-menu/ContextMenu.vue';
import ContextMenuList from '@/components/context-menu/ContextMenuList.vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'FileEditorNavMenuContextMenu',
  components: {ContextMenuList, ContextMenu},
  props: contextMenuDefaultProps,
  emits: [
    'hide',
    'new-file',
    'new-directory',
    'rename',
    'clone',
    'delete',
  ],
  setup(props, {emit}) {
    const {t} = useI18n();

    const items = computed<ContextMenuItem[]>(() => [
      {
        title: t('components.file.editor.navMenu.newFile'),
        icon: ['fa', 'file-alt'],
        action: () => emit('new-file'),
      },
      {
        title: t('components.file.editor.navMenu.newDirectory'),
        icon: ['fa', 'folder-plus'],
        action: () => emit('new-directory')
      },
      {
        title: t('components.file.editor.navMenu.rename'),
        icon: ['fa', 'edit'],
        action: () => emit('rename'),
      },
      {
        title: t('components.file.editor.navMenu.duplicate'),
        icon: ['fa', 'clone'],
        action: () => emit('clone'),
      },
      {
        title: t('components.file.editor.navMenu.delete'),
        icon: ['fa', 'trash'],
        action: () => emit('delete'),
      },
    ]);

    return {
      items,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
