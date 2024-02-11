import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
import firebaseConfig from "./fbKey.js";

//const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //delare user
      const user = userCredential.user;

      //creata user data
      const user_data = {
        email: email,
        password: password,
        last_login: Date.now(),
      };

      set(ref(db, "users/" + user.uid), user_data);
      alert("User created succesfully");
    })
    .catch((error) => {
      const error_message = error.message;
      alert(error_message);
    });
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    register();
  });
