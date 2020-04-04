'use strict';

document.getElementById('nav-menu-trigger').addEventListener('click', function(){
  const
    navmenu = document.getElementById('nav-menu'),
    trigger = document.getElementById('nav-menu-trigger');

  console.log(navmenu.classList.contains('open'));
  if (navmenu.classList.contains('open')){
    navmenu.classList.remove('open');
    trigger.classList.remove('active');
  } else {
    navmenu.classList.add('open');
    trigger.classList.add('active');
  }
});
