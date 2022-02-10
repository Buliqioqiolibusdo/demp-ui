<template>
  <div class="nav-tabs">
    <el-tooltip
        v-if="toggle"
        :content="collapsed ? t('components.nav.tabs.toggle.expand') : t('components.nav.tabs.toggle.collapse')"
    >
      <div class="toggle" @click="onToggle">
        <font-awesome-icon :icon="collapsed ? ['fa', 'indent'] : ['fa', 'outdent']"/>
      </div>
    </el-tooltip>
    <el-menu
        :default-active="activeKey"
        mode="horizontal"
        @select="onSelect"
    >
      <el-menu-item
          v-for="item in items"
          :key="item.id"
          :class="item.emphasis ? 'emphasis' : ''"
          :index="item.id"
          :style="item.style"
      >
        <el-tooltip :content="item.tooltip" :disabled="!item.tooltip">
          <template v-if="!!item.icon">
            <font-awesome-icon :icon="item.icon"/>
          </template>
          <template v-else>
            {{ t(item.title) }}
          </template>
        </el-tooltip>
      </el-menu-item>
    </el-menu>
    <div class="extra">
      <slot name="extra">
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {useI18n} from 'vue-i18n';
import {emptyArrayFunc} from '@/utils/func';

export default defineComponent({
  name: 'NavTabs',
  props: {
    items: {
      type: Array as PropType<NavItem[]>,
      default: emptyArrayFunc,
    },
    activeKey: {
      type: String,
      default: '',
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    toggle: {
      type: Boolean,
      default: false,
    }
  },
  emits: [
    'select',
    'toggle',
  ],
  setup(props: NavTabsProps, {emit}) {
    const {t} = useI18n();

    const onSelect = (index: string) => {
      emit('select', index);
    };

    const onToggle = () => {
      emit('toggle');
    };

    return {
      onSelect,
      onToggle,
      t,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";

.nav-tabs {
  display: flex;
  border-bottom: 1px solid #e6e6e6;

  .toggle {
    flex: 0 0 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-right: 1px solid #e6e6e6;
  }

  .el-menu {
    flex: 1 0 auto;
    display: flex;
    height: $navTabsHeight;
    border-bottom: none;

    .el-menu-item {
      height: $navTabsHeight;
      line-height: $navTabsHeight;

      &:hover {
        color: $primaryColor;
        background: inherit;
      }

      &:focus {
        background: inherit;
      }

      &.emphasis {
        color: $infoColor;
        border-bottom: none;
      }
    }
  }

  .extra {
    background: transparent;
    display: flex;
    align-items: center;
    height: #{$navTabsHeight};
  }
}
</style>

<style scoped>
.nav-tabs >>> .el-menu--horizontal {
  /*border-bottom: none;*/
}
</style>
