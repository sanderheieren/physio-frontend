const InitialState = {
  formErrors: {},
  generalError: '',
};

const errorReducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'FORM_ERROR':
      return {
        ...state,
        formErrors: action.payload,
      };
    case 'GENERAL_ERROR':
      return {
        ...state,
        generalError: action.payload,
      };
    case 'CLEAN_FORM_ERROR':
      return {
        ...state,
        formErrors: {},
      };
    case 'CLEAN_GENERAL_ERROR':
      return {
        ...state,
        generalError: '',
      };
    default:
      return state;
  }
};

export default errorReducer;
