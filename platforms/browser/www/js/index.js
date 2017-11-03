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
var photo1 = document.getElementById('photo1');
var photo2 = document.getElementById('photo2');
var filter = document.getElementById('filter');
var blendMode = document.getElementById('blendMode');
var loader = document.getElementById('loader');
var menu = document.getElementById('menu');

// Button Elements
var btnHome = document.getElementById('btnHome');
var btnBack = document.getElementById('btnBack');
var btnNext = document.getElementById('btnNext');
var btnFilter = document.getElementById('btnFilter');
var btnTint = document.getElementById('btnTint');
var btnGallery = document.getElementById('btnGallery');

// 
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var windowAspect = window.innerWidth / window.innerHeight;

/* -----------------------------------------------------
 * Btn
 * ----------------------------------------------------*/
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
//========== Filter ==========
btnFilter.addEventListener('touchstart', function (e) {
    loader.style.display='none';
    if (filter.style.display == '') {
      filter.style.display='block';
    } else {
      filter.style.display='';
    }
});
// MyEventListener オブジェクト作成
var MyEventListener = function() { return this }
// MyEventListener オブジェクトにonMouseClickメソッドを追加
MyEventListener.prototype = {
  onMouseClick: function() { 
    var img = this.getAttribute('src');
    photo2.style.backgroundImage = 'url("' + img + '")';
//    photo2.src = img;
    filter.style.display='';
  } 
}
// MyEventListener から myEventListener オブジェクトを作成
var myEventListener = new MyEventListener();
var filters = filter.children;
for (var i = 0; i < filters.length; i++){
    filters[i].addEventListener("click", myEventListener.onMouseClick, false);
}
//========== Tint ==========
btnTint.addEventListener('touchstart', function (e) {
    loader.style.display='none';
    if (blendMode.style.display == '') {
      blendMode.style.display='block';
    } else {
      blendMode.style.display='';
    }
});
// MyEventListener オブジェクト作成
var MyEventListener = function() { return this }
// MyEventListener オブジェクトにonMouseClickメソッドを追加
MyEventListener.prototype = {
  onMouseClick: function() { 
    var id = this.id;
    console.log(id);
    photo2.setAttribute('class', id);
    blendMode.style.display='';
  }
}
// MyEventListener から myEventListener オブジェクトを作成
var myEventListener = new MyEventListener();
var blendModeChild = blendMode.children;
for (var i = 0; i < blendModeChild.length; i++){
    blendModeChild[i].addEventListener("click", myEventListener.onMouseClick, false);
}
//========== Gallerry ==========
btnGallery.addEventListener('touchstart', function (e) {
    loader.style.display='block';
    loader.setAttribute('class', 'fade');
    var imgSrc;
    var getPic = function(done) {
      return new Promise(function(resolve, reject) {
        navigator.camera.getPicture(function(imgUri){
          var img = new Image();
//          img.src = 'data:image/jpeg;base64,' + imgUri;
          img.src = imgUri;
          img.onload = function() {
            var imgWidth = img.width;
            var imgHeight = img.height;
            var imgAspect = imgWidth / imgHeight;

            photo1.width = windowWidth;
 
//            alert(imgAspect +'　'+ windowAspect +'　'+imgWidth +'　'+windowWidth);
            imgSrc = img.src;
            photo1.src = img.src;
            resolve();
          }
        }, function(msg){
          setTimeout("loader.setAttribute('class', '')", 1000);
        }, {
          quality:60,
          destinationType:Camera.DestinationType.DATA_URI,
//          destinationType:Camera.DestinationType.DATA_URI,
          sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM,
        });
      });
    };
    getPic()
      .then(function() {
        var timer = setInterval(function() {
          if( imgSrc == photo1.getAttribute('src') ){
            clearInterval(timer);
            loader.setAttribute('class', '');
//            alert(photo1.width +'　'+ photo1.height);
            var w1 = photo1.width + 'px';
            photo2.style.width = w1;
//            photo2.width = photo1.width;
            photo2.style.height = photo1.height + 'px';
     position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

/*
            photo2.style.width = photo1.width + 'px';
            photo2.style.height = photo1.height + 'px';
*/
          }
        },1000);
      })
});

