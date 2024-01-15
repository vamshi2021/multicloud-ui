const initialState = {
  AppName: 'remoteApp',
  place:"Bengaluru"
};

const CHANGE_APP_NAME = 'CHANGE_APP_NAME';
const PLACE_NAME = 'CHANGE_APP_NAME';

const changeAppNameAction = appName => {
  return { type: CHANGE_APP_NAME, payload: appName };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_APP_NAME: {
      console.log("App name in remote  is"+action.payload)
      return {
        ...state,
        AppName: action.payload,
      };
    }
    case PLACE_NAME: {
      console.log("place name"+action.payload)
      return {
        ...state,
        place: action.payload,
      };
    }
  }
  return state;
};

export { changeAppNameAction };
export default reducer;
