<template>
  <el-tag :type="type" class="user-role" size="mini">
    <font-awesome-icon :icon="icon" class="icon"/>
    <span>{{ computedLabel }}</span>
  </el-tag>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import {ROLE_ADMIN,ROLE_ROOT} from '@/constants/user';

export default defineComponent({
  name: 'UserRole',
  props: {
    role: {
      type: String as PropType<UserRole>,
    },
    label: {
      type: String,
    },
  },
  setup(props: UserRoleProps, {emit}) {
    const type = computed<string>(() => {
      const {role} = props;
      if(role === ROLE_ROOT){
        return 'warning'
      }else if(role === ROLE_ADMIN){
        return 'primary'
      }else {
        return 'success'
      }
    });

    const computedLabel = computed<string>(() => {
      const {role, label} = props;
      if (label) return label;
      if(role === ROLE_ROOT){
        return 'Root'
      }else if(role === ROLE_ADMIN){
        return 'Admin'
      }else {
        return 'Normal'
      }
    });

    const icon = computed<string[]>(() => {
      const {role} = props;
      if(role === ROLE_ROOT){
        return ['fa', 'lock']
      }else if(role === ROLE_ADMIN){
        return ['fa', 'star']
      }else {
        return ['fa','user']
      }
    });

    return {
      type,
      computedLabel,
      icon,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-role {
  .icon {
    margin-right: 5px;
  }
}
</style>
