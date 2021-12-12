/**
 *
 */

import React from 'react';
import inBrowser from '../../common/inBrowser';

if (inBrowser) {
  require('./TagLozenge.css');
}

const TagLozenge = ({type}) => {
  let href;
  switch (type) {
    case 'page':
      href = '/tags/pages';
      break;
    case 'snippet':
      href = '/tags/snippets';
      break;
    default:
      href = `/tags/${type}`;
  }
  return (
    <a className="lozenge" href={href}>
      {type}
    </a>
  );
};

export default TagLozenge;
