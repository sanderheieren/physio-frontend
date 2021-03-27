import React from 'react';
import { connect } from 'react-redux';

import classes from './Input.module.css';

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={[...inputClasses, classes.textarea].join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select id="client" name="client" value="" onChange={props.changed}>
          {props.options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }
  const error = props.errors[props.elementConfig.name];
  return (
    <div className={classes.Input}>
      <div className={classes.labelsContainer} data-type={props.elementType}>
        {error && <span className={classes.errorMessage}>{error}</span>}
        {inputElement}
        <label
          className={
            inputElement.props.value
              ? [classes.Label, classes.LabelTop].join(' ')
              : classes.Label
          }
          htmlFor={inputElement.props.id}
        >
          {props.label}
        </label>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  errors: state.errorReducer.formErrors,
});

export default connect(mapStateToProps)(Input);
