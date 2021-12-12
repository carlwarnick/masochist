import React from 'react';
import {graphql} from 'react-relay';

import Link from '../../client/components/Link';
import Post from '../../client/components/Post';
import {makeNotFound} from '../NotFoundError';
import buildRoute from '../buildRoute';

export default buildRoute(
  graphql`
    query PostRouteQuery($baseHeadingLevel: Int!, $id: ID!) {
      node(id: $id) {
        ... on Post {
          ...Post
          description
          title
        }
      }
    }
  `,
  {
    variables: ({id}) => ({
      baseHeadingLevel: 1,
      id,
    }),
    render: ({node}, {id}) => {
      if (node) {
        return <Post data={node} />;
      } else {
        throw makeNotFound(
          `No post found with id: ${id}`,
          <p>
            Try inspecting <Link to="/blog">the blog index</Link> and{' '}
            <Link to="/tags">the tags listing</Link>, or using{' '}
            <Link to="/search">the site search</Link>.
          </p>,
        );
      }
    },
    title: ({node}) => (node ? node.title : null),
    description: ({node}) => (node ? node.description : null),
  },
);
