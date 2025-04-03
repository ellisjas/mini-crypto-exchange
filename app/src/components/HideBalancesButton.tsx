import React, { useTransition } from 'react';
import { Pressable, Text } from 'react-native';
import { useClientQuery } from 'react-relay';
import {
  commitLocalUpdate,
  graphql,
  RecordSourceSelectorProxy,
} from 'relay-runtime';
import styled from 'styled-components';
import environment from '../relay/environment';

const PressableText = styled(Text)`
  padding: 6px;
  color: blue;
`;

const HideBalancesButtonClientQuery = graphql`
  query HideBalancesButtonClientQuery {
    hideBalances
  }
`;

export default function HideBalancesButton() {
  const [isPending, startTransition] = useTransition();
  const clientData = useClientQuery(HideBalancesButtonClientQuery, {});

  const toggleHideBalances = () => {
    startTransition(() => {
      commitLocalUpdate(environment, (store: RecordSourceSelectorProxy) => {
        const query = store.getRoot();
        const currentHideBalances = query.getValue('hideBalances');
        query.setValue(!currentHideBalances, 'hideBalances');
      });
    });
  };

  return (
    <Pressable onPress={toggleHideBalances} disabled={isPending}>
      <PressableText>
        {clientData?.hideBalances ? 'Show balances' : 'Hide balances'}
      </PressableText>
    </Pressable>
  );
}
