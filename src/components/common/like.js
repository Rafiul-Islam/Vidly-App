import React from 'react';

const Like = (props) => {
    const {liked, onClick} = props;
    const getClasses = () => liked ? '' : '-o'
    return (
        <i
            onClick={onClick}
            className={'like-component fa fa-heart' + getClasses()}>
        </i>
    );
};

export default Like;
