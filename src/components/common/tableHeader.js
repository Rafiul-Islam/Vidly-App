import React from 'react';

const TableHeader = (props) => {
    const {columns, onSort, sortColumn} = props;
    const raiseSort = (path) => {
        const sortColumnObj = {...sortColumn}
        if (sortColumnObj.path === path) {
            sortColumnObj.order = (sortColumnObj.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortColumnObj.path = path;
            sortColumnObj.order = 'asc';
        }
        onSort(sortColumnObj);
    }
    return (
        <thead>
        <tr>
            {
                columns.map(column =>
                    <th
                        key={column.path || column.key}
                        onClick={() => raiseSort(column.path)}
                    >
                        {column.label}
                    </th>)
            }
        </tr>
        </thead>
    );
};

export default TableHeader;
