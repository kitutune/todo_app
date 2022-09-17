import { Center } from "@mantine/core";
import { memo, ReactNode } from "react";
type props = {
  children: ReactNode;
};

// eslint-disable-next-line react/display-name
export const Layout: React.FC<props> = memo((props) => {
  // console.log("Layout");

  return (
    <Center>
      <div className="pt-40 pb-40 w-4/5">{props.children}</div>
    </Center>
  );
});
