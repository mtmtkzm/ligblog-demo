Barba.Pjax.start();
Barba.Prefetch.init();

var sidebar = document.querySelector('.sidebar');
var lastElement = sidebar.querySelector('.is-current');

Barba.Dispatcher.on('linkClicked', function(el) {
  if (lastElement) {
    lastElement.classList.remove('is-current');
  }

  lastElement = el;
  lastElement.classList.add('is-current');
});

var shutterA = document.querySelector('.shutter-a');
var shutterB = document.querySelector('.shutter-b');

var ShutterAnimation = Barba.BaseTransition.extend({

  start: function() {
    this.shutter(400)
      .then(this.newContainerLoading)
      .then(this.finish.bind(this));
  },

  shutter: function(timer) {
    return new Promise( function (resolve) {
      shutterA.classList.toggle('moved');
      shutterB.classList.toggle('moved');

      setTimeout(function () {
        resolve();
      }, timer);

    });
  },

  finish: function() {
    document.body.scrollTop = 0;
    this.done();
  }

});

Barba.Pjax.getTransition = function() {
  return ShutterAnimation;
};
