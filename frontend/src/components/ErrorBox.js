import React from 'react'

const ErrorBox = (props) => {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>
            {props.children}
        </div>
    )
}

export default ErrorBox
