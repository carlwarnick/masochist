/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule Page.graphql
 * @generated SignedSource<<70ce15296a6f8bebb95398a9992a203b>>
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Page = {|
  +id: string;
  +title: ?string;
  +createdAt: ?any;
  +history: ?{|
    +url: ?string;
  |};
  +updatedAt: ?any;
  +url: string;
  +body: ?{|
    +html: ?string;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "baseHeadingLevel",
      "type": "Int"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Page",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "id",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "title",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "createdAt",
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "History",
      "name": "history",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "updatedAt",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "url",
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Markup",
      "name": "body",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "baseHeadingLevel",
              "variableName": "baseHeadingLevel",
              "type": "Int"
            }
          ],
          "name": "html",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Tags",
      "args": null
    }
  ],
  "type": "Page"
};

module.exports = fragment;
