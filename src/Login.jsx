import React, {useState} from 'react'
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth"
import { useNavigate } from 'react-router-dom'

const Login = ({setUser}) => {

    // const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const createPopup = async () => {

        const auth = getAuth();
        const provider = new GoogleAuthProvider;
        const result = await signInWithPopup(auth, provider)
        const myUserAll = result.user
        const myUser = {
            id: myUserAll.uid,
            imgUrl: myUserAll.photoURL ?? 'https://placeholder.com/20',
            phone: myUserAll.phoneNumber,
            email: myUserAll.email,
            name: myUserAll.displayName
        }
        setUser(myUser)
        // setMessage('Successfully Logged In')
        navigate('/main')
    }

    const emailSignin = async (event) => {

        event.preventDefault();
        const auth = getAuth();
        const email = emailField.value
        const password = passwordField.value
        const result = await signInWithEmailAndPassword(auth, email, password)
        if (result) {
            const myUserAll = result.user
            const myUser = {
                id: myUserAll.uid,
                email: myUserAll.email
            }
            setUser(myUser)
            emailField.value = ''
            passwordField.value = ''
            navigate('/main')
            // setMessage('Successfully Logged In')
        }
        else {
            emailField.value = ''
            passwordField.value = ''
            // setMessage('Please Try Again')
        }
    }

    return (
        <div>
            {/* {message && <Message message={message} color='' />} */}
            <body className="img" style={{'background-image': 'url(/assets/bg.jpg)'}}>
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
                                            <button type="submit" onClick={emailSignin} className="form-control btn btn-primary submit px-3">Sign In</button>
                                        </div>
                                    </form>
                                    <p className="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
                                    <div className="form-group">
                                        <button onClick={createPopup} className="form-control btn btn-secondary submit px-3"><img src='/assets/g_logo.svg'  />oogle</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </body>
        </div>
    )
}

export default Login