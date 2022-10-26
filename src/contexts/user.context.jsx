// NOTE: This is not used currently. This logic is moved to redux store.

import { useEffect, useReducer } from 'react';
import { createContext } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.util';

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case ACTION_TYPES.SET_CURRENT_USER:
      return {
        currentUser: payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
}

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch(createAction(ACTION_TYPES.SET_CURRENT_USER, user));
  }

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      // Stores user auth object if user signs in or signs up.
      // Stores null if user signs out.
      setCurrentUser(user);
    });

    return unsubscribe;
  }, [])
  

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}