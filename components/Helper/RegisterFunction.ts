/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
  } from "firebase/auth";
  import { doc, setDoc, serverTimestamp } from "firebase/firestore";
  import { auth, firestore } from "@/firebase/firebase"; 
  
  interface LocationData {
    name: string;
    country: string;
    lat: number | null;
    lon: number | null;
  }
  
  export const registerUser = async (
    fullName: string,
    email: string,
    password: string,
    location: LocationData
  ): Promise<{ success: boolean; message: string }> => {
    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  

      await sendEmailVerification(user);
  

      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        fullName,
        email,
        location,
        emailVerified: false,
        lastSeen: serverTimestamp(),
        createdAt: serverTimestamp()
      });
  
      return {
        success: true,
        message: "Registration successful! Please check your email for verification."
      };
    } catch (error: any) {
      let readable = "An unknown error occurred during registration.";
  
      if (typeof error?.message === "string") {
        const match = error.message.match(/Firebase:\s(.+?)\s\(/);
        if (match) readable = match[1];
      }
  
      return {
        success: false,
        message: readable
      };
    }
  };