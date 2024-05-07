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

interface props {
  message?: string
}


function ErrorMessage({ message }: props) {
    return (
      <ErrorContainer>
        <ErrorHeading>Oops!</ErrorHeading>
        { message }
      </ErrorContainer>
    );

}

export default ErrorMessage;
