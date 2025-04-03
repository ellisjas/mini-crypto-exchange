import React, { Suspense } from 'react';
import { View } from 'react-native';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-runtime';
import styled from 'styled-components/native';
import Coinly from '../../assets/images/Coinly.svg';
import { HeaderHomeFragment$key } from './__generated__/HeaderHomeFragment.graphql';
import ProfitOrLoss from './ProfitOrLoss';

type Props = {
  query: HeaderHomeFragment$key;
};

const HeaderTitle = styled(View)`
  min-width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HeaderHomeContainer = styled(View)`
  margintop: 0;
  marginbottom: auto;
`;

const HeaderHomeFragment = graphql`
  fragment HeaderHomeFragment on Query {
    ...ProfitOrLossFragment
  }
`;

export default function HeaderHome({ query }: Props) {
  const data = useFragment(HeaderHomeFragment, query);

  return (
    <HeaderHomeContainer>
      <HeaderTitle>
        <Coinly height={20} />
      </HeaderTitle>
      <Suspense>
        <ProfitOrLoss query={data} />
      </Suspense>
    </HeaderHomeContainer>
  );
}
