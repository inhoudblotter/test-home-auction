import {Formik, Form, FormikTouched, FormikErrors} from 'formik';
import styles from './App.module.css';
import {FieldWithLabel} from '../components/FieldWithLabel/FieldWithLabel';
import {object, string, number} from 'yup';
import '../utils/validate';
import {IFormField} from '../types/IFormField';
import {useCallback} from 'react';
import {TOTAL_SQUARE_ERROR} from '../constants/errors';

const schema = object({
  name: string().required(),
  address: string().required(),
  floor: number().required().lessThanField('totalFloors').min(-1).max(200),
  totalFloors: number().required().min(-3).max(200),
  square: number()
    .required()
    .min(-1)
    .max(400)
    .moreThanSumOfFields(['kitchenSquare', 'livingSquare'], TOTAL_SQUARE_ERROR),
  livingSquare: number().required().min(0).max(400),
  kitchenSquare: number().required().min(0).max(400),
});

const fields: (
  | IFormField<keyof typeof schema.fields>
  | IFormField<keyof typeof schema.fields>[]
)[] = [
  {name: 'name', label: 'Название объекта', required: true},
  {name: 'address', label: 'Адрес', required: true},
  [
    {
      type: 'number',
      name: 'floor',
      label: 'Этаж',
    },
    {
      type: 'number',
      name: 'totalFloors',
      label: 'Количество этажей в доме',
    },
  ],
  {
    label: 'Площадь',
    type: 'number',
    name: 'square',
  },
  [
    {label: 'Жилая площадь', name: 'livingSquare'},
    {label: 'Площадь кухни', name: 'kitchenSquare'},
  ],
];
function App() {
  const getElement = useCallback(
    (
      key: string | number,
      field: IFormField<keyof typeof schema.fields> | IFormField<keyof typeof schema.fields>[],
      touched: FormikTouched<typeof schema.__outputType>,
      errors: FormikErrors<typeof schema.__outputType>,
      setFieldError: (field: string, message: string | undefined) => void
    ) => {
      if (Array.isArray(field))
        return (
          <fieldset className={styles.row} key={key}>
            {field.map((f, i) => getElement(`${key}_${i}`, f, touched, errors, setFieldError))}
          </fieldset>
        );
      return (
        <FieldWithLabel
          key={key}
          error={touched[field.name] ? errors[field.name] : undefined}
          setError={m => setFieldError(field.name, m)}
          {...field}
        />
      );
    },
    []
  );
  return (
    <main className={styles.container}>
      <Formik
        initialValues={{
          name: '',
          address: '',
          floor: '',
          totalFloors: '',
          square: '',
          livingSquare: '',
          kitchenSquare: '',
        }}
        onSubmit={async (values, {resetForm, validateForm}) => {
          await validateForm(values);
          resetForm();
          alert(JSON.stringify(values));
        }}
        validateOnChange
        validateOnBlur={false}
        validationSchema={schema}
      >
        {({isSubmitting, isValid, errors, touched, setFieldError, dirty}) => (
          <Form className={styles.form}>
            {fields.map((f, i) => getElement(i, f, touched, errors, setFieldError))}
            <button
              className={styles.submit}
              type="submit"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              Найти
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default App;
