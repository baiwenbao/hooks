import plugins from '../../ts/hooks';

plugins.fieldMounted.tap('run validate', (field, formStore) => {
  const { $, validate } = formStore;
  const { name } = field;
  if (!name) return;
  $(name, {
    exclude: 'error',
    // include: ['value', '__from__']
  }).subscribe((fieldState) => {
    validate(name, fieldState.__from__);
  });
});
