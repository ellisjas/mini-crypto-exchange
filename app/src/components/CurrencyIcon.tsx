import React from 'react';
import IconBTC from '../../assets/images/coins/BTC.svg';
import IconETH from '../../assets/images/coins/ETH.svg';
import IconLTC from '../../assets/images/coins/LTC.svg';
import IconSHIB from '../../assets/images/coins/SHIB.svg';
import IconXRP from '../../assets/images/coins/XRP.svg';
import IconDollar from '../../assets/images/fiat/Dollar.svg';
import { CurrencyFragment$data } from '../fragments/__generated__/CurrencyFragment.graphql';

type Props = {
  currency: CurrencyFragment$data;
};

export default function CurrencyIcon({ currency }: Props) {
  if (!currency) {
    return null;
  }

  if (currency.kind === 'FIAT') {
    return <IconDollar />;
  }

  const CryptoIcon = {
    BTC: IconBTC,
    ETH: IconETH,
    XRP: IconXRP,
    LTC: IconLTC,
    SHIB: IconSHIB,
  }[currency.symbol];

  if (!CryptoIcon) {
    return null;
  }

  return <CryptoIcon />;
}
