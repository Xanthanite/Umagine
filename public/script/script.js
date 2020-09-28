const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;
let currentTab = 0;
const tab = $('.tab');
const phoneInput = $('.phoneInput')
var placeSearch, autocomplete, geocoder;

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid/not filled:
  if (n == 1 && validateForm() == false){ 
    return;
  }
  // if you have reached the end of the form... :
  if (currentTab >= "3") {
    //...the form gets submitted:
    document.getElementById("bp-form").submit();
    return false;
  }
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // Then display the correct tab:
  // console.log('Current tab ' + currentTab)
  showTab(currentTab);
}

function fixStepIndicator(n) {
  // This is to remove active class from step indicator dots in book form
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
  }
  // also adds active class to current step indicator dot
  x[n].classList.add("active");
}

function showTab(n) {
  // This function shows the currently active tab 
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // Also fixes previous and next buttons
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline-block";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
    $("#nextBtn").attr('type', 'submit')
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].classList.add('finish');
  }
  return valid; // return the valid status
}

// Using input filter to fix the phone box to allow - and numbers but nothing else
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    $(textbox).on(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
  $('#phoneInput').on('change textInput input', function() {
    $(this).val($(this).val().replace(/(\d{3})\-?/,'$1-'))
    $(this).val($(this).val().replace(/(\d{3})\-?(\d{3})-?/,'$1-$2-'))
    $(this).val($(this).val().replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3'))
  });
}

function prepareSlider() {
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    if ($('wp-grid-head').css('display') !== "none") {
      $('#wp-grid-head').css('opacity', '0')
    }
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
  });
};

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), {
      types: ['geocode']
    });

  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  var place = autocomplete.getPlace();

  codeAddress(document.getElementById('autocomplete').value);
}

$(document).ready(function() {
  //If we're on the portfolio page, this will prepare our slider to work
  if (slider) {
    prepareSlider();
  }
  //If we're on booking page, this will prepare the tabs for the breadcrumb form
  if(tab) {
    showTab(currentTab)
  }
  //Changes background color when selecting a favorite!
  $('#favorite-color').on("change", function() {
    var color = $('#favorite-color').val();
    $('#bp-s1').css('background', color);
  })

  if(phoneInput) {
    setInputFilter($("#phoneInput"), function(value) {
      return /^\d*\-*\d*\-*\d*$/.test(value); // Allow digits and '-' only in a specific format using a RegExp
    });
  }
})