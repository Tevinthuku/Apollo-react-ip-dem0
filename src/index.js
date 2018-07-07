import React from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import IpCountryFinder from "./containers/IpCountryFinder";

const defaults = {
  storedIp: "72.229.28.185"
};

const client = new ApolloClient({
  uri: "https://api.graphloc.com/graphql",
  clientState: {
    defaults,
    resolvers: {
      Mutation: {
        updateIp: (_, { value }, { cache }) => {
          cache.writeData({ data: { storedIp: value } });
          return null;
        }
      }
    }
  }
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <IpCountryFinder ip={defaults.storedIp} />
  </ApolloProvider>
);

render(<ApolloApp />, document.getElementById("root"));
