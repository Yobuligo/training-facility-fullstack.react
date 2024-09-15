import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IPasswordConfirmProps } from "./IPasswordConfirmProps";
import { usePasswordConfirmViewModel } from "./usePasswordConfirmViewModel";

export const PasswordConfirm: React.FC<IPasswordConfirmProps> = (props) => {
  const viewModel = usePasswordConfirmViewModel();
  const { t } = useTranslation();

  return (
    <>
      <LabeledInput
        label={t(texts.passwordConfirm.newPassword)}
        type="password"
        onChange={viewModel.setNewPassword}
      />
      <LabeledInput
        label={t(texts.changePassword.confirmNewPassword)}
        type="password"
        onChange={viewModel.setNewConfirmPassword}
        error={viewModel.newConfirmPasswordError}
      />
    </>
  );
};
