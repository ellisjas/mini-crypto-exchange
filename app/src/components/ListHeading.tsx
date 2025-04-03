import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

type Props = {
  title: string;
  rightContent?: React.ReactNode;
};

const H1 = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

const HeadingContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`;

export default function ListHeading({ title, rightContent }: Props) {
  return (
    <HeadingContainer>
      <H1>{title}</H1>
      {rightContent && rightContent}
    </HeadingContainer>
  );
}
