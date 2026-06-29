import { Button } from '@carnica/components/app';
import { IconCloseRoundStroke } from '@carnica/icons/actions/IconCloseRoundStroke';

// Кнопка закрытия модалки — APP Button из дс Димы, view=icon,
// priority='secondary on bg_secondary'. Фон переопределён на element/primary.

interface Props {
  onClick: () => void;
  label?: string;
}

export function ModalCloseButton({ onClick, label = 'закрыть' }: Props) {
  return (
    <div className="absolute top-5 right-5">
      <Button
        appearance="default"
        view="icon"
        priority="secondary on bg_secondary"
        size="medium"
        icon={<IconCloseRoundStroke />}
        aria-label={label}
        onClick={onClick}
        className="!bg-bee-el-primary"
      />
    </div>
  );
}
