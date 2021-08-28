import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// pages
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { CheckEmailPage } from './pages/CheckEmailPage';
import TaskViewPage from './pages/TaskViewPage';
import AddTaskPage from './pages/AddTaskPage';
import EditTaskPage from './pages/EditTaskPage';
import OtherUserPage from './pages/OtherUserPage';
import ProfileSearchPage from './pages/ProfileSearchPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ProfilePage } from './pages/ProfilePage';
import CalendarViewPage from './pages/CalendarViewPage';

// utils
import { ProtectedRoute } from "./utils/protected_route";
import auth from './utils/auth';
import Cookies from 'js-cookie'

// styles
import '@fortawesome/fontawesome-free/css/all.min.css';  
import './index.css';
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';  


function App() {
  return (
    <div className="App">
      <Switch>
        <ProtectedRoute exact path="/">
          <Redirect to="/dashboard"/>
        </ProtectedRoute>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/forgot_password" component={ForgotPasswordPage} />
        <Route exact path="/check_email" component={CheckEmailPage} />
        <Route exact path="/reset_password/:resetToken" component={ResetPasswordPage}/>
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/change_password" component={ChangePasswordPage} />
        <ProtectedRoute exact path="/profile" component={ProfilePage} />
        <ProtectedRoute exact path="/add_task" component={AddTaskPage} />
        <ProtectedRoute exact path="/calendar" component={CalendarViewPage} />
        <ProtectedRoute exact path="/task" component={TaskViewPage} />
        <ProtectedRoute exact path="/edit_task" component={EditTaskPage} />
        <ProtectedRoute exact path="/view_user" component={OtherUserPage} />
        <ProtectedRoute exact path="/search_user" component={ProfileSearchPage} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
