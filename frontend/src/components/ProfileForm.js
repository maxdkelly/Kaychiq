import React, { useState, Component, setState } from "react";
import UploadProfileImage from "./UploadProfileImage";
import LoginForm from './LoginForm';
import { Button } from "react-bootstrap";
import user from "../utils/user";
import task from "../utils/task";
import auth from "../utils/auth";
import "../StyleSheets/ProfilePage.css"
import { Edit } from "grommet-icons";
import Connections from "./Connections";

class ProfileForm extends React.Component {


    edit = false;
    showfEdit = false;
    showeEdit = false;
    showlEdit = false;

    state = { 
        user_id:0,
        email: "", 
        fname: "", 
        lname: "", 
        currPassword: "", 
        newPassword: "", 
        confirmPassword: "",
        newEmail:"",
        newFname:"",
        newLname:"",
        msg:"",
        edit:false,
        changeP: false,
        changeM: false,
        showlEdit:false,
        showeEdit:false,
        pSuccess: false,
        maxHours: 8,
        targetMaxHours: 8,
        hourPerDayError: false
    }

    componentDidMount(){
        var uid = 0;
        if (this.props.location){
            uid = this.props.location.user_id;
            this.setState({user_id:this.props.location.user_id});
        }

        task.getMaxHours()
        .then(data => {
            if (data.success === true){
                this.setState({maxHours:data.maxHours});
            }
            else{
                this.setState({msg:data.msg});
            }
        })

        user.getUserProfile(uid)
        .then(data => {
            if (data.success === true){
                this.setState({email:data.profile.email});
                this.setState({fname:data.profile.firstName});
                this.setState({lname:data.profile.lastName});
                this.setState({newFname:data.profile.firstName});
                this.setState({newLname:data.profile.lastName});
            }
            else{
                this.setState({msg:data.msg});
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    submitNameChange = () => {
        console.log(this.state.newFname, this.state.newLname);
        this.setState({edit: !this.state.edit})
        if (this.state.newFname !== "" && this.state.newLname !== ""){
            user.changeName(this.state.newFname, this.state.newLname)
            .then(data => {
                if (data.success){
                    window.location.reload();
                }
                else{
                    this.setState({msg:data.msg});
                }
            })
        }
        else{
            this.setState({msg:"Please fill out your first and last name"});
        }
    }

    validateHourInput = (hours) => {
        console.log(Number.isInteger(hours));
        var hoursInt = parseInt(hours);
        if (Number.isInteger(hoursInt)){
            if (hoursInt < 24 && hoursInt > 0){
                return true;
            }
            return false;
        }
        return false;
    }

    saveMaxHours = () => {
        console.log(this.state.user_id)

        if (this.validateHourInput(this.state.targetMaxHours)){
            this.setState({hourPerDayError:false});
            task.changeMaxHours( this.state.targetMaxHours)
            .then(data1 => {
               
                console.log(data1);
                
                task.getMaxHours()
                .then(data => {
                    if (data.success === true){
                        this.setState({maxHours:data.maxHours});
                    }
                    else{
                        this.setState({msg:data.msg});
                    }
                })
            }
            )
        }
        else{
            this.setState({hourPerDayError:true})
        }
    }

    submitPasswordChange = s => {
        
        if(this.state.confirmPassword === "" || this.state.currPassword === "" || this.state.newPassword === ""){
            this.setState({msg: "All fields must be filled"})
        }
        else if (this.state.newPassword === this.state.confirmPassword){
            
            auth.changePassword(this.state.email, this.state.currPassword, this.state.newPassword)
            .then(data => {
                this.setState({ msg:data.msg });
                
            })
            .catch(err => {
                this.setState({ msg:"An unknown error occured" });
                console.log(err);
            })
        }
        else{
            this.setState({msg:"Please ensure that your passwords match"});
        }
    }



    // setfEdit = ()) =>{
    //     console.log(this.state.showfEdit);
    //     this.setState({showfEdit: !this.state.showfEdit});
    //     console.log(this.state.showfEdit);
    // }


    


    render(){
        console.log("this state is" +this.state.msg);
  
        let filled =true;
        let matching = true;
        let oldE = true;
        let newE = true; 
        let confE = true;
        let wrongP = false;
        let blank = false;
        let pSuccess = false;
        if(this.state.msg === "All fields must be filled"){
            filled = false;
            if(this.state.confirmPassword === ""){
                confE=false;

            } if (this.state.newEmail === ""){
                newE=false;
            } if (this.state.currPassword === ""){
                oldE=false
            }
        }

        if (this.state.msg === "Please ensure that your passwords match"){
            matching = false
            newE = false
            confE = false
        }

        if(this.state.msg==="User or Password Incorrect"){
            wrongP = true; 
            oldE = true;
        }
        if (this.state.msg === "Please fill out your first and last name"){
            blank = true;
        }

        if(this.state.msg === "Password has been changed"){
            pSuccess = true;
        }
            return( 
                <div>
                <div className={ (this.state.changeP || this.state.changeM)? "hidden": "homeContainer"}>
           
                <h1 className="yourProfile">Your Profile</h1>


                <div className="mainContainer">

                    <UploadProfileImage className="img"/>
                    <div className="infoContainer">
                        <div className="maintext">
                            <div className="maintext"><b>Email: </b>{this.state.email}</div>
 
                        </div>

                        <div className="maintext" >
                            <div className="maintext" ><b>First name: </b> {this.state.fname}</div>    
                            <button className={ this.state.edit ? "sbutton":  "hidden"} onClick={s => this.setState({ showfEdit: !this.state.showfEdit } )}>Change First Name </button>
                            
                        </div>
                        <form className={this.state.showfEdit ? "showInput" : "hidden"}>
                                <div className="maintext" > <b>New first name: </b>  </div>
                                <input  className={blank ? "errorInput": ""}type="text" placeholder="new first name" name="fname" id="fname" onChange={s => this.setState({ newFname: s.target.value })} value={this.state.newFname} />
                                
                        </form>
                        <div className={this.state.showfEdit ? "" : "hidden"}>       
                            <div className={!blank ? "hidden": "errorMsg"}> All fields must be filled</div>
                        </div>
                        <button className={ this.state.showfEdit ? "button":"hidden"}  onClick={this.submitNameChange}>  Save </button>
                            

                        
                        
                        <div className="maintext">
                            <div className="maintext"><b>Last name:</b> {this.state.lname}</div>
                            <button className={ this.state.edit ? "sbutton":  "hidden"}  onClick={s => this.setState({ showlEdit: !this.state.showlEdit })}> Change Last Name </button>
                            
                        </div>
                        <form className={this.state.showlEdit ? "showInput" : "hidden"}>
                                 <div className="maintext" > <b>New last name: </b>  </div>
                                <input className={blank ? "errorInput": ""} type="text" placeholder="new last name" name="lname" id="lname" onChange={s => this.setState({ newLname: s.target.value })} value={this.state.newLname} />
                               
                        </form>
                        <div className={this.state.showlEdit ? "" : "hidden"}>       
                            <div className={!blank ? "hidden": "errorMsg"}> All fields must be filled</div>
                        </div>
                        <button className={ this.state.showlEdit ? "button":"hidden"}  onClick={this.submitNameChange}>  Save </button>

                        
                        


                         
                        <button onClick={s => this.setState({edit: !this.state.edit})} className={ this.state.edit ? "hidden":"button"}> Edit Profile</button> 
                        
                        <button className={ this.state.edit ? "hidden":"button"} onClick={s => this.setState({changeP: !this.state.changeP})}> Change Password</button> 

                        <button onClick={s => this.setState({changeM: !this.state.changeM})} className={ this.state.edit ? "hidden":"button"}> Change Max Hours Worked Per Day</button> 


                        <button onClick={s => this.setState({edit: !this.state.edit})} className={ this.state.edit ? "button":"hidden"}> Go Back</button> 
                       
                    </div>

                   


                    
                </div>

               

                <Connections/>
            
            </div>

            <div className={ this.state.changeM ? "homeContainer": "hidden"}>
                    <h1 className="yourProfile">Change Max Hours</h1>

                    
                        <div>
                            
                                <div className={ "maintext"}>
                                    <div className="maintext" > <b> Current Max Hours Per Day: {this.state.maxHours}</b>  </div>
                                </div>
                                
                        
                                <div className={ "maintext"}>
                                    <div className="maintext" > <b> Enter New Max Hours Per Day:</b>  </div>
                                    <input className={ this.state.hourPerDayError ? "errorInput" : "" }placeholder="Max Hours Per Day" name="maxHoursPerDay" id="maxHoursPerDay" onChange={s => this.setState({ targetMaxHours: s.target.value })} value={this.state.targetMaxHours} />
                                </div>
                                <div className={this.state.hourPerDayError ? "errorMsg": "hidden"}> Hours must be more than 0 and less than 24 </div>
                                
                        </div>

                       

                        <button onClick ={() => this.saveMaxHours()} className="buttonC"> Save </button>
                        <button onClick={s => this.setState({ changeM: false })} className="buttonC"> Go Back </button>
                        
                </div>

                <div className={ this.state.changeP ? "homeContainer": "hidden"}>
                    <h1 className="yourProfile">Change Password</h1>

                    
                        <div className={pSuccess ? "hidden":"passwordContainer"}>
                            
                                <div className={ "maintext"}>
                                    <div className="maintext" > <b> Current Password:</b>  </div>
                                    <input className={ oldE ? "" : "errorInput"} type="password" placeholder="current password" name="currPassword" id="currPassword" onChange={s => this.setState({ currPassword: s.target.value })} value={this.state.currPassword} />
                                    
                                
                                </div>
                                
                                <div className={wrongP ? "errorMsg":"hidden"}> Incorrect Password</div>

                                <div className={ "maintext"}>
                                    <div className="maintext" > <b> New Password:</b>  </div>
                                    <input className={ newE ? "" : "errorInput"} type="password" placeholder="new password" name="newPassword" id="newPassword" onChange={s => this.setState({ newPassword: s.target.value })} value={this.state.newPassword} />
                                     
                                </div>

                                <div className={ "maintext"}>
                                    <div className="maintext" > <b> Confirm New Password:</b>  </div>
                                    <input className={ confE ? "" : "errorInput"} type="password" placeholder="confirm password" name="confirmPassword" id="confirmPassword" onChange={s => this.setState({ confirmPassword: s.target.value })} value={this.state.confirmPassword} />
                                    
                                </div>
                                <div className={(!matching) ? "errorMsg": "hidden"}> New passwords must match </div>

                                <div className={filled ? "hidden": "errorMsg"}> All fields must be filled</div>
                                
                        </div>

                        <div className={!pSuccess ? "hidden":"passwordContainer"}>
                            <div className="successMsg"> Password was successfully changed. </div>
                        </div>

                        <button onClick={this.submitPasswordChange} className={pSuccess ? "hidden": "buttonC"}> Save </button>
                        <button onClick={s => this.setState({ changeP: false })} className="buttonC"> Go Back </button>
                        
                </div>
                
        </div>
            
            )

        
    }

}

export default ProfileForm;