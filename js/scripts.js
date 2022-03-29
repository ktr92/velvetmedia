/*** MAP ***/

//Not used. Disabled for performance.

// ymaps.ready(function () {
//     let map = new ymaps.Map('map', {
//         center: [55.743441, 52.417263],
//         zoom: 15,
//         controls: []
//     });

//     let icon = document.createElement('div');
//     icon.classList.add('placemark');

//     function addPlacemark(icon){
//         let customLayout = ymaps.templateLayoutFactory.createClass(icon.outerHTML,
//         {
//             getShape: function(){
//                 let elem = this.getElement();
//                 if (!elem) return null;

//                 let icon = elem.firstChild;

//                 return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
//                     [icon.offsetLeft, icon.offsetTop],
//                     [icon.offsetLeft + icon.offsetWidth, icon.offsetTop + icon.offsetHeight]
//                 ]));
//             }
//         });

//         let customPlacemark = new ymaps.Placemark(
//             [55.743441, 52.417263], {}, {
//                 iconLayout: customLayout,
//             }
//         );
//         map.geoObjects.add(customPlacemark);
//     }

//     addPlacemark(icon)
// });

/*** MENU ***/
try {
const menu = document.querySelector('.menu'),
      menuBtn = document.querySelector('.menu_btn'),
      menuClose = menu.querySelector('.menu_close'),
      menuHeaderBtn = menu.querySelector('.btn');

menuBtn.addEventListener('click', function(){
    if(!menu.classList.contains('active')){
        menu.classList.add('active');
        document.body.style.overflow = "hidden";
    }
})

menuHeaderBtn.addEventListener('click', function(){
    if(menu.classList.contains('active')){
        menu.classList.remove('active');
        document.body.style.overflow = "auto";
    }
})

menuClose.addEventListener('click', function(){
    if(menu.classList.contains('active')){
        menu.classList.remove('active');
        document.body.style.overflow = "auto";
    }
})

/*** PORTFOLIO PARALLAX ***/

// let squaresContainer = document.querySelector('.portfolio_container');
// // Не забудь пересчитать значение переменной screenSquaresSideDiff при изменении размеров экрана.
// let screenSquaresSideDiff = (squaresContainer.lastElementChild.offsetLeft + squaresContainer.lastElementChild.offsetWidth - window.innerWidth) / 2;
// squaresContainer.style.setProperty('transform', 'translateX(-' + screenSquaresSideDiff + 'px)');
// squaresContainer.parentNode.addEventListener('mousemove', function(event) {
//     let mousePosX = event.clientX / window.innerWidth;
//     if (mousePosX < 0.5) {
//         mousePosX = 1 - mousePosX / 0.5;
//         squaresContainer.style.setProperty('transform', 'translateX(calc(-' + screenSquaresSideDiff + 'px + ' + mousePosX * screenSquaresSideDiff + 'px))');
//     } else {
//         mousePosX -= 0.5;
//         mousePosX = mousePosX / 0.5;
//         squaresContainer.style.setProperty('transform', 'translateX(calc(-' + screenSquaresSideDiff + 'px - ' + mousePosX * screenSquaresSideDiff + 'px))');
//     }
// });

// var diff;
// var toLeft;
// var startPos;

// squaresContainer.parentNode.ontouchstart = function(event) {
//     startPos = event.touches[0].clientX;
//     squaresContainer.parentNode.ontouchmove = function(event) {
//         diff = event.touches[0].clientX - startPos;
//         if (diff > 0) {
//             if (diff > 20) {
//                 toLeft = true;
//             }
//         } else {
//             if (diff < -20) {
//                 toLeft = false;
//             }
//         }
//     };
// };

// squaresContainer.parentNode.ontouchend = function() {
//     mousePosX = startPos / window.innerWidth;
//     console.log(mousePosX);
//     if (toLeft) {
//         mousePosX = 1 - mousePosX / 0.5;
//         squaresContainer.style.setProperty('transform', 'translateX(calc(-' + screenSquaresSideDiff + 'px + ' + mousePosX * screenSquaresSideDiff + 'px))');
//     } else {
//         mousePosX -= 0.5;
//         mousePosX = mousePosX / 0.5;
//         squaresContainer.style.setProperty('transform', 'translateX(calc(-' + screenSquaresSideDiff + 'px - ' + mousePosX * screenSquaresSideDiff + 'px))');
//     }
//     squaresContainer.parentNode.ontouchmove = null;
// };

/*** CLIENTS SLIDER ***/

function init(slider){
    const
        sliderLine = slider.querySelector('.logos_slide_line'),
        sliderControllers = slider.querySelectorAll('.logos_slide_controller_dot'),
        slide = slider.querySelector('.logos_slide'),
        slideWidth = slide.offsetWidth,
        sldiesQty = 5,
        controllerRigth = slider.querySelector('.logos_slide_controller_right'),
        controllerLeft = slider.querySelector('.logos_slide_controller_left');

    let qurrent = 0;

    controllerLeft.addEventListener('click', function(){
        prevSide();
    });

    controllerRigth.addEventListener('click', function(){
        nextSlide();
    });

    function prevSide(){
        qurrent--;
        if(qurrent<0){
            qurrent = sldiesQty - 1;
        }
        showSlide(qurrent);
    }

    function nextSlide(){
        qurrent++;
        if(qurrent>sldiesQty - 1){
            qurrent = 0;
        }
        showSlide(qurrent);
    }

    function showSlide(index){
        sliderLine.style.left = -index * slideWidth + "px";
        sliderControllers.forEach(item=>{
            item.classList.remove('active');
        })
        sliderControllers[index].classList.add('active')
    }

    sliderControllers.forEach((item,index)=>{
        item.addEventListener('click', function(){
            qurrent = index;
            showSlide(qurrent);
        });
    })
}

init(document.querySelector('.logos_slider'));

/*** SCROLL ANIMATIONS ***/

let elements = document.querySelectorAll('.section');

function checkPosition() {
    elements.forEach(element => {
        let positionFromTop = element.getBoundingClientRect().top;
        if (positionFromTop - window.innerHeight <= 0) {
            if(!element.classList.contains('active')){
                element.classList.add('active');
            }
        }
    });
}

checkPosition();

window.addEventListener('scroll', checkPosition);

/*** AJAX ***/

function ajax(data){

    return new Promise(function (res){
        let xhr = new XMLHttpRequest(),
            formData = new FormData();

        for (let key in data) {
            formData.append(key, data[key]);
        }

        xhr.addEventListener('readystatechange', function(){
            if (xhr.readyState === 4 && xhr.status === 200) {
                res(this.responseText);
                xhr.abort();
            }
        })

        xhr.open("POST", "/server/server.php", true);

        xhr.send(formData);
    });
}

/*** MORE REVIEWS ***/

const showMoreReviewsBtn = document.querySelector('.show_more_reviews')
      hiddenReviews = document.querySelector('.hidden_reviews');

showMoreReviewsBtn.addEventListener('click', function(){
    hiddenReviews.classList.add('active');
    showMoreReviewsBtn.style.display = 'none';
})

/*** CONTACT FORM ***/

const contactForm = document.querySelector('.contacts_form');

contactForm.addEventListener('submit', function(){
    event.preventDefault();

    ajax({
        action: 'contact',
        name: document.querySelector('.contacts_form_name').value,
        phone: document.querySelector('.contacts_form_phone').value
    }).then(response=>{
        alert(response);
    })
})
}
catch {};

$( document ).ready(function() {

	$(function() {
		$('ul.tabs__caption').on('click', 'li:not(.active)', function() {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
		});

	});
});


$(document).ready( function() {
    $(".fileupload input[type=file]").change(function()	{		
		if (this.files[0]) {
			var filename = $(this).val().replace(/.*\\/, ""); 
			/* $(this).siblings('span').empty(); */
			$(this).siblings('.filenames').find('.filenamedef').append('<span class="filename"> ' + filename + ' ' + ' </span>');
			$('.file-error').html("");
			$('.file-upload span').css('text-transform', 'none');
			$('.changefile').css('display', 'block');
		}
    });
});