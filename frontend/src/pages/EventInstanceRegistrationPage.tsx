import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { EventInstanceRegistration } from "../features/eventInstance/eventInstanceRegistration/EventInstanceRegistration";

/**
 * This page is responsible for displaying only a specific event instance in a separate page,
 * so that users can register or unregister only for this specific event.
 */
export const EventInstanceRegistrationPage: React.FC = () => {
  return (
    <ProtectedPage>
      <EventInstanceRegistration />
    </ProtectedPage>
  );
};
