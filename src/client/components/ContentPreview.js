import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import ArticlePreview from './ArticlePreview';
import PagePreview from './PagePreview';
import PostPreview from './PostPreview';
import SnippetPreview from './SnippetPreview';

class ContentPreview extends React.Component {
  render() {
    const {cursor, data} = this.props;
    switch (data.__typename) {
      case 'Article':
        return <ArticlePreview data={data} key={cursor} />;
      case 'Page':
        return <PagePreview key={cursor} data={data} />;
      case 'Post':
        return <PostPreview key={cursor} data={data} />;
      case 'Snippet':
        return <SnippetPreview key={cursor} data={data} />;
      default:
        return null;
    }
  }
}

export default createFragmentContainer(
  ContentPreview,
  graphql`
    fragment ContentPreview on Content {
      __typename
      ...ArticlePreview
      ...PagePreview
      ...PostPreview
      ...SnippetPreview
    }
  `,
);
