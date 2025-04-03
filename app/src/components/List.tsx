import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

type Props = {
  heading?: React.ReactNode;
  children: React.ReactNode;
};

const ListWrapper = styled(View)`
  margin: 16px;
`;

const ListItemsWrapper = styled(View)`
  border-radius: 5%;
  background-color: white;
`;

export default function List({ heading, children }: Props) {
  return (
    <ListWrapper>
      {heading && heading}
      <ListItemsWrapper>{children}</ListItemsWrapper>
    </ListWrapper>
  );
}
