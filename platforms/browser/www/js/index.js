/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
//        alert("Got deviceready");
//        canvas2ImagePlugin = window.canvas2ImagePlugin;
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

/* -----------------------------------------------------
 * var
 * ----------------------------------------------------*/
// Layout Elements
var title = document.getElementById('title');
var photo = document.getElementById('photo');
var photo1 = document.querySelector('#photo img');
var photo2 = document.querySelector('#photo div');
var filter = document.getElementById('filter');
var filterUL = document.querySelector('#filter ul');
var filters = filterUL.children;

// Blend
var blendMode = document.getElementById('blendMode');
var loader = document.getElementById('loader');
var menu = document.getElementById('menu');
var opacity = document.getElementById('opacity');
var bar = document.querySelector('#opacity .bar span');
var btn = document.querySelector('#opacity .btn');

// Button Elements
/*
var btnHome = document.getElementById('btnHome');
var btnBack = document.getElementById('btnBack');
var btnNext = document.getElementById('btnNext');
*/
var btnFilter = document.getElementById('btnFilter');
var btnGallery = document.getElementById('btnGallery');
var btnSave = document.getElementById('btnSave');

// 
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var windowAspect = window.innerWidth / window.innerHeight;

//canvas
var canvas = document.createElement('canvas');
var canvas1 = document.createElement('canvas');
var canvas2 = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var canvasWidth,canvasHeight,canvasAspect;

//filters
//var 
var filterImages = [];
var filterCount = 13;
filterUL.style.width = 100 * filterCount + 'px';

for (var i = 1; i <= filterCount; i++) {
  filterImages[i] = new Image();
  var src = 'img/filter' + zeroPadding(i,2) + '.jpg';

  filterImages[i].onload = finish(i);
  filterImages[i].src = src;
  var element = document.createElement('li');
  filterUL.append(element);

  function finish(i){
    return function(){
      var b64 = ImageToBase64(filterImages[i], 'image/jpeg', 300);
      var filterImg = document.querySelector('#filter li:nth-child(' + i + ')');
      filterImg.style.backgroundImage = 'url("' + b64 + '")';
    }
  }
}



/* -----------------------------------------------------
 * tool
 * ----------------------------------------------------*/
function checkActive(btn) {
  var btnClass = btn.className;
  console.log(btnClass);
  if ( btnClass == 'active' ) {
    return true;
  }
}
function zeroPadding(number, length){
  return (Array(length).join('0') + number).slice(-length);
}
function ImageToBase64(img, mime_type, height) {
  // New Canvas
  var canvas = document.createElement('canvas');
  var w = img.width / ( img.height / height);
  canvas.width  = w;
  canvas.height = height;
  // Draw Image
  var ctx = canvas.getContext('2d');
//  ctx.drawImage(img, 0, 0);
  ctx.drawImage(img, 0, 0, img.width, img.height,0 ,0 , w, height);

  // To Base64
  return canvas.toDataURL(mime_type);
}

/* -----------------------------------------------------
 * Btn
 * ----------------------------------------------------*/

/*
//========== Home ==========
btnHome.addEventListener('touchstart', function (e) {
//  selectedPhoto.setAttribute('src', '');
});

//========== Back ==========
btnBack.addEventListener('touchstart', function (e) {
  
});

//========== Next ==========
btnNext.addEventListener('touchstart', function (e) {
  
});
*/

//========== Filter ==========
btnFilter.addEventListener('touchstart', function (e) {
  checkActive(this);
  loader.style.display='none';
  if (filter.style.display == '') {
    filter.style.display='block';
//    blendMode.style.display='block';
  } else {
    filter.style.display='';
//    blendMode.style.display='';
  }
});
// MyEventListener オブジェクト作成
var MyEventListener = function() { return this }
// MyEventListener オブジェクトにonMouseClickメソッドを追加
MyEventListener.prototype = {
  onMouseClick: function() { 
    elements = [].slice.call( filters );
    var index = elements.indexOf( this );
    index++; 
    photo2.style.backgroundImage = 'url("' + filterImages[index].src + '")';

    var imgWidth = filterImages[index].width;
    var imgHeight = filterImages[index].height;
    var imgAspect = imgWidth / imgHeight;
    var sx,sy,sw,sh;

    if (canvasAspect >= imgAspect ) {
      var ratio = canvasWidth / imgWidth;
      sx = 0;
      sy = ( imgHeight * ratio - canvasHeight ) / ratio / 2;
      sw = imgWidth;
      sh = canvasHeight / ratio;
    } else {
      var ratio = canvasHeight / imgHeight;
      sx = ( imgWidth * ratio - canvasWidth ) / ratio / 2;
      sy = 0;
      sw = canvasWidth / ratio;
      sh = imgHeight;
    }

    ctx2.drawImage(filterImages[index], sx, sy, sw, sh, 0, 0, canvasWidth, canvasHeight);
    var pixelImage = mixCanvas('overlay');
    ctx.putImageData(pixelImage, 0, 0);
  } 
}
// MyEventListener から myEventListener オブジェクトを作成
var myEventListener = new MyEventListener();
for (var i = 0; i < filters.length; i++){
    filters[i].addEventListener("click", myEventListener.onMouseClick, false);
}
//========== bar ==========
function setPosition(element) {
  var touchObject = event.changedTouches[0] ;
  var touchX = touchObject.pageX ;

  // 要素の位置を取得
  var clientRect = element.getBoundingClientRect() ;
  var parentX = clientRect.left + window.pageXOffset ;
  var parentW = clientRect.width;

  if ( touchX < parentX || touchX > parentW ) {
//    return;
  }
  // 要素内におけるタッチ位置を計算
  var x = (touchX-parentX) / parentW * 100 ;

  if ( x > 100 ) {
    x = 100;
  } else if ( x < 0 ) {
    x = 0;
  }
  bar.style.width = x+'%';
  btn.style.left = x+'%';
  photo2.style.opacity = x/100;

  console.log(x);
}
opacity.addEventListener('touchmove', function (event) {
  setPosition(this);
});
opacity.addEventListener('touchend', function (event) {
  setPosition(this);
});

