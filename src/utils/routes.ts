export enum Route {
  ListGithubUsers = "/",
  SearchGithubUsers = "/search",
  DescribeGithubUser = "/users/[login]",
  NotFound = "/not-found",
}

export function route(id: Route, params: Record<string, string> = {}): string {
  let path: string = id;
  for (const [key, value] of Object.entries(params)) {
    path = path.replace(`[${key}]`, value);
  }
  return path;
}
