import React from "react";
import styled from "styled-components";

const Input = (props) => {

    const {type, onChange, placeholder, warn} = props;
    const styles = {
        warn:warn,
    }
    return (
        <React.Fragment>
            <StyledInput {...styles} type={type} onChange={onChange} placeholder={placeholder}/>
        </React.Fragment>
    )
}

Input.defaultProps = {
    type: "text",
    onChange: false,
    placeholder: "",
}

const StyledInput = styled.input`
    padding: 8px 0;
    width: 100%;
    font-size: 15px;
    letter-spacing: -.15px;
    line-height: 22px;
    border: none;
    border-bottom: 1px solid #ebebeb;
    padding: 8px 30px 8px 0;
    height: 38px;

    &:focus{
        outline: none;
        border-bottom: 2px solid ${(props)=>props.warn?"#f15746":"#333"};
    }

    &::placeholder{
        color:#bcbcbc;
    }
`

export default Input;