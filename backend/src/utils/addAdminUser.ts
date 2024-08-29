import { UserRepo } from "../repositories/UserRepo";

export const addAdminUser = async () => {
  const userRepo = new UserRepo();
  const user = await userRepo.createUser({
    password: "admin",
    username: "root",
  });
};
