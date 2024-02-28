'use client'
// import Illu from '/illustration.svg'
// import img from 'next/img'
// import {playfairDisplaySC , redRose } from '../font'
import Link from 'next/link';
import { gsap } from "gsap";
// import Bottomnav from '../bottomnav/bottomnav'
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { signInWithPhoneNumber } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyCV2zXzq-XgnL1XwrtqoukFZSlE5wlpxBw",

  authDomain: "markinsights-244d8.firebaseapp.com",

  projectId: "markinsights-244d8",

  storageBucket: "markinsights-244d8.appspot.com",

  messagingSenderId: "205868383176",

  appId: "1:205868383176:web:529853bd6f5456163b1efd",

  measurementId: "G-9W3EKS9JNV"


};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [errora, setErrora] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push("/csvupload");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrora(error.message);
        console.log(errorCode, errorMessage)
      });
  }






  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        saveUserDataToFirestore(authUser);
        setUser(authUser);
        // Store user data in Firestore

        router.push("/csvupload");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // User signed in
        // console.log(result.user);
        const user = result.user;
        setUser(user);
        saveUserDataToFirestore(user);
        //   console.log("User data successfully stored in Firestore!");
        // }
        sessionStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  const saveUserDataToFirestore = async (user) => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber
          // You can add more user data as needed
        });
        console.log("User data successfully stored in Firestore!");
      } else {
        console.log("User already exists in Firestore!");
      }
    } catch (error) {
      console.error("Error storing user data: ", error);
    }
  };
  const handlePhoneLogin = () => {
    const provider = new firebase.auth.PhoneAuthProvider();
    // Prompt the user to enter their phone number
    const phoneNumber = prompt('Enter your phone number with country code');
    if (phoneNumber) {
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // handlePhoneSignIn();
        },
      });

      signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          const verificationCode = prompt('Enter the verification code sent to your phone');
          return confirmationResult.confirm(verificationCode);
        })
        .then((result) => {
          // Phone authentication successful
          const user = result.user;
          setUser(user);
          saveUserDataToFirestore(user);
          sessionStorage.setItem("user", JSON.stringify(user));
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        sessionStorage.removeItem("user"); // Remove user data from session storage
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };
  useEffect(() => {
    gsap.set(".redball", { xPercent: -50, yPercent: -50 });
    let targets = gsap.utils.toArray(".redball");
    window.addEventListener("mouseleave", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        scale: 0,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
    window.addEventListener("mouseenter", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        scale: 1,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
    window.addEventListener("mousemove", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
  }, []);






  return (<div className=''>

    <div className="redball z-50 blur-3xl bg-red-400/50 w-96 h-96 fixed top-0 left-0 rounded-full"></div>

    <div className="LOGIN-FORM ">
      <div className="flex">
        {/* laptop view design of left while on flex */}
        <div className='overflow-hidden w-3/5 mt-10 hidden md:block' >
          <img className='w-1/2 h-1/2 mt-40 ml-40' width={10} height={10} src='/form.png' alt="illuatration" />

        </div>

        {/* actual form */}
        <div className='md:w-2/5 rounded-lg '>


          <div className={``}>








            <div className="flex md:w-96  justify-center ml-3 items-center h-screen ">
              <div className="w-full rounded-lg h-auto bg-[#000000] p-8  shadow-lg">
                <h1 className="text-2xl md:ml-8 font-bold text-center text-gray-200 mb-8">Login to your MARKinsights Account</h1>
                <div
                  onClick={handleGoogleLogin}
                  className="w-full md:w-80 bg-white mt-4 text-center text-black font-medium px-4 py-3 border-gray-900 border-2  items-center flex hover:bg-black hover:text-white cursor-pointer transition-all"
                >
                  <img
                    src="/google.svg"
                    alt=""
                    className="mr-12 max-sm:mr-4 "
                    height={20}
                    width={20}
                  />
                  Continue with Google
                </div>
                {/* <Link href='/dashboard/phone'><div
          
          className="w-full md:w-96 bg-white mt-4 text-center text-black font-medium px-4 py-3 border-gray-900 border-2  items-center flex hover:bg-black hover:text-white cursor-pointer transition-all"
        >
          <img
            src="/phone.svg"
            alt="phone img duh"
            className="mr-12  max-sm:mr-4 "
            height={20}
            width={20}
          />
          Continue with Phone
        </div></Link> */}
                <div className='flex md:ml-5 text-white justify-center items-center my-5'>

                  ------ OR ------
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full md:w-80 text-black h-12 px-4 border border-gray-400  mb-4"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  placeholder="Password"
                  className="w-full md:w-80 text-black h-12 px-4 border border-gray-400  mb-4"
                />
                <div className="flex items-center justify-between mb-4">
                  <label htmlFor="remember-me" className="text-gray-400  text-sm">
                    <input type="checkbox" id="remember-me" className="mr-2" />
                    Remember Me
                  </label>
                  <a href="#" className="text-red-500 text-sm font-semibold">
                    Forgot Password?
                  </a>
                </div>
                <button type='submit' onClick={onLogin} className="w-full md:w-80 h-12 bg-red-500 text-white font-semibold ">
                  Login
                </button>


                <div className="m-4 text-gray-300 text-sm">
                  <span>Not Registered Yet?</span>
                  <a href="login/signup" className="ml-2 text-pink-500 font-semibold">
                    Create an account
                  </a>
                </div>
                {errora && <h2 className='text-pink-800'>{errora}</h2>}
              </div>
            </div>
          </div>
          <div style={containerStyle}>
            <div style={gradientStyle}></div>
            <div style={rectangleStyle}></div>
          </div>




        </div>
      </div>
    </div>



    <div className='md:hidden'>
    </div>




  </div>);
}

export default Dashboard;


const containerStyle = {
  position: 'relative',
  width: '40px',
  height: '32px',
};

const gradientStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(90deg, #FF00F5 0%, #6A82FB 100%), linear-gradient(90deg, #000000 0%, #6A82FB 100%), linear-gradient(90deg, #000000 0%, #6A82FB 100%), linear-gradient(90deg, #000000 0%, #6A82FB 100%)',
  filter: 'blur(100px)',
  borderRadius: '200px',
};

const rectangleStyle = {
  boxSizing: 'border-box',
  position: 'absolute',
  width: '40.35px',
  height: '0.43px',
  left: '396.9px',
  top: '-211px',
  background: 'url(), radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%)',
  backgroundBlendMode: 'overlay, normal',
  backdropFilter: 'blur(40px)',
  transform: 'matrix(0.01, 1, 1, -0.01, 0, 0)',
};

