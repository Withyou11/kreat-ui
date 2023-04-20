import { useState } from 'react';
import styles from './ListLocation.module.scss';
import classNames from 'classnames/bind';
function ListLocation({ data, select }) {
    const cx = classNames.bind(styles);

    function handleLocationSelection(event, location) {
        event.preventDefault();
        select(location);
    }
    return (
        <div className={cx('wrapper')}>
            {data &&
                data.map((location) => (
                    <div key={location.geonameId}>
                        <button onClick={(event) => handleLocationSelection(event, location.name)}>
                            <h4 className={cx('name')}>{location.name}</h4>
                        </button>
                    </div>
                ))}
        </div>
    );
}

export default ListLocation;
