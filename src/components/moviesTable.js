import React from 'react';
import Like from "./common/like";
import TableHeader from "./common/tableHeader";

const MoviesTable = (props) => {
    const {movies, onDelete, onLike, onSort, sortColumn} = props;
    const columns = [
        {path: 'title', label: 'Title'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {key: 'liked'},
        {key: 'delete'},
    ];

    return (
        <table className='table'>
            <TableHeader
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />
            <tbody>
            {
                movies.map(movie =>
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre?.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                            <Like
                                liked={movie.liked}
                                onClick={() => onLike(movie)}
                            />
                        </td>
                        <td>
                            <button onClick={() => onDelete(movie._id)}
                                    className="btn bg-danger text-white">Delete
                            </button>
                        </td>
                    </tr>
                )
            }
            </tbody>
        </table>
    );
};

export default MoviesTable;
