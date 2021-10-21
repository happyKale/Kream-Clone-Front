import React from "react";
import styled from "styled-components";
import { history } from "../redux/store";
import { Grid, Text, Image } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as productActions } from "../redux/modules/product";

const Card = (props) => {
  const dispatch = useDispatch();
  const id = props.product.id;
  const bookmark = props.product.bookMark;

  const bookmarkChecked = {
    backgroundColor: "red",
  };

  return (
    <React.Fragment>
      <Grid width="100%" padding="0px 12px" margin="20px 0px" cursor="pointer">
        <Bookmark>
          <Grid
            margin="0px"
            width="34px"
            height="37px"
            onClick={() => {
              dispatch(productActions.setBookmarkMW(id, bookmark, "main"));
            }}
          >
            <Text
              align="center"
              margin="auto"
              width="auto"
              padding="0px"
              fontSize="20px"
            >
              {bookmark ? (
                <i className="fas fa-bookmark"></i>
              ) : (
                <i className="far fa-bookmark"></i>
              )}
            </Text>
          </Grid>
        </Bookmark>
        {/* 이미지 */}
        <Grid
          height="20vw"
          maxHeight="276px"
          backgroundColor="#EBF0F5"
          borderRadius="10px"
          onClick={() => {
            history.push(`detail/${id}`);
          }}
        >
          <Image
            borderRadius="13px"
            height="100%"
            src={props.product.image}
          ></Image>
        </Grid>
        {/* 제품정보 */}
        <Grid
          margin="9px 0px"
          onClick={() => {
            history.push(`detail/${id}`);
          }}
        >
          <Grid>
            <Text
              width="auto"
              margin="0px"
              padding="0px"
              fontSize="14px"
              borderBottom="1px solid black"
              display="inline-block"
              lineHeight="18px"
            >
              {props.product.brand}
            </Text>
          </Grid>
          <Text
            fontWeight="400"
            margin="8.5px 0px 2px"
            padding="0px"
            fontSize="14px"
          >
            {props.product.modelName.split(";")[0]}
          </Text>
          <Grid margin="7px 0px 0px 0px">
            <Text fontSize="15px" margin="0px" padding="0px">
              {props.product.price}
            </Text>
            <Text
              margin="0px"
              padding="0px"
              color="rgba(34,34,34,.5)"
              fontSize="11px"
            >
              즉시 구매가
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Bookmark = styled.div`
  width: auto;
  position: relative;
  top: 0px;
  right: 0px;
  height: auto;
  margin: 5px;
  float: right;
`;

export default Card;
