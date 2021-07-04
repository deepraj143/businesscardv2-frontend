import React from 'react'
import {Alert} from 'react-bootstrap'
import Button from '../Button'

const Form = (props) => {
    return (
        <>
            <form onSubmit={props.submitHandler}>
                <Alert variant={props.validationVariant}>{props.validationMessage}</Alert>
                    {props.children}
                <div className="text-center my-3">
                    <Button buttonStyle="btn--outline" buttonSize="btn--medium">{props.submitBtn}</Button>
                </div>
            </form>
        </>
    )
}
    
export default Form