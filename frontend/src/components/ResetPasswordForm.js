import React, {useState} from "react";
import   {Link, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import '../StyleSheets/LoginForm.css';
import auth from "../utils/auth";
// Form for logging in
// remember to create function "Login" on login page
function ResetPasswordForm({ Login, error }){
    const [details, setDetails] = useState({password:"", confirmPassword:""});
    const [errors, setErrors] = useState({ any:false, msg:"", success:false});
    const { resetToken } = useParams();

    const submit = s =>{
        s.preventDefault();
        
        //*********testing *****/
        auth.verifyResetToken(resetToken)
        .then(res=> console.log(res))
        console.log(resetToken)

        auth.resetPassword(resetToken, details.newPassword)
        .then(res=> console.log(res))
        console.log(resetToken)
        //********testing  ******/

        if(details.password === details.confirmPassword){
           
            // .then(res =>{
            //     console.log("return details on signup form success:", res.success, " message:", res.msg);
            //     // @jade do stuff here with returned data
            //     // use this promise pattern when handling all other API call functions (currently only auth functions)
         
            //     if(res.success){
            //         setLogin({...login,attempt: "success" });
            //         Cookies.set("auth", res.auth_token)
    
            //         s.history.push('/dashboard');
            //     } else {
                   
            //         setLogin({...login,attempt: "failed"})
            //         if(res.msg == "User already logged in"){
            //             setLogin({...login, msg: "User already logged in"})
            //         } else {
            //             setLogin({...login, msg: "Password or email does not match"})
            //         }
            //     }
                
            // }).catch(err =>{
            //     console.log(err);
            // });    
            setErrors({...errors, success:true}); 
        } else {
            setErrors({...errors, any:true, msg:"Passwords must be the same"}); 
        }
    }
        return (
            <form className="form-inner" onSubmit={submit}>
                <div >
                     <div hidden={errors.success}>
       
        
                        <div>
                            <input className={errors.any ? "textboxError" : "textbox"} type="password" placeholder="new password" name="newPassword" id="newPassword" onChange={s => setDetails({ ...details, newPassword: s.target.value })} value={details.newPassword} />
                            <input className={errors.any ? "textboxError" : "textbox"} type="password" placeholder="confirm password" name="confirmPassword" id="confirmPassword" onChange={s => setDetails({ ...details, confirmPassword: s.target.value })} value={details.confirmPassword} />
                            <div className={errors.any ? "formError" : "form"} > Passwords must match.</div>
                            <button className="submit" onClick={submit} > Submit</button>
                        </div>
                    </div>
                    <div hidden={!errors.success}> Password successfully reset. Please log in</div>
                    <div/>
                    <Link to={"/login"}> Login </Link>
                </div>
            </form>
        )
    }

    export default ResetPasswordForm;