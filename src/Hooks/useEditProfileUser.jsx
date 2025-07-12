import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useReducer } from "react";

export const useEditProfileUser = () => {
  const inittialReducer = {
    error: null,
    loading: false,
    success: false,
  };

  const inserteReducer = (state, action) => {
    switch (action.type) {
      case "ERROR":
        return { error: action.payload, loading: null, success: false };
      case "LOADING":
        return { error: null, loading: true, success: false };
      case "SUCCESS":
        return { error: null, loading: false, success: true };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(inserteReducer, inittialReducer);

  const editProfileUser = async (colectionName, newDataUser) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não está autenticado.");
    }
    try {
      //Actualizando no authentication
      const authUpdates = {};
      if (newDataUser.displayName) {
        authUpdates.displayName = newDataUser.displayName;
      }

      if (newDataUser.photoURL) {
        authUpdates.photoURL = newDataUser.photoURL;
      }

      if (Object.keys(authUpdates).length > 0) {
        dispatch({ type: "LOADING" });
        await updateProfile(user, authUpdates);
      }

      //Actualizando no firestore

      const userRef = doc(db, colectionName, user.uid);

      if (newDataUser.name && newDataUser.displayName) {
        delete newDataUser.displayName;
      }
      await updateDoc(userRef, newDataUser);

      dispatch({ type: "SUCCESS" });

      // Forçandoo o Firebase a recarregar os dados do usuário

      await auth.currentUser.reload();

      return auth.currentUser;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  };

  return { ...state, editProfileUser };
};
