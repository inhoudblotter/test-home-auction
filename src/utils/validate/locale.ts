import {setLocale} from 'yup';
import {MAX_ERROR, MIN_ERROR, REQUIRED_ERROR} from '../../constants/errors';

setLocale({
  mixed: {
    required: REQUIRED_ERROR,
  },
  number: {
    max: MAX_ERROR,
    min: MIN_ERROR,
  },
});
