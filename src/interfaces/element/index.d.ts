type BasicType = '' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type BasicEffect = 'dark' | 'light' | 'plain';
type BasicSize = 'mini' | 'small' | 'medium' | 'large';

declare global {
  type ElFormValidator = (rule: any, value: any, callback: any) => void;

  interface ElFormRule {
    required: boolean;
    trigger: string;
    validator: ElFormValidator;
  }
}
