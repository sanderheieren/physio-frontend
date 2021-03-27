const InitialState = {
  title: '',
  description: '',
  client: '',
  exercises: [],
};

const sessionReducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'STORE_SESSION':
      return action.payload;
    case 'ADD_EXERCISE':
      return {
        ...state,
        exercises: [
          ...state.exercises,
          { exercise: action.payload, comment: '' },
        ],
      };
    case 'REMOVE_EXERCISE':
      const updatedExercises = [...state.exercises];
      const index = updatedExercises.findIndex(
        e => e.exercise._id === action.payload.exercise._id
      );
      updatedExercises.splice(index, 1);
      return {
        ...state,
        exercises: updatedExercises,
      };
    case 'ADD_DESCRIPTION':
      return { ...state, ...action.payload };
    case 'CLEAN_SESSION':
      return {
        title: '',
        description: '',
        client: '',
        exercises: [],
      };
    default:
      return state;
  }
};

export default sessionReducer;
