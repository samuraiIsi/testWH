function makeHttpObject() {
    try { return new XMLHttpRequest(); } catch (error) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (error) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (error) {}

    throw new Error("Could not create HTTP request object.");
}

function getHttpRequest(url) {
    return function(params) {

        request = makeHttpObject();
        request.open("GET", url + params, true);
        request.send(null);
        request.onreadystatechange = function() {

            if (request.readyState == 4) {
                console.log("Request has been Made");
            }
        }
    };

}

/* --- Q1 --- */

var pageView = function() {

    var url = window.location.href;
    var browserInfo = navigator.userAgent;
    var todayDate = Date();
    var widthScreen = screen.width;
    var heightScreen = screen.height;

    return "?url=" + encodeURIComponent(url) + "&browser_info=" + encodeURIComponent(browserInfo) + "&datetime=" + encodeURIComponent(todayDate) + "&resolution=" + widthScreen + "x" + heightScreen;
}
var request = getHttpRequest("http://www.dummytrackingserver.com/track.gif");
request(pageView());


/* --- Q2 --- */
    

var subMenuInteraction = function() {
    var request = getHttpRequest("http://www.dummytrackingserver.com/track.gif");

    var interaction = function(e) {

        request("?action=submenu_clicked&element=" + e.target.id);
    }
    document.querySelectorAll('#mainNavB a, #mainNavA a').forEach(function(element) { element.addEventListener('click', interaction) })
}

subMenuInteraction();

/* --- Q3 --- */

var clickBetButton = function() {

    var request = getHttpRequest("http://www.dummytrackingserver.com/track.gif");
    
    var interaction = function(e) {

        var section = e.path[9].querySelectorAll('h3')[0].innerText;
        var match = e.target.parentNode.parentNode.parentElement.querySelectorAll('.leftPad :last-child span')[0].innerText;
        var odds = e.target.innerText;

        request("?action=bet_clicked&match=" + match + "&odds=" + odds + "&section=" + section);
    }
    document.querySelectorAll('.eventprice').forEach(function(element) { element.addEventListener('click', interaction) })
}
clickBetButton();

/* --- Q4 --- */

var personalisingSite = function() {

    var $nonCustomerRouletteBannerDesktop = document.querySelector('#contentB .freeBets #nonCustomerRouletteBannerDesktop img');
    var $placeholderImage = document.getElementById('placeImginText');

    var fakeImg = 'https://dummyimage.com/308x79/ffffff/0011ff.jpg&text=Alternative+Roulette+B';
    var rouletteImng = 'http://whdn.williamhill.com/content/content/368588.jpg';

    var onClick = function (element) {

        createPlaceHolderImage('placeholderImage', fakeImg);
        changeImgSrc($nonCustomerRouletteBannerDesktop, fakeImg);

        setTimeout(function () {
            setupOnRemove(element.target.id.match(/\d/g).join(''))
        }, 1000);
    };

    var onRemove = function() {

        setTimeout(function () {
            var stakeTotal = document.querySelectorAll('#betSlip .singleBet').length;

            if (stakeTotal === 0) {
                changeImgSrc($nonCustomerRouletteBannerDesktop, rouletteImng);
            }
        }, 1000);
    };

    var setupOnRemove = function (id) {

        document.querySelectorAll('.remove .linkable').forEach(function (el) {
             if (el.id.indexOf(id) > 0) {
                document.getElementById(el.id).addEventListener('click', onRemove);
            }
        });
    };

    var changeImgSrc = function (element, src) {

        if (element !== null && element.src !== src) {
            element.src = src;
        }
    };

    var addImageElement = function (id, src) {
        var image = document.createElement('img');
        image.setAttribute('id', id);
        image.setAttribute('src', src);

        return image;
    };
    var createPlaceHolderImage = function (id, src) {
        if (document.getElementById(id) === null) {

            var $img = addImageElement(id, src);
            document.getElementById('slipMainFooter').appendChild($img);
        }
    };
    document.querySelectorAll('.eventpriceholder-left div:first-child').forEach(function (el) {
        document.getElementById(el.id).addEventListener('click', onClick);
    });
};

personalisingSite();