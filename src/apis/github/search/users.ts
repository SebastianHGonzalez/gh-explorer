import { t } from "@/i18n/t";
import { HttpError } from "@/utils/HttpError";
import { InfiniteData, infiniteQueryOptions } from "@tanstack/react-query";
import z from "zod";

export function searchUsersQuery(input: SearchUsersInput) {
  return infiniteQueryOptions<SearchUsers, Error, InfiniteData<SearchUsers>, unknown[], number>({
    enabled: input.q.length >= 3,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam = 0) => lastPage.incomplete_results ? lastPageParam + 1 : null,
    queryKey: ["github", "search", "users", input],
    queryFn: async ({ pageParam }) => {
      // return DEBUG_FAKE_RESPONSE; // For debugging purposes, replace with actual API call in production

      const searchParams = new URLSearchParams();
      if (input.q) searchParams.set('q', input.q);
      if (input.sort) searchParams.set('sort', input.sort);
      if (input.order) searchParams.set('order', input.order);
      if (input.per_page) searchParams.set('per_page', input.per_page.toString());
      if (input.page) searchParams.set('page', input.page.toString());
      if (pageParam) searchParams.set('page', pageParam.toString());
      
      const url = `https://api.github.com/search/users?${searchParams.toString()}`;

      const response = await fetch(url);

      if (response.status === 403) {
        throw new HttpError(403, t('Github.RateLimitError'));
      }

      if (!response.ok) {
        throw await HttpError.fromResponse(response);
      }

      return response.json();
    },
  });
}

const searchUsersInputSchema = z.object({
  q: z.string(),
  sort: z.string().optional(),
  order: z.string().optional(),
  per_page: z.number().int().optional(),
  page: z.number().int().optional(),
});
export type SearchUsersInput = z.infer<typeof searchUsersInputSchema>;

const searchUsersSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(
    z.object({
      login: z.string(),
      id: z.number(),
      node_id: z.string(),
      avatar_url: z.string().url(),
      gravatar_id: z.string(),
      url: z.string().url(),
      html_url: z.string().url(),
      followers_url: z.string().url(),
      following_url: z.string().url(),
      gists_url: z.string().url(),
      starred_url: z.string().url(),
      subscriptions_url: z.string().url(),
      organizations_url: z.string().url(),
      repos_url: z.string().url(),
      events_url: z.string().url(),
      received_events_url: z.string().url(),
      type: z.enum(["User"]),
      user_view_type: z.enum(["public", "private"]),
      site_admin: z.boolean(),
      score: z.number(),
    })
  ),
});
export type SearchUsers = z.infer<typeof searchUsersSchema>;

