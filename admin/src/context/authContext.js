import { createContext, useEffect, useReducer } from "react";

const initState = {
  user: "",
  loading: false,
  error: null,
};

export const AuthContext = createContext(initState);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "login_ss":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "logn_fail":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "logout":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
