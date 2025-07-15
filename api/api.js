import sdk from '@api/fsq-developers';

sdk.autocomplete()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));