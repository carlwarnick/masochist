/**
 *
 */

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import Link from './Link';
import Tags from './Tags';
import TagLozenge from './TagLozenge';
import When from './When';

class PagePreview extends React.Component {
  render() {
    const page = this.props.data;
    const {description, title, url} = page;
    return (
      <tr>
        <td>
          <TagLozenge type="page" />
        </td>
        <td>
          <Link title={description} to={url}>
            {title ?? 'Untitled'}
          </Link>
        </td>
        <td>
          <When data={page} />
        </td>
        <td>
          <Tags classes={{left: true, compact: true}} data={page} />
        </td>
      </tr>
    );
  }
}

export default createFragmentContainer(
  PagePreview,
  graphql`
    fragment PagePreview on Page {
      description
      title
      url
      ...Tags
      ...When
    }
  `,
);
