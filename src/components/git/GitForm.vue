<template>
  <Form
      v-if="form"
      ref="formRef"
      :model="form"
      :selective="isSelectiveForm"
  >
    <!--Row-->
    <FormItem
        :span="4"
        :label="t('components.git.form.remoteUrl')"
        prop="url"
    >
      <el-input
          v-model="form.url"
          :placeholder="t('components.git.form.remoteUrl')"
          @change="onUrlChange"
      />
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
        :span="1"
        :offset="3"
        :label="t('components.git.form.authType')"
        prop="auth_type"
    >
      <el-radio-group v-model="form.auth_type">
        <el-radio-button label="http">HTTP</el-radio-button>
        <el-radio-button label="ssh">SSH</el-radio-button>
      </el-radio-group>
    </FormItem>
    <!--./Row-->

    <template v-if="form.auth_type === 'http'">
      <!--Row-->
      <FormItem
          :span="2"
          :offset="2"
          :label="t('components.git.form.username')"
          prop="username"
      >
        <el-input
            v-model="form.username"
            :placeholder="t('components.git.form.username')"
        />
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <FormItem
          :span="2"
          :offset="2"
          :label="t('components.git.form.password')"
          prop="password"
      >
        <el-input
            v-model="form.password"
            :placeholder="t('components.git.form.password')"
            type="password"
        />
      </FormItem>
      <!--./Row-->
    </template>
    <template v-else-if="form.auth_type === 'ssh'">
      <!--Row-->
      <FormItem
          :span="2"
          :offset="2"
          :label="t('components.git.form.username')"
          prop="username"
      >
        <el-input
            v-model="form.username"
            :placeholder="t('components.git.form.username')"
        />
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <FormItem
          :span="4"
          :label="t('components.git.form.privateKey')"
          prop="password"
      >
        <el-input
            v-model="form.password"
            :placeholder="t('components.git.form.privateKey')"
            type="textarea"
            rows="20"
        />
      </FormItem>
      <!--./Row-->
    </template>
  </Form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';
import useGit from '@/components/git/git';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'GitForm',
  components: {FormItem, Form},
  setup() {
    // i18n
    const {t} = useI18n();

    // store
    const ns = 'git';
    const store = useStore();
    const {
      git: state,
    } = store.state as RootStoreState;

    const onUrlChange = (url: string) => {
      let authType;
      let username;
      if (url.match(/^http|^\/\//)) {
        authType = 'http';
      } else if (url.match(/^ssh|@/)) {
        authType = 'ssh';
        username = url.match(/(\w+)@/)?.[1];
      } else {
        authType = 'http';
      }
      const payload = {
        ...state.form,
        auth_type: authType,
      };
      if (username) payload.username = username;
      store.commit(`${ns}/setForm`, payload);
    };

    return {
      ...useGit(store),
      onUrlChange,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
