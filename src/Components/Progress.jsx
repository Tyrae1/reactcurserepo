import React, {Component} from 'react';

class Progress extends Component {
    render() {
        const {percentage} = this.props;
        return (
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={percentage} aria-valuemin="0"
                     aria-valuemax="100" aria-label="progressbar" style={{ width: `${percentage}%` }}>
                    {percentage}%
                </div>
            </div>
        );
    }
}

export default Progress;