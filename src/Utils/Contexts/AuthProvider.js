import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../Firebase/Firebase.config';


export const AuthContext = createContext();

const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // user creation using email and password
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login using email and password
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }




    // update role to user on database by email
    // fetch(`http://localhost:5000/user?email=${user.email}`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         email: user.email,
    //         role: 'user'
    //     })
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data) {
    //             console.log('user role updated')
    //         }
    //     })

    // login with email popup
    const loginWithPopup = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }




    // unsubscribe from auth

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)


            // check whether the user already have a role or not
            // if not then update the role to user
            if (currentUser) {
                fetch(`http://localhost:5000/user?email=${currentUser.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.length === 0) {
                            fetch('http://localhost:5000/user', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email: currentUser.email,
                                    role: 'user',
                                    isVerified: false
                                })
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                })
                        }
                    })
            }

            // verify jwt
            if (currentUser) {
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: currentUser.email
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            console.log('jwt verified')
                            // set token in local storage
                            localStorage.setItem('token', data.token)
                        }
                    })
            }




            // patch current user data to database
            // fetch(`http://localhost:5000/user`, {
            //     method: 'PATCH',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         email: currentUser.email,
            //         role: 'user',
            //         isVerified: false
            //     })
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         if (data) {
            //             console.log('user role updated')
            //         }
            //     })



            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])


    // logout
    const logout = () => {
        return signOut(auth)
    }




    // auth values
    const authInfo = {
        createUser,
        login,
        loginWithPopup,
        user,
        loading,
        logout
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;