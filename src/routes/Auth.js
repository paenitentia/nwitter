import React, { useState } from "react";
import { authService } from "../fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
        
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            if(newAccount) {
                const data = await createUserWithEmailAndPassword(authService, email, password);
                 console.log(data);
            } else {
                // log in
                const data = await signInWithEmailAndPassword(authService, email, password);
                 console.log(data);
            }
           
        } catch(error) {
            console.log(error.message);
            setError(error.message);
        }
        
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        console.log(event.target.name);
        const {
            target: { name },
        } = event;

        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider();
        } else if(name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                    <input type="text" name="email" placeholder="Email" required  value={email} onChange={onChange} />
                    <input type="password" name="password" placeholder="Password" required value={password} onChange={onChange} />
                    <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                    {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>google
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth;