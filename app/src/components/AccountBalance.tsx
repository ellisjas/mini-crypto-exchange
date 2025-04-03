import React from 'react';
import { useFragment } from 'relay-hooks';
import { graphql } from 'relay-runtime';
import { useClientQuery } from 'react-relay';
import FiatView from './FiatView';
import { AccountBalanceFragment$key } from './__generated__/AccountBalanceFragment.graphql';
import HiddenBalance from './HiddenBalance';

type Props = {
  query: AccountBalanceFragment$key;
};

const AccountBalanceFragment = graphql`
  fragment AccountBalanceFragment on Query {
    portfolio {
      assets {
        valueInAUD
      }
    }
  }
`;

const AccountBalanceClientQuery = graphql`
  query AccountBalanceClientQuery {
    hideBalances
  }
`;

export default function AccountBalance({ query }: Props) {
  const data = useFragment(AccountBalanceFragment, query);
  const clientData = useClientQuery(AccountBalanceClientQuery, {});

  if (!data?.portfolio) {
    return null;
  }

  if (clientData?.hideBalances) {
    return <HiddenBalance />;
  }

  const {
    portfolio: { assets },
  } = data;

  if (!assets) {
    return (
      <FiatView currency="AUD" prependCurrency>
        {0}
      </FiatView>
    );
  }

  const accountBalance = assets.reduce(
    (acc: number, asset) => acc + (asset?.valueInAUD || 0),
    0,
  );

  return <FiatView currency="AUD">{accountBalance}</FiatView>;
}
