import React from "react";
import styled from "styled-components";
import Select from "./Select";
import Input from "./Input";
import Button from "./Button";

import { itemOptions, sizeOptions } from "../../settings";

const Form = ({ formData, handleChange, handleClick, disabled, subStatus }) => (
  <Wrapper>
    <SelectWrapper>
      <Select
        label="Your order"
        htmlFor="order"
        selection={formData.order}
        handleChange={handleChange}
        options={itemOptions}
      />
      {formData.order === "tshirt" && (
        <Select
          label="T-shirt Size"
          htmlFor="size"
          selection={formData.size}
          handleChange={handleChange}
          options={sizeOptions}
        />
      )}
    </SelectWrapper>
    <FormContent>
      <h1>Order Form</h1>
      <h2>Provide your information</h2>
      <FormGroup>
        <Input
          name="givenName"
          type="text"
          placeholder="First name"
          handleChange={handleChange}
        />
        <Input
          name="surname"
          type="text"
          placeholder="Last name"
          handleChange={handleChange}
        />
      </FormGroup>
      <Input
        name="email"
        type="email" // altered type to email
        placeholder="Email"
        handleChange={handleChange}
      />
      <h2>Shipping Address</h2>
      <Input
        name="address"
        type="address"
        placeholder="Address"
        handleChange={handleChange}
      />
      <FormGroup>
        <Input
          name="city"
          type="text"
          placeholder="City"
          handleChange={handleChange}
        />
        <Input
          name="province"
          type="text"
          placeholder="Province"
          handleChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="postcode"
          type="text"
          placeholder="Postal Code"
          handleChange={handleChange}
        />
        <Input
          name="country"
          type="text"
          placeholder="Country"
          handleChange={handleChange}
        />
      </FormGroup>
    </FormContent>
    <Button
      formData={formData}
      handleClick={handleClick}
      disabled={disabled}
      subStatus={subStatus}
    />
  </Wrapper>
);

const Wrapper = styled.form`
  padding: 0 20px;
`;
const FormContent = styled.div`
  margin: 0 16px 0;
`;
const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > div {
    flex: 1 0 auto;
    width: 48%;

    &:first-child {
      margin-right: 6px;
    }
  }
`;
const SelectWrapper = styled.div`
  display: flex;
  margin-top: -20px;

  > div {
    max-width: inherit;

    &:first-child {
      flex: 1;
      margin-right: 6px;
    }
  }
`;

export default Form;
