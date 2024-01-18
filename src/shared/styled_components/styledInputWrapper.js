import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  background: transparent;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  flex: 1;
`;

export const InputWrapper = ({ children }) => (
  <Wrapper>
    <Content>{children}</Content>
  </Wrapper>
);
