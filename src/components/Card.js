import React from "react";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";

const Card = (props) => {
  return (
    <React.Fragment>
      <Grid
        // border="1px solid black"
        width="100%"
        padding="0px 12px"
        margin="20px 0px"
      >
        {/* 이미지 */}
        <Grid
          height="20vw"
          maxHeight="276px"
          backgroundColor="#EBF0F5"
          borderRadius="10px"
        >
          <Image
            borderRadius="13px"
            height="100%"
            src={props.product.image}
          ></Image>
        </Grid>
        {/* 북마크 */}

        {/* 제품정보 */}
        <Grid margin="9px 0px">
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
              {props.product.priceBuyNow}원
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

export default Card;
