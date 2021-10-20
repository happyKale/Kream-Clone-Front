import React from "react";
import styled from "styled-components";

const Text = (props) => {

    const {children, fontSize, fontWeight, color, lineHeight} = props;
    const styles = {
        fontSize:fontSize,
        fontWeight:fontWeight,
        color:color,
        lineHeight:lineHeight
    }

    return (
        <React.Fragment>
            <StyledInput {...styles}>{children}</StyledInput>
        </React.Fragment>
    )
}

Text.defaultProps = {
    fontSize: "13px",
    fontWeight: "700",
    color: "#000",
    lineHeight:"auto",
}

const StyledInput = styled.p`
   font-size: ${(props)=>props.fontSize};
   font-weight: ${(props)=>props.fontWeight};
   color:${(props)=>props.color};
   line-height: ${(props)=>props.lineHeight};

`

export default Text;