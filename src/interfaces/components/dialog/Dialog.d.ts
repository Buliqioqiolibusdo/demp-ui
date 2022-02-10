interface DialogProps {
  visible: boolean;
  modalClass?: string;
  title?: string;
  width?: string;
  zIndex?: number;
  confirmDisabled?: boolean;
  confirmLoading?: boolean;
  className?: string;
}

type DialogKey = 'create' | 'edit' | 'run';

interface DialogVisible {
  createEdit: boolean;
}
