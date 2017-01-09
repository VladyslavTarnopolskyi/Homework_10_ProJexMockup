window.addEventListener('load', function() {
    var newsWrapper,
        divItems,
        imageNumber,
        imageWidth,
        prev,
        next;
    var currentPosition = 0;
    var currentImage = 0;

    function init() {
        newsWrapper = document.getElementById('image_slider');
        divItems = newsWrapper.children;
        imageNumber = divItems.length;
        imageWidth = divItems[0].offsetWidth;
        newsWrapper.style.width = parseInt(imageWidth * imageNumber) + 'px';
        prev = document.getElementById("prev");
        next = document.getElementById("next");
        generatePager(imageNumber);
        prev.onclick = function () {
            onClickPrev();
        };
        next.onclick = function () {
            onClickNext();
        };
    }

    function animate(opts) {
        var start = new Date;
        var id = setInterval(function () {
            var timePassed = new Date - start;
            var progress = timePassed / opts.duration;
            if (progress > 1) {
                progress = 1;
            }
            var delta = opts.delta(progress);
            opts.step(delta);
            if (progress == 1) {
                clearInterval(id);
                opts.callback();
            }
        }, opts.delay || 17);
    }

    function slideTo(imageToGo) {
        var direction;
        var numOfImageToGo = Math.abs(imageToGo - currentImage);
        direction = currentImage > imageToGo ? 1 : -1;
        currentPosition = -1 * currentImage * imageWidth;
        var opts = {
            duration: 500,
            delta: function (p) {
                return p;
            },
            step: function (delta) {
                newsWrapper.style.left = parseInt(currentPosition + direction * delta * imageWidth * numOfImageToGo) + 'px';
            },
            callback: function () {
                currentImage = imageToGo;
            }
        };
        animate(opts);
    }

    function onClickPrev() {
        if (currentImage == 0) {
            slideTo(imageNumber - 3);
        }
        else {
            slideTo(currentImage - 3);
        }
    }
    function onClickNext() {
        if (currentImage == imageNumber - 3) {
            slideTo(0);
        }
        else {
            slideTo(currentImage + 3);
        }
    }

    function generatePager(imageNumber) {
        var i;
        var pagerDiv = document.getElementById('pager');
        for (i = 0; i < imageNumber; i++) {
            var li = document.createElement('li');
            pagerDiv.appendChild(li);
            // add event inside a loop, closure issue.
            li.onclick = function (i) {
                return function () {
                    slideTo(i);
                }
            }(i);
        }
    }
    init();
});