import './App.css';
import Movies from "./components/movies";
import {Redirect, Route, Switch} from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Navbar from "./components/navbar";
import MovieForm from "./components/movieForm";

function App() {
    return (
        <>
            <Navbar/>
            <main className='container mt-4'>
                <Switch>
                    <Route path="/movies/:id" component={MovieForm}/>
                    <Route path="/movies" component={Movies}/>
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
