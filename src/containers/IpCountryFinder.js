import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import CountryFinder from "../components/CountryFinder";
import React from "react";

const GET_COUNTRY_BY_IP = gql`
  query($ip: String!) {
    getLocation(ip: $ip) {
      country {
        names {
          en
        }
        iso_code
      }
    }
  }
`;

const GET_STORED_IP = gql`
  query {
    storedIp @client
  }
`;

const UPDATE_STORED_IP = gql`
  mutation updateIp($value: String!) {
    updateIp(value: $value) @client
  }
`;

async function handleSearch(refetch, UpdateStoredIp, value) {
  try {
    UpdateStoredIp({ variables: { value } });
    await refetch({ ip: value });
  } catch (e) {}
}

function IpCountryFinder({
  GetCountryByIp,
  UpdateStoredIp,
  GetStoredIp,
  ...props
}) {
  if (GetCountryByIp.loading) {
    return <CountryFinder loading={true} />;
  }

  if (GetCountryByIp.error) {
    return (
      <CountryFinder
        error={GetCountryByIp.error}
        onSearch={value =>
          handleSearch(GetCountryByIp.refetch, UpdateStoredIp, value)
        }
      />
    );
  }

  return (
    <CountryFinder
      flagUrl={`https://flags.fmcdn.net/data/flags/w1160/${GetCountryByIp.getLocation.country.iso_code.toLowerCase()}.png`}
      name={GetCountryByIp.getLocation.country.names.en}
      onSearch={value =>
        handleSearch(GetCountryByIp.refetch, UpdateStoredIp, value)
      }
      defaultValue={GetStoredIp.storedIp || props.ip}
    />
  );
}

export default compose(
  graphql(GET_COUNTRY_BY_IP, {
    name: "GetCountryByIp",
    options: props => ({ variables: { ip: props.ip } })
  }),
  graphql(GET_STORED_IP, { name: "GetStoredIp" }),
  graphql(UPDATE_STORED_IP, { name: "UpdateStoredIp" })
)(IpCountryFinder);
