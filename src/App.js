import {useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
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
import './App.css';

function App() {

    const [user, setUser] = useState({});

    useEffect(() => {
        try {
            const jwt = localStorage.getItem("token");
            const userObj = jwtDecode(jwt);
            setUser(userObj);
        } catch (ex) {
        }
    }, [])

    return (
        <>
            <ToastContainer theme={"colored"}/>
            <Navbar user={user}/>
            <main className='container mt-4'>
                <Switch>
                    <Route path="/movies/:id" component={MovieForm}/>
                    <Route path="/movies" component={Movies}/>
                    <Route path="/login" component={LoginForm}/>
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
