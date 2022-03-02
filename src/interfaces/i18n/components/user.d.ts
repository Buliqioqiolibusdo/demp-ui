interface LComponentsUser {
  form: {
    username: string;
    password: string;
    changePassword: string;
    email: string;
    role: string;
    name: string;
    newPassword: string;
  };
  role: {
    root: string;
    admin: string;
    normal: string;
  };
  delete: {
    tooltip: {
      adminUserNonDeletable: string;
    };
  };
  messageBox: {
    prompt: {
      changePassword: string;
    };
  };
  rules: {
    invalidPassword: string;
  };
}
