import React, { Component } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  width: 100%;
  padding: 8px 16px;
  background-color: #f7c5c0;
  color: #a51809;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const ErrorHeading = styled.h1`
  font-size: 18px;
  margin: 10px 0;
`;

const ErrorList = styled.ul`
  padding-left: 20px;
`;

function ErrorMessage(message: any) {
  const renderMessageArray = (errors: any[]) => {
    const constraints = errors.map((constraint: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, idx: React.Key | null | undefined) => <li key={idx}>{constraint}</li>);
 
    return <ErrorList>{constraints}</ErrorList>;
  };
 
    return (
      <ErrorContainer>
        <ErrorHeading>Oops!</ErrorHeading>
        {Array.isArray(message) ? renderMessageArray(message) : <p>{message}</p>}
      </ErrorContainer>
    );
}

export default ErrorMessage;
