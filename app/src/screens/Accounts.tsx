import React, { Suspense } from 'react';
import { View } from 'react-native';
import { graphql, useFragment } from 'react-relay';
import AssetList from '../components/AssetList';
import List from '../components/List';
import ListHeading from '../components/ListHeading';
import { AccountsFragment$key } from './__generated__/AccountsFragment.graphql';

type Props = {
  query: AccountsFragment$key;
};

const AccountsFragment = graphql`
  fragment AccountsFragment on Query {
    cryptoAssets: portfolio {
      ...AssetListFragment @arguments(kind: CRYPTO)
    }
    fiatAssets: portfolio {
      ...AssetListFragment @arguments(kind: FIAT)
    }
  }
`;

export default function Accounts({ query }: Props) {
  const data = useFragment<AccountsFragment$key>(AccountsFragment, query);

  if (!data) {
    return null;
  }

  const { cryptoAssets, fiatAssets } = data;

  return (
    <View>
      {fiatAssets && (
        <Suspense>
          <List heading={<ListHeading title="Cash" />}>
            <AssetList query={fiatAssets} />
          </List>
        </Suspense>
      )}
      {cryptoAssets && (
        <Suspense>
          <List heading={<ListHeading title="Crypto" />}>
            <AssetList query={cryptoAssets} />
          </List>
        </Suspense>
      )}
    </View>
  );
}
