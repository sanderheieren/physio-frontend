import React, { useState } from 'react';
import { connect } from 'react-redux';

import Layout from '../components/Layout/Layout';
import Form from '../components/Form/Form';
import { changedHandler, createFormData } from '../utils';

import * as errorsActions from '../redux/actions/errors';
import * as invitationActions from '../redux/actions/invitation';

const Invite = (props) => {
  const { addFormError, cleanFormError, createInvitation } = props;
  const [feedback, setFeedback] = useState('');
  const [formElements, setFormElements] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
        name: 'email',
        id: 'email',
      },
      label: '',
      value: '',
    },
  });

  const cleanForm = () => {
    setFormElements({
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
          name: 'email',
          id: 'email',
        },
        label: '',
        value: '',
      },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const formData = createFormData(formElements, null, 'invite');
      cleanFormError();
      console.log(formData);
      setFeedback(`Invitation sendt to ${formData.email} .`);
      createInvitation(formData);
      cleanForm();
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
          heading="Invite"
          addedClassName="invite"
          btn={'Invite'}
          description="Invite a new client to join physio:"
          feedback={feedback}
        >
          <p>{feedback}</p>
        </Form>
      </Layout>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addFormError: (message) => dispatch(errorsActions.addFormError(message)),
  cleanFormError: () => dispatch(errorsActions.cleanFormError()),
  createInvitation: (data) =>
    dispatch(invitationActions.createInvitation(data)),
});

export default connect(null, mapDispatchToProps)(Invite);
