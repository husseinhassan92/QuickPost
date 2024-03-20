import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  LOGOUT,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL
} from "../Actions/Types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: localStorage.getItem("isAuthenticated"),
  user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      // case GOOGLE_AUTH_SUCCESS:
      // case FACEBOOK_AUTH_SUCCESS:
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      localStorage.setItem("isAuthenticated",true)
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    
    case AUTHENTICATED_SUCCESS:
      localStorage.setItem("isAuthenticated",true)
        return {
            ...state,
            isAuthenticated: true,
        }
    case SIGNUP_SUCCESS:
      localStorage.removeItem("isAuthenticated")
        return {
            ...state,
            isAuthenticated: null,
        }
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case AUTHENTICATED_FAIL:
      localStorage.removeItem("isAuthenticated")
        return {
            ...state,
            isAuthenticated: null,
        }
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    // case GOOGLE_AUTH_FAIL:
    // case FACEBOOK_AUTH_FAIL:
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("isAuthenticated")
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: null,
        user: null,
      };
  
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
        return {
            ...state
        }
    default:
      return state;
  }
}
