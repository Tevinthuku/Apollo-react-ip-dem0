import React from "react";
import { render } from "react-dom";

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";

import IpCountryFinder from "./containers/IpCountryFinder";

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults: {
    storedIp: "72.229.28.185"
  },
  resolvers: {
    Mutation: {
      updateIp: (_, { value }, { cache }) => {
        cache.writeData({ data: { storedIp: value } });
        return null;
      }
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({ uri: "https://api.graphloc.com/graphql" })
  ]),
  cache
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <IpCountryFinder ip={window.user_ip} />
  </ApolloProvider>
);

render(<ApolloApp />, document.getElementById("root"));
