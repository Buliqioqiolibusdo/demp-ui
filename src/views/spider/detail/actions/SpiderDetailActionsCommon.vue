<template>
  <NavActionGroup>
    <NavActionFaIcon :icon="['fa', 'tools']"/>
    <NavActionItem>
      <FaIconButton :icon="['fa', 'play']" :tooltip="t('common.actions.run')" type="success" @click="onRun"/>
    </NavActionItem>
    <!--TODO: implement-->
    <NavActionItem v-if="false">
      <FaIconButton :icon="['fa', 'clone']" :tooltip="t('common.actions.clone')" type="info"/>
    </NavActionItem>
    <!--TODO: implement-->
    <NavActionItem v-if="false">
      <FaIconButton :icon="['far', 'star']" plain :tooltip="t('common.actions.bookmark')" type="warning"/>
    </NavActionItem>
  </NavActionGroup>

  <!-- Dialogs (handled by store) -->
  <RunSpiderDialog v-if="activeDialogKey === 'run'"/>
  <!-- ./Dialogs -->
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FaIconButton from '@/components/button/FaIconButton.vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import NavActionFaIcon from '@/components/nav/NavActionFaIcon.vue';
import {useStore} from 'vuex';
import useSpider from '@/components/spider/spider';
import RunSpiderDialog from '@/components/spider/RunSpiderDialog.vue';
import {useI18n} from 'vue-i18n';
import {sendEvent} from '@/admin/umeng';

export default defineComponent({
  name: 'SpiderDetailActionsCommon',
  components: {
    NavActionFaIcon,
    FaIconButton,
    NavActionGroup,
    NavActionItem,
    RunSpiderDialog,
  },
  setup() {
    // i18n
    const {t} = useI18n();

    // store
    const ns = 'spider';
    const store = useStore();

    const onRun = () => {
      store.commit(`${ns}/showDialog`, 'run');

      sendEvent('click_spider_detail_actions_run');
    };

    return {
      ...useSpider(store),
      onRun,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
