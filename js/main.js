    var scrollPos = window.scrollY;
    var mobileFight = document.getElementById("js-mobile-fight");
    var logo = document.getElementById("js-logo");

    // add animations on scroll event
    window.addEventListener('scroll', function() {
      scrollPosos = window.scrollY;
      if (scrollPosos > 60) {
        mobileFight.classList.add("bounceIn");
      }
      if (scrollPosos > 670) {
        logo.classList.add("logo-visible");
      }
    });

    // display logo if mobile fight is clicked
    mobileFight.onclick = function(e) {
      logo.classList.add("logo-visible");
    };

    // open share functionality in popup window
    function socialWindow(url) {
      var left = (screen.width - 570) / 2;
      var top = (screen.height - 570) / 2;
      var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
      window.open(url, "shareWindow", params);
    }

    // start the animations only once all images have loaded for a seamless UX
    function loaded() {
      var preload = document.getElementById("preload");
      preload.classList.remove("delay-animations");
    }

    // toggle more information accordion
    var showMore = document.getElementById("js-show-more");
    var cross = document.getElementById("js-cross"); 
    var hiddenContent = document.getElementById("js-hidden-content");
    showMore.onclick = function () {
      if (hiddenContent.classList.contains("d-block")) {
        hiddenContent.classList.remove("d-block");
        cross.classList.remove("cross");
      }
      else {
        hiddenContent.classList.add("d-block");
        cross.classList.add("cross");
      }
    };
