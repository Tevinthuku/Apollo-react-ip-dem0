import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

export default class CounterFinder extends React.Component {
  render() {
    const {
      defaultValue,
      error,
      flagUrl,
      loading,
      name,
      onSearch
    } = this.props;

    if (loading) return <div>Loading...</div>;

    return (
      <section className="section">
        {name && flagUrl && !error ? (
          <div className="content">
            <h1 className="is-large">{name}</h1>
            <img src={flagUrl} width={250} />
          </div>
        ) : (
          <div className="has-text-danger" style={{ marginBottom: 10 }}>
            No Results Found
          </div>
        )}
        <div>
          <div className="field">
            <input
              className="input"
              defaultValue={defaultValue}
              ref={ref => (this.search = ref)}
              type="text"
            />
          </div>
          <div className="field">
            <button
              className="button is-dark"
              onClick={() => onSearch(this.search.value)}
            >
              Search
            </button>
          </div>
          <div className="is-size-7">(Ex: 196.25.255.250)</div>
        </div>
      </section>
    );
  }
}
