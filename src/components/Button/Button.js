import React from 'react';
import classes from './Button.module.css';

const Button = props => {
  let attachedClasses = [classes.basic];

  switch (props.actionStyle) {
    case 'add':
      attachedClasses = [...attachedClasses, classes.primary];
      break;
    case 'edit':
      attachedClasses = [...attachedClasses, classes.edit];
      break;
    case 'editSvg':
      attachedClasses = [...attachedClasses, classes.editSvg];
      break;
    case 'delete':
      attachedClasses = [...attachedClasses, classes.secondary];
      break;
    case 'create':
      attachedClasses = [...attachedClasses, classes.create];
      break;
    case 'login':
      attachedClasses = [...attachedClasses, classes.create, classes.login];
      break;
    case 'cancel':
      attachedClasses = [...attachedClasses, classes.cancel];
      break;
    case 'invite':
      attachedClasses = [...attachedClasses, classes.invite];
      break;
    case 'more':
      attachedClasses = [...attachedClasses, classes.more];
      break;
    case 'details':
      attachedClasses = [...attachedClasses, classes.details];
      break;
    case 'exercise':
      attachedClasses = [...attachedClasses, classes.exercise];
      break;
    case 'cardActive':
      attachedClasses = [...attachedClasses, classes.cardActive];
      break;
    case 'cardInactive':
      attachedClasses = [...attachedClasses, classes.cardInactive];
      break;
    default:
      break;
  }

  const Component = (
    <button
      className={attachedClasses.join(' ')}
      onClick={props.action}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );

  return Component;
};

export default Button;
