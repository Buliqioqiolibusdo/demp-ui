<template>
  <Form
    v-if="form"
    ref="formRef"
    :model="form"
    :rules="formRules"
    :selective="isSelectiveForm"
    class="user-form"
  >
    <!-- Row -->
    <FormItem
      :span="2"
      :label="t('components.user.form.username')"
      prop="username"
      required
    >
      <el-input
        v-model="form.username"
        :disabled="isFormItemDisabled('username')"
        :placeholder="t('components.user.form.username')"
      />
    </FormItem>
    <FormItem
      :span="2"
      :label="t('components.user.form.password')"
      prop="password"
      required
    >
      <el-input
        v-if="(isSelectiveForm || !isDetail) && !isMySettings"
        v-model="form.password"
        :disabled="isFormItemDisabled('password')"
        :placeholder="t('components.user.form.password')"
        type="password"
      />
      <LabelButton
        v-else
        :icon="['fa','lock']"
        :label="t('components.user.form.changePassword')"
        type="danger"
        @click="onChangePassword"
      />
    </FormItem>
    <!-- ./Row -->

    <!-- Row -->
    <FormItem
      :span="2"
      :label="t('components.user.form.email')"
      prop="email"
    >
      <el-input
        v-model="form.email"
        :disabled="isFormItemDisabled('email')"
        :placeholder="t('components.user.form.email')"
        type="email"
      />
    </FormItem>
    <FormItem
      :span="2"
      :label="t('components.user.form.role')"
      prop="role"
      required
    >
      <el-select v-model="form.role" :disabled="isFormItemDisabled('role')">
        <el-option :value="ROLE_ADMIN" :label="t('components.user.role.admin')"/>
        <el-option :value="ROLE_NORMAL" :label="t('components.user.role.normal')"/>
      </el-select>
    </FormItem>
    <!-- ./Row -->
  </Form>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from 'vuex';
import useUser from '@/components/user/user';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import {ROLE_ADMIN, ROLE_NORMAL} from '@/constants/user';
import LabelButton from '@/components/button/LabelButton.vue';
import {ElMessageBox} from 'element-plus';
import useUserDetail from '@/views/user/detail/userDetail';
import {useI18n} from 'vue-i18n';
import {sendEvent} from '@/admin/umeng';

export default defineComponent({
  name: 'UserForm',
  components: {
    LabelButton,
    FormItem,
    Form,
  },
  setup() {
    // i18n
    const {t} = useI18n();

    // store
    const ns = 'user';
    const store = useStore();

    const {
      activeId,
    } = useUserDetail();

    const {
      onChangePasswordFunc,
    } = useUser(store);

    const onChangePassword = () => onChangePasswordFunc(activeId.value);

    const isDetail = computed<boolean>(() => !!activeId.value);

    return {
      ...useUser(store),
      ROLE_ADMIN,
      ROLE_NORMAL,
      onChangePassword,
      isDetail,
      t,
    };
  },
});
</script>

<style scoped>
</style>
