import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const useLogOut = () => {
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return { logOut };
};
