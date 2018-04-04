(function() {
  function toggleNightMode() {
    var elem = document.getElementById(this.dataset.target);
    
    if (this.dataset.mode === 'off') {
      elem.style.color = '#000';
      elem.style.backgroundColor = '#fff';
      elem.style.fontFamily = 'Ubuntu, sans-serif';
      this.dataset.mode = 'on';
    } else {
      elem.style.color = '#fff';
      elem.style.backgroundColor = '#000';
      elem.style.fontFamily = '"Ubuntu", sans-serif';
      this.dataset.mode = 'off';
    }
  }
  
  document.getElementById('togBut').addEventListener('click', toggleNightMode);
})();
