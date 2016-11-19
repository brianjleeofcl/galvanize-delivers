(function() {
  'use strict';

  // select dropdown
  $(document).ready(() => {
    $('select').material_select();
  });

  const checkQuantity = function($target) {
    const $input = $target.parents('.card').find('input[type="number"]')
    if ($input.val() === '') {
      console.log('Empty');
      return
    }
    console.log('something');
    return $input.val()
  }

  // add to cart links
  $('.add-to-cart').click(() => {
    if ($(event.target).hasClass('need-quantity')) {
      const quantity = checkQuantity($(event.target));
      console.log(quantity);
    }

  })
})();
