import { Platform } from 'react-native';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const domain = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
export function fetchQuery(operation: any, variables: any) {
  return fetch(`http://${domain}:4000/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      console.error(error);
    });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

const environment = new Environment({
  network,
  store,
  requiredFieldLogger: (event) => {
    console.warn(
      `Required field missing in ${event.owner}: ${event.fieldPath}`,
    );
  },
});

export default environment;
