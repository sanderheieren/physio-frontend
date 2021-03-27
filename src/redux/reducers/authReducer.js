const InitialState = {
  isAuth: false,
  isLoading: false,
};

const authReducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return InitialState;
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
