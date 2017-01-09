/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _query = __webpack_require__(1);

	var _query2 = _interopRequireDefault(_query);

	var _pagination = __webpack_require__(3);

	var _pagination2 = _interopRequireDefault(_pagination);

	var _swipes = __webpack_require__(4);

	var _swipes2 = _interopRequireDefault(_swipes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function renderPage(videos) {
	  var container = document.querySelector('.container');
	  var left = document.querySelector('.left');
	  var right = document.querySelector('.right');
	  left.addEventListener('click', _pagination2.default.prevPage);
	  right.addEventListener('click', _pagination2.default.nextPage);
	  (0, _swipes2.default)();
	  _pagination2.default.reset();
	  container.innerHTML = '';
	  videos.forEach(function (video) {
	    var li = document.createElement('li');
	    li.classList.add('video');
	    var href = 'https://www.youtube.com/watch?v=' + video.id.videoId;
	    li.innerHTML = '<a target="_blank" href="' + href + '"><img src="' + video.snippet.thumbnails.medium.url + '" alt="' + video.snippet.title + '">\n    <p class="title">' + video.snippet.title + '</p>\n    </a>';
	    container.appendChild(li);
	  });
	  container.style.width = 340 * videos.length + 'px';
	  window.addEventListener('resize', _pagination2.default.resize);
	}

	function render() {
	  var searchDiv = document.createElement('div');
	  searchDiv.classList.add('search-container');
	  var input = document.createElement('input');
	  input.type = 'text';
	  input.classList.add('search-input');
	  input.addEventListener('keyup', function (e) {
	    if (e.keyCode === 13) {
	      (0, _query2.default)(e.target.value).then(function (data) {
	        return renderPage(data.items);
	      });
	    }
	  });
	  searchDiv.appendChild(input);

	  // const searchButton = document.createElement('button');
	  // searchButton.innerText = 'Search';
	  // searchButton.addEventListener('click', () => {
	  //   const value = document.querySelector('.search-input').value;
	  //   if (value) {
	  //     fetchQuery(value);
	  //   }
	  // });
	  // searchDiv.appendChild(searchButton);
	  document.body.appendChild(searchDiv);

	  var wrap = document.createElement('div');
	  wrap.classList.add('wrap');
	  var videosContainer = document.createElement('ul');
	  videosContainer.classList.add('container');
	  videosContainer.classList.add('clearfix');
	  wrap.appendChild(videosContainer);

	  document.body.appendChild(wrap);
	}

	render();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function fetchQuery(value) {
	  var params = {
	    key: _constants2.default.YOUTUBE_KEY,
	    type: 'video',
	    part: 'snippet',
	    maxResults: 15,
	    q: value
	  };

	  var query = Object.keys(params).map(function (x) {
	    return encodeURIComponent(x) + '=' + encodeURIComponent(params[x]);
	  }).join('&');

	  return fetch('https://www.googleapis.com/youtube/v3/search?' + query).then(function (res) {
	    return res.json();
	  });
	}

	exports.default = fetchQuery;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  YOUTUBE_KEY: 'AIzaSyD7oj8dxaPhsPWA6J9b8rmbLS7dmmdHR00'
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var currentPage = 1;
	var vidsPerPage = 4;
	// todo change currentPage after resize and lazyloading probably

	function nextPage() {
	  var container = document.querySelector('.container');
	  var width = document.querySelector('.wrap').offsetWidth;
	  currentPage += 1;
	  container.style.transform = 'translate3d(' + -(currentPage - 1) * width + 'px, 0px, 0px)';
	}

	function prevPage() {
	  var container = document.querySelector('.container');
	  if (currentPage !== 1) {
	    currentPage -= 1;
	    var width = document.querySelector('.wrap').offsetWidth;
	    container.style.transform = 'translate3d(' + -(currentPage - 1) * width + 'px, 0px, 0px)';
	  }
	}

	function goToCurrPage() {
	  var container = document.querySelector('.container');
	  var width = document.querySelector('.wrap').offsetWidth;
	  container.style.transform = 'translate3d(' + -(currentPage - 1) * width + 'px, 0px, 0px)';
	}

	function reset() {
	  currentPage = 1;
	  vidsPerPage = document.querySelector('.wrap').offsetWidth / 340;
	  var container = document.querySelector('.container');
	  container.style.transform = 'translate3d(0px, 0px, 0px)';
	}

	function resize() {
	  var width = document.querySelector('.wrap').offsetWidth;
	  var currentVideo = (currentPage - 1) * vidsPerPage + 1;
	  if (width === 1360) {
	    vidsPerPage = 4;
	    currentPage = Math.floor(currentVideo / vidsPerPage) + 1;
	    goToCurrPage();
	  }
	  if (width === 1020) {
	    vidsPerPage = 3;
	    currentPage = Math.floor(currentVideo / vidsPerPage) + 1;
	    goToCurrPage();
	  }
	  if (width === 680) {
	    vidsPerPage = 2;
	    currentPage = Math.floor(currentVideo / vidsPerPage) + 1;
	    goToCurrPage();
	  }
	  if (width === 340) {
	    vidsPerPage = 1;
	    currentPage = currentVideo;
	  }
	}

	exports.default = {
	  nextPage: nextPage,
	  prevPage: prevPage,
	  reset: reset,
	  resize: resize
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _pagination = __webpack_require__(3);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// todo вынести константы

	function setSwipeListeners() {
	  var touchsurface = document.querySelector('body');
	  var threshold = 150;
	  var startX = void 0;
	  var startY = void 0;
	  var dist = void 0;

	  function handleswipe(isLeftSwipe) {
	    if (isLeftSwipe) {
	      _pagination2.default.prevPage();
	    } else {
	      _pagination2.default.nextPage();
	    }
	  }

	  touchsurface.addEventListener('touchstart', function (e) {
	    var touchobj = e.changedTouches[0];
	    dist = 0;
	    startX = touchobj.pageX;
	    startY = touchobj.pageY;
	    e.preventDefault();
	  }, false);

	  touchsurface.addEventListener('touchmove', function (e) {
	    e.preventDefault();
	  }, false);

	  touchsurface.addEventListener('touchend', function (e) {
	    var touchobj = e.changedTouches[0];
	    dist = touchobj.pageX - startX;
	    var isLeftSwipe = dist > 0;
	    if (Math.abs(dist) >= threshold && Math.abs(touchobj.pageY - startY) <= 100) {
	      handleswipe(isLeftSwipe);
	    }
	    e.preventDefault();
	  }, false);
	}

	exports.default = setSwipeListeners;

/***/ }
/******/ ]);