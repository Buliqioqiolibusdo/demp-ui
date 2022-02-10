interface LViewsTasks {
  table: {
    columns: {
      node: string;
      spider: string;
      priority: string;
      status: string;
      stat: {
        create_ts: string;
        start_ts: string;
        end_ts: string;
        wait_duration: string;
        runtime_duration: string;
        total_duration: string;
        results: string;
      };
    };
  };
  navActions: LNavActions;
}
