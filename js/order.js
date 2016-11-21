(function() {
  'use strict';

  // select dropdown initializer
  $(document).ready(() => {
    $('select').material_select();
  });

  // generate options for select dropdown
  // 'stateData' variable in data.js, contains state name/abbrev/taxrate
  for (const state of stateData) {
    const $option = $('<option>');

    $option.val(state.name);
    $option.text(state.abbreviation);
    $('#state').append($option);
  }

  // priceList: object in data.js
  const calculatePrice = function($card, quantity) {
    const itemPrice = priceList[$card.attr('id')];

    return itemPrice * quantity;
  };

  // cell within table specific for items with quantity variable
  const createQuantityField = function(quantity) {
    const $quantityField = $('<input>').attr('type', 'number');

    $quantityField.addClass('input-in-table');

    return $quantityField.val(quantity);
  };

  // create rows, append to table in page
  const addToCart = function($card, quantity) {
    const $row = $('<tr>');
    const $del = $('<td>');
    const $delIcon = $('<i>');
    const $item = $('<td>').addClass('item-name');
    const $quantity = $('<td>').addClass('order-quantity');
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
    $price.text(`$${price}`).addClass('right-align price');
    $row.append($del).append($item).append($quantity).append($price);
    $row.addClass($card.attr('id'));

    return $row;
  };

  const clearQuantityField = function($target) {
    $target.val('');

    return;
  };

  // using state selector, updates taxrate
  const retrieveTaxRate = function() {
    const curState = $('#state').val();

    for (const state of stateData) {
      if (state.name === curState) {
        return state.rate;
      }
    }

    return 'nostate';
  };

  // each time invoked, sums price column of each row for subtotal, calculates tax and total, updates text content in table
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

  // when item already exists in cart, updates quantity of cart instead of adding new rows
  const adjustQuantity = function(quantity, id) {
    const $row = $('#cart .'.concat(id));
    const curVal = $row.find('input').val();

    $row.find('input').val(parseInt(curVal) + parseInt(quantity));

    return $row;
  };

  // recalculates price if quantity changes
  // priceList: object in data.js
  const recalculatePrice = function($row) {
    const itemPrice = priceList[$row.attr('class')];
    const quantity = $row.find('input').val();
    const price = itemPrice * quantity;

    $row.find('.price').text(`$${price}`);
  };

  // click event listener on add to cart; will retrieve quantity info and result in A) either 1. new row in table; 2. update quantity of existing row; 3. display toast requesting quantity and B) updates subtotal, tax and total
  $('.add-to-cart').click(() => {
    const $card = $(event.target).parents('.card');
    const $inputQuantity = $card.find('input[type="number"]');
    let quantity;

    if ($(event.target).hasClass('need-quantity')) {
      quantity = $inputQuantity.val();
    } else {
      quantity = 1;
    }

    if (quantity === '') {
      Materialize.toast('Please enter a quantity.', 3000);

      return;
    }

    if ($(event.target).hasClass('need-quantity') &&
    $('#cart tr').hasClass($card.attr('id'))) {
      const $row = adjustQuantity(quantity, $card.attr('id'));

      recalculatePrice($row);
    }
    else if (!$(event.target).hasClass('need-quantity') &&
    $('#cart tr').hasClass($card.attr('id'))) {
      Materialize.toast('This item can only be added once.', 3000);
    }
    else {
      $('#cart').append(addToCart($card, quantity));
    }

    clearQuantityField($inputQuantity);
    updateTotal();
  });

  // allow same for submit (enter key) on quantity input instead of clicking add to cart
  $('.quantity-submit').submit(() => {
    event.preventDefault();

    const $card = $(event.target).parents('.card');
    const $inputQuantity = $card.find('input[type="number"]');
    const quantity = $inputQuantity.val();

    if (quantity === '') {
      Materialize.toast('Please enter a quantity.', 3000);

      return;
    }

    if ($('#cart tr').hasClass($card.attr('id'))) {
      const $row = adjustQuantity(quantity, $card.attr('id'));

      recalculatePrice($row);
    } else {
      $('#cart').append(addToCart($card, quantity));
    }

    clearQuantityField($inputQuantity);
    updateTotal();
  });

  // if row deleted is the last row in the table, clears values for subtotal, tax and total
  const resetTotal = function() {
    $('#subtotal').text('');
    $('#tax').text('');
    $('#total').text('');
  };

  // delegates event listener on rows created in table; will remove the row the clicker belongs to and recalculate subtotal, tax and total
  $('#cart').on('click', '.delete', () => {
    const $row = $(event.target).parents('tr');

    $row.remove();
    if ($('#cart').children().length) {
      updateTotal();
    } else {
      resetTotal();
    }
  });

  // changes icon color on mouse hover
  $('#cart').on('mouseenter mouseleave', '.delete', () => {
    $(event.target).toggleClass('grey-text lighten-2 red-text');
  });

  // updates values when quantity is changed directly in table
  $('#cart').on('change', '.input-in-table', () => {
    recalculatePrice($(event.target).parents('tr'));
    updateTotal();
  });

  // phone number validation; should accept most formating of 3-3-4 groupings of ten-digit numbers (or just ten numbers) and change it automatically to (###) ###-####; clear field and generate toast if it doesn't fit in this format
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

  // each time state selector is changed, will recalculate tax and total with newly retreived state taxrate
  $('#state').change(updateTotal);

  // adds table with info on items ordered in the order confirmation modal
  const appendSummary = function() {
    const $sumTable = $('<table>');
    const $rows = $('#cart tr');
    const $sumTotal = $('<h5>');
    const total = $('#total').text();

    $rows.each((index) => {
      const $sumRow = $('<tr>');
      const $item = $('<td>');
      const $quantity = $('<td>');

      $item.text($($rows[index]).children('.item-name').text());

      if ($($rows[index]).hasClass('item1')) {
        $quantity.text('1');
      } else {
        $quantity.text($($rows[index]).find($('input')).val());
      }

      $sumRow.append($item).append($quantity);
      $sumTable.append($sumRow);
    });

    $sumTotal.text(`Total paid: ${total}`).addClass('right-align');
    $('#modal1 .modal-content').append($sumTable).append($sumTotal);
  };

  // if html form validation is complete, checks for cart: if empty, displays a toast message; if not, displays a modal with a summary of order and a button to return to the home screen
  $('#order-form').submit(() => {
    event.preventDefault();

    if ($('#cart').children().length === 0) {
      Materialize.toast('Cart is currently empty.', 3000);

      return;
    }

    if ($('#state').val() === '') {
      Materialize.toast('Please select your state.', 3000);

      return;
    }

    appendSummary();
    $('#modal1').openModal();
  });
})();
