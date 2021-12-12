import React from 'react';
import {graphql} from 'react-relay';

import Tag from '../../client/components/Tag';
import buildRoute from '../buildRoute';

export default buildRoute(
  graphql`
    query TagRouteQuery($count: Int!, $cursor: String, $id: ID!) {
      node(id: $id) {
        ... on Tag {
          ...Tag
          name
        }
      }
    }
  `,
  {
    variables: ({id}) => ({
      count: Tag.PAGE_SIZE,
      cursor: null,
      id,
    }),
    render: ({node}) => <Tag data={node} />,
    title: ({node}) => (node ? node.name : null),
  },
);
