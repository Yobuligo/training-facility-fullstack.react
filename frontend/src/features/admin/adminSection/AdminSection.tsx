import { Collapse } from "../../../components/collapse/Collapse";
import { UserProfileGroup } from "../../users/userProfileGroup/UserProfileGroup";

export const AdminSection: React.FC = () => {
  return (
    <div>
      <Collapse collapsed={false} setCollapsed={()=>{}}/>
      <UserProfileGroup title="WhatsApp">Hello World</UserProfileGroup>
    </div>
  );
};
