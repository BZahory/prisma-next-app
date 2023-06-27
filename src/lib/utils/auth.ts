export function createAuthHeader(accessToken: string | undefined) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (accessToken) {
    headers.append("Authorization", accessToken);
  }

  return headers;
}
