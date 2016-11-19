(function() {
  'use strict';

  // select dropdown
  $(document).ready(() => {
    $('select').material_select();
  });

  const checkQuantity = function($target) {
    const $input = $target.parents('.card').find('input[type="number"]');

    if ($input.val() === '') {
      Materialize.toast('Please enter a quantity.', 3000, 'center-screen');

      return '';
    }

    return $input.val();
  };

  const calculatePrice = function(item, quantity) {
    return 4;
  };

  const addToCart = function(item, quantity) {
    const $row = $('<tr>');
    const $item = $('<td>');
    const $quantity = $('<td>');
    const $price = $('<td>');
    const price = calculatePrice(item, quantity);

    $item.text(item);
    $quantity.text(quantity);
    $price.text(price);
    $row.append($item).append($quantity).append($price);

    return $row;
  };

  // add to cart links
  $('.add-to-cart').click(() => {
    const $cart = $('#cart');
    const item = 'a';
    let quantity;

    if ($(event.target).hasClass('need-quantity')) {
      quantity = checkQuantity($(event.target));
    } else {
      quantity = 1;
    }

    if (quantity === '') {
      return;
    }

    $cart.append(addToCart(item, quantity));
  });
})();
