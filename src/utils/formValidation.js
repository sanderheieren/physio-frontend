const validate = (values, page) => {
  const errors = {};
  if (page === 'login' || page === 'signup') {
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password is too short, required minimum 8 characters';
    }
  }
  if (page === 'signup') {
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Confirm Password does not match.';
    }
    if (!values.name) {
      errors.name = 'Name is required';
    }
  }
  if (page === 'session') {
    if (!values.title) {
      errors.title = 'Title is required';
    } else if (values.title.length < 5) {
      errors.title = 'Title is too short, required minimum 5 characters';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    } else if (values.description.length < 5) {
      errors.description =
        'Description is too short, required minimum 5 characters';
    }
  }
  if (page === 'exercise') {
    if (!values.title) {
      errors.title = 'Title is required';
    } else if (values.title.length < 5) {
      errors.title = 'Title is too short, required minimum 5 characters';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    } else if (values.description.length < 5) {
      errors.description =
        'Description is too short, required minimum 5 characters';
    }
  }
  if (page === 'invite') {
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
  }
  if (page === 'account') {
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
  }
  return errors;
};

export default validate;
