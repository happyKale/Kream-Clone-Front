import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const {
    src,
    margin,
    padding,
    width,
    height,
    borderRadius,
    border,
    backgroundSize,
  } = props;
  const styles = {
    src: src,
    margin: margin,
    padding: padding,
    width: width,
    height: height,
    borderRadius: borderRadius,
    border: border,
    backgroundSize: backgroundSize,
  };

  return (
    <React.Fragment>
      <StyledImage {...styles}></StyledImage>
    </React.Fragment>
  );
};

Image.defaultProps = {
  src: "",
  width: "100%",
  height: "auto",
  margin: null,
  padding: null,
  borderRadius: null,
  border: null,
  backgroundSize: "cover",
};

const StyledImage = styled.div`
  background-image: url("${(props) => props.src}");
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => props.border};
  background-size: ${(props) => props.backgroundSize};
  background-position: center;
  background-repeat: no-repeat;
`;

export default Image;
