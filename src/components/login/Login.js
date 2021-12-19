import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { auth } from './firebase.config';


function Login() {
  const [newUser, setNewUser] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const {from} = location.state || {from: {pathname : "/"}}

  const [user, setUser] = useState({
    isSingedIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    photo: ''
  })

  const  [logInUser,setLogInUser] = useContext(userContext)

  const singUpButton = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const singInUser = {
          isSingedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(singInUser)
        console.log(displayName, email, photoURL)
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
    // console.log('its click')
  }

  const handleFbSignIn = () => {
    const FbProvider = new FacebookAuthProvider();
    signInWithPopup(auth, FbProvider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log('fb user',user)

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorCode,errorMessage,email,credential)
      });

  }

  const handleBlur = (event) => {
    // console.log(event.target.name,event.target.value)
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)
    }
  }
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // console.log(errorCode,errorMessage)
        });
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLogInUser(newUserInfo);
          navigate("../shipping", { replace: true });
          console.log('sign in user info', res.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }
    event.preventDefault()
  }

  const signOutButton = () => {
    signOut(auth)
      .then(result => {
        const signOutUser = {
          isSingedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signOutUser);
      })
      .catch(error => {

      })
  }

  const updateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      console.log('update sucessfully')
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <div style={{textAlign : 'center'}}>
      <h3>this is for firebase</h3>
      {
        user.isSingedIn ? <button onClick={signOutButton}>sign out</button> :
          <button onClick={singUpButton}>sign in</button>
      }
      <br />
      <button onClick={handleFbSignIn}>Log in with facebook</button>
      {
        user.isSingedIn && <div>
          <p>welcome,{user.name}</p>
          <p>your email: {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      }
      <form onSubmit={handleSubmit}>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
        <label htmlFor="newUser">New user sign up</label>
        <br />
        {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your name" />}
        <br />
        <input type="text" onBlur={handleBlur} name="email" placeholder="email" required />
        <br />
        <input type="password" onBlur={handleBlur} name="password" placeholder="password" required />
        <br />
        <input type="submit" value={newUser ? 'sign up' : 'sign in'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>user {newUser ? 'created' : 'logged in'} successfully</p>}
    </div>
  );
}

export default Login;
