const tasks: LViewsTasks = {
  table: {
    columns: {
      node: '节点',
      spider: '爬虫',
      priority: '优先级',
      status: '状态',
      stat: {
        create_ts: '创建时间',
        start_ts: '开始时间',
        end_ts: '结束时间',
        wait_duration: '等待时间',
        runtime_duration: '运行时间',
        total_duration: '总时间',
        results: '结果数',
      }
    },
  },
  navActions: {
    new: {
      label: '新建任务',
      tooltip: '创建一个新任务',
    }
  }
};

export default tasks;
