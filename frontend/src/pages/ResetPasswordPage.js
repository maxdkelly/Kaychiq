import Header from "../components/Header"
import ResetPwdForm from "../components/ResetPasswordForm.js"
import NavbarUnauthenticated from "../components/NavbarUnauthenticated"
import reset from "../StyleSheets/LoginPage.css"

export const ResetPasswordPage = props => {
    return (

        <body>
            <Header> </Header>
            <div className="LogInBox">
                <h1 className="Heading">Reset Password </h1>
                <ResetPwdForm />
            </div>

        </body>
    )
}