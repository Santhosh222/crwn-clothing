import styled from "styled-components";

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const Name = styled.div``;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const Price = styled.div``;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
  ${Name},
  ${Quantity},
  ${Price} {
    width: 23%;
  }
`;