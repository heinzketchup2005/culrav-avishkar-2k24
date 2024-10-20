const initialState = {
    details: {
      fullName: '',
      email: '',
      phone: '',
      collegeName: '',
      idCardUrl: '',
      isOtherCollege: 'true',
    },
    token: '',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_DETAILS':
        return {
          ...state,
          details: { ...action.payload },
        };
      case 'SET_TOKEN':
        return {
          ...state,
          token: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  