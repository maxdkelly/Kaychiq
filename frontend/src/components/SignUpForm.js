import React, {useState} from "react";
import {useHistory,
    Redirect,
    Link} from "react-router-dom";
import '../StyleSheets/LoginForm.css';
import auth from "../utils/auth";



// Form for logging in
// remember to create function "Login" on login page
function SignUpForm({ SignUp, error }){
    const [details, setDetails] = useState({email:"", fname:"", lname:"", password:"", confirmPassword:""});
  

    const [errors, setErrors] = useState({ any:false, fname:false, lname:false, email:false, password:false, confPassword:false});


    const [success, setSuccess] = useState({attempt:"", err:""});

    function validate()  {
        console.log(details.fname.length);
        if (details.fname.length <= 0){
            errors.fname = true;
            console.log("no firstame");
            console.log("errors: any = " + errors.any);
            
            return false
            //call a function 
        }  else  {
            errors.fname=false;

        }
        
        if (details.lname.length <=0){
           errors.lname = true;
           return false
        } else {
            errors.lname=false;

        }
        
        // just check for @ and . signs
        // zxxxxxxxx@unsw.edu.au
        if ( !details.email.includes("@") || !details.email.includes(".")){
            errors.email = true;
            return false;
        } else  {
            errors.email = false;
            
        } 
        
        
        if (details.password !==  details.confirmPassword) {
            errors.password = true;
            errors.confirmPassword = true;
            return false;
        } else {
            errors.password = false;
            errors.confPassword = false;
        }


        return true;
    }


    
    const submit = s =>{
        s.preventDefault();
    
        if(validate()){
            console.log("here it needs to link to api");

            auth.signup(details.email, details.fname, details.lname, details.password)
            .then(res =>{
                console.log("return details on signup form success:", res.success, " message:", res.msg);
                // @jade do stuff here with returned data
                // use this promise pattern when handling all other API call functions (currently only auth functions)
                
                if(res.success){
                    setSuccess({...success,attempt: "success" });
                   
                } else {
                   
                    
                    setSuccess({...success,attempt: "failed"})

                    if(res.msg == "Malformed user information"){
                        setSuccess({...success,msg: "Malformed user information"})
                    } else  {
                        setSuccess({...success, msg:  "User with email already exists"})
                    }

                    console.log("success attempt: " +success.attempt)
                }
                
            }).catch(err =>{
                console.log(err);
            });
    
          
        
            
        } else {
            setErrors({...errors, any:true});           
            console.log("found some errors");
        }
        
    }

    return(
        <form className="form-inner" onSubmit={submit}>
            <div className={success.attempt.includes("success") ? "hide" : "show"}>
               
                
                    <div>
                            <div className={errors.any ? "formError" : "form"} > Unable to create account, please try again.</div>


                            <div className={success.attempt == "failed" ? "formError ": "form"}> Unable to create account. {success.err}</div>
                            <div className={success.msg == "Malformed user information" ? "formError" : "form"} > Malformed user information.</div>
                            <div className={success.msg == "User with email already exists" ? "formError" : "form"} > User with email already exists.</div>

                           
                          
                            <input className={errors.fname ? "textboxError" : "textbox"}  type="text" placeholder="firstname" name="fname" id="fname" onChange={s => setDetails({...details, fname:s.target.value})}  value={details.fname}/>
                            <div className={errors.fname ? "formError" : "form"} > Cannot be empty.</div>
                            <input className={errors.lname ? "textboxError" : "textbox"} type="text" placeholder="lastname" name="lname" id="lname" onChange={s => setDetails({...details, lname:s.target.value})} value={details.lname}/>
                            <div className={errors.lname ? "formError" : "form"} > Cannot be empty.</div>
                            <input className={errors.email ? "textboxError" : "textbox"} type="email"  placeholder="email" name="email" id="email" onChange={s => setDetails({...details, email:s.target.value})} value={details.email}/>
                            <div className={errors.email ? "formError" : "form"} > email invalid.</div>
                            <input className={errors.password ? "textboxError" : "textbox"} type="password"  placeholder="password" name="password" id="password" onChange={s => setDetails({...details, password:s.target.value})} value={details.password}/>
                            
                            <input className={errors.confirmPassword ? "textboxError" : "textbox"} type="password"  placeholder="confirm password" name="confirmPassword" id="confpassword" onChange={s => setDetails({...details, confirmPassword:s.target.value})} value={details.confirmPassword}/>
                   
                            <div className={errors.confirmPassword ? "formError" : "form"} > Passwords must match.</div>
                            <button className="submit" onClick={submit}  > Submit</button>    
                        </div>
                    <div></div>
                    <Link to={'/login'} className="link" > Already have an account? Login.</Link>
                <div/>
                    
            </div>

            <div className={(success.attempt =="success") ? "show" :"hide"}>
                <div className="signIn" > Successfully registered</div>
                <Link to={'/login'} className="loginButton"> Log In</Link>
             </div>
        </form>
    )
}

export default SignUpForm;