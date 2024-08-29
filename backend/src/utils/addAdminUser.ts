import { UserProfileRepo } from "../repositories/UserProfileRepo";
import { UserRepo } from "../repositories/UserRepo";
import { UserRoleRepo } from "../repositories/UserRoleRepo";
import { IUserProfile } from "../shared/model/IUserProfile";
import { IUserRole } from "../shared/model/IUserRole";
import { Gender } from "../shared/types/Gender";
import { Tariff } from "../shared/types/Tariff";
import { UserRole } from "../shared/types/UserRole";
import { uuid } from "./uuid";

export const addAdminUser = async () => {
  const userRepo = new UserRepo();
  const user = await userRepo.createUser({
    password: "admin",
    username: "root",
  });

  const userProfile = {
    id: uuid(),
    firstname: "Root",
    lastname: "",
    joinedOn: new Date(),
    userId: user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    gender: Gender.MALE,
    tariff: Tariff.TRAINEES_STUDENTS_PENSIONERS,
  } as IUserProfile;

  const userProfileRepo = new UserProfileRepo();
  await userProfileRepo.insert(userProfile);

  const userRole = {
    id: uuid(),
    userProfileId: userProfile.id,
    role: UserRole.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as IUserRole;
  const userRoleRepo = new UserRoleRepo();
  await userRoleRepo.insert(userRole);
};
