interface IBaseFormField<Names extends string> {
  type?: 'number' | 'checkbox' | 'radio';
  name: Names;
  label: string;
  required?: boolean;
}

interface INumberFormField<Names extends string> extends IBaseFormField<Names> {
  type: 'number';
  min?: number;
  max?: number;
}

interface ICheckFormField<Names extends string> extends IBaseFormField<Names> {
  type: 'radio' | 'checkbox';
  value: string;
}

export type IFormField<Names extends string> =
  | IBaseFormField<Names>
  | INumberFormField<Names>
  | ICheckFormField<Names>;
