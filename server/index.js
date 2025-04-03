// Import the Yoga server.
const { createSchema } = require('graphql-yoga');
const { createYoga } = require('graphql-yoga');
const { createServer } = require('http');
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'schema.graphql');
const schemaString = fs.readFileSync(schemaPath, 'utf8');

const portfolioPath = path.join(__dirname, 'data', 'portfolio.json');
const portfolioString = fs.readFileSync(portfolioPath, 'utf8');
const portfolio = JSON.parse(portfolioString);

const EXCHANGE_API_URL = 'https://data.exchange.coinjar.com';

const schema = createSchema({
  typeDefs: schemaString,
  resolvers: {
    Query: {
      userId: () => '123456789',
      rewards: () => 555,
      portfolio: () => portfolio,
      // Modified resolver to accept ticker parameter
      ticker: async (_, { pair }) => {
        try {
          const response = await fetch(
            `${EXCHANGE_API_URL}/products/${pair}/ticker`,
          );
          const data = await response.json();
          return {
            pair,
            last: data.last,
            volume: data.volume,
            bid: data.bid,
            ask: data.ask,
            timestamp: data.current_time,
          };
        } catch (error) {
          console.error(`Error fetching ${pair} price:`, error);
          throw new Error(`Failed to fetch ${pair} price`);
        }
      },
    },
    Portfolio: {
      totalProfitOrLoss: (parent) =>
        parent.assets.reduce(
          (total, asset) => total + (asset.profitOrLoss || 0),
          0,
        ),
      assets: (parent, { kind }) => {
        let filteredAssets = parent.assets;
        if (kind) {
          filteredAssets = parent.assets.filter(
            (asset) => asset.currency.kind === kind,
          );
        }

        return filteredAssets.sort((a, b) => a.valueInAUD - b.valueInAUD);
      },
    },
    PortfolioAsset: {
      valueInAUD: async (parent) => {
        if (parent.currency.symbol === 'AUD') {
          return parent.quantity;
        }

        try {
          if (parent.currency.kind === 'FIAT') {
            const response = await fetch(
              `${EXCHANGE_API_URL}/products/AUD${parent.currency.symbol}/ticker`,
            );
            const data = await response.json();
            return parent.quantity / data.last;
          }

          const response = await fetch(
            `${EXCHANGE_API_URL}/products/${parent.currency.symbol}AUD/ticker`,
          );

          const data = await response.json();

          return parent.quantity * data.last;
        } catch (error) {
          console.error(
            `Error fetching ${parent.currency.symbol} price:`,
            error,
          );
          return null;
        }
      },
    },
  },
});

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema, graphqlEndpoint: '/graphql' });

// Create HTTP server
const server = createServer(yoga);

// Pass it into a server to hook into request handlers.
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
