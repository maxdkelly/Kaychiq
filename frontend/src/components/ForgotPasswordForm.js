import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../StyleSheets/LoginForm.css';
import auth from "../utils/auth";
// Form for changing password
// TODO remember to create function "ChangePassword" on ChangePassword page
function ForgotPasswordForm() {
    const [details, setDetails] = useState({ email: "" });
    const [error, setError] = useState({ isError: true, msg: "" });

    const submit = s => {
        s.preventDefault();

        auth.forgotPassword(details.email)
        .then(data => {
            if (data === null){
                setError({ ...error, isError: true, msg: "The request was unsuccessful. We are looking into this issue..." });
            }
            else if (data.success === true) {
                document.location = "/check_email";
            }
            else{
                setError({ ...error, isError: data.success, msg: data.msg });
            }
        })


    }

    return (
        <div>
            <form className="form-inner" onSubmit={submit}>
                <text className="formError">{error.msg}</text>
                <div >
                    <div>
                        <input className="textbox" type="text" placeholder="email" name="email" id="email" onChange={s => setDetails({ ...details, email: s.target.value })} value={details.email} />
                        <button className="submit" onClick={submit} >Submit</button>
                    </div>
                    <Link to={"/home"} className = "link"> Home </Link>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordForm;