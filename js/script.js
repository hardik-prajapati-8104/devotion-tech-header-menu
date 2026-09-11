document.addEventListener('DOMContentLoaded', function () {
  const desktopMin = 992;
  const dropdowns = document.querySelectorAll('.mega-dropdown');
  const groups = document.querySelectorAll('.has-flyout');

  function isDesktop() {
    return window.innerWidth >= desktopMin;
  }

  function positionTopDropdown(toggle, menu) {
    if (!isDesktop()) {
      menu.classList.remove('dropdown-menu-end');
      return;
    }

    const rect = toggle.getBoundingClientRect();
    const estimatedWidth = menu.classList.contains('mega-panel-grid') ? 315 : 290;
    const wouldOverflow = rect.left + estimatedWidth > window.innerWidth - 16;

    menu.classList.toggle('dropdown-menu-end', wouldOverflow);
  }

  dropdowns.forEach(function (item) {
    const toggle = item.querySelector('.dropdown-toggle');
    const menu = item.querySelector('.dropdown-menu');
    let instance = null;

    function getInstance() {
      if (!instance) {
        instance = bootstrap.Dropdown.getOrCreateInstance(toggle);
      }
      return instance;
    }

    item.addEventListener('mouseenter', function () {
      if (isDesktop()) {
        positionTopDropdown(toggle, menu);
        getInstance().show();
      }
    });

    item.addEventListener('mouseleave', function () {
      if (isDesktop()) {
        getInstance().hide();
        closeAllFlyouts();
      }
    });

    toggle.addEventListener('show.bs.dropdown', function () {
      positionTopDropdown(toggle, menu);
    });

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  function closeAllFlyouts(except) {
    groups.forEach(function (group) {
      if (group !== except) group.classList.remove('active');
    });
  }

  function positionFlyout(group) {
    const flyout = group.querySelector('.mega-flyout');
    if (!flyout || !isDesktop()) return;

    const rect = group.getBoundingClientRect();
    const gap = 8;
    const width = Math.min(360, window.innerWidth - 24);
    const viewportPadding = 12;

    flyout.style.width = width + 'px';
    flyout.style.maxWidth = 'calc(100vw - 24px)';

    // Prefer the right side.
    let left = rect.right + gap;

    // If there is not enough room, flip to the left.
    if (left + width > window.innerWidth - viewportPadding) {
      left = rect.left - gap - width;
      flyout.dataset.side = 'left';
    } else {
      flyout.dataset.side = 'right';
    }

    // Keep the flyout vertically inside the viewport.
    const flyoutHeight = Math.min(
      flyout.scrollHeight || 500,
      window.innerHeight - 24
    );

    let top = rect.top;
    if (top + flyoutHeight > window.innerHeight - viewportPadding) {
      top = window.innerHeight - flyoutHeight - viewportPadding;
    }
    top = Math.max(viewportPadding, top);

    flyout.style.left = Math.max(viewportPadding, left) + 'px';
    flyout.style.top = top + 'px';
    flyout.style.maxHeight = Math.max(220, window.innerHeight - top - viewportPadding) + 'px';
  }

  groups.forEach(function (group) {
    const trigger = group.querySelector('.flyout-trigger');
    if (!trigger) return;

    group.addEventListener('mouseenter', function () {
      if (!isDesktop()) return;
      closeAllFlyouts(group);
      group.classList.add('active');
      positionFlyout(group);
    });

    group.addEventListener('mouseleave', function () {
      if (!isDesktop()) return;

      // Small delay prevents flicker while moving from group to flyout.
      window.clearTimeout(group._closeTimer);
      group._closeTimer = window.setTimeout(function () {
        if (!group.matches(':hover') && !group.querySelector('.mega-flyout:hover')) {
          group.classList.remove('active');
        }
      }, 80);
    });

    const flyout = group.querySelector('.mega-flyout');
    flyout.addEventListener('mouseenter', function () {
      if (!isDesktop()) return;
      window.clearTimeout(group._closeTimer);
      group.classList.add('active');
      positionFlyout(group);
    });

    flyout.addEventListener('mouseleave', function () {
      if (!isDesktop()) return;
      group.classList.remove('active');
    });

    trigger.addEventListener('click', function (e) {
      if (!isDesktop()) {
        e.preventDefault();
        const isOpen = group.classList.contains('active');
        closeAllFlyouts();
        if (!isOpen) group.classList.add('active');
      }
    });
  });

  window.addEventListener('resize', function () {
    if (!isDesktop()) {
      closeAllFlyouts();
      return;
    }

    document.querySelectorAll('.has-flyout.active').forEach(function (group) {
      positionFlyout(group);
    });

    dropdowns.forEach(function (item) {
      const menu = item.querySelector('.dropdown-menu');
      const toggle = item.querySelector('.dropdown-toggle');
      if (menu && menu.classList.contains('show')) {
        positionTopDropdown(toggle, menu);
      }
    });
  });

  window.addEventListener('scroll', function () {
    if (!isDesktop()) return;
    document.querySelectorAll('.has-flyout.active').forEach(function (group) {
      positionFlyout(group);
    });
  }, true);
});
