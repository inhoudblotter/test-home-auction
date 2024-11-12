import {addMethod, number} from 'yup';

addMethod(
  number,
  'moreThanSumOfFields',
  function moreThanSumOfFields(
    fields: string[],
    message: string = 'The value must be greater than in the fields {...}'
  ) {
    return this.when(fields, values => {
      return this.min(
        values.reduce((acc, v) => (v ? acc + Number(v) : acc), 0),
        message.replace('{...}', fields.join(', '))
      );
    });
  }
);
