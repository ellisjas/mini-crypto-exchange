import { graphql } from 'react-relay';

const CurrencyFragment = graphql`
  fragment CurrencyFragment on Currency {
    symbol @required(action: LOG)
    kind @required(action: LOG)
    name @required(action: LOG)
  }
`;

export default CurrencyFragment;
