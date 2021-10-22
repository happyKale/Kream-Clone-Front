import React from "react";
import styled from "styled-components";
import { history } from "../redux/store";
import { Grid, Text, Image } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as productActions } from "../redux/modules/product";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";

const Card = (props) => {
  const dispatch = useDispatch();
  const id = props.product.id;
  const mypage = props.mypage;
  const mypageBookmark = mypage? props.product: null;
  const bookmark = props.product.bookMark;
  const productList = useSelector((state) => state.product.list.productList);

//   brand: "Jordan"
// image: "https://kream-phinf.pstatic.net/MjAyMDEwMjJfMTg2/MDAxNjAzMzMzOTM5MTQ0.resSxHG53R7j1awM1CccFGyBMy8nvmaEfxtL7yloUP4g.gis2sVQYnRUPCWtiC3xAHHJ0HpIIdN4hgXX7f11-ONQg.PNG/p_17627_0_503e3395e113498a95c8516614309221.png?type=l"
// modelName: "Jordan 1 Retro High Rookie of the Year;조던 1 레트로 하이 루키 오브 더 이어"
// originPrice: "199,000원"

  return (
    <React.Fragment>
      <Grid width="100%" padding="0px 12px" margin="20px 0px" cursor="pointer">
        {mypage? <Bookmark>
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
                <FontAwesomeIcon icon={fasBookmark} />
              ) : (
                <FontAwesomeIcon icon={farBookmark} />
              )}
            </Text>
          </Grid>
        </Bookmark> : null}
        {/* 이미지 */}
        <Grid
          height="20vw"
          maxHeight="276px"
          backgroundColor="#EBF0F5"
          borderRadius="10px"
          onClick={() => {
            if(!mypage){history.push(`detail/${id}`);}
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
            if(!mypage){history.push(`detail/${id}`);}
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
              {!mypage?props.product.price:mypageBookmark.originPrice}
            </Text>
            <Text
              margin="0px"
              padding="0px"
              color="rgba(34,34,34,.5)"
              fontSize="11px"
            >
              {props.product.isOriginPrice ? "발매가" : "즉시 거래가"}
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
