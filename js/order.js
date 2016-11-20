(function() {
  'use strict';

  // select dropdown
  $(document).ready(() => {
    $('select').material_select();
  });

  // data
  // price of each goods
  const priceList = {
    item1: 49.99,
    item2: 12.99,
    item3: 9.99,
    item4: 7.99
  };

  // states in select
  const states = [
    {
      name: 'Alabama',
      abbreviation: 'AL',
      rate: 0.04
    },
    {
      name: 'Alaska',
      abbreviation: 'AK',
      rate: 0
    },
    {
      name: 'Arizona',
      abbreviation: 'AZ',
      rate: 0.056
    },
    {
      name: 'Arkansas',
      abbreviation: 'AR',
      rate: 0.065
    },
    {
      name: 'California',
      abbreviation: 'CA',
      rate: 0.075
    },
    {
      name: 'Colorado',
      abbreviation: 'CO',
      rate: 0.029
    },
    {
      name: 'Connecticut',
      abbreviation: 'CT',
      rate: 0.0635
    },
    {
      name: 'Delaware',
      abbreviation: 'DE',
      rate: 0
    },
    {
      name: 'District Of Columbia',
      abbreviation: 'DC',
      rate: 0.0575
    },
    {
      name: 'Florida',
      abbreviation: 'FL',
      rate: 0.06
    },
    {
      name: 'Georgia',
      abbreviation: 'GA',
      rate: 0.04
    },
    {
      name: 'Hawaii',
      abbreviation: 'HI',
      rate: 0.04
    },
    {
      name: 'Idaho',
      abbreviation: 'ID',
      rate: 0.06
    },
    {
      name: 'Illinois',
      abbreviation: 'IL',
      rate: 0.0625
    },
    {
      name: 'Indiana',
      abbreviation: 'IN',
      rate: 0.07
    },
    {
      name: 'Iowa',
      abbreviation: 'IA',
      rate: 0.06
    },
    {
      name: 'Kansas',
      abbreviation: 'KS',
      rate: 0.065
    },
    {
      name: 'Kentucky',
      abbreviation: 'KY',
      rate: 0.06
    },
    {
      name: 'Louisiana',
      abbreviation: 'LA',
      rate: 0.05
    },
    {
      name: 'Maine',
      abbreviation: 'ME',
      rate: 0.055
    },
    {
      name: 'Maryland',
      abbreviation: 'MD',
      rate: 0.06
    },
    {
      name: 'Massachusetts',
      abbreviation: 'MA',
      rate: 0.0625
    },
    {
      name: 'Michigan',
      abbreviation: 'MI',
      rate: 0.06
    },
    {
      name: 'Minnesota',
      abbreviation: 'MN',
      rate: 0.06875
    },
    {
      name: 'Mississippi',
      abbreviation: 'MS',
      rate: 0.07
    },
    {
      name: 'Missouri',
      abbreviation: 'MO',
      rate: 0.04225
    },
    {
      name: 'Montana',
      abbreviation: 'MT',
      rate: 0
    },
    {
      name: 'Nebraska',
      abbreviation: 'NE',
      rate: 0.055
    },
    {
      name: 'Nevada',
      abbreviation: 'NV',
      rate: 0.0685
    },
    {
      name: 'New Hampshire',
      abbreviation: 'NH',
      rate: 0
    },
    {
      name: 'New Jersey',
      abbreviation: 'NJ',
      rate: 0.07
    },
    {
      name: 'New Mexico',
      abbreviation: 'NM',
      rate: 0.05125
    },
    {
      name: 'New York',
      abbreviation: 'NY',
      rate: 0.04
    },
    {
      name: 'North Carolina',
      abbreviation: 'NC',
      rate: 0.0475
    },
    {
      name: 'North Dakota',
      abbreviation: 'ND',
      rate: 0.05
    },
    {
      name: 'Ohio',
      abbreviation: 'OH',
      rate: 0.0575
    },
    {
      name: 'Oklahoma',
      abbreviation: 'OK',
      rate: 0.045
    },
    {
      name: 'Oregon',
      abbreviation: 'OR',
      rate: 0
    },
    {
      name: 'Pennsylvania',
      abbreviation: 'PA',
      rate: 0.06
    },
    {
      name: 'Rhode Island',
      abbreviation: 'RI',
      rate: 0.07
    },
    {
      name: 'South Carolina',
      abbreviation: 'SC',
      rate: 0.06
    },
    {
      name: 'South Dakota',
      abbreviation: 'SD',
      rate: 0.045
    },
    {
      name: 'Tennessee',
      abbreviation: 'TN',
      rate: 0.07
    },
    {
      name: 'Texas',
      abbreviation: 'TX',
      rate: 0.0625
    },
    {
      name: 'Utah',
      abbreviation: 'UT',
      rate: 0.047
    },
    {
      name: 'Vermont',
      abbreviation: 'VT',
      rate: 0.06
    },
    {
      name: 'Virginia',
      abbreviation: 'VA',
      rate: 0.043
    },
    {
      name: 'Washington',
      abbreviation: 'WA',
      rate: 0.065
    },
    {
      name: 'West Virginia',
      abbreviation: 'WV',
      rate: 0.06
    },
    {
      name: 'Wisconsin',
      abbreviation: 'WI',
      rate: 0.05
    },
    {
      name: 'Wyoming',
      abbreviation: 'WY',
      rate: 0.04
    }
  ];

  for (const state of states) {
    const $option = $('<option>');

    $option.val(state.name);
    $option.text(state.abbreviation);
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

    for (const state of states) {
      if (state.name === curState) {
        return state.rate;
      }
    }

    return 'nostate';
  };

  const updateTotal = function() {
    const $prices = $('.price').text();
    const arr = $prices.match(/([^$]+)/g).map(parseFloat);
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

  $('#state').change(updateTotal);
})();
