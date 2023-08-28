import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Signup = () => {

    const createUser = async (event) => {

        event.preventDefault();
        const auth = getAuth();
        const email = emailField.value
        const password = passwordField.value
        const confirmPassword = confirmPasswordField.value

        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
            emailField.value = ''
            passwordField.value = ''
            confirmPasswordField.value = ''
        }
        else {
            console.log('Mismatched password fields')
        }
    }

    return (
        <div>
            <body className="img" style={{ 'background-image': 'url(/assets/bg.jpg)' }}>
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 col-lg-4">
                                <div className="login-wrap p-0">
                                    <form action="#" className="signin-form">
                                        <div className="form-group">
                                            <input id="emailField" type="email" className="form-control" placeholder="Email" required />
                                        </div>
                                        <div className="form-group">
                                            <input id="passwordField" type="password" className="form-control" placeholder="Password" required />
                                        </div>
                                        <div className="form-group">
                                            <input id="confirmPasswordField" type="password" className="form-control" placeholder="Confirm Password" required />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" onClick={createUser} className="form-control btn btn-primary submit px-3">Sign Up</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </body>
        </div>
    )
}

export default Signup