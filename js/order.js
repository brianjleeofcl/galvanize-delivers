(function() {
  'use strict';

  // select dropdown
  $(document).ready(() => {
    $('select').material_select();
  });

  // states in select
  const states = {
    AL: 'Alabama',
    AK: 'Alaska',
    AS: 'American Samoa',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    DC: 'District Of Columbia',
    FM: 'Federated States Of Micronesia',
    FL: 'Florida',
    GA: 'Georgia',
    GU: 'Guam',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MH: 'Marshall Islands',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    MP: 'Northern Mariana Islands',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PW: 'Palau',
    PA: 'Pennsylvania',
    PR: 'Puerto Rico',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VI: 'Virgin Islands',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming'
  };

  for (const abbrev in states) {
    const $option = $('<option>');

    $option.val(states[abbrev]);
    $option.text(abbrev);
    $('#state').append($option);
  }

  // functions for add to cart feature
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

  const createQuantityField = function(quantity) {
    const $quantityField = $('<input>').attr('type', 'number');

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
    $price.text(`$${price}`).addClass('right-align price');
    $row.append($del).append($item).append($quantity).append($price);

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
})();
