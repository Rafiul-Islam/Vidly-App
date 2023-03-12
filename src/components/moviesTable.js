import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

const MoviesTable = (props) => {
    const {movies, onDelete, onLike, onSort, sortColumn} = props;
    const [columns, setColumns] = useState( [
        {
            path: 'title', label: 'Title', content: movie =>
                <NavLink to={`/movies/${movie._id}`}>{movie.title}</NavLink>
        },
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {
            key: 'liked',
            content: movie =>
                <Like
                    liked={movie.liked}
                    onClick={() => onLike(movie)}
                />
        },
    ]);
    const deleteColumn = {
        key: 'delete',
        content: movie =>
            <button
                onClick={() => onDelete(movie._id)}
                className="btn bg-danger text-white">
                Delete
            </button>
    }

    useEffect(() => {
        const user = auth.getCurrentUser();
        if (user && user.isAdmin){
            let allColumns = columns;
            allColumns = [...allColumns, deleteColumn];
            setColumns(allColumns);
        }
    }, [])

    return (
        <Table
            data={movies}
            columns={columns}
            onSort={onSort}
            sortColumn={sortColumn}
        />
    );
};

export default MoviesTable;
