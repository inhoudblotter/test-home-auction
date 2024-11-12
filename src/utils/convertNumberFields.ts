import {AnyObject, Flags, Maybe, ObjectSchema} from 'yup';

export function convertNumberFields<
  TIn extends Maybe<AnyObject>,
  TContext = AnyObject,
  TDefault = any,
  TFlags extends Flags = '',
>(
  schema: ObjectSchema<TIn, TContext, TDefault, TFlags>,
  values: {[key in keyof TIn]: string}
): TIn {
  const result: {[key: string]: string | number | undefined} = {};
  for (const field of Object.keys(schema.fields)) {
    const v = values[field as keyof TIn];
    if (schema.fields[field].describe().type === 'number') {
      result[field] = v ? Number(v) : undefined;
    } else result[field] = v;
  }
  return result as TIn;
}
