import React, {useState} from 'react';
import classNames from 'classnames';

const BtnGroup = () => {
    const [active, setActive] = useState(null);
    return (
        <div className="btn-group">
            <button
                className={classNames('btn', 'btn-outline-primary', {active: active === 'left'})}
                onClick={() => setActive('left')}>
                Left
            </button>
            <button
                className={classNames('btn', 'btn-outline-primary', {active: active === 'right'})}
                onClick={() => setActive('right')}>
                Right
            </button>
        </div>

    );
}
export default BtnGroup;