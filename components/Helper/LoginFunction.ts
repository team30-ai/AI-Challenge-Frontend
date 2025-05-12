/* eslint-disable @typescript-eslint/no-explicit-any */
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";

export const loginUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await user.reload();

    if (!user.emailVerified) {
      return {
        success: false,
        message: "Please verify your email before logging in."
      };
    }

    const userDocRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        emailVerified: user.emailVerified,
        lastSeen: serverTimestamp(),
      }, { merge: true });
    } else {
      await setDoc(userDocRef, {
        emailVerified: user.emailVerified,
        lastSeen: serverTimestamp(),
      }, { merge: true });
    }


    const userData = userDoc.data();
    if (userData) {
      const fullUserData = {
        ...userData,
        emailVerified: user.emailVerified,
        lastSeen: new Date().toISOString(),
      };
      localStorage.setItem("loggedIn", JSON.stringify(fullUserData));
    }

    return {
      success: true,
      message: "Login successful!"
    };
  } catch (error: any) {
    let readable = "An unknown error occurred during login.";

    if (typeof error?.message === "string") {
      readable = "An unknown error occurred during login. Please try again";
    }

    return {
      success: false,
      message: readable
    };
  }
};