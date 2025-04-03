import React from 'react';
import { View } from 'react-native';
import { graphql, useClientQuery, useFragment } from 'react-relay';
import type { AssetListClientQuery as AssetListClientQueryType } from './__generated__/AssetListClientQuery.graphql';
import { AssetListFragment$key } from './__generated__/AssetListFragment.graphql';
import Asset from './Asset';

type Props = {
  query: AssetListFragment$key;
};

const AssetListFragment = graphql`
  fragment AssetListFragment on Portfolio
  @argumentDefinitions(kind: { type: CurrencyKind, defaultValue: null }) {
    assets(kind: $kind) {
      id
      ...AssetFragment
    }
  }
`;

const AssetListClientQuery = graphql`
  query AssetListClientQuery {
    hideBalances
  }
`;

export default function AssetList({ query }: Props) {
  const data = useFragment<AssetListFragment$key>(AssetListFragment, query);
  const clientData = useClientQuery<AssetListClientQueryType>(
    AssetListClientQuery,
    {},
  );

  if (!data?.assets) {
    return null;
  }

  return (
    <View>
      {data.assets.map((asset) => (
        <Asset
          key={asset.id}
          asset={asset}
          hideBalances={Boolean(clientData?.hideBalances)}
        />
      ))}
    </View>
  );
}
