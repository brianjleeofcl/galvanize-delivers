(function() {
  'use strict';

  // select dropdown
  $(document).ready(() => {
    $('select').material_select();
  });

  const checkQuantity = function($input) {
    if ($input.val() === '') {
      Materialize.toast('Please enter a quantity.', 3000, 'center-screen');

      return '';
    }

    return $input.val();
  };

  const retrievePrice = function(item) {
    switch (item) {
      case 'item1':
        return 49.99;
      case 'item2':
        return 12.99;
      case 'item3':
        return 9.99;
      case 'item4':
        return 7.99;
      default:
        return;
    }
  };

  const calculatePrice = function($card, quantity) {
    const item = $card.attr('id');
    const itemPrice = retrievePrice(item);

    return itemPrice * quantity;
  };

  const addToCart = function($card, quantity) {
    const $row = $('<tr>');
    const $item = $('<td>');
    const $quantity = $('<td>');
    const $price = $('<td>');
    const price = calculatePrice($card, quantity);

    if ($(event.target).hasClass('need-quantity')) {
      const $quantityField = $('<input>').attr('type', 'number');

      $quantityField.val(quantity);
      $quantity.append($quantityField);
    } else {
      $quantity.text(quantity);
    }

    $item.text($card.find('h5').text());
    $price.text(`$${price}`).addClass('right-align price');
    $row.append($item).append($quantity).append($price);

    return $row;
  };

  const clearQuantityField = function($target) {
    $target.val('');

    return;
  };

  const retrieveTaxRate = function() {
    return 0.098;
  };

  const updateTotal = function() {
    const $prices = $('.price').text();
    const arr = $prices.match(/([^$]+)/g).map(parseFloat);
    const subtotal = arr.reduce((a, b) => a + b);
    const taxRate = retrieveTaxRate();
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    $('#subtotal').text(`$${subtotal.toFixed(2)}`);
    $('#tax').text(`$${tax.toFixed(2)}`);
    $('#total').text(`$${total.toFixed(2)}`);
  };

  // add to cart links
  $('.add-to-cart').click(() => {
    const $cart = $('#cart');
    const $card = $(event.target).parents('.card');
    const $inputQuantity = $card.find('input[type="number"]');
    let quantity;

    if ($(event.target).hasClass('need-quantity')) {
      quantity = checkQuantity($inputQuantity);
    } else {
      quantity = 1;
    }

    if (quantity === '') {
      return;
    }

    $cart.append(addToCart($card, quantity));
    clearQuantityField($inputQuantity);
    updateTotal();
  });
})();
