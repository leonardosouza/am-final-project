$(document).ready(function() {
  var remoteControl = function() {
    switch(Number(this.value)) {
      case 1:
        controlDevice('lock', { suc: 'His car was successfully blocked!', err: 'Error in lock your car. Please try again!' });
      break;
      case 2:
        controlDevice('unlock', { suc: 'His car was successfully unlocked!', err: 'Error in unlock your car. Please try again!'});
      break;
      case 3:
        controlDevice('reset', { suc: 'The system was successfully restarted!', err: 'An error occurred when rebooting the system. Please try again!'});
      break;
    }
  };

  var feedbackMessage = function(msg) {
    var snackbarContainer = document.querySelector('#feedback-message');
    var data = {
      message: msg,
      timeout: 2000
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  };

  var controlDevice = function(action, msg) {
    $.ajax({
      url: [ document.location.href, action ].join(''),
      method: 'POST',
      success: feedbackMessage.bind(this, msg.suc),
      error: feedbackMessage.bind(this, msg.err)
    });
  };

  $('.mdl-radio__button').on('change', remoteControl);
});