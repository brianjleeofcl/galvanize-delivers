(function() {
  'use strict';

  // select dropdown
  $(document).ready(() => {
    $('select').material_select();
  });

  // 'stateData' variable in data.js, contains state name/abbrev/taxrate
  for (const state of stateData) {
    const $option = $('<option>');

    $option.val(state.name);
    $option.text(state.abbreviation);
    $('#state').append($option);
  }

  // functions for add to cart feature
  const checkQuantity = function($input) {
    if ($input.val() === '') {
      Materialize.toast('Please enter a quantity.', 3000);

      return '';
    }

    return $input.val();
  };

  const calculatePrice = function($card, quantity) {
    const itemPrice = priceList[$card.attr('id')];

    return itemPrice * quantity;
  };

  const createQuantityField = function(quantity) {
    const $quantityField = $('<input>').attr('type', 'number');

    $quantityField.addClass('input-in-table');

    return $quantityField.val(quantity);
  };

  const addToCart = function($card, quantity) {
    const $row = $('<tr>');
    const $del = $('<td>');
    const $delIcon = $('<i>');
    const $item = $('<td>');
    const $quantity = $('<td>');
    const $price = $('<td>');
    const price = calculatePrice($card, quantity);

    $delIcon.addClass('material-icons delete grey-text lighten-2');

    if ($(event.target).hasClass('need-quantity')) {
      $quantity.append(createQuantityField(quantity));
    } else {
      $quantity.text('');
    }

    $delIcon.text('delete');
    $del.append($delIcon);
    $item.text($card.find('h5').text());
    $item.addClass();
    $price.text(`$${price}`).addClass('right-align price');
    $row.append($del).append($item).append($quantity).append($price);
    $row.addClass($card.attr('id'));

    return $row;
  };

  const clearQuantityField = function($target) {
    $target.val('');

    return;
  };

  const retrieveTaxRate = function() {
    const curState = $('#state').val();

    for (const state of stateData) {
      if (state.name === curState) {
        return state.rate;
      }
    }

    return 'nostate';
  };

  const updateTotal = function() {
    const pricestr = $('.price').text();

    if (pricestr === '') {
      return;
    }
    const arr = pricestr.match(/([^$]+)/g).map(parseFloat);
    const subtotal = arr.reduce((a, b) => a + b);
    const taxRate = retrieveTaxRate();

    $('#subtotal').text(`$${subtotal.toFixed(2)}`);

    if (taxRate === 'nostate') {
      $('#tax').text('Please enter your state');
      $('#total').text('Please enter your state');
    }
    else {
      const tax = subtotal * taxRate;
      const total = subtotal + tax;

      $('#tax').text(`$${tax.toFixed(2)}`);
      $('#total').text(`$${total.toFixed(2)}`);
    }
  };

  const adjustQuantity = function(quantity, id) {
    const $row = $('#cart .'.concat(id));
    const curVal = $row.find('input').val();

    $row.find('input').val(parseInt(curVal) + parseInt(quantity));

    return $row;
  };

  const recalculatePrice = function($row) {
    const itemPrice = priceList[$row.attr('class')];
    const quantity = $row.find('input').val();
    const price = itemPrice * quantity;

    $row.find('.price').text(`$${price}`);

    return;
  };

  // add to cart links
  $('.add-to-cart').click(() => {
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

    if ($(event.target).hasClass('need-quantity') &&
    $('#cart tr').hasClass($card.attr('id'))) {
      const $row = adjustQuantity(quantity, $card.attr('id'));

      recalculatePrice($row);
    } else if (!$(event.target).hasClass('need-quantity') &&
    $('#cart tr').hasClass($card.attr('id'))) {
      Materialize.toast('This item can only be added once.', 3000);
    } else {
      $('#cart').append(addToCart($card, quantity));
    }

    clearQuantityField($inputQuantity);
    updateTotal();
  });

  const resetTotal = function() {
    $('#subtotal').text('');
    $('#tax').text('');
    $('#total').text('');
  };

  $('#cart').on('click', '.delete', () => {
    const $row = $(event.target).parents('tr');

    $row.remove();
    if ($('#cart').children().length) {
      updateTotal();
    } else {
      resetTotal();
    }
  });

  $('#cart').on('mouseenter', '.delete', () => {
    $(event.target).toggleClass('grey-text lighten-2 red-text');
  });

  $('#cart').on('mouseleave', '.delete', () => {
    $(event.target).toggleClass('grey-text lighten-2 red-text');
  });

  $('#cart').on('change', '.input-in-table', () => {
    recalculatePrice($(event.target).parents('tr'));
    updateTotal();
  });

  $('#phone').change(() => {
    const phone = $('#phone').val();
    const phoneRegEx = /^\D*(\d{3})(\D*)(\d{3})(\D*)(\d{4})\D*$/;

    if (phone.match(phoneRegEx)) {
      $('#phone').val(phone.replace(phoneRegEx, '($1) $3-$5'));
    } else {
      $('#phone').val('');
      Materialize.toast('Please enter a valid 10-digit phone number', 3000);
    }
  });

  $('#state').change(updateTotal);

  // const appendSummary = function() {
  //   const $sumTable = $('<table>')
  //   const $rows = $('#cart tr')
  //
  //   for (const row of $rows) {
  //
  //   }
  //
  // };

  $('#order-form').submit(() => {
    event.preventDefault();

    if ($('#cart').children().length === 0) {
      Materialize.toast('Cart is currently empty.', 3000);

      return;
    }

    // appendSummary();
    $('#modal1').openModal();
  });
})();
