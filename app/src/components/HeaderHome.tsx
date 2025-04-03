import React, { Suspense } from 'react';
import { Platform, View } from 'react-native';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-runtime';
import styled from 'styled-components/native';
import Brand from '../../assets/images/Brand.svg';
import Logo from '../../assets/images/Logo.svg';
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

const wrapperStyle = {
  marginTop: Platform.OS === 'android' ? 16 : 0,
  marginBottom: 'auto',
};

const HeaderHomeFragment = graphql`
  fragment HeaderHomeFragment on Query {
    ...ProfitOrLossFragment
  }
`;

export default function HeaderHome({ query }: Props) {
  const data = useFragment(HeaderHomeFragment, query);

  return (
    <View style={wrapperStyle}>
      <HeaderTitle>
        <Logo height={40} style={{ position: 'absolute', left: -10 }} />
        <Brand height={20} />
      </HeaderTitle>
      <Suspense>
        <ProfitOrLoss query={data} />
      </Suspense>
    </View>
  );
}
