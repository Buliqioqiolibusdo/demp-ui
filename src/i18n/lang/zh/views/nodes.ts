const nodes: LViewsNodes = {
  table: {
    columns: {
      name: '名称',
      nodeType: '节点类别',
      status: '状态',
      ip: 'IP',
      mac: 'MAC 地址',
      hostname: '主机名',
      runners: '执行器',
      enabled: '是否启用',
      tags: '标签',
      description: '描述',
    }
  },
  navActions: {
    new: {
      label: '新建节点',
      tooltip: '添加一个新节点'
    }
  },
};

export default nodes;
