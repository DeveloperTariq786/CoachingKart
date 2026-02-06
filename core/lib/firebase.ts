// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyBuBZlTNTvTXwDdtBDdcJ8cMDDGpmj7K2s",
//     authDomain: "veoceint.firebaseapp.com",
//     projectId: "veoceint",
//     storageBucket: "veoceint.firebasestorage.app",
//     messagingSenderId: "887204710398",
//     appId: "1:887204710398:web:8af80c71c763c6193762af",
//     measurementId: "G-ZC9SCTHQJY"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();

// export const signInWithGoogle = async () => {
//     try {
//         const result = await signInWithPopup(auth, googleProvider);
//         return result.user;
//     } catch (error) {
//         console.error("Error signing in with Google", error);
//         throw error;
//     }
// };

// export const logout = async () => {
//     try {
//         await signOut(auth);
//     } catch (error) {
//         console.error("Error signing out", error);
//         throw error;
//     }
// };
