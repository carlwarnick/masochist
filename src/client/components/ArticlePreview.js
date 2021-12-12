import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import Link from './Link';
import TagLozenge from './TagLozenge';
import Tags from './Tags';
import When from './When';

class ArticlePreview extends React.Component {
  render() {
    const article = this.props.data;
    const {description, title, url} = article;
    return (
      <tr>
        <td>
          <TagLozenge type="wiki" />
        </td>
        <td>
          <Link title={description} to={url}>
            {title || null}
          </Link>
        </td>
        <td>
          <When data={article} />
        </td>
        <td>
          <Tags classes={{left: true, compact: true}} data={article} />
        </td>
      </tr>
    );
  }
}

export default createFragmentContainer(
  ArticlePreview,
  graphql`
    fragment ArticlePreview on Article {
      description
      title
      url
      ...Tags
      ...When
    }
  `,
);
