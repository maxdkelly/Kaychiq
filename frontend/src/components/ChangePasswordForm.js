import React, { useState } from "react";
import '../StyleSheets/LoginForm.css';
import auth from "../utils/auth";
import { Link } from "react-router-dom";
// Form for changing password
// TODO remember to create function "ChangePassword" on ChangePassword page
const ChangePasswordForm = props => {
    const [details, setDetails] = useState({ email:"", oldPassword:"", newPassword:"", confirmPassword:""});
    const [error, setError] = useState({isError:false, msg:""});

    const submit = s => {
        s.preventDefault();

        //shameless copy paste for now @jade hehe
        if( details.password !==  details.confirmPassword) {
            alert("Passwords dont match")
            console.log("error!!!!!!")
        } else {
            console.log(s.newPassword);
            console.log(s.confirmPassword);
            console.log("shouldnt make it here")
        }

        auth.changePassword(details.email, details.oldPassword, details.newPassword)
        .then(data =>{
            if(data.success === true){
                props.history.push('/dashboard');
            }
            else{
                setError({ ...error, isError:true, msg:data.msg });
            }
        }).catch(err =>{
            console.log(err);
        });
    }

    return (
        <form className="form-inner" onSubmit={submit}>
            <div >

                <div className={error.isError ? "formError" : "form"} > {error.msg} </div>

                <div className="form">
                    <input className="textbox" type="text" placeholder="email" name="email" id="email" onChange={s => setDetails({ ...details, email: s.target.value })} value={details.email} />
                    <input className="textbox" type="password" placeholder="old password" name="oldPassword" id="oldPassword" onChange={s => setDetails({ ...details, oldPassword: s.target.value })} value={details.oldPassword} />
                    <input className="textbox" type="password" placeholder="new password" name="newPassword" id="newPassword" onChange={s => setDetails({ ...details, newPassword: s.target.value })} value={details.newPassword} />
                    <input className="textbox" type="password" placeholder="confirm password" name="confirmPassword" id="confirmPassword" onChange={s => setDetails({ ...details, confirmPassword: s.target.value })} value={details.confirmPassword} />
                    <button className="submit" onClick={submit} > Submit</button>
                </div>
                <div/>
                <Link to={"/dashboard"}> Dashboard </Link>
            </div>
        </form>
    )
}

export default ChangePasswordForm;