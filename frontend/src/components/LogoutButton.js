import Cookies from "js-cookie";
import auth from "../utils/auth";
import '../StyleSheets/LoginForm.css';

function LogoutButton(){
    
    const submit = s => {
        let token = Cookies.get("auth");
        auth.logout(token);
    }

    return(
        <button onClick={submit} className='LogInButton'>Logout</button>
    )
}

export default LogoutButton;