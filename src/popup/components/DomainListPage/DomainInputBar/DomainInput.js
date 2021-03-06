import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "../../Button";
import validator from "validator";

function DomainInput({ domains, setDomains, ...props }) {
  const [inputText, setInputText] = useState("");

  const addDomain = () => {
    if (validator.isFQDN(inputText) && !domains.includes(inputText)) {
      setDomains((domainList) => [inputText, ...domainList]);
      setInputText("");
    }
  };

  return (
    <StyledDomainInput {...props}>
      <Input
        placeholder="Enter domain"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addDomain();
          }
        }}
      />
      <StyledButton
        type="primary"
        onClick={() => {
          addDomain();
        }}
      >
        Add
      </StyledButton>
    </StyledDomainInput>
  );
}

DomainInput.propTypes = {
  domains: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDomains: PropTypes.func.isRequired,
};

const StyledButton = styled(Button)`
  margin-left: 0;
  border-radius: 0 3px 3px 0;
`;

const StyledDomainInput = styled.div`
  display: flex;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  color: #333;
  outline: none;
  border: none;
  border-radius: 3px 0 0 3px;
  background-color: white;
  font-size: 14px;
  padding: 6px 16px;
  width: 0;
  flex: 1 1 auto;

  &::placeholder {
    color: #b8b8b8;
  }
`;

export default DomainInput;
