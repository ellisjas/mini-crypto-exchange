import React from 'react';
import { Text, TextStyle } from 'react-native';

type Props = {
  children: number;
  currency: string;
  prependCurrency?: boolean;
  options?: Intl.NumberFormatOptions;
  style?: TextStyle;
};

export default function FiatView({
  children,
  currency,
  prependCurrency,
  options,
  style,
}: Props) {
  const formattedValue = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    currencyDisplay: 'symbol',
    ...options,
  }).format(children);

  return (
    <Text style={style}>
      {formattedValue + (prependCurrency ? ` ${currency}` : '')}
    </Text>
  );
}
