import { IField } from '../type/field';

type Pool = {
  [name: string]: IField;
};

// // dispatch(a, {value: 1})
// // dispatch(a, {value: 2})
// // dispatch(a, {value: 3})

const debounce = (name: keyof Pool, pool: Pool = {}) => {
  if (pool[name]) {
  }
};
