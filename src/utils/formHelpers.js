import { formValidation } from '.';

export const changedHandler = (e, changedProp, cb) => {
  cb(prevState => ({
    ...prevState,
    [e.target.name]: {
      ...prevState[e.target.name],
      [changedProp]: e.target.value,
    },
  }));
};

export const objToArray = formElements => {
  const formElementsArray = [];

  for (let key in formElements) {
    formElementsArray.push({
      id: key,
      config: formElements[key],
    });
  }

  return formElementsArray;
};

export const editModeInitValues = (formElements, initialValues, cb) => {
  const updatedFormElements = { ...formElements };
  for (let key in initialValues) {
    updatedFormElements[key].value = initialValues[key];
  }
  cb(updatedFormElements);
};

export const createFormData = (
  formElements,
  additionalFields,
  validationFlag
) => {
  const formData = {};

  for (let key in formElements) {
    formData[key] = formElements[key].value;
  }

  for (let key in additionalFields) {
    formData[key] = additionalFields[key];
  }

  const errors = formValidation(formData, validationFlag);

  if (Object.keys(errors).length !== 0) {
    throw errors;
  }

  return formData;
};
