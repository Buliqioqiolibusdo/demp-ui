<template>
  <div class="task-detail-tab-data">
    <ListLayout
      :action-functions="actionFunctions"
      :table-pagination="tablePagination"
      :table-columns="tableColumns"
      :table-data="tableData"
      :table-total="tableTotal"
      class="result-list"
      no-actions
    >
      <template #extra>
      </template>
    </ListLayout>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue';
import ListLayout from '@/layouts/content/list/ListLayout.vue';
import {useStore} from 'vuex';
import useTaskDetail from '@/views/task/detail/taskDetail';

export default defineComponent({
  name: 'TaskDetailTabOverview',
  components: {
    ListLayout,
  },
  setup() {
    // store
    const ns = 'task';
    const store = useStore();
    const {
      task: state,
    } = store.state as RootStoreState;

    // id
    const {
      activeId,
    } = useTaskDetail();

    // data
    const tableData = computed<TableData<Result>>(() => state.resultTableData);

    // total
    const tableTotal = computed<number>(() => state.resultTableTotal);

    // pagination
    const tablePagination = computed<TablePagination>(() => state.resultTablePagination);

    // columns
    const tableColumns = computed<TableColumns<Result>>(() => {
      const fields = store.getters[`${ns}/resultFields`] as ResultField[];
      return fields.map(f => {
        const {key} = f;
        return {
          key,
          label: key,
          minWidth: '240',
        };
      }) as TableColumns<Result>;
    });

    // action functions
    const actionFunctions = ref<ListLayoutActionFunctions>({
      setPagination: (pagination) => store.commit(`${ns}/setResultTablePagination`, pagination),
      getList: async () => {
        return store.dispatch(`${ns}/getResultData`, activeId.value);
      },
      getAll: async () => {
        console.warn('getAll is not implemented');
      },
      deleteList: async (ids: string[]) => {
        console.warn('deleteList is not implemented');
      },
      deleteByIdConfirm: async (row: BaseModel) => {
        console.warn('deleteByIdConfirm is not implemented');
      },
    });

    watch(() => tablePagination.value, actionFunctions.value.getList);

    return {
      actionFunctions,
      tableData,
      tableTotal,
      tablePagination,
      tableColumns,
    };
  },
});
</script>
<style scoped>
.task-detail-tab-data >>> .el-table {
  border: none;
}
</style>
