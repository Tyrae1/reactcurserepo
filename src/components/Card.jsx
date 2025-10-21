import React, {Component} from 'react';
class Card extends Component {
    render() {
        const {title, text} = this.props;
        return (
            <div className="card">
                <div className="card-body">
                    {title && <h4 className="card-title">{title}</h4>}
                    {text && <p className="card-text">{text}</p>}
                </div>
            </div>
        )
    }
}

export default Card;
