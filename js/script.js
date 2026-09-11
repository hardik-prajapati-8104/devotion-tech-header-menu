// Devotion header — open mega-menu dropdowns on hover for desktop, keep click behavior on mobile
document.addEventListener('DOMContentLoaded', function () {
  var dropdowns = document.querySelectorAll('.mega-dropdown');

  function isDesktop() {
    return window.innerWidth >= 992;
  }

  dropdowns.forEach(function (item) {
    var toggle = item.querySelector('.dropdown-toggle');
    var dropdownInstance = null;

    function getInstance() {
      if (!dropdownInstance) {
        dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(toggle);
      }
      return dropdownInstance;
    }

    item.addEventListener('mouseenter', function () {
      if (isDesktop()) {
        getInstance().show();
      }
    });

    item.addEventListener('mouseleave', function () {
      if (isDesktop()) {
        getInstance().hide();
      }
    });

    // Prevent navigation when just toggling the menu
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });
});
