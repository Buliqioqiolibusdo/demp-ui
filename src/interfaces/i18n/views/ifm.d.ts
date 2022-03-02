interface LViewsIfm {
    table: {
      columns: {
        name: string;
        status: string;
        processId: string;
        description: string;
      };
    };
    navActions: LNavActionsIfm;
  }
  
  interface LNavActionsIfm extends LNavActions {
    install: {
      label: string;
      tooltip: string;
    };
    settings: {
      label: string;
      tooltip: string;
    };
  }
  