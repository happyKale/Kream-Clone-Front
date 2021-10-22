import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    children,
    width,
    height,
    color,
    fontSize,
    border,
    borderTop,
    minWidth,
    maxWidth,
    margin,
    padding,
    borderRadius,
    backgroundColor,
    float,
    display,
    onClick,
    gridColumns,
    gridRows,
    minHeight,
    maxHeight,
    justifyContents,
    flexDirection,
    alignItems,
    cursor,
    position,
    backgroundImage,
  } = props;
  const styles = {
    width: width,
    height: height,
    color: color,
    fontSize: fontSize,
    border: border,
    borderTop: borderTop,
    borderRadius: borderRadius,
    minWidth: minWidth,
    maxWidth: maxWidth,
    margin: margin,
    padding: padding,
    float: float,
    backgroundColor: backgroundColor,
    display: display,
    gridColumns: gridColumns,
    gridRows: gridRows,
    minHeight: minHeight,
    maxHeight: maxHeight,
    justifyContents: justifyContents,
    flexDirection: flexDirection,
    alignItems: alignItems,
    cursor: cursor,
    position: position,
    backgroundImage: backgroundImage,
  };

  return (
    <React.Fragment>
      <StyledGrid onClick={onClick} {...styles}>
        {children}
      </StyledGrid>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  width: "100%",
  height: null,
  color: null,
  fontSize: null,
  border: null,
  borderTop: null,
  borderRadius: null,
  minWidth: null,
  maxWidth: null,
  minHeight: null,
  maxHeight: null,
  margin: null,
  padding: null,
  float: null,
  backgroundColor: null,
  display: null,
  gridColumns: null,
  gridRows: null,
  justifyContents: null,
  flexDirection: null,
  alignItems: null,
  cursor: null,
  position: null,
  backgroundImage: null,
  onClick: () => {},
};

const StyledGrid = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  border: ${(props) => props.border};
  border-top: ${(props) => props.borderTop};
  border-radius: ${(props) => props.borderRadius};
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  float: ${(props) => props.float};
  background-color: ${(props) => props.backgroundColor};
  display: ${(props) => props.display};
  grid-template-columns: ${(props) => props.gridColumns};
  grid-template-rows: ${(props) => props.gridRows};
  justify-content: ${(props) => props.justifyContents};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  cursor: ${(props) => props.cursor};
  position: ${(props) => props.position};
  background-image: ${(props) => `url(${props.backgroundImage})`};
`;

export default Grid;
