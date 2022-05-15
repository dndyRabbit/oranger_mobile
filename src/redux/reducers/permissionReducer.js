import {PERMISSION_TYPES} from '../actions/permissionAction';

const initialState = {
  permission: [],
};

const permissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERMISSION_TYPES.GET_USER_PERMISSION:
      return {
        permission: action.payload.permission,
      };
    case PERMISSION_TYPES.POST_USER_PERMISSION:
      const newArr = [...state.permission];
      newArr.push(action.payload.permission);
      return {
        permission: newArr,
      };

    case PERMISSION_TYPES.PATCH_USER_PERMISSION:
      return {
        permission: state.permission.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                evidence: action.payload.evidence,
              }
            : item,
        ),
      };
    default:
      return state;
  }
};

export default permissionReducer;
