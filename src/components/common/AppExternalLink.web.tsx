import { PropsWithChildren } from "react";

export function AppExternalLink({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{ display: 'contents' }}>
      {children}
    </a>
  )
}
