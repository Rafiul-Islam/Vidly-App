import React from 'react';
import Like from "./common/like";
import Table from "./common/table";

const MoviesTable = (props) => {
    const {movies, onDelete, onLike, onSort, sortColumn} = props;
    const columns = [
        {path: 'title', label: 'Title'},
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
        {
            key: 'delete',
            content: movie =>
                <button
                    onClick={() => onDelete(movie._id)}
                    className="btn bg-danger text-white">
                    Delete
                </button>
        },
    ];

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
