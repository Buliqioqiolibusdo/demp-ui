interface LComponentsSpider {
  form: {
    name: string;
    project: string;
    command: string;
    param: string;
    defaultMode: string;
    resultsCollection: string;
    selectedTags: string;
    selectedNodes: string;
    description: string;
  };
  actions: {
    files: {
      tooltip: {
        fileEditorActions: string;
        uploadFiles: string;
        fileEditorSettings: string;
      };
    };
  };
  stat: {
    totalTasks: string;
    totalResults: string;
    averageWaitDuration: string;
    averageRuntimeDuration: string;
    averageTotalDuration: string;
  };
  dialog: {
    run: {
      title: string;
    };
  };
  message: {
    success: {
      scheduleTask: string;
    };
  };
}
