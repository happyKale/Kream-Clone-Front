import React from "react";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram as fabInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook as fabFacebook } from "@fortawesome/free-brands-svg-icons";
import { faSms as fasSMS } from "@fortawesome/free-solid-svg-icons";

const Footer = (props) => {
  return (
    <React.Fragment>
      <Grid
        margin="0px"
        backgroundColor="#fff"
        padding="50px 40px"
        height="450px"
        borderTop="1px solid #ebebeb"
      >
        {/* 1번째 */}
        <Grid display="flex" justifyContents="space-between">
          <Grid width="400px" height="147px" display="flex">
            <Grid>
              <Text fontSize="16px" color="rgb(34, 34, 34)">
                이용안내
              </Text>
              <StyledList>
                <StyledLi key="1">검수기준</StyledLi>
                <StyledLi key="2">이용정책</StyledLi>
                <StyledLi key="3">페널티 정책</StyledLi>
                <StyledLi key="4">커뮤니티 가이드라인</StyledLi>
              </StyledList>
            </Grid>
            <Grid>
              <Text fontSize="16px" color="rgb(34, 34, 34)">
                고객지원
              </Text>
              <StyledList>
                <StyledLi key="1">공지사항</StyledLi>
                <StyledLi key="2">서비스 소개</StyledLi>
                <StyledLi key="3">쇼룸 안내</StyledLi>
                <StyledLi key="4">판매자 방문접수</StyledLi>
              </StyledList>
            </Grid>
          </Grid>
          {/* width="272px" */}
          <Grid width="292px" height="147px">
            <Text
              margin="0px 0px 8px 0px"
              fontSize="16px"
              color="rgb(34, 34, 34)"
            >
              고객센터 1588-7813
            </Text>
            <Grid
              display="flex"
              height="17px"
              color="rgba(34, 34, 34, 0.5)"
              fontSize="13px"
            >
              <StyledDt>운영시간</StyledDt>
              <StyledDd>평일 11:00 - 18:00 (토 ∙ 일, 공휴일 휴무)</StyledDd>
            </Grid>
            <Grid
              display="flex"
              height="17px"
              color="rgba(34, 34, 34, 0.5)"
              fontSize="13px"
              margin="4px 0px 0px 0px"
            >
              <StyledDt>점심시간</StyledDt>
              <StyledDd>평일 13:00 - 14:00</StyledDd>
            </Grid>
            <Text
              fontWeight="400"
              margin="8px 0px 0px 0px"
              color="#222"
              fontSize="13px"
            >
              1:1 문의하기는 앱에서만 가능합니다.
            </Text>
            <Grid
              width="110px"
              height="34px"
              margin="17px 0px 0px 0px"
              backgroundColor="#222"
              padding="0px 14px"
              display="flex"
              alignItems="center"
            >
              <Text
                width="auto"
                color="#fff"
                fontSize="12px"
                fontWeight="400"
                margin="0px"
              >
                자주 묻는 질문
              </Text>
            </Grid>
          </Grid>
        </Grid>
        {/* 2번째 */}
        <Grid
          borderTop="1px solid rgb(235, 235, 235)"
          margin="56px 0px 0px 0px"
          padding="30px 0px 0px 0px"
        >
          <Grid display="flex" justifyContents="space-between">
            <Grid display="flex" width="340px" height="17px">
              <Text
                fontSize="14px"
                fontWeight="400"
                width="auto"
                margin="0px 20px 0px 0px"
              >
                회사소개
              </Text>
              <Text
                fontSize="14px"
                fontWeight="400"
                width="auto"
                margin="0px 20px 0px 0px"
              >
                인재채용
              </Text>
              <Text
                fontSize="14px"
                fontWeight="400"
                width="auto"
                margin="0px 20px 0px 0px"
              >
                이용약관
              </Text>
              <Text fontSize="14px" width="auto">
                개인정보처리방침
              </Text>
            </Grid>
            <Grid display="flex" width="auto">
              {/* SNS Box */}
              <Grid display="inline-block">
                <FontAwesomeIcon
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                  icon={fabInstagram}
                />
              </Grid>
              <Grid display="inline-block">
                <FontAwesomeIcon
                  style={{
                    width: "24px",
                    height: "24px",
                    marginLeft: "20px",
                  }}
                  icon={fabFacebook}
                />
              </Grid>
              <Grid display="inline-block">
                <FontAwesomeIcon
                  style={{
                    width: "24px",
                    height: "24px",
                    marginLeft: "20px",
                  }}
                  icon={fasSMS}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            margin="16px 0px 0px 0px"
            display="flex"
            color="rgba(34, 34, 34, 0.5)"
            fontSize="13px"
          >
            <StyledDl>
              <dt>크림 주식회사 · 대표</dt>
              <dd>김창욱</dd>
            </StyledDl>
            <StyledDl>
              <dt>사업자등록번호:</dt>
              <dd>570-88-01618</dd>
              <dd>사업자정보확인</dd>
            </StyledDl>
            <StyledDl>
              <dt>통신판매업:</dt>
              <dd>제 2021-성남분당C-0093호</dd>
            </StyledDl>
          </Grid>
          <Grid display="flex" color="rgba(34, 34, 34, 0.5)" fontSize="13px">
            <StyledDl>
              <dt>사업장소재지:</dt>
              <dd>경기도 성남시 분당구 분당내곡로 117, 8층</dd>
            </StyledDl>
            <StyledDl>
              <dt>개인정보관리책임자:</dt>
              <dd>김미진</dd>
            </StyledDl>
            <StyledDl>
              <dt>호스팅 서비스:</dt>
              <dd>네이버 클라우드 (주)</dd>
            </StyledDl>
          </Grid>
        </Grid>
        {/* 3번째 */}
        <Grid
          margin="12px 0px 0px 0px"
          display="flex"
          justifyContents="space-between"
        >
          <Grid minWidth="608px">
            <Text
              fontWeight="400"
              lineHeight="14px"
              letterSpacing="-0.7px"
              color="rgba(34,34,34,.3)"
              fontSize="12px"
            >
              크림(주)는 통신판매 중개자로서 통신판매의 당사자가 아니므로 개별
              판매자가 등록한 상품정보에 대해서 책임을 지지 않습니다. 단,
              거래과정에서 검수하고 보증하는 내용에 대한 책임은 당사에 있습니다.
            </Text>
          </Grid>
          <Grid>
            <Text
              margin="0px"
              align="right"
              color="rgba(34,34,34,.3)"
              fontSize="12px"
            >
              © 2021 KREAM.Corp.
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const StyledList = styled.ul`
  list-style: none;
  padding: 0px;
  font-size: 14px;
  color: rgba(34, 34, 34, 0.5);
`;

const StyledLi = styled.li`
  margin: 12px 0px 0px 0px;
`;

const StyledDl = styled.dl`
  margin-right: 10px;
  display: flex;
  margin: 0px;
  height: 20px;
`;
const StyledDt = styled.dt`
  width: auto;
  color: rgba(34, 34, 34, 0.5);
  letter-spacing: -0.07px;
  margin: 0px;
`;
const StyledDd = styled.dd`
  width: auto;
  color: rgba(34, 34, 34, 0.5);
  letter-spacing: -0.07px;
  margin: 0px;
`;

export default Footer;
