import React from 'react';
import styled from '@emotion/styled';

const ContainerHeader = styled.header`
  background-color: #26C6D4;
  padding: 10px;
  font-weight: bold;
  color: #FFFFFF;
`;

const TextHeader = styled.h1`
  font-size: 2rem;
  margin: 0;
  font-family: 'Slabo 27px', serif;
  text-align: center;
`;

export default function Header({ title }) {
  return (
    <ContainerHeader>
      <TextHeader>
        {title}
      </TextHeader>
    </ContainerHeader>
  );
}

