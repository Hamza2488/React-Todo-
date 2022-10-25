import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import app from "./firebaseconfig";

const auth = getAuth(app);
const database = getDatabase(app);

const SignupUser = (obj) => {
  const { email, password, username, contact } = obj;

  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(obj);
        const reference = ref(database, `users/${user.uid}`);
        obj.id = user.uid;
        set(reference, obj)
          .then(() => {
            resolve("User Created Successfully");
          })
          .catch((err) => {
            reject(err);
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  });
};

let loginUser = (obj) => {
  const { email, password } = obj;
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const reference = ref(database, `users/${user.uid}`);
        onValue(reference, (e) => {
          let status = e.exists();
          console.log(status);
          if (status) {
            resolve(e.val());
          } else {
            reject("Data Not Found");
          }
        });
      })
      .catch(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        reject(errorMessage);
        // ..
      });
  });
};




const sendData = () => {
  
};

export { SignupUser, loginUser };
