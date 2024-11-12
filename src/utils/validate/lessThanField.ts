import {addMethod, number} from 'yup';

addMethod(number, 'lessThanField', function lessThanField(field: string) {
  return this.when(field, value => {
    return this.max(value[0] ? Number(value[0]) : Infinity);
  });
});
