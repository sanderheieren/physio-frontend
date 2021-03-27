import React, { useState } from 'react';
import { connect } from 'react-redux';

import Layout from '../components/Layout/Layout';
import { changedHandler, createFormData } from '../utils';
import Form from '../components/Form/Form';

import * as errorsActions from '../redux/actions/errors';
import * as accountActions from '../redux/actions/account';

const Account = (props) => {
  const { updateAccount, user, addFormError, cleanFormError } = props;
  const [formElements, setFormElements] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your name',
        name: 'name',
        id: 'name',
      },
      label: 'Name ',
      value: user.name,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your email',
        name: 'email',
        id: 'email',
      },
      label: 'Email ',
      value: user.email,
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const formData = createFormData(formElements, null, 'account');
      cleanFormError();
      const accountData = JSON.parse(JSON.stringify(user));
      accountData.name = formData.name;
      accountData.email = formData.email;
      updateAccount(accountData);
    } catch (error) {
      addFormError(error);
    }
  };

  return (
    <div>
      <Layout>
        <Form
          submitHandler={submitHandler}
          changedHandler={(e) => changedHandler(e, 'value', setFormElements)}
          formElements={formElements}
          heading="Account"
          addedClassName="account"
          btn={'Update account'}
        ></Form>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});
const mapDispatchToProps = (dispatch) => ({
  addFormError: (message) => dispatch(errorsActions.addFormError(message)),
  cleanFormError: () => dispatch(errorsActions.cleanFormError()),
  updateAccount: (accountData) =>
    dispatch(accountActions.updateAccount(accountData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
