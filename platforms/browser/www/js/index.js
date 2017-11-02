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

/* var */
// Layout Elements
var title = document.getElementById('title');
var photo = document.getElementById('photo');
var photo1 = document.getElementById('photo1');
var photo2 = document.getElementById('photo2');
var filter = document.getElementById('filter');
var menu = document.getElementById('menu');

// Button Elements
var btnHome = document.getElementById('btnHome');
var btnBack = document.getElementById('btnBack');
var btnNext = document.getElementById('btnNext');
var btnFilter = document.getElementById('btnFilter');
var btnGallery = document.getElementById('btnGallery');

/* EventListener */
btnHome.addEventListener('touchstart', function (e) {
  selectedPhoto.setAttribute('src', '');
});
btnBack.addEventListener('touchstart', function (e) {
});
btnNext.addEventListener('touchstart', function (e) {
});
btnFilter.addEventListener('touchstart', function (e) {
    if (filter.style.display == '') {
      filter.style.display='block';
    } else {
      filter.style.display='';
    }
});
btnGallery.addEventListener('touchstart', function (e) {
    navigator.camera.getPicture(function(imageURI){
      photo.width = imageURI.width;
      photo.width = imageURI.height;
      photo1.setAttribute('src', imageURI);
    }, function(msg){
    }, {
      quality:80,
      destinationType:Camera.DestinationType.FILE_URI,
      sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM,
    });
});


// MyEventListener オブジェクト作成
var MyEventListener = function() { return this }
// MyEventListener オブジェクトにonMouseClickメソッドを追加
MyEventListener.prototype = {
  onMouseClick: function() { 
    photo2.setAttribute('src', this.getAttribute('src'));
    filter.style.display='';
  }
}
// MyEventListener から myEventListener オブジェクトを作成
var myEventListener = new MyEventListener();
var filters = filter.children;
for (var i = 0; i < filters.length; i++){
    filters[i].addEventListener("click", myEventListener.onMouseClick, false);
}
