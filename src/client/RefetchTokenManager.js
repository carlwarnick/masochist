let tokenCounter = 1;
let pendingClaim = null;

/**
 * Called by a refetch container immediately before issuing a refetch and
 * calling `push` on the router's `history` object, which will cause the
 * listener to be notified.
 */
export function getRefetchToken() {
  if (pendingClaim != null) {
    throw new Error('Only one refetch token may be outstanding at any time');
  }
  pendingClaim = tokenCounter++;
  return pendingClaim;
}

/**
 * Called by the router's `history` listener to see whether the refetch was just
 * issued. Subsequent calls (for example, during back or forward button
 * navigation) will return `false`.
 */
export function claimRefetchToken(token) {
  if (token !== pendingClaim) {
    return false;
  }
  pendingClaim = null;
  return true;
}
