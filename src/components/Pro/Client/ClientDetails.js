import React, { useState } from 'react';
import Button from '../../Button/Button';

import { connect } from 'react-redux';
import * as clientActions from '../../../redux/actions/client';
import classes from './ClientDetails.module.css';

const ClientDetails = props => {
  const { client } = props;
  const [editMode, setEditMode] = useState(false);
  const [comment, setComment] = useState(client.comment);
  const [textAreaValue, setTextAreaValue] = useState(comment);
  const textAreaRef = React.createRef();

  const onTextAreaChange = e => {
    const { value } = e.target;
    setTextAreaValue(value);
  };

  const saveComment = () => {
    setComment(textAreaRef.current.value);
    props.updateClient(client, textAreaRef.current.value);
    setEditMode(false);
  };

  const renderCommentSection = () => {
    if (!editMode) {
      return (
        <>
          <p>{comment ? comment : 'No comment'}</p>
          <div className={classes.actionsContainer}>
            <Button actionStyle="edit" action={() => setEditMode(true)}>
              Edit
            </Button>
          </div>
        </>
      );
    }
    return (
      <>
        <textarea
          ref={textAreaRef}
          value={textAreaValue}
          onChange={onTextAreaChange}
          className={classes.textarea}
        />
        <div className={classes.actionsContainer}>
          <Button action={() => setEditMode(false)} actionStyle="delete">
            Discard
          </Button>
          <Button action={saveComment} actionStyle="create">
            Save
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className={classes.clientDetails}>
      <h3 className={classes.headingTitle}>Client Details</h3>
      <div className={classes.details}>
        <p>
          <b>Name:</b> {client.name}
        </p>
        <p>
          <b>Email:</b> {client.email}
        </p>
        <p>
          <b>Comment:</b>
        </p>
        {renderCommentSection()}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateClient: (client, comment) =>
    dispatch(clientActions.updateClient(client, comment)),
});

export default connect(null, mapDispatchToProps)(ClientDetails);
