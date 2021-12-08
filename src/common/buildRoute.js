/**
 * @noflow
 */

import formatTitle from './formatTitle';
import inBrowser from './inBrowser';
import withContext from './withContext';

export default function buildRoute(query, config) {
  return {
    action: async function action(
      {api, prefetch, variables: overrides},
      params,
    ) {
      const {environment} = api;
      const variables =
        typeof config.variables === 'function'
          ? config.variables({...params, ...overrides})
          : {...config.variables, ...params, ...overrides};

      // If we were supplied overrides, this is a back-button query that can be
      // read straight out of the cache.
      const data = overrides
        ? api.readQuery(query, variables)
        : await api.fetchQuery(query, variables);

      const title =
        (typeof config.title === 'function'
          ? config.title(data, params)
          : config.title) || '';
      const description = config.description ? config.description(data) : null;

      if (inBrowser && !prefetch) {
        document.title = formatTitle(title);

        // Disable garbage collection so that we can make back button work without
        // having to go back to the server for data.
        const {
          createOperationSelector,
          getRequest,
        } = environment.unstable_internal;
        const operation = createOperationSelector(getRequest(query), variables);
        environment.retain(operation.root);
      }

      const relay = {
        environment,
        variables,
      };
      return {
        component: withContext(
          {relay},
          config.render(data, params, {prefetch}),
        ),
        description,
        title,
      };
    },
  };
}
