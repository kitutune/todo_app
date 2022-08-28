import { Center } from "@mantine/core";
import { ReactNode } from "react";
type props = {
  children: ReactNode;
};

export const Layout: React.FC<props> = (props) => {
  return (
    <Center>
      <div className="pt-40 pb-40 w-4/5">{props.children}</div>
    </Center>
  );
};
