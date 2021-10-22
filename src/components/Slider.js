import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid, Image } from "../elements";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
          <Grid height="480px" width="100%" backgroundColor="#3A3AFC">
            <Image
              height="90%"
              width="100%"
              backgroundSize="contain"
              src="https://kream-phinf.pstatic.net/MjAyMTEwMTVfMjg5/MDAxNjM0Mjc2MzUxOTUy.U0SQaHt54PKCNqVSp4YS6w4VVj_nDHZ1q2ghBPPS6hIg.axjYu-WYNgoNSw1w-WGQ-ch7-Pippr2wwEZnhWU9cIkg.JPEG/a_95fde0c55abe489180154a545c6655e5.jpg?type=l"
            ></Image>
          </Grid>
          <Grid height="480px" width="100%" backgroundColor="#25252F">
            <Image
              height="90%"
              width="100%"
              backgroundSize="contain"
              src="https://kream-phinf.pstatic.net/MjAyMTEwMTRfOTAg/MDAxNjM0MjA1NDM3NTMy.rN9SfN1ZbRGF8CzKVuyhXQH-LqogwngkN3ncPAUvhBog.WAvi55y8qwjfWWTSJOGfdvKORePW7OyNE1wVZhc_RTcg.JPEG/a_e9f290ef58ec47db8b74eee787a467c7.jpg?type=l"
            ></Image>
          </Grid>
          <Grid height="480px" width="100%" backgroundColor="#366078">
            <Image
              height="90%"
              width="100%"
              backgroundSize="contain"
              src="https://kream-phinf.pstatic.net/MjAyMTEwMTBfMjc4/MDAxNjMzODM0ODExMTEz.AYyP8r66Ff2h0A4WfM7hu0MgdGtDOCqavkYaOLODA6kg.lvs2jhiO6iclAZkZ-XAanodtq1OY5rR9Rd1ScpU_L1Ug.JPEG/a_67c5cbcf10f5456aab775ac814f8a278.jpg?type=m_2560"
            ></Image>
          </Grid>
          <Grid height="480px" width="100%" backgroundColor="#F27549">
            <Image
              height="90%"
              width="100%"
              backgroundSize="contain"
              src="https://kream-phinf.pstatic.net/MjAyMTEwMDdfMTIz/MDAxNjMzNTUwMjAzODE3.hlxA_a2tSLKRczbsasA7L5SneQ9h2sUsFOaeeIaWOugg.PoytDtJ-c2zYpU1tzH6yJx99ejLmDXH7X1mwiVFactUg.JPEG/a_2f1f02174f80498192e45d50a6b8f7e2.jpg?type=m_2560"
            ></Image>
          </Grid>
          <Grid height="480px" width="100%" backgroundColor="#443A31">
            <Image
              height="90%"
              width="100%"
              backgroundSize="contain"
              src="https://kream-phinf.pstatic.net/MjAyMTEwMTRfMjQ5/MDAxNjM0MTgwMTIyODk4.pdul-HMj1dSItLsdt5_9HlB7HenlCXLUyqc-fHGIBgwg.SUVsU_U-VmDy6vurAFn7PDtUdGtYp8Vihr0zj5bR5ysg.JPEG/a_91d156f6a33f4969b0bb78195535be75.jpg?type=l"
            ></Image>
          </Grid>
          <Grid height="480px" width="100%" backgroundColor="#01C65C">
            <Image
              height="90%"
              width="100%"
              backgroundSize="contain"
              src="https://kream-phinf.pstatic.net/MjAyMTA5MDhfOTYg/MDAxNjMxMDg2MzMyMTAw.70_u-vKpMVi19M7Jfb962VECK-Mc971RFTaxUJbLqnMg.9teKjpAR7j9PNgYPxQQ_WQ0jNmRCz38NsLJxzuEAvC4g.JPEG/a_28335bdda0b244f7b412dce5559dba5b.jpg?type=l"
            ></Image>
          </Grid>
          <Grid height="480px" width="100%" backgroundColor="#E2DACD">
            <Image
              height="90%"
              width="100%"
              backgroundSize="contain"
              src="https://kream-phinf.pstatic.net/MjAyMTAzMjlfMjIx/MDAxNjE2OTUxOTIwMTYx.k4ZkrVWpWYSBsN-j1VgtgLuGwHK8nxwJgoJcrhElp7Mg.1kpDhuH3nlfljVlQoY-jtbatWm1GHAYGU3MNMV968MYg.JPEG/d_615f49845c0341a4bcec59d2597cc412.jpg?type=l"
            ></Image>
          </Grid>
          <Grid height="480px" width="100%" backgroundColor="#F8F8F8">
            <Image
              height="90%"
              width="100%"
              backgroundSize="contain"
              src="https://kream-phinf.pstatic.net/MjAyMDExMjNfMjU0/MDAxNjA2MTAxMjMwOTg2.Lru1_LSFReeOGavo_Nv5iHAHEQDrgcRVuUDO_VwQbL0g.if4WbmNvghR7rUXR_MxttP9QrAVnboaK1IAxnaF0d6kg.JPEG/p_e1a64ddc68fe4c16b7e2390ee5daa6f4.jpg?type=l"
            ></Image>
          </Grid>
        </Slider>
      </div>
    );
  }
}
