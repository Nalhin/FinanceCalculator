import '@testing-library/jest-dom';
import 'jest-extended';
import { setLogger } from 'react-query';

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});
