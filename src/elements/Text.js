import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    children,
    fontSize,
    fontWeight,
    color,
    lineHeight,
    margin,
    width,
    borderBottom,
    display,
    align,
  } = props;
  const styles = {
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: color,
    lineHeight: lineHeight,
    margin: margin,
    width: width,
    borderBottom: borderBottom,
    display: display,
    align: align,
  };

  return (
    <React.Fragment>
      <StyledInput {...styles}>{children}</StyledInput>
    </React.Fragment>
  );
};

Text.defaultProps = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#000",
  lineHeight: "auto",
  margin: null,
  width: null,
  borderBottom: null,
  display: null,
  align: null,
};

const StyledInput = styled.p`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  border-bottom: ${(props) => props.borderBottom};
  display: ${(props) => props.display};
  text-align: ${(props) => props.align};
`;

export default Text;
