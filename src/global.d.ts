import {NumberSchema, StringSchema} from 'yup';

declare module 'yup' {
  interface NumberSchema<TType, TContext, TDefault, TFlags>
    extends NumberSchema<TType, TContext, TDefault, TFlags> {
    moreThanSumOfFields(fields: string[], message?: string): this;
    lessThanField(field: string, message?: string): this;
  }
}
