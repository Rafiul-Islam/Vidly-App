import React from 'react';

const ListGroup = (props) => {
    const {items, textProperty, valueProperty, selectedItem, onItemSelect} = props;
    return (
        <>
            <ul className="list-group">
                {items.map(item =>
                    <li
                        key={item[valueProperty]}
                        className={selectedItem === item ? "list-group-item list-group-item-action clickable active" : "list-group-item list-group-item-action clickable"}
                        onClick={() => onItemSelect(item)}
                    >
                        {item[textProperty]}
                    </li>
                )}
            </ul>
        </>
    );
};

ListGroup.defaultProps = {
    valueProperty: '_id',
    textProperty: 'name'
};

export default ListGroup;
