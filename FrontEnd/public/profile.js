


  

  
    var dialog = document.getElementById('profileDialog');
    var dialogButton = document.querySelector('.dialog-button');
    var closeButton = document.getElementById('closeButton');

    dialogButton.addEventListener('click', function() {
      dialog.showModal();
    });

    closeButton.addEventListener('click', function() {
      dialog.close();
    });
  



