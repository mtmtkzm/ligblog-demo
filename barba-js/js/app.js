Barba.Pjax.init();

// これにより、リンククリックの時点ではなく、リンクにマウスオーバした時点でAjaxの処理が走る。
// マウスオーバからクリックまでは一般的に200ms程度の遅延があるそうなので、200ms分、稼ぐことができる。
Barba.Prefetch.init();


/*
* サイドバーのステータス表示
* */
var sidebar = document.querySelector('.sidebar');
var lastElement = sidebar.querySelector('.is-current');
Barba.Dispatcher.on('linkClicked', function(el) {
  if (lastElement) {
    lastElement.classList.remove('is-current');
  }
  lastElement = el;
  lastElement.classList.add('is-current');
});


/*
* ページ遷移アニメーション
* */
var leftDoor = document.querySelector('.door-left');
var rightDoor = document.querySelector('.door-right');

var ShutterAnimation = Barba.BaseTransition.extend({

  start: function() {
    this.shutter()
      .then(this.newContainerLoading)
      .then(this.finish.bind(this));
  },

  shutter: function() {
    return new Promise( function (resolve, reject) {
      leftDoor.classList.toggle('moved');
      rightDoor.classList.toggle('moved');

      setTimeout(function () {
        resolve();
      }, 500);

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
