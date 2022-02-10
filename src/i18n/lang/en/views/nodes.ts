const nodes: LViewsNodes = {
  table: {
    columns: {
      name: 'Name',
      nodeType: 'Node Type',
      status: 'Status',
      ip: 'IP',
      mac: 'MAC Address',
      hostname: 'Hostname',
      runners: 'Runners',
      enabled: 'Enabled',
      tags: 'Tags',
      description: 'Description',
    }
  },
  navActions: {
    new: {
      label: 'New Node',
      tooltip: 'Create a new node'
    }
  },
};

export default nodes;
