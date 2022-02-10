interface LViewsSchedules {
  table: {
    columns: {
      name: string;
      spider: string;
      mode: string;
      cron: string;
      enabled: string;
      entryId: string;
      description: string;
    };
  };
  navActions: LNavActions;
}
