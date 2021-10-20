import React from "react";
import styled from "styled-components";

const Button = (props) => {

    const {children, backgroundColor} = props;

    const styles = {
        backgroundColor:backgroundColor,
    }

    return (
        <React.Fragment>
            <StyledButton {...styles}>{children}</StyledButton>
        </React.Fragment>
    )
}

Button.defaultProps = {
    color:"#EBEBEB",
}

const StyledButton = styled.button`
    width: 100%;
    font-size: 16px;
    letter-spacing: -.16px;
    font-weight: 700;
    height: 52px;
    line-height: 50px;
    border-radius: 12px;
    border:none;
    color:#fff;

    background-color: ${(props)=>props.backgroundColor};
`

export default Button;