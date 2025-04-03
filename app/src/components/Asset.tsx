import React from 'react';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-runtime';
import { CurrencyFragment$key } from '../fragments/__generated__/CurrencyFragment.graphql';
import CurrencyFragment from '../fragments/Currency';
import { AssetFragment$key } from './__generated__/AssetFragment.graphql';
import CurrencyIcon from './CurrencyIcon';
import FiatView from './FiatView';
import HiddenBalance from './HiddenBalance';
import ListItem from './ListItem';

type Props = {
  asset: AssetFragment$key;
  hideBalances: boolean;
};

const AssetFragment = graphql`
  fragment AssetFragment on PortfolioAsset {
    quantity @required(action: LOG)
    valueInAUD
    currency @required(action: LOG) {
      ...CurrencyFragment
    }
  }
`;

export default function Asset({ asset, hideBalances }: Props) {
  const data = useFragment(AssetFragment, asset);

  if (!data || !data.currency) {
    return null;
  }

  const { currency, quantity, valueInAUD } = data;

  const currencyData = useFragment<CurrencyFragment$key>(
    CurrencyFragment,
    currency,
  );

  if (!currencyData) {
    return null;
  }

  if (currencyData.kind === 'CRYPTO') {
    if (!valueInAUD) {
      return null;
    }

    return (
      <ListItem
        label={currencyData.symbol}
        sublabel={currencyData.name}
        icon={<CurrencyIcon currency={currencyData} />}
        value={hideBalances ? '***' : quantity}
        subvalue={
          hideBalances ? (
            <HiddenBalance />
          ) : (
            <FiatView currency="AUD" prependCurrency>
              {valueInAUD}
            </FiatView>
          )
        }
      />
    );
  }

  return (
    <ListItem
      label={currencyData.symbol}
      sublabel={currencyData.name}
      value={
        hideBalances ? (
          <HiddenBalance />
        ) : (
          <FiatView currency={currencyData.symbol}>{quantity}</FiatView>
        )
      }
      icon={<CurrencyIcon currency={currencyData} />}
    />
  );
}
