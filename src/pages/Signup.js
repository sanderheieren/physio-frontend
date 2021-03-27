import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { changedHandler, createFormData } from '../utils';

import { useQuery } from '../hooks/useQuery';
import Layout from '../components/Layout/Layout';
import Form from '../components/Form/Form';

import * as authActions from '../redux/actions/auth';
import * as errorsActions from '../redux/actions/errors';

const Signup = props => {
  const [formElements, setFormElements] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'name',
        id: 'name',
      },
      label: 'Full Name',
      value: '',
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        name: 'email',
        id: 'email',
      },
      label: 'Email',
      value: '',
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        name: 'password',
        id: 'password',
      },
      label: 'Password',
      value: '',
    },
    confirmPassword: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        name: 'confirmPassword',
        id: 'confirmPassword',
      },
      label: 'Confirm Password',
      value: '',
    },
  });

  const query = useQuery();

  useEffect(() => {
    if (query.get('user') === 'client' && query.get('token')) {
      const token = query.get('token');
      setFormElements(prevState => ({
        ...prevState,
        proInput: {
          elementType: 'input',
          elementConfig: {
            type: 'hidden',
            name: 'pro',
            id: 'pro',
          },
          value: token,
        },
      }));
    }
  }, [query]);

  const submitHandler = e => {
    e.preventDefault();
    try {
      const formData = createFormData(formElements, null, 'signup');
      delete formData.confirmPassword;

      props.cleanFormError();

      if (formData.pro) return props.signupClient(formData);
      props.signup(formData);
    } catch (error) {
      props.addFormError(error);
    }
  };

  return (
    <div>
      <Layout>
        <Form
          submitHandler={submitHandler}
          changedHandler={e => changedHandler(e, 'value', setFormElements)}
          formElements={formElements}
          heading="Signup"
          addedClassName="login"
          btn={'Signup'}
        />
      </Layout>
    </div>
  );
};

const mapStateToProps = state => ({
  errorMessage: state.authReducer.error,
});
const mapDispatchToProps = dispatch => ({
  signup: credentials => dispatch(authActions.signup(credentials)),
  signupClient: credentials => dispatch(authActions.signupClient(credentials)),
  addFormError: message => dispatch(errorsActions.addFormError(message)),
  cleanFormError: () => dispatch(errorsActions.cleanFormError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
