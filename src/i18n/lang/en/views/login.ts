const login: LViewsLogin = {
  loginForm: {
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    email: 'Email',
    signUp: 'Sign Up',
    signIn: 'Sign In',
  },
  forgotPassword: {
    label: 'Forgot Password',
    content: 'Contact the administrator',
  },
  referenceFrom: {
    label: 'Reference',
    content: 'Based on the Crawlab-v0.6',
  },
  initial: {
    title: 'Initial Username/Password',
  },
  documentation: 'Documentation',
  mobile: {
    warning: 'You are running on a mobile device, which is not optimized yet. Please try with a laptop or desktop.'
  },
  errors: {
    incorrectUsername: 'Please enter the correct username',
    passwordLength: 'Password length should be no shorter than 5',
    passwordSame: 'Two passwords must be the same',
    unauthorized: 'Unauthorized. Please check username and password.',
    noTokenReturned: 'No token returned',
  },
};

export default login;
