import plugins from '../../ts/hooks';
plugins.fieldMounted.tap('run validate', function (field, formStore) {
    var $ = formStore.$, validate = formStore.validate;
    var name = field.name;
    if (!name)
        return;
    $(name, {
        exclude: 'error'
        // include: ['value', '__from__']
    }).subscribe(function (fieldState) {
        validate(name, fieldState.__from__);
    });
});
//# sourceMappingURL=index.js.map