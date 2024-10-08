import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { EventInstanceRegistration } from "../features/eventInstance/eventInstanceRegistration/EventInstanceRegistration";

export const EventInstanceRegistrationPage: React.FC = () => {
  return (
    <ProtectedPage>
      <EventInstanceRegistration />
    </ProtectedPage>
  );
};
