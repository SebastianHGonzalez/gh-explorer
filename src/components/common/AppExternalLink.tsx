import { Link } from "@react-navigation/native";
import { PropsWithChildren } from "react";

interface AppExternalLinkProps {
  href: string;
}

export function AppExternalLink({
  href,
  children,
}: PropsWithChildren<AppExternalLinkProps>) {
  return (
    <Link href={href} target="_blank" action={{ type: 'PUSH', payload: { } }}>
      {children}
    </Link>
  );
}
