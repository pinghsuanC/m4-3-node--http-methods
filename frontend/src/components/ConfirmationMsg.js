import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({ name, product, province }) => (
  <Wrapper>
    <Div_msg part="first">Thanks for ordering, {name}!</Div_msg>
    <Div_msg part="second">
      Your order of {product} will be sent to your home in {province}, Canada.
      Thank you for participating!!
    </Div_msg>
  </Wrapper>
);

const Div_msg = styled.div`
  font-size: ${(props) => (props.part === "first" ? "1.5em" : "1em")};
  color: ${(props) => (props.part === "first" ? "black" : "gray")};
`;
const Wrapper = styled.p`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  z-index: 4;
`;

export default ConfirmationMsg;
