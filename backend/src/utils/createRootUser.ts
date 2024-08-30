import { UserProfileRepo } from "../repositories/UserProfileRepo";
import { UserRepo } from "../repositories/UserRepo";
import { UserRoleRepo } from "../repositories/UserRoleRepo";
import { Gender } from "../shared/types/Gender";
import { Tariff } from "../shared/types/Tariff";
import { UserRole } from "../shared/types/UserRole";

export const createRootUser = async () => {
  // check if user already exists, otherwise create one
  const userRepo = new UserRepo();
  const rootUser = await userRepo.findByUsername("root");
  if (rootUser) {
    return;
  }

  const user = await userRepo.createUser({
    password: "admin",
    username: "root",
  });

  const userProfileRepo = new UserProfileRepo();
  await userProfileRepo.insert({
    email: "",
    firstname: "Root",
    gender: Gender.MALE,
    isDeactivated: false,
    joinedOn: new Date(),
    lastname: "",
    memberId: "",
    tariff: Tariff.TRAINEES_STUDENTS_PENSIONERS,
    userGradings: [],
    userId: user.id,
  });

  const userRoleRepo = new UserRoleRepo();
  await userRoleRepo.insert({
    role: UserRole.ADMIN,
    userId: user.id,
  });

  await userRoleRepo.insert({
    role: UserRole.USER,
    userId: user.id,
  });
};
