import { UserProfileRepo } from "../repositories/UserProfileRepo";
import { UserRepo } from "../repositories/UserRepo";
import { UserRoleRepo } from "../repositories/UserRoleRepo";
import { AuthRole } from "../shared/types/AuthRole";
import { Gender } from "../shared/types/Gender";
import { Tariff } from "../shared/types/Tariff";
import { hash } from "./hash";

export const createRootUser = async () => {
  // check if user already exists, otherwise create one
  const userRepo = new UserRepo();
  const rootUser = await userRepo.findByUsername("root");
  if (rootUser) {
    return;
  }

  const user = await userRepo.createUser({
    password: hash("admin"),
    username: "root",
  });

  const userProfileRepo = new UserProfileRepo();
  await userProfileRepo.insert({
    email: "",
    firstname: "Root",
    gender: Gender.MALE,
    joinedOn: new Date(),
    lastname: "",
    memberId: 0,
    tariff: Tariff.TRAINEES_STUDENTS_PENSIONERS,
    userGradings: [],
    userId: user.id,
  });

  const userRoleRepo = new UserRoleRepo();
  await userRoleRepo.insert({
    role: AuthRole.ADMIN,
    userId: user.id,
  });

  await userRoleRepo.insert({
    role: AuthRole.USER,
    userId: user.id,
  });
};
