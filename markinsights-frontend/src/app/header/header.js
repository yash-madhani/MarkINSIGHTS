"use client";
// import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect } from "react";
import "./header.css";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

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
const Header = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("user0");
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  //  const router = useRouter();
  function toggleActive() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Fetch user's XP from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.namefromemail  || userData.displayName);
         // Set XP to 0 if userData.xp is undefined
        } else {
          // Handle case where user document doesn't exist
        
        }
      } else {
        setUser(null);
        // Reset user's XP if not logged in
      }
    });
    return () => unsubscribe();
  }, []);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("user");
        setUser(null);

        router.push("/");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <>
      {/* <Analytics /> */}
      <div
        className={`text-gray-950 w-full p-4 md:p-6 flex justify-between items-center max-md:mt-4`}
      >
        <div className="flex md:mx-12 items-center gap-2">
          <a href="/" className="flex items-center">
            {user ? (
              <img
                src={`${user.photoURL}`}
                alt=""
                height={30}
                width={30}
                className="mr-4 rounded-full"
              />
            ) : (
              <img
                src="/logo.webp"
                alt=""
                height={30}
                width={30}
                className="mr-4"
              />
            )}
            <h1 className="md:block font-bold text-xl max-md:text-sm">
              {user ? `Welcome, ${user.displayName || username }` : "MarkINSIGHTS"}
            </h1>
          </a>



          {user ? (
            <button onClick={handleLogout}>
              <img src="/exit.png" height={30} width={30} alt="" />
            </button>
          ) : (
            ""
          )}
        </div>
        <ul className="list-none gap-12 my-4 md:mx-12 text-md text-gray-800 md:flex items-center justify-between">
          {!user ? (
            <li>
              <a
                href="/login"
                className="rounded-full px-4 py-2 -ml-4 text-gray-100 bg-black hover:bg-white hover:text-black transition duration-300 ease-in-out"
              >
                Login
              </a>
            </li>
          ) : (
            <>
              <li>
                <a
                  href="/"
                  className="max-md:hidden rounded-full px-2 py-2 -ml-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                 home
                </a>
              </li>
              <li>
                <a
                  href="/csvupload"
                  className="max-md:hidden rounded-full px-2 py-2 -ml-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                 csvupload
                </a>
              </li>
              <li>
                <a
                  href="/pricings"
                  className="max-md:hidden rounded-full px-2 py-2 -ml-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                 Pricings
                </a>
             </li>
              {/* <li>
                <a
                  href="/wearos"
                  className="max-md:hidden rounded-full px-2 py-2 -ml-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  WearOS
                </a>
              </li> */}
              {/* <li>
                <a
                  href="/nutricon"
                  className="max-md:hidden rounded-full px-2 py-2 -ml-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  NutriCon
                </a>
              </li> */}
           
            </>
          )}
        </ul>
        <div
          className={`menu-btn-1 md:hidden mx-6 z-20 ${
            isActive ? "active" : ""
          } ${router.pathname === "/" ? "block" : "hidden"}`}
          onClick={toggleActive}
        >
          <span></span>
        </div>
      </div>
      {isActive && <HamBurger />}
    </>
  );
};
export default Header;

const HamBurger = () => {
  return (
    <>
      <div className="absolute mt-2 rounded-lg border border-gray-50/20 z-10 bg-gray-50 drop-shadow-2xl backdrop-filter backdrop-blur-[6px] w-[96%] p-2">
        <ul className="list-none gap-12 my-4 text-xs flex flex-col items-center justify-between">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">login</a>
          </li>
          <li>
            <a href="#">Register</a>
          </li>
        </ul>
      </div>
    </>
  );
};
