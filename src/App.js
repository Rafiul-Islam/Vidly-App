import Movies from "./components/movies";
import {Redirect, Route, Switch} from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Navbar from "./components/navbar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import './App.css';
import RegisterForm from "./components/registerForm";

function App() {
    return (
        <>
            <Navbar/>
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
