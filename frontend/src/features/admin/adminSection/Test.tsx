import { useProfileDetailsSettings } from "../../../hooks/useProfileDetailsSettings";

export const Test: React.FC = () => {
  const [profileSettings, setProfileSettings] = useProfileDetailsSettings();

  bind("13123123", profileSettings, setProfileSettings)

  const onClick = () => {};

  return <button onClick={onClick}>Toggle</button>;
};
