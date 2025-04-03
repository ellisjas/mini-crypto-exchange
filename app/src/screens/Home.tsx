import React, { Suspense } from 'react';
import { useFragment } from 'relay-hooks';
import { graphql } from 'relay-runtime';
import IconRewards from '../../assets/images/Rewards.svg';
import AccountBalance from '../components/AccountBalance';
import HideBalancesButton from '../components/HideBalancesButton';
import List from '../components/List';
import ListHeading from '../components/ListHeading';
import ListItem from '../components/ListItem';
import { HomeFragment$key } from './__generated__/HomeFragment.graphql';

type Props = {
  query: HomeFragment$key;
};

const HomeFragment = graphql`
  fragment HomeFragment on Query {
    rewards
    ...AccountBalanceFragment
  }
`;

export default function Home({ query }: Props) {
  const data = useFragment<HomeFragment$key>(HomeFragment, query);
  const rewards = data?.rewards;

  return (
    <List
      heading={
        <ListHeading
          title="Your Wallet"
          rightContent={<HideBalancesButton />}
        />
      }>
      <ListItem
        label="Accounts"
        icon={<IconRewards />}
        navigateTo="Accounts"
        value={
          <Suspense>
            <AccountBalance query={data} />
          </Suspense>
        }
      />
      <ListItem
        label="Wallet Rewards"
        icon={<IconRewards />}
        value={`${rewards || 0} points`}
      />
    </List>
  );
}
