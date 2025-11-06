import React from 'react';
const Item = ({task, onRemove}) => {
    return (
        <div>
            <div className="row align-items-center">
                <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => onRemove(task.id)}
                        >
                        Done?
                    </button>
                </div>
                <div className="col">{task.text}</div>
            </div>
            <hr />
        </div>
    );
}
export default Item;