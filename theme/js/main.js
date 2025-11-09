function loadSection(id, url) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

loadSection('header', 'header.html');
loadSection('main', 'main.html');
loadSection('footer', 'footer.html');

function windowsLazyLoad() {
  $(window).load(function () {
    $("img.lazy").lazyload({
      delay: 5000,
      threshold: 200,
      effect: "fadeIn",
      effectTime: '3000',
      skip_invisible: true,
      onError: function (element) {
        console.log('error loading ' + element.data('src'));
      }
    });
    $(window).scroll();
  });
}

function loadCarusel() {
  $(window).load(function () {
    $('.carousel').carousel({
      interval: 15000
    })
  });
}

function AddSepetim() {
  $(function () {
    $('#cartClose').click(function () {
      $('#modalShoppingCart').modal('hide');
    });

    $('#goToMyCart').click(function () {
      $('#modalShoppingCart').modal('hide');
      var timerID = setInterval(function () {
        clearInterval(timerID);

        window.location = '/sepetim';
      }, 800);
    });
  });
}


function UnknownComponent() {
  $('.alphForceName').on("cut copy paste", function (e) {
    e.preventDefault();
  });

  $('.alphForceName').on('keypress', function (e) {
    var blockSpecialRegex = /[~`'"#$%^()={}[\];<>]/;
    var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (blockSpecialRegex.test(key)) {
      e.preventDefault();
      return false;
    }
  });

  var objA, objB, objC, objD, objE, objF, objG, objH, objI, objJ, objK;
  var sTime = new Date().getTime(), jTime, wTime, cLog = 'Build OA B2C System for Theme Progressive';

  if (typeof (console) === 'undefined') {
    var console = {}
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.groupCollapsed = function () {
    };
  }

  $(document).ready(function () {
    jTime = parseFloat((new Date().getTime() - sTime) / 1000).toFixed(8);

    var ping = setInterval(function () {
      $.ajax({
        url: '/OAsystem/ping.asp', type: 'POST', data: 'token=' + $.now(), success: function (data, result) {
        }
      })
    }, 300000);
  });

  $(window).load(function () {
    wTime = parseFloat((new Date().getTime() - sTime) / 1000).toFixed(8);

    cLog += '\nOA Theme System: ' + pageSys;
    cLog += '\nCurrent page link: ' + pageLink;
    cLog += '\nCurrent page active mode: ' + pageMode;
    cLog += '\nCurrent page language: ' + pageLang;
    cLog += "\njScript execute time: " + jTime;
    cLog += "\nWindow loading time: " + wTime;
    cLog += '\nvScript execute time: 0.10937500';

    cLog += '\nHeader content execute time: 0.03125000';

    cLog += '\nMain content execute time: 0.03125000';

    console.groupCollapsed('OA B2C System Logs');
    console.info(cLog);
    console.groupEnd();
  });

  function showMessages(objA, objB, objC, objD, objG) {

    objE = objA.parent().parent().parent();

    if (objE.hasClass('default')) {
      objE = objE.find('.messages');
    } else {
      objE = objE.parent().find('.messages');
    }

    if (objE.length) {
      objE.html(objB);
      objE.animate({top: 0}, 500);
      var timerID = setInterval(function () {
        clearInterval(timerID);
        objE.animate({top: -30}, 800);
        objC.removeClass('fa-refresh').removeClass('fa-spin').addClass(objD);
        if (objG != '') {
          $('.cartCount').html(objG);

          cartRefresh();

        }
      }, 800);
      return false;
    }

    $('.alert-holder').append('<div class="alert alert-success">Ürün sepetinize eklendi...</div>')
    var timerID = setInterval(function () {
      clearInterval(timerID);
      objC.removeClass('fa-refresh').removeClass('fa-spin').addClass(objD);
      $('.cartCount').html(objG);

      $('.alert-holder').html('');

      cartRefresh();

    }, 800);
  }

  $('#modalWishlist').on('show.bs.modal', function (e) {
    $(this).css('z-index', '1100');
    $('.modal-backdrop').css('z-index', '1080');
  });

  $('#modalWishlist').on('hidden.bs.modal', function (e) {
    $('.modal-backdrop').css('z-index', '1040');
  });
}

function getCCPayment(key, prc, com) {
  $('#modalPayment .modal-body').addClass('load');
  $('#modalPayment').modal('show');

  $('#modalPayment #paymentHolder').html('').load('/includes/theme/progressive/paymentProcess.asp?token=' + $.now() + '&paymentAction=getCCPayment&processPageName=' + encodeURIComponent("") + '&processKey=' + encodeURIComponent(key) + '&processPrice=' + encodeURIComponent(prc) + '&processComment=' + encodeURIComponent(com), function () {
    var timerID = setInterval(function () {
      clearInterval(timerID);
      $('#modalPayment .modal-body').removeClass('load');
      $('#cardDataName').focus();
    }, 500);
  })
}

$('#modalPayment').on('hide.bs.modal', function (e) {
  if (typeof paymentNotComplete == 'function') paymentNotComplete();
});

function hrefFunction() {
  $(document).ready(function () {
    $(".header .primary .navbar .nav > li.parent > a").attr("href", "");
  });
}

function BlockTestStatus() {
  $(document).ready(function () {
    // test for cookie here
    if (jQuery.cookie('test_status') != '1') {
      //show popup here
      jQuery(".cookies-box").addClass("d-block");
      jQuery(".modalboxClose").click(function () {
        jQuery(".cookies-box").removeClass("d-block");
        jQuery(".cookies-box").remove();
      })
      // set cookie here if not previous set
      jQuery.cookie('test_status', '1', {expires: 7});
    }
  });
}

function Email() {
  $('.alphForceName').on("cut copy paste", function (e) {
    e.preventDefault();
  });

  $('.alphForceName').on('keypress', function (e) {
    var blockSpecialRegex = /[~`'"#$%^()={}[\];<>\/]/;
    var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (blockSpecialRegex.test(key)) {
      e.preventDefault();
      return false;
    }
  });

  var OAwaitMessage = 'Lütfen bekleyiniz...';
  var OAmailMessage = 'e-Mailinizi giriniz!..';

  var OAmailResult = $('#mail_message');
  var OAmailData = $('#mail_data');
  var OAmailSend = $('#mail_button');

  OAmailSend.off('click').on('click', function () {
    var obj = encodeURIComponent(OAmailData.val());

    if (obj != '') {
      OAmailResult.html('<font class="OAwait">' + OAwaitMessage + '</font>');

      $.ajax({
        url: 'https://www.kamsansandalye.com/OAsystem/bulletinMembers.asp?token=' + $.now() + '&mail_data=' + obj,
        type: 'POST',
        success: function (data) {
          OAmailResult.html(data);
        }
      });
    } else {
      OAmailResult.html('<font class="OAerror">' + OAmailMessage + '</font>');
      OAmailData.focus();
    }
  });

}

function HideWindow() {
  $(document).ready(function () {
    if ($.trim($('#main .container').html()) == '') {
      $('#main').hide()
    }
    ;
  });
}

function SmartSearch() {
  $(function () {
    $('#search-form').submit(function () {
      $(this).attr('action', '/arama');
      if ($('#search-form input[name="w"]').val().length < 2) return false;
    });

    $('#search-form input[name="w"]').keyup(function (e) {
      if (e.keyCode == 13) $('#search-form').submit();
    });
  })

  $(document).ready(function () {
    $('.search-box input[type="search"]').on("keyup input", function () {
      /* Get input value on change */
      var inputVal = $(this).val();
      var resultDropdown = $(this).siblings(".result");
      if (inputVal.length > 1) {
        $.get("/includes/theme/progressive/smartSearch.asp", {term: inputVal}).done(function (data) {
          // Display the returned data in browser
          resultDropdown.html(data);
        });
      } else {
        resultDropdown.empty();
      }
    });
    // Set search input value on click of result item
    $(document).on("click", ".result p", function () {
      $(this).parents(".search-box").find('input[type="search"]').val($(this).text());
      $(this).parent(".result").empty();
      $('#search-form').submit();
    });
  });
}

function currency() {

  $(function () {
    $('.currency-link').on('click', function () {
      var curr = $(this).attr('data-currency');

      $.ajax({
        url: '/includes/system/changeCurrency.asp',
        type: 'POST',
        data: 'token=' + $.now() + '&curr=' + curr,
        success: function (data, result) {
          if (data == 'success') window.location.reload();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
      })
    });
  })
}

function language() {
  $(function () {
    $('.language .dropdown-menu li a').on('click', function () {
      var cLangId = $(this).attr('data-language');

      $.ajax({
        url: '/includes/system/changeLangCurrency.asp',
        type: 'POST',
        data: 'token=' + $.now() + '&curr=' + cLangId,
        success: function (data, result) {
          if (data == 'success') ;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
      })
    });
  })
}


// css functions

function addNavbarPointerNone() {
  const style = document.createElement('style');
  style.textContent = `
    .header .primary .navbar .nav > li.parent > a {
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(style);
}

function addNavbarLiParent() {
  $(document).ready(function () {
    $(".header .primary .navbar .nav > li.parent > a").attr("href", "");
  });
}

function addCookieBar() {
  const style = document.createElement('style');
  style.textContent = `
  .cookies-box {
    display: none;
    font-size: 13px;
    width: 480px;
    height: auto;
    margin: 0;
    background: rgba(0, 0, 0, .8);
    color: #bdbdbd;
    padding: 15px 33px;
    position: fixed;
    bottom: 15px;
    left: 15px;
    border-radius: 5px !important;
    z-index: 1000;
  }

  .cookies-box .modalboxClose {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 100% !important;
    background: none;
    font-size: 17px;
  }

  .cookies-box p {
    margin: 0;
    line-height: 18px;
    font-size: 13px;
    color: #d0d0d0;
  }

  .cookies-box.d-block {
    display: block !important;
  }

  .cookies-box a {
    color: #FFF !important;
  }

  @media (max-width: 991px) {
    .cookies-box {
      width: 100%;
      left: 0;
      padding: 5px 10px;
      bottom: 0;
      z-index: 1000;
    }

    .cookies-box h6 {
      margin: 0 0 3px 0;
      font-size: 14px;
    }

    .cookies-box p {
      line-height: 16px;
      font-size: 13px;
    }
  }
  `;
  document.head.appendChild(style);
}
