import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

export function describeUserQuery(login: string | undefined) {
  return queryOptions<DescribeUser>({
    enabled: !!login, // Only run the query if login is defined
    queryKey: ["github", "users"],
    queryFn: async () => {
      // return DEBUG_FAKE_RESPONSE; // For debugging purposes, replace with actual API call in production

      const response = await fetch(`https://api.github.com/users/${login}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
}

const describeUserSchema = z.object({
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
  name: z.string().nullable(),
  company: z.string().nullable(),
  blog: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().nullable(),
  hireable: z.boolean(),
  bio: z.string().nullable(),
  twitter_username: z.string().nullable(),
  public_repos: z.number(),
  public_gists: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string(), // ISO date string
  updated_at: z.string(), // ISO date string
});
export type DescribeUser = z.infer<typeof describeUserSchema>;

const DEBUG_FAKE_RESPONSE: DescribeUser = {
  login: "SebastianHGonzalez",
  id: 30028728,
  node_id: "MDQ6VXNlcjMwMDI4NzI4",
  avatar_url: "https://avatars.githubusercontent.com/u/30028728?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/SebastianHGonzalez",
  html_url: "https://github.com/SebastianHGonzalez",
  followers_url: "https://api.github.com/users/SebastianHGonzalez/followers",
  following_url:
    "https://api.github.com/users/SebastianHGonzalez/following{/other_user}",
  gists_url: "https://api.github.com/users/SebastianHGonzalez/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/SebastianHGonzalez/starred{/owner}{/repo}",
  subscriptions_url:
    "https://api.github.com/users/SebastianHGonzalez/subscriptions",
  organizations_url: "https://api.github.com/users/SebastianHGonzalez/orgs",
  repos_url: "https://api.github.com/users/SebastianHGonzalez/repos",
  events_url:
    "https://api.github.com/users/SebastianHGonzalez/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/SebastianHGonzalez/received_events",
  type: "User",
  user_view_type: "public",
  site_admin: false,
  name: "Sebastian Gonzalez",
  company: null,
  blog: "",
  location: null,
  email: null,
  hireable: true,
  bio: null,
  twitter_username: null,
  public_repos: 13,
  public_gists: 44,
  followers: 3,
  following: 0,
  created_at: "2017-07-09T20:48:49Z",
  updated_at: "2025-05-27T05:50:32Z",
};
