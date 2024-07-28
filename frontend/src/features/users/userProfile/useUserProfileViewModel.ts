import { useState } from "react";
import { IUserProfileProps } from "./IUserProfileProps";

export const useUserProfileViewModel = (props: IUserProfileProps) => {
  const [displayMode, setDisplayMode] = useState(true);

  return { displayMode };
};
