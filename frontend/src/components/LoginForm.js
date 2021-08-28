import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import '../StyleSheets/LoginForm.css';
import auth from "../utils/auth";

// Form for logging in
// remember to create function "Login" on login page
function LoginForm({ Login, error }) {
    const [details, setDetails] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ any: false, email: false, password: false });
    const [login, setLogin] = useState({ attempt: "", msg: "", authToken: "" })

    const submit = s => {
        s.preventDefault();


        if (validate()) {

            // let resultPromise = auth.login(details.email, details.password); //temp null function for callback
            // resultPromise.then(
            //     function(value) { /* code if successful */ },
            //     function(error) { /* code if some error */ }
            //   );
            
                auth.login(details.email, details.password).then(res => {
                    console.log(res)
                    console.log("return details on signup form success:", res.success, " message:", res.msg);
                    // @jade do stuff here with returned data
                    // use this promise pattern when handling all other API call functions (currently only auth functions)

                    if (res.success) {
                        setLogin({ ...login, attempt: "success" });
                        document.location = "/dashboard";
                    } else {

                        setLogin({ ...login, attempt: "failed" })
                        if (res.msg == "User already logged in") {
                            setLogin({ ...login, msg: "User already logged in" })
                        } else {
                            setLogin({ ...login, msg: "Password or email does not match" })
                        }
                    }

                }).catch(err => {
                    console.log(err);
                });


        } else {
            setErrors({ ...errors, any: true });
        }
    }

    function validate() {


        // just check for @ and . signs
        // zxxxxxxxx@unsw.edu.au
        if (!details.email.includes("@") || !details.email.includes(".")) {
            errors.email = true;
            return false;
        } else {
            errors.email = false;

        }


        if (details.password.length < 0) {
            errors.password = true;

            return false;
        } else {
            errors.password = false;

        }


        return true;
    }

    return(
        <form className="form-inner" onSubmit={submit}>
            <div className={login.attempt =="success"? "hide" : "show"}>

                {/* display error */}

                    <div className="info">
                    <div className={errors.any ? "formError" : "form"} > Unable to log in, please try again.</div>

                    <input className={errors.email ? "textboxError" : "textbox"} type="email"  placeholder="email" name="email" id="email" onChange={s => setDetails({...details, email:s.target.value})} value={details.email}/>
                    <div className={errors.email ? "formError" : "form"} > email must be a valid email.</div>

                    <input className={errors.password ? "textboxError" : "textbox"} type="password"  placeholder="password" name="password" id="password" onChange={s => setDetails({...details, password:s.target.value})} value={details.password}/>
                    <div className={errors.password ? "formError" : "form"} > Password cannot be blank.</div>

                    <div className={login.msg == "Password or email does not match" ? "formError" : "form"} > Password or email does not match.</div>
                    <div className={login.msg == "User already logged in" ? "formError" : "form"} > User already logged in.</div>
                    <button className="submit" onClick={submit} > Submit</button>    
                    </div>
                    <div></div>
                    <Link to={'/forgot_password'} className="link"> Forgot Password? </Link>
                    <div/>
                    <Link to={'/register'}  className="link"> Don't have an account? Register. </Link>
            </div>
            <div className={(login.attempt == "success") ? "show" :"hide"}>
                <div className="signIn" > Successfully logged in. Redirecting...</div>

            </div>

        </form>
    )
}

export default LoginForm;