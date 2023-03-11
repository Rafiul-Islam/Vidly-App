import {useEffect, useState} from "react";
import Movies from "./components/movies";
import {ToastContainer} from "react-toastify";
import {Redirect, Route, Switch} from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Navbar from "./components/navbar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Logout from "./components/logout";
import auth from "./services/authService";
import './App.css';

function App() {

    const [user, setUser] = useState({});

    useEffect(() => {
        const user = auth.getCurrentUser();
        setUser(user);
    }, [])

    return (
        <>
            <ToastContainer theme={"colored"}/>
            <Navbar user={user}/>
            <main className='container mt-4'>
                <Switch>
                    <ProtectedRoute path="/movies/:id" component={MovieForm}/>
                    <Route path="/movies" render={(props) => <Movies {...props} user={user}/>}/>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/register" component={RegisterForm}/>
                    <Route path="/customers" component={Customers}/>
                    <Route path="/rentals" component={Rentals}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Redirect exact from='/' to='/movies'/>
                    <Redirect to='/not-found'/>
                </Switch>
            </main>
        </>
    );
}

export default App;
