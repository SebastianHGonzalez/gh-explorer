import {
    Children,
    cloneElement,
    isValidElement,
    PropsWithChildren
} from "react";

type Props = Record<string, any>;

export function Slot<P extends Props>({ children, ...props }: PropsWithChildren<P>) {
  return Children.map(children, (child) => {
    if (isValidElement(child) && child.type === Slot) {
      return cloneElement(child, props);
    }
    return null;
  });
}
