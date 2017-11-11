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

var canvas2ImagePlugin;
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
        alert("Got deviceready");
        canvas2ImagePlugin = window.canvas2ImagePlugin;
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
var canvas = document.getElementById('canvas');
var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var filter = document.getElementById('filter');
var blendMode = document.getElementById('blendMode');
var blendModeCanvas = document.getElementById('blendModeCanvas');
var loader = document.getElementById('loader');
var menu = document.getElementById('menu');

// Button Elements
var btnHome = document.getElementById('btnHome');
var btnBack = document.getElementById('btnBack');
var btnNext = document.getElementById('btnNext');
var btnFilter = document.getElementById('btnFilter');
var btnTint = document.getElementById('btnTint');
var btnGallery = document.getElementById('btnGallery');
var btnSave = document.getElementById('btnSave');

// 
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var windowAspect = window.innerWidth / window.innerHeight;

//canvas
var ctx = canvas.getContext('2d');
var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var blendModeCtx = blendModeCanvas.getContext('2d');
var canvasWidth,canvasHeight;

/* -----------------------------------------------------
 * Btn
 * ----------------------------------------------------*/
function checkActive(btn) {
  var btnClass = btn.className;
  if ( btnClass != 'active' ) {
    return;
  }
}

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
  checkActive(this);
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
    var img = new Image();
    img.src = this.getAttribute('src');
    ctx2.drawImage(img, 0, 0, canvasWidth, canvasHeight);

    var pixelImage = mixCanvas('screen');
    ctx.putImageData(pixelImage, 0, 0);
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

  for (var i = 0; i < blendModeChild.length; i++){
    var id = blendModeChild[i].id;
    if (i > 10) {
        break;
    }
    console.log(id);

    var pixelImage = mixCanvas(id);
    blendModeCtx.putImageData(pixelImage, 0, 0);
    var imgSrc = blendModeCanvas.toDataURL('image/jpeg');

    var img = document.createElement('img'); 
    img.src = imgSrc;
    blendMode.appendChild(img); 

//    var pixelImage = mixCanvas(id);
//    var dataUrl = pixelImage.toDataURL();



  }

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
    var pixelImage = mixCanvas(id);
    ctx.putImageData(pixelImage, 0, 0);
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
  var imgUrl;
  var getPic = function(done) {
    return new Promise(function(resolve, reject) {
      navigator.camera.getPicture(function(imgUri){
        var img = new Image();
        img.src = imgUri;
        img.onload = function() {
          var imgWidth = img.width;
          var imgHeight = img.height;
          var imgAspect = imgWidth / imgHeight;

          // canvas
          var ratio = imgWidth / windowWidth;
          canvasWidth = imgWidth / ratio *3 ;
          canvasHeight = imgHeight / ratio *3;


          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
          canvas1.width = canvasWidth;
          canvas1.height = canvasHeight;
          canvas2.width = canvasWidth;
          canvas2.height = canvasHeight;
          blendModeCanvas.width = canvasWidth;
          blendModeCanvas.height = canvasHeight;

          ctx1.drawImage(img, 0, 0, canvasWidth, canvasHeight);
          imgUrl = canvas1.toDataURL();

          resolve();
        }
      }, function(msg){
        setTimeout("loader.setAttribute('class', '')", 1000);
      }, {
        quality:60,
        destinationType:Camera.DestinationType.DATA_URI,
        sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM,
      });
    });
  };
  getPic()
    .then(function() {
      var timer = setInterval(function() {
        if( imgUrl == canvas1.toDataURL() ){
          clearInterval(timer);
          btnFilter.setAttribute('class', 'active');
          btnSave.setAttribute('class', 'active');
          loader.setAttribute('class', '');
//          var w1 = photo1.width + 'px';
//          photo2.style.width = w1;
//          photo2.style.height = photo1.height + 'px';
   position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

        }
      },1000);
    })
});

//========== btnSave ==========
btnSave.addEventListener('touchstart', function (e) {
  alert(0);
  canvas2ImagePlugin.saveImageDataToLibrary (
    function(msg){
      alert(msg);
//      alert("Saving image is successful!");
//      Ext.Msg.alert('Success!', 'The image was saved to the photos gallery on your device.');
    },
    function(err){
      alert(err);
//        console.log(err);
    },
    document.getElementById('canvas')
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
    case "add":
        brend_fn = function(a,b){return Math.min(a+b,255);};
        break;
    case "subtract":
        brend_fn = function(a,b){return Math.max(a-b,0);};
        break;
    case "multiple":
        brend_fn = function(a,b){return a*b/255;};
        break;
    case "screen":
        brend_fn = function(a,b){return a+b-a*b/255;};
        break;
    case "overlay":
        brend_fn = function(a,b){return (a<128)?2*a*b/255:a+b-2*a*b/255;};
        break;
    case "hardlight":
        brend_fn = function(a,b){return (b<128)?2*a*b/255:a+b-2*a*b/255;};
        break;
    case "darken":
        brend_fn = function(a,b){return Math.min(a,b);};
        break;
    case "lighten":
        brend_fn = function(a,b){return Math.max(a,b);};
        break;
    case "difference":
        brend_fn = function(a,b){return Math.abs(a-b);};
        break;
    case "exclusion":
        brend_fn = function(a,b){return a+b-2*a*b/255;};
        break;
    case "ImageA":
        brend_fn = function(a,b){return a;};
        break;
    case "ImageB":
        brend_fn = function(a,b){return b;};
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

//========== save ==========
function download(URL, Folder_Name, File_Name) {
//step to request a file system 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

  function fileSystemSuccess(fileSystem) {
      var download_link = encodeURI(URL);
      ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

      var directoryEntry = fileSystem.root; // to get root path of directory
      directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
      var rootdir = fileSystem.root;
      var fp = rootdir.fullPath; // Returns Fulpath of local directory

      fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
      // download function call
      filetransfer(download_link, fp);
  }

  function onDirectorySuccess(parent) {
      // Directory created successfuly
  }

  function onDirectoryFail(error) {
      //Error while creating directory
      alert("Unable to create new directory: " + error.code);
  }

    function fileSystemFail(evt) {
      //Unable to access file system
      alert(evt.target.error.code);
   }
}

function filetransfer(download_link, fp) {
var fileTransfer = new FileTransfer();
// File download function with URL and local path
fileTransfer.download(download_link, fp,
                    function (entry) {
                        alert("download complete: " + entry.fullPath);
                    },
                 function (error) {
                     //Download abort errors or download failed errors
                     alert("download error source " + error.source);
                     //alert("download error target " + error.target);
                     //alert("upload error code" + error.code);
                 }
            );
}