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
    const renderSortIcon = (column) => {
        if (column.path !== sortColumn.path) return null

        if (sortColumn.order==='asc') return <i className='fa fa-sort-asc'/>
        if (sortColumn.order==='desc') return <i className='fa fa-sort-desc'/>

    }
    return (
        <thead>
        <tr>
            {
                columns.map(column =>
                    <th className='clickable'
                        key={column.path || column.key}
                        onClick={() => raiseSort(column.path)}
                    >
                        {column.label}
                        &nbsp;{renderSortIcon(column)}
                    </th>)
            }
        </tr>
        </thead>
    );
};

export default TableHeader;
