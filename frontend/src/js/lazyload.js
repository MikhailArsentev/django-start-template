import LazyLoad from 'vanilla-lazyload';

// eslint-disable-next-line no-unused-vars
const lazyLoadInstance = new LazyLoad({
  elements_selector: '[data-src], [data-srcset]',
  use_native: true,
  thresholds: '500px 10%',
});
