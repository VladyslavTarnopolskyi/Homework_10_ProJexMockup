window.addEventListener('load', function() {
    let newsWrapper,
        divItems,
        imageNumber,
        imageWidth,
        prev,
        next;
    let currentPosition = 0;
    let currentImage = 0;

    function init() {
        newsWrapper = document.getElementById('image_slider');
        divItems = newsWrapper.children;
        imageNumber = divItems.length;
        imageWidth = divItems[0].offsetWidth;
        newsWrapper.style.width = `${parseInt(imageWidth * imageNumber)}px`;
        prev = document.getElementById("prev");
        next = document.getElementById("next");
        generateDots(imageNumber);
        prev.onclick = () => {
            onClickPrev();
        };
        next.onclick = () => {
            onClickNext();
        };
    }
    function animate(opts) {
        let start = new Date;
        let id = setInterval(() => {
            let timePassed = new Date - start;
            let progress = timePassed / opts.duration;
            if (progress > 1) {
                progress = 1;
            }
            let delta = opts.delta(progress);
            opts.step(delta);
            if (progress == 1) {
                clearInterval(id);
                opts.callback();
            }
        }, opts.delay || 17);
    }

    function slideTo(imageToGo) {
        let direction;
        let numOfImageToGo = Math.abs(imageToGo - currentImage);
        direction = currentImage > imageToGo ? 1 : -1;
        currentPosition = -1 * currentImage * imageWidth;
        let opts = {
            duration: 500,
            delta(p) {
                return p;
            },
            step(delta) {
                newsWrapper.style.left = `${parseInt(currentPosition + direction * delta * imageWidth * numOfImageToGo)}px`;
            },
            callback() {
                currentImage = imageToGo;
            }
        };
        animate(opts);
    }
    function activeDot(q) {
        let remLi = document.getElementsByClassName('dot');
        for(let j = 0; j < imageNumber/3; j++){
            remLi[j].classList.remove('active');
        }
        remLi[q].classList.add('active');
    }
    function onClickNext() {
        if (currentImage == imageNumber - 3) {
            slideTo(0);
            activeDot(0);
        }
        else {
            slideTo(currentImage + 3);
            activeDot((currentImage + 3)/3);
        }
    }

    function onClickPrev() {
        if (currentImage == 0) {
            slideTo(imageNumber - 3);
            activeDot((imageNumber - 3)/3);
        }
        else {
            slideTo(currentImage - 3);
            activeDot((currentImage - 3)/3);
        }
    }

    function generateDots(imageNumber) {
        let i;
        let pagerDiv = document.getElementById('pager');
        for (i = 0; i < imageNumber; i = i + 3) {
            let li = document.createElement('li');
            li.className = "dot";
            pagerDiv.appendChild(li);
            li.onclick = (i => function () {
                slideTo(i);
                let remLi = document.getElementsByClassName('dot');
                for(let j = 0; j < imageNumber/3; j++){
                    remLi[j].classList.remove('active');
                }
                this.classList.add('active');
            })(i);
        }
        pagerDiv.firstElementChild.classList.add('active');
    }
    init();
});