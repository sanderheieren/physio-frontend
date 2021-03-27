export const addFormError = errorObject => ({
  type: 'FORM_ERROR',
  payload: errorObject,
});
export const addCreateError = errorObject => ({
  type: 'CREATE_ERROR',
  payload: errorObject,
});
export const addGeneralError = errorObject => ({
  type: 'GENERAL_ERROR',
  payload: errorObject,
});

export const cleanFormError = () => ({ type: 'CLEAN_FORM_ERROR' });
export const cleanGeneralError = () => ({ type: 'CLEAN_GENERAL_ERROR' });