const DEBUG_FAKE_RESPONSE = {
  total_count: 66467,
  incomplete_results: false,
  items: [
    {
      login: "sebastian",
      id: 1089,
      node_id: "MDQ6VXNlcjEwODk=",
      avatar_url: "https://avatars.githubusercontent.com/u/1089?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebastian",
      html_url: "https://github.com/sebastian",
      followers_url: "https://api.github.com/users/sebastian/followers",
      following_url:
        "https://api.github.com/users/sebastian/following{/other_user}",
      gists_url: "https://api.github.com/users/sebastian/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sebastian/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/sebastian/subscriptions",
      organizations_url: "https://api.github.com/users/sebastian/orgs",
      repos_url: "https://api.github.com/users/sebastian/repos",
      events_url: "https://api.github.com/users/sebastian/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebastian/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebastianbergmann",
      id: 25218,
      node_id: "MDQ6VXNlcjI1MjE4",
      avatar_url: "https://avatars.githubusercontent.com/u/25218?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebastianbergmann",
      html_url: "https://github.com/sebastianbergmann",
      followers_url: "https://api.github.com/users/sebastianbergmann/followers",
      following_url:
        "https://api.github.com/users/sebastianbergmann/following{/other_user}",
      gists_url:
        "https://api.github.com/users/sebastianbergmann/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sebastianbergmann/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/sebastianbergmann/subscriptions",
      organizations_url: "https://api.github.com/users/sebastianbergmann/orgs",
      repos_url: "https://api.github.com/users/sebastianbergmann/repos",
      events_url:
        "https://api.github.com/users/sebastianbergmann/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebastianbergmann/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebastianruder",
      id: 6792642,
      node_id: "MDQ6VXNlcjY3OTI2NDI=",
      avatar_url: "https://avatars.githubusercontent.com/u/6792642?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebastianruder",
      html_url: "https://github.com/sebastianruder",
      followers_url: "https://api.github.com/users/sebastianruder/followers",
      following_url:
        "https://api.github.com/users/sebastianruder/following{/other_user}",
      gists_url: "https://api.github.com/users/sebastianruder/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sebastianruder/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/sebastianruder/subscriptions",
      organizations_url: "https://api.github.com/users/sebastianruder/orgs",
      repos_url: "https://api.github.com/users/sebastianruder/repos",
      events_url:
        "https://api.github.com/users/sebastianruder/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebastianruder/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "rasbt",
      id: 5618407,
      node_id: "MDQ6VXNlcjU2MTg0MDc=",
      avatar_url: "https://avatars.githubusercontent.com/u/5618407?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/rasbt",
      html_url: "https://github.com/rasbt",
      followers_url: "https://api.github.com/users/rasbt/followers",
      following_url:
        "https://api.github.com/users/rasbt/following{/other_user}",
      gists_url: "https://api.github.com/users/rasbt/gists{/gist_id}",
      starred_url: "https://api.github.com/users/rasbt/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/rasbt/subscriptions",
      organizations_url: "https://api.github.com/users/rasbt/orgs",
      repos_url: "https://api.github.com/users/rasbt/repos",
      events_url: "https://api.github.com/users/rasbt/events{/privacy}",
      received_events_url: "https://api.github.com/users/rasbt/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebmarkbage",
      id: 63648,
      node_id: "MDQ6VXNlcjYzNjQ4",
      avatar_url: "https://avatars.githubusercontent.com/u/63648?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebmarkbage",
      html_url: "https://github.com/sebmarkbage",
      followers_url: "https://api.github.com/users/sebmarkbage/followers",
      following_url:
        "https://api.github.com/users/sebmarkbage/following{/other_user}",
      gists_url: "https://api.github.com/users/sebmarkbage/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sebmarkbage/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/sebmarkbage/subscriptions",
      organizations_url: "https://api.github.com/users/sebmarkbage/orgs",
      repos_url: "https://api.github.com/users/sebmarkbage/repos",
      events_url: "https://api.github.com/users/sebmarkbage/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebmarkbage/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "tiangolo",
      id: 1326112,
      node_id: "MDQ6VXNlcjEzMjYxMTI=",
      avatar_url: "https://avatars.githubusercontent.com/u/1326112?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/tiangolo",
      html_url: "https://github.com/tiangolo",
      followers_url: "https://api.github.com/users/tiangolo/followers",
      following_url:
        "https://api.github.com/users/tiangolo/following{/other_user}",
      gists_url: "https://api.github.com/users/tiangolo/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/tiangolo/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/tiangolo/subscriptions",
      organizations_url: "https://api.github.com/users/tiangolo/orgs",
      repos_url: "https://api.github.com/users/tiangolo/repos",
      events_url: "https://api.github.com/users/tiangolo/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/tiangolo/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "SebLague",
      id: 4266663,
      node_id: "MDQ6VXNlcjQyNjY2NjM=",
      avatar_url: "https://avatars.githubusercontent.com/u/4266663?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/SebLague",
      html_url: "https://github.com/SebLague",
      followers_url: "https://api.github.com/users/SebLague/followers",
      following_url:
        "https://api.github.com/users/SebLague/following{/other_user}",
      gists_url: "https://api.github.com/users/SebLague/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/SebLague/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/SebLague/subscriptions",
      organizations_url: "https://api.github.com/users/SebLague/orgs",
      repos_url: "https://api.github.com/users/SebLague/repos",
      events_url: "https://api.github.com/users/SebLague/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/SebLague/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebastiandedeyne",
      id: 1561079,
      node_id: "MDQ6VXNlcjE1NjEwNzk=",
      avatar_url: "https://avatars.githubusercontent.com/u/1561079?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebastiandedeyne",
      html_url: "https://github.com/sebastiandedeyne",
      followers_url: "https://api.github.com/users/sebastiandedeyne/followers",
      following_url:
        "https://api.github.com/users/sebastiandedeyne/following{/other_user}",
      gists_url:
        "https://api.github.com/users/sebastiandedeyne/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sebastiandedeyne/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/sebastiandedeyne/subscriptions",
      organizations_url: "https://api.github.com/users/sebastiandedeyne/orgs",
      repos_url: "https://api.github.com/users/sebastiandedeyne/repos",
      events_url:
        "https://api.github.com/users/sebastiandedeyne/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebastiandedeyne/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "SebastianAigner",
      id: 2178959,
      node_id: "MDQ6VXNlcjIxNzg5NTk=",
      avatar_url: "https://avatars.githubusercontent.com/u/2178959?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/SebastianAigner",
      html_url: "https://github.com/SebastianAigner",
      followers_url: "https://api.github.com/users/SebastianAigner/followers",
      following_url:
        "https://api.github.com/users/SebastianAigner/following{/other_user}",
      gists_url: "https://api.github.com/users/SebastianAigner/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/SebastianAigner/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/SebastianAigner/subscriptions",
      organizations_url: "https://api.github.com/users/SebastianAigner/orgs",
      repos_url: "https://api.github.com/users/SebastianAigner/repos",
      events_url:
        "https://api.github.com/users/SebastianAigner/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/SebastianAigner/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebmck",
      id: 853712,
      node_id: "MDQ6VXNlcjg1MzcxMg==",
      avatar_url: "https://avatars.githubusercontent.com/u/853712?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebmck",
      html_url: "https://github.com/sebmck",
      followers_url: "https://api.github.com/users/sebmck/followers",
      following_url:
        "https://api.github.com/users/sebmck/following{/other_user}",
      gists_url: "https://api.github.com/users/sebmck/gists{/gist_id}",
      starred_url: "https://api.github.com/users/sebmck/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/sebmck/subscriptions",
      organizations_url: "https://api.github.com/users/sebmck/orgs",
      repos_url: "https://api.github.com/users/sebmck/repos",
      events_url: "https://api.github.com/users/sebmck/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebmck/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebastianstarke",
      id: 20269775,
      node_id: "MDQ6VXNlcjIwMjY5Nzc1",
      avatar_url: "https://avatars.githubusercontent.com/u/20269775?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebastianstarke",
      html_url: "https://github.com/sebastianstarke",
      followers_url: "https://api.github.com/users/sebastianstarke/followers",
      following_url:
        "https://api.github.com/users/sebastianstarke/following{/other_user}",
      gists_url: "https://api.github.com/users/sebastianstarke/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sebastianstarke/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/sebastianstarke/subscriptions",
      organizations_url: "https://api.github.com/users/sebastianstarke/orgs",
      repos_url: "https://api.github.com/users/sebastianstarke/repos",
      events_url:
        "https://api.github.com/users/sebastianstarke/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebastianstarke/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "stealth",
      id: 1227710,
      node_id: "MDQ6VXNlcjEyMjc3MTA=",
      avatar_url: "https://avatars.githubusercontent.com/u/1227710?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/stealth",
      html_url: "https://github.com/stealth",
      followers_url: "https://api.github.com/users/stealth/followers",
      following_url:
        "https://api.github.com/users/stealth/following{/other_user}",
      gists_url: "https://api.github.com/users/stealth/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/stealth/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/stealth/subscriptions",
      organizations_url: "https://api.github.com/users/stealth/orgs",
      repos_url: "https://api.github.com/users/stealth/repos",
      events_url: "https://api.github.com/users/stealth/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/stealth/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "blueimp",
      id: 244586,
      node_id: "MDQ6VXNlcjI0NDU4Ng==",
      avatar_url: "https://avatars.githubusercontent.com/u/244586?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/blueimp",
      html_url: "https://github.com/blueimp",
      followers_url: "https://api.github.com/users/blueimp/followers",
      following_url:
        "https://api.github.com/users/blueimp/following{/other_user}",
      gists_url: "https://api.github.com/users/blueimp/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/blueimp/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/blueimp/subscriptions",
      organizations_url: "https://api.github.com/users/blueimp/orgs",
      repos_url: "https://api.github.com/users/blueimp/repos",
      events_url: "https://api.github.com/users/blueimp/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/blueimp/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "SebastianElvis",
      id: 9570153,
      node_id: "MDQ6VXNlcjk1NzAxNTM=",
      avatar_url: "https://avatars.githubusercontent.com/u/9570153?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/SebastianElvis",
      html_url: "https://github.com/SebastianElvis",
      followers_url: "https://api.github.com/users/SebastianElvis/followers",
      following_url:
        "https://api.github.com/users/SebastianElvis/following{/other_user}",
      gists_url: "https://api.github.com/users/SebastianElvis/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/SebastianElvis/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/SebastianElvis/subscriptions",
      organizations_url: "https://api.github.com/users/SebastianElvis/orgs",
      repos_url: "https://api.github.com/users/SebastianElvis/repos",
      events_url:
        "https://api.github.com/users/SebastianElvis/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/SebastianElvis/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "Byron",
      id: 63622,
      node_id: "MDQ6VXNlcjYzNjIy",
      avatar_url: "https://avatars.githubusercontent.com/u/63622?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/Byron",
      html_url: "https://github.com/Byron",
      followers_url: "https://api.github.com/users/Byron/followers",
      following_url:
        "https://api.github.com/users/Byron/following{/other_user}",
      gists_url: "https://api.github.com/users/Byron/gists{/gist_id}",
      starred_url: "https://api.github.com/users/Byron/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/Byron/subscriptions",
      organizations_url: "https://api.github.com/users/Byron/orgs",
      repos_url: "https://api.github.com/users/Byron/repos",
      events_url: "https://api.github.com/users/Byron/events{/privacy}",
      received_events_url: "https://api.github.com/users/Byron/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "SebastianBoldt",
      id: 2922440,
      node_id: "MDQ6VXNlcjI5MjI0NDA=",
      avatar_url: "https://avatars.githubusercontent.com/u/2922440?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/SebastianBoldt",
      html_url: "https://github.com/SebastianBoldt",
      followers_url: "https://api.github.com/users/SebastianBoldt/followers",
      following_url:
        "https://api.github.com/users/SebastianBoldt/following{/other_user}",
      gists_url: "https://api.github.com/users/SebastianBoldt/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/SebastianBoldt/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/SebastianBoldt/subscriptions",
      organizations_url: "https://api.github.com/users/SebastianBoldt/orgs",
      repos_url: "https://api.github.com/users/SebastianBoldt/repos",
      events_url:
        "https://api.github.com/users/SebastianBoldt/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/SebastianBoldt/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sdaschner",
      id: 6815170,
      node_id: "MDQ6VXNlcjY4MTUxNzA=",
      avatar_url: "https://avatars.githubusercontent.com/u/6815170?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sdaschner",
      html_url: "https://github.com/sdaschner",
      followers_url: "https://api.github.com/users/sdaschner/followers",
      following_url:
        "https://api.github.com/users/sdaschner/following{/other_user}",
      gists_url: "https://api.github.com/users/sdaschner/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sdaschner/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/sdaschner/subscriptions",
      organizations_url: "https://api.github.com/users/sdaschner/orgs",
      repos_url: "https://api.github.com/users/sdaschner/repos",
      events_url: "https://api.github.com/users/sdaschner/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sdaschner/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebastiantegel",
      id: 19666714,
      node_id: "MDQ6VXNlcjE5NjY2NzE0",
      avatar_url: "https://avatars.githubusercontent.com/u/19666714?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebastiantegel",
      html_url: "https://github.com/sebastiantegel",
      followers_url: "https://api.github.com/users/sebastiantegel/followers",
      following_url:
        "https://api.github.com/users/sebastiantegel/following{/other_user}",
      gists_url: "https://api.github.com/users/sebastiantegel/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sebastiantegel/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/sebastiantegel/subscriptions",
      organizations_url: "https://api.github.com/users/sebastiantegel/orgs",
      repos_url: "https://api.github.com/users/sebastiantegel/repos",
      events_url:
        "https://api.github.com/users/sebastiantegel/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebastiantegel/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebastianbenz",
      id: 380472,
      node_id: "MDQ6VXNlcjM4MDQ3Mg==",
      avatar_url: "https://avatars.githubusercontent.com/u/380472?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebastianbenz",
      html_url: "https://github.com/sebastianbenz",
      followers_url: "https://api.github.com/users/sebastianbenz/followers",
      following_url:
        "https://api.github.com/users/sebastianbenz/following{/other_user}",
      gists_url: "https://api.github.com/users/sebastianbenz/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sebastianbenz/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/sebastianbenz/subscriptions",
      organizations_url: "https://api.github.com/users/sebastianbenz/orgs",
      repos_url: "https://api.github.com/users/sebastianbenz/repos",
      events_url: "https://api.github.com/users/sebastianbenz/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebastianbenz/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebastiandeutsch",
      id: 25593,
      node_id: "MDQ6VXNlcjI1NTkz",
      avatar_url: "https://avatars.githubusercontent.com/u/25593?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebastiandeutsch",
      html_url: "https://github.com/sebastiandeutsch",
      followers_url: "https://api.github.com/users/sebastiandeutsch/followers",
      following_url:
        "https://api.github.com/users/sebastiandeutsch/following{/other_user}",
      gists_url:
        "https://api.github.com/users/sebastiandeutsch/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sebastiandeutsch/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/sebastiandeutsch/subscriptions",
      organizations_url: "https://api.github.com/users/sebastiandeutsch/orgs",
      repos_url: "https://api.github.com/users/sebastiandeutsch/repos",
      events_url:
        "https://api.github.com/users/sebastiandeutsch/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebastiandeutsch/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebastian-meier",
      id: 302789,
      node_id: "MDQ6VXNlcjMwMjc4OQ==",
      avatar_url: "https://avatars.githubusercontent.com/u/302789?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebastian-meier",
      html_url: "https://github.com/sebastian-meier",
      followers_url: "https://api.github.com/users/sebastian-meier/followers",
      following_url:
        "https://api.github.com/users/sebastian-meier/following{/other_user}",
      gists_url: "https://api.github.com/users/sebastian-meier/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sebastian-meier/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/sebastian-meier/subscriptions",
      organizations_url: "https://api.github.com/users/sebastian-meier/orgs",
      repos_url: "https://api.github.com/users/sebastian-meier/repos",
      events_url:
        "https://api.github.com/users/sebastian-meier/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebastian-meier/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "hartwork",
      id: 1577132,
      node_id: "MDQ6VXNlcjE1NzcxMzI=",
      avatar_url: "https://avatars.githubusercontent.com/u/1577132?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/hartwork",
      html_url: "https://github.com/hartwork",
      followers_url: "https://api.github.com/users/hartwork/followers",
      following_url:
        "https://api.github.com/users/hartwork/following{/other_user}",
      gists_url: "https://api.github.com/users/hartwork/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/hartwork/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/hartwork/subscriptions",
      organizations_url: "https://api.github.com/users/hartwork/orgs",
      repos_url: "https://api.github.com/users/hartwork/repos",
      events_url: "https://api.github.com/users/hartwork/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/hartwork/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "s-macke",
      id: 3176016,
      node_id: "MDQ6VXNlcjMxNzYwMTY=",
      avatar_url: "https://avatars.githubusercontent.com/u/3176016?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/s-macke",
      html_url: "https://github.com/s-macke",
      followers_url: "https://api.github.com/users/s-macke/followers",
      following_url:
        "https://api.github.com/users/s-macke/following{/other_user}",
      gists_url: "https://api.github.com/users/s-macke/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/s-macke/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/s-macke/subscriptions",
      organizations_url: "https://api.github.com/users/s-macke/orgs",
      repos_url: "https://api.github.com/users/s-macke/repos",
      events_url: "https://api.github.com/users/s-macke/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/s-macke/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "SebastianStehle",
      id: 1236435,
      node_id: "MDQ6VXNlcjEyMzY0MzU=",
      avatar_url: "https://avatars.githubusercontent.com/u/1236435?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/SebastianStehle",
      html_url: "https://github.com/SebastianStehle",
      followers_url: "https://api.github.com/users/SebastianStehle/followers",
      following_url:
        "https://api.github.com/users/SebastianStehle/following{/other_user}",
      gists_url: "https://api.github.com/users/SebastianStehle/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/SebastianStehle/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/SebastianStehle/subscriptions",
      organizations_url: "https://api.github.com/users/SebastianStehle/orgs",
      repos_url: "https://api.github.com/users/SebastianStehle/repos",
      events_url:
        "https://api.github.com/users/SebastianStehle/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/SebastianStehle/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebastiandres",
      id: 1276326,
      node_id: "MDQ6VXNlcjEyNzYzMjY=",
      avatar_url: "https://avatars.githubusercontent.com/u/1276326?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebastiandres",
      html_url: "https://github.com/sebastiandres",
      followers_url: "https://api.github.com/users/sebastiandres/followers",
      following_url:
        "https://api.github.com/users/sebastiandres/following{/other_user}",
      gists_url: "https://api.github.com/users/sebastiandres/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sebastiandres/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/sebastiandres/subscriptions",
      organizations_url: "https://api.github.com/users/sebastiandres/orgs",
      repos_url: "https://api.github.com/users/sebastiandres/repos",
      events_url: "https://api.github.com/users/sebastiandres/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebastiandres/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebix",
      id: 199050,
      node_id: "MDQ6VXNlcjE5OTA1MA==",
      avatar_url: "https://avatars.githubusercontent.com/u/199050?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebix",
      html_url: "https://github.com/sebix",
      followers_url: "https://api.github.com/users/sebix/followers",
      following_url:
        "https://api.github.com/users/sebix/following{/other_user}",
      gists_url: "https://api.github.com/users/sebix/gists{/gist_id}",
      starred_url: "https://api.github.com/users/sebix/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/sebix/subscriptions",
      organizations_url: "https://api.github.com/users/sebix/orgs",
      repos_url: "https://api.github.com/users/sebix/repos",
      events_url: "https://api.github.com/users/sebix/events{/privacy}",
      received_events_url: "https://api.github.com/users/sebix/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "cmprmsd",
      id: 73472903,
      node_id: "MDQ6VXNlcjczNDcyOTAz",
      avatar_url: "https://avatars.githubusercontent.com/u/73472903?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/cmprmsd",
      html_url: "https://github.com/cmprmsd",
      followers_url: "https://api.github.com/users/cmprmsd/followers",
      following_url:
        "https://api.github.com/users/cmprmsd/following{/other_user}",
      gists_url: "https://api.github.com/users/cmprmsd/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/cmprmsd/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/cmprmsd/subscriptions",
      organizations_url: "https://api.github.com/users/cmprmsd/orgs",
      repos_url: "https://api.github.com/users/cmprmsd/repos",
      events_url: "https://api.github.com/users/cmprmsd/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/cmprmsd/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sea-bass",
      id: 4603398,
      node_id: "MDQ6VXNlcjQ2MDMzOTg=",
      avatar_url: "https://avatars.githubusercontent.com/u/4603398?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sea-bass",
      html_url: "https://github.com/sea-bass",
      followers_url: "https://api.github.com/users/sea-bass/followers",
      following_url:
        "https://api.github.com/users/sea-bass/following{/other_user}",
      gists_url: "https://api.github.com/users/sea-bass/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sea-bass/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/sea-bass/subscriptions",
      organizations_url: "https://api.github.com/users/sea-bass/orgs",
      repos_url: "https://api.github.com/users/sea-bass/repos",
      events_url: "https://api.github.com/users/sea-bass/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sea-bass/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "sebas5384",
      id: 97021,
      node_id: "MDQ6VXNlcjk3MDIx",
      avatar_url: "https://avatars.githubusercontent.com/u/97021?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sebas5384",
      html_url: "https://github.com/sebas5384",
      followers_url: "https://api.github.com/users/sebas5384/followers",
      following_url:
        "https://api.github.com/users/sebas5384/following{/other_user}",
      gists_url: "https://api.github.com/users/sebas5384/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/sebas5384/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/sebas5384/subscriptions",
      organizations_url: "https://api.github.com/users/sebas5384/orgs",
      repos_url: "https://api.github.com/users/sebas5384/repos",
      events_url: "https://api.github.com/users/sebas5384/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/sebas5384/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "hobbyquaker",
      id: 2503307,
      node_id: "MDQ6VXNlcjI1MDMzMDc=",
      avatar_url: "https://avatars.githubusercontent.com/u/2503307?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/hobbyquaker",
      html_url: "https://github.com/hobbyquaker",
      followers_url: "https://api.github.com/users/hobbyquaker/followers",
      following_url:
        "https://api.github.com/users/hobbyquaker/following{/other_user}",
      gists_url: "https://api.github.com/users/hobbyquaker/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/hobbyquaker/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/hobbyquaker/subscriptions",
      organizations_url: "https://api.github.com/users/hobbyquaker/orgs",
      repos_url: "https://api.github.com/users/hobbyquaker/repos",
      events_url: "https://api.github.com/users/hobbyquaker/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/hobbyquaker/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
  ],
};
