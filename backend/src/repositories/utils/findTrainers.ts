import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { isNotInitial } from "../../core/utils/isNotInitial";
import { IUserShort } from "../../shared/model/IUserShort";
import { AuthRole } from "../../shared/types/AuthRole";
import { UserRepo } from "../UserRepo";

/**
 * This function is responsible for loading all users having auth role TRAINER.
 * In addition it finds retired trainers, which means users, which are {@link assignedTrainers} but not having the auth role TRAINER anymore.
 * This is required for loading event definitions or event instances and also appending retired trainers to display them for historical reasons.
 */
export const findTrainers = async (
  assignedTrainers: IHaveUserId[]
): Promise<IUserShort[]> => {
  // finding all users having role auth role TRAINER
  const userRepo = new UserRepo();
  const trainers = await userRepo.findAllShortByRole(AuthRole.TRAINER);

  // check if each assigned trainer is still a trainer, which means to have role TRAINER, so is part of the list trainers,
  // otherwise collect the corresponding user ids
  const retiredUserIds: string[] = [];
  for (const assignedTrainer of assignedTrainers) {
    const index = trainers.findIndex(
      (trainer) => trainer.id === assignedTrainer.userId
    );
    if (index === -1) {
      retiredUserIds.push(assignedTrainer.userId);
    }
  }

  // Load retired trainers and append them to the result list
  if (isNotInitial(retiredUserIds)) {
    const retiredUsers = await userRepo.findAllShort(retiredUserIds);
    trainers.push(...retiredUsers);
  }

  return trainers;
};
