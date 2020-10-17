import React from 'react';
import './ErrorMessage.scss';

class ErrorMessage extends React.Component {

    render() {
        return (
            <div className="error-message">{this.props.message}</div>
        )
    }

}

export default ErrorMessage;