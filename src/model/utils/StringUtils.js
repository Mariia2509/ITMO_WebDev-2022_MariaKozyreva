function isStringNotNumberAndNotEmpty(value) {
  if (value === null) throw new Error();
  if (value === undefined) throw new Error();

  const isValueString = typeof value === 'string';
  const isValueNotNumber = isNaN(parseInt(value));

  const result = isValueString && isValueNotNumber && value.length > 0;

  console.log('> isStringNotNumberAndNotEmpty -> result', {
    result,
    isInputValueString: isValueString,
    isInputValueNotNumber: isValueNotNumber,
  });
  return result;
}

export { isStringNotNumberAndNotEmpty };
