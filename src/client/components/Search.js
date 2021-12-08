/**
 * @flow
 */

import PropTypes from 'prop-types';
import React from 'react';
import {createPaginationContainer, graphql} from 'react-relay';
import {getRefetchToken} from '../RefetchTokenManager';
import ArticlePreview from './ArticlePreview';
import ContentListing from './ContentListing';
import ContentPreview from './ContentPreview';
import LoadMoreButton from './LoadMoreButton';
import Link from './Link';
import PluralText from './PluralText';
import PagePreview from './PagePreview';
import PostPreview from './PostPreview';
import SnippetPreview from './SnippetPreview';

import type {Disposable, RelayPaginationProp} from 'react-relay';
import type {Search as SearchData} from './__generated__/Search.graphql';

const PAGE_SIZE = 10;

// See note in `ArticlesIndex`.
let fragmentVariables;

function getSearchURL(
  query: string,
  options: {display?: boolean} = {},
): string {
  // Note that we may need to double-encode the search query, otherwise
  // the "history" package will decode a query like "vim\b" which we
  // have encoded as "vim%5Cb" back to "vim/b", which is hideously
  // broken.
  const encoder = options.display
    ? encodeURIComponent
    : (component) => encodeURIComponent(encodeURIComponent(component));
  if (query) {
    return '/search/' + encoder(query);
  } else {
    return '/search';
  }
}
type Props = {
  data: SearchData,
  q: string,
  relay: RelayPaginationProp,
};
type State = {
  isLoadingMore: boolean,
  isRefetching: boolean,
  q: string,
};

class Search extends React.Component<Props, State> {
  _loadMoreDisposable: ?Disposable;
  _refetchDisposable: ?Disposable;
  _searchInput: ?HTMLElement;

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoadingMore: false,
      isRefetching: false,
      q: props.q || '',
    };
  }

  _handleLoadMore = () => {
    if (this._refetchDisposable) {
      this._refetchDisposable.dispose();
      this._refetchDisposable = null;
    }
    this.setState({isLoadingMore: true, isRefetching: false}, () => {
      this._loadMoreDisposable = this.props.relay.loadMore(
        PAGE_SIZE,
        (error) => {
          this.setState({isLoadingMore: false});
          this._loadMoreDisposable = null;

          const route = window.location.pathname;
          this.context.router.history.replace(route, {
            refetchToken: getRefetchToken(),
            variables: fragmentVariables,
          });
        },
      );
    });
  };

  _handleRefetch = () => {
    if (this._loadMoreDisposable) {
      this._loadMoreDisposable.dispose();
      this._loadMoreDisposable = null;
    }
    this.setState({isLoadingMore: false, isRefetching: true}, () => {
      this._refetchDisposable = this.props.relay.refetchConnection(
        PAGE_SIZE,
        (error) => {
          this.setState({isRefetching: false});
          this._refetchDisposable = null;
        },
        {count: PAGE_SIZE, q: this.state.q.trim()},
      );
    });
  };

  componentDidMount() {
    this._searchInput && this._searchInput.focus();
  }

  componentWillUnmount() {
    if (this._loadMoreDisposable) {
      this._loadMoreDisposable.dispose();
      this._loadMoreDisposable = null;
    }
    if (this._refetchDisposable) {
      this._refetchDisposable.dispose();
      this._refetchDisposable = null;
    }
    this._searchInput = null;
  }

  render() {
    if (!this.props.data) {
      return null;
    }

    const {search} = this.props.data;
    const {edges} = search;
    const trimmedQuery = this.state.q.trim();
    return (
      <div>
        <h1>
          <Link
            to={getSearchURL(trimmedQuery, {display: true})}
            historyTo={getSearchURL(trimmedQuery)}
          >
            {trimmedQuery || 'Search'}
          </Link>
        </h1>
        <div className="row">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              this.context.router.history.push(getSearchURL(trimmedQuery), {
                refetchToken: getRefetchToken(),
              });
              this._handleRefetch();
            }}
          >
            <input
              className="eight columns"
              id="search-input"
              onChange={(event) =>
                this.setState({q: event.currentTarget.value})
              }
              placeholder="Search wincent.com"
              type="search"
              ref={(input) => {
                this._searchInput = input;
              }}
              value={this.state.q}
            />
            <input
              className="four columns"
              disabled={this.state.isRefetching || !this.state.q.trim()}
              type="submit"
              value={this.state.isRefetching ? 'Searching\u2026' : 'Search'}
            />
          </form>
        </div>
        <p>
          <PluralText count={search.count} text="item" /> found
        </p>
        <ContentListing>
          {edges
            ? edges.map((edge, i) => {
                if (edge) {
                  const {cursor, node} = edge;
                  if (node) {
                    return (
                      <ContentPreview cursor={cursor} key={i} data={node} />
                    );
                  }
                }
                return null;
              })
            : null}
        </ContentListing>
        {search.pageInfo.hasNextPage ? (
          <LoadMoreButton
            isLoading={this.state.isLoadingMore}
            onLoadMore={this._handleLoadMore}
          />
        ) : null}
      </div>
    );
  }
}

const SearchContainer = createPaginationContainer(
  Search,
  graphql`
    fragment Search on Root {
      search(first: $count, after: $cursor, q: $q)
        @connection(key: "Search_search") {
        count
        edges {
          cursor
          node {
            ...ContentPreview
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `,
  {
    getFragmentVariables(prevVars, totalCount) {
      fragmentVariables = {
        ...prevVars,
        count: totalCount,
      };
      return fragmentVariables;
    },
    getVariables(props, {count, cursor}, {q}) {
      return {
        count,
        cursor,
        q: q || '',
      };
    },
    query: graphql`
      query SearchQuery($count: Int!, $cursor: String, $q: String!) {
        ...Search
      }
    `,
  },
);

SearchContainer.PAGE_SIZE = PAGE_SIZE;

export default SearchContainer;
