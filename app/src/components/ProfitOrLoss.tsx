import React from 'react';
import { Text, View } from 'react-native';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-runtime';
import styled from 'styled-components';
import FiatView from './FiatView';
import { ProfitOrLossFragment$key } from './__generated__/ProfitOrLossFragment.graphql';

const Wrapper = styled(View)`
  display: flex;
  position: relative;
  bottom: -5px;
  right: 0;
`;

const Label = styled(Text)`
  color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
`;

const ProfitOrLossFragment = graphql`
  fragment ProfitOrLossFragment on Query {
    portfolio @required(action: LOG) {
      totalProfitOrLoss @required(action: LOG)
    }
    ticker(pair: "AUDUSD") @required(action: LOG) {
      last @required(action: LOG)
    }
  }
`;

type Props = {
  query: ProfitOrLossFragment$key;
};

export default function ProfitOrLoss({ query }: Props) {
  const data = useFragment(ProfitOrLossFragment, query);

  if (!data) {
    return null;
  }

  const { totalProfitOrLoss } = data.portfolio;

  const USDToAUDExchangeRate = data.ticker.last;

  return (
    <Wrapper>
      <Label>Profit/Loss</Label>
      <FiatView
        currency="AUD"
        prependCurrency
        style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
        {totalProfitOrLoss / USDToAUDExchangeRate}
      </FiatView>
    </Wrapper>
  );
}
