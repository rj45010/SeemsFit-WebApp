import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/SignInWithGoogle.css';
import { useTheme } from './ThemeProvider';

function SignInwithGoogle() {
  const { theme } = useTheme();

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Trigger sign-in popup with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // If user is logged in, store their data in Firestore
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          lastName: "",
        });

        // Redirect to home page
        window.location.href = "/home";
      }
    } catch (error) {
      toast.error("Error during Google Sign-in", {
        position: "top-center",
      });
      console.error("Google Sign-in error: ", error);
    }
  };

  return (
    <div className="google-login-container" onClick={googleLogin}>
      <img
        src={
          theme === "light"
            ? require("../assests/GLoginDark.png")
            : require("../assests/GLoginLight.png")
        }
        alt="Sign in with Google"
        className="w-9 h-9"
        width={"70%"}
      />
    </div>
  );
}

export default SignInwithGoogle;