//========== Gallerry ==========
document.querySelector('.test').addEventListener('touchstart', function (e) {
  alert('a');
});

btnGallery.addEventListener('touchstart', function (e) {
  loader.style.display='block';
  loader.setAttribute('class', 'fade');
  var imgSrc;
  var imgUrl;
  var getPic = function(done) {
    return new Promise(function(resolve, reject) {
      navigator.camera.getPicture(function(imgUri){
        photo1.width = windowWidth;
        imgSrc = imgUri;
        photo1.src = imgUri;

        var img = new Image();
        img.src = imgUri;
        img.onload = function() {

          var imgWidth = img.width;
          var imgHeight = img.height;
          canvasAspect = imgWidth / imgHeight;

          // canvas
          var ratio = imgWidth / windowWidth;
          canvasWidth = imgWidth;
          canvasHeight = imgHeight;

          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
          canvas1.width = canvasWidth;
          canvas1.height = canvasHeight;
          canvas2.width = canvasWidth;
          canvas2.height = canvasHeight;

          ctx1.drawImage(img, 0, 0, canvasWidth, canvasHeight);
          imgUrl = canvas1.toDataURL();
        }
        resolve();
      }, function(msg){
      }, {
        quality:60,
        targetWidth: 1280,
        targetHeight: 1280,
        destinationType:Camera.DestinationType.DATA_URI,
        sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM,
      });
    });
  };
  getPic()
    .then(function() {
      var timer = setInterval(function() {
        if( imgSrc == photo1.src ){
          clearInterval(timer);
          document.body.style.backgroundImage = 'none';
          btnFilter.setAttribute('class', 'active');
          btnSave.setAttribute('class', 'active');
          loader.setAttribute('class', '');
          var w1 = photo1.width + 'px';
          photo2.style.width = w1;
          photo2.style.height = photo1.height + 'px';

        }
      },1000);
    })
});

//========== btnSave ==========
btnSave.addEventListener('touchstart', function (e) {
  window.canvas2ImagePlugin.saveImageDataToLibrary (
    function(msg){
      alert('Saving image is successful! : ' + msg);
    },
    function(err){
      alert(err);
    },
    canvas
  );
});


//========== mixCanvas ==========
function mixCanvas(blend_type){
  var pixelImage = ctx.createImageData(canvasWidth, canvasHeight);
  var a_imageData = ctx1.getImageData(0, 0, canvasWidth, canvasHeight);
  var b_imageData = ctx2.getImageData(0, 0, canvasWidth, canvasHeight);
//  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  var brend_fn;
  switch(blend_type){
    case "screen":
        brend_fn = function(a,b){return a+b-a*b/255;};
        break;
    case "overlay":
        brend_fn = function(a,b){return (a<128)?2*a*b/255:2*(a+b-a*b/255)-255;};
        break;
    default:
        brend_fn = function(){return 255;};
        break;
    }
    
  for(var y=0; y<canvasHeight; y++){
    for(var x=0; x<canvasWidth; x++){
        var ptr = (y * canvasWidth + x ) * 4;
        var aR = a_imageData.data[ptr + 0];
        var aG = a_imageData.data[ptr + 1];
        var aB = a_imageData.data[ptr + 2];
        var aA = a_imageData.data[ptr + 3];

        var bR = b_imageData.data[ptr + 0];
        var bG = b_imageData.data[ptr + 1];
        var bB = b_imageData.data[ptr + 2];

        pixelImage.data[ptr + 0] = brend_fn(aR,bR);
        pixelImage.data[ptr + 1] = brend_fn(aG,bG);
        pixelImage.data[ptr + 2] = brend_fn(aB,bB);
        pixelImage.data[ptr + 3] = aA;
    }
  }
  return pixelImage;
}
