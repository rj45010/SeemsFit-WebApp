import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../components/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Register user and send email verification
export const registerUser = async (email, password, fname, lname) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    try {
      await setDoc(doc(db, 'Users', user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
      });
    } catch (firestoreError) {
      console.error('Error saving user to Firestore:', firestoreError.message);
      toast.error('Error saving user details. Please try again.');
    }

    await sendEmailVerification(user);
    toast.success('Account created! A verification email has been sent. Please verify your email.');
    console.log('Verification email sent! Please check your inbox.');

    return { success: true, message: 'Account created, verification email sent.' };
  } catch (error) {
    console.error('Error in registerUser:', error.message);
    toast.error(error.message);
    return { success: false, message: error.message };
  }
};


export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      toast.error('Email not verified. Please verify your email to log in.');
      await auth.signOut();
      return false;
    }

    toast.dismiss(); // Clear previous toasts
    toast.success('Login successful!');
    console.log('User logged in successfully');
    return true;
  } catch (error) {
    console.error('Error logging in:', error.message);
    toast.error('Login failed. Please check your credentials.');
    return false;
  }
};


export const handleResendVerification = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      toast.error('No user is currently logged in.');
      return;
    }

    if (user.emailVerified) {
      toast.info('Your email is already verified.');
      return;
    }

    await sendEmailVerification(user);
    toast.success('Verification email resent. Please check your inbox.');
  } catch (error) {
    console.error('Error resending verification email:', error);
    toast.error('Failed to resend verification email.');
  }
};

export const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="spinner">Loading...</div>; // Replace with a spinner component if available
  }

  if (!user || !user.emailVerified) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const handleLogin = async (email, password) => {
  const success = await signInWithEmail(email, password);
  if (success) {
    // Perform additional actions after successful login
    console.log('Login flow complete.');
  }
};
