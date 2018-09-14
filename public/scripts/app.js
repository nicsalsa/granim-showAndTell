(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = require('./lib/Granim.js');

},{"./lib/Granim.js":2}],2:[function(require,module,exports){
'use strict';

function Granim(options) {
	var doesGradientUseOpacity;
	this.getElement(options.element);
	this.x1 = 0;
	this.y1 = 0;
	this.name = options.name || false;
	this.elToSetClassOn = options.elToSetClassOn || 'body';
	this.direction = options.direction || 'diagonal';
	this.isPausedWhenNotInView = options.isPausedWhenNotInView || false;
	this.opacity = options.opacity;
	this.states = options.states;
	this.stateTransitionSpeed = options.stateTransitionSpeed || 1000;
	this.previousTimeStamp = null;
	this.progress = 0;
	this.isPaused = false;
	this.isCleared = false;
	this.isPausedBecauseNotInView = false;
	this.iscurrentColorsSet = false;
	this.context = this.canvas.getContext('2d');
	this.channels = {};
	this.channelsIndex = 0;
	this.activeState = options.defaultStateName || 'default-state';
	this.isChangingState = false;
	this.activeColors = [];
	this.activeColorDiff = [];
	this.activetransitionSpeed = null;
	this.currentColors = [];
	this.eventPolyfill();
	this.scrollDebounceThreshold = options.scrollDebounceThreshold || 300;
	this.scrollDebounceTimeout = null;
	this.isImgLoaded = false;
	this.isCanvasInWindowView = false;
	this.firstScrollInit = true;
	this.animating = false;
	if (options.image && options.image.source) {
		this.image = {
			source: options.image.source,
			position: options.image.position || ['center', 'center'],
			stretchMode: options.image.stretchMode || false,
			blendingMode: options.image.blendingMode || false
		};
	}
	doesGradientUseOpacity = this.opacity.map(function(el) {return el !== 1})
		.indexOf(true) !== -1;
	this.shouldClearCanvasOnEachFrame = !!this.image || doesGradientUseOpacity;
	this.events = {
		start: new CustomEvent('granim:start'),
		end: new CustomEvent('granim:end'),
		gradientChange: function(details) {
			return new CustomEvent('granim:gradientChange', {
				detail: {
					isLooping: details.isLooping,
					colorsFrom: details.colorsFrom,
					colorsTo: details.colorsTo,
					activeState: details.activeState
				},
				bubbles: false,
				cancelable: false
			})
		}
	};
	this.callbacks = {
		onStart: typeof options.onStart === 'function' ? options.onStart : false,
		onGradientChange: typeof options.onGradientChange === 'function' ?
			options.onGradientChange :
			false,
		onEnd: typeof options.onEnd === 'function' ? options.onEnd : false
	};
	this.getDimensions();
	this.canvas.setAttribute('width', this.x1);
	this.canvas.setAttribute('height', this.y1);
	this.setColors();

	if (this.image) {
		this.validateInput('image');
		this.prepareImage();
	}

	this.pauseWhenNotInViewNameSpace = this.pauseWhenNotInView.bind(this);
	this.setSizeAttributesNameSpace = this.setSizeAttributes.bind(this);
	this.onResize();

	if (this.isPausedWhenNotInView) {
		this.onScroll();
	} else {
		if (!this.image) {
			this.refreshColors();
			this.animation = requestAnimationFrame(this.animateColors.bind(this));
			this.animating = true;
		}
	}

	// Callback and Event
	if (this.callbacks.onStart) this.callbacks.onStart();
	this.canvas.dispatchEvent(this.events.start);
}

Granim.prototype.onResize = require('./onResize.js');

Granim.prototype.onScroll = require('./onScroll.js');

Granim.prototype.validateInput = require('./validateInput.js');

Granim.prototype.triggerError = require('./triggerError.js');

Granim.prototype.prepareImage = require('./prepareImage.js');

Granim.prototype.eventPolyfill = require('./eventPolyfill.js');

Granim.prototype.colorDiff = require('./colorDiff.js');

Granim.prototype.hexToRgb = require('./hexToRgb.js');

Granim.prototype.setDirection = require('./setDirection.js');

Granim.prototype.setColors = require('./setColors.js');

Granim.prototype.getElement = require('./getElement.js');

Granim.prototype.getDimensions = require('./getDimensions.js');

Granim.prototype.getLightness = require('./getLightness.js');

Granim.prototype.getCurrentColors = require('./getCurrentColors.js');

Granim.prototype.animateColors = require('./animateColors.js');

Granim.prototype.refreshColors = require('./refreshColors.js');

Granim.prototype.makeGradient = require('./makeGradient.js');

Granim.prototype.pause = require('./pause.js');

Granim.prototype.play = require('./play.js');

Granim.prototype.clear = require('./clear.js');

Granim.prototype.destroy = require('./destroy.js');

Granim.prototype.pauseWhenNotInView = require('./pauseWhenNotInView.js');

Granim.prototype.setSizeAttributes = require('./setSizeAttributes.js');

Granim.prototype.changeDirection = require('./changeDirection.js');

Granim.prototype.changeBlendingMode = require('./changeBlendingMode.js');

Granim.prototype.changeState = require('./changeState.js');

module.exports = Granim;

},{"./animateColors.js":3,"./changeBlendingMode.js":4,"./changeDirection.js":5,"./changeState.js":6,"./clear.js":7,"./colorDiff.js":8,"./destroy.js":9,"./eventPolyfill.js":10,"./getCurrentColors.js":11,"./getDimensions.js":12,"./getElement.js":13,"./getLightness.js":14,"./hexToRgb.js":15,"./makeGradient.js":16,"./onResize.js":17,"./onScroll.js":18,"./pause.js":19,"./pauseWhenNotInView.js":20,"./play.js":21,"./prepareImage.js":22,"./refreshColors.js":23,"./setColors.js":24,"./setDirection.js":25,"./setSizeAttributes.js":26,"./triggerError.js":27,"./validateInput.js":28}],3:[function(require,module,exports){
'use strict';

module.exports = function(timestamp) {
	var wasWindowIdled = timestamp - this.previousTimeStamp > 100;
	var isLoop = this.states[this.activeState].loop !== undefined ? this.states[this.activeState].loop : true;
	var progressPercent, isLooping, nextGradient;

	// If tab was inactive then resumed, reset the previous timestamp
	if (this.previousTimeStamp === null || wasWindowIdled) {
		this.previousTimeStamp = timestamp;
	}

	// Compute progress and save the timestamp
	this.progress = this.progress + (timestamp - this.previousTimeStamp);
	progressPercent = (this.progress / this.activetransitionSpeed * 100).toFixed(2);
	this.previousTimeStamp = timestamp;

	// Set the new gradient colors in a property
	this.refreshColors(progressPercent);

	// Continue the animation or prepare for the next one
	if (progressPercent < 100) {
		this.animation = requestAnimationFrame(this.animateColors.bind(this));

	} else {
		// if the current animation index is inferior to the penultimate gradient
		// or to the last gradient with the loop mode activated
		if (this.channelsIndex < this.states[this.activeState].gradients.length - 2 || isLoop) {

			// Set the active transition speed to the active state one after changing state
			if (this.isChangingState) {
				this.activetransitionSpeed = this.states[this.activeState].transitionSpeed || 5000;
			}

			// Resetting properties
			this.previousTimeStamp = null;
			this.progress = 0;
			this.channelsIndex++;
			isLooping = false;

			// If it's going to loop or if it's the transition after the loop
			if (this.channelsIndex === this.states[this.activeState].gradients.length - 1) {
				isLooping = true;
				
			} else if (this.channelsIndex === this.states[this.activeState].gradients.length) {
				this.channelsIndex = 0;
			}

			// Checking the next gradient to send in args of an event and a callback
			nextGradient = this.states[this.activeState].gradients[this.channelsIndex + 1] === undefined ?
				this.states[this.activeState].gradients[0] :
				this.states[this.activeState].gradients[this.channelsIndex + 1];

			// Compute the colors for the transition and render a new frame
			this.setColors();
			this.animation = requestAnimationFrame(this.animateColors.bind(this));
			
			// Callback and Event
			if (this.callbacks.onGradientChange) this.callbacks.onGradientChange({
				isLooping: isLooping,
				colorsFrom: this.states[this.activeState].gradients[this.channelsIndex],
				colorsTo: nextGradient,
				activeState: this.activeState
			});

			this.canvas.dispatchEvent(this.events.gradientChange({
					isLooping: isLooping,
					colorsFrom: this.states[this.activeState].gradients[this.channelsIndex],
					colorsTo: nextGradient,
					activeState: this.activeState
				})
			);

		// Else if it was the last gradient on the list and the loop mode is off
		} else {
			cancelAnimationFrame(this.animation);

			// Callback and Event
			if (this.callbacks.onEnd) this.callbacks.onEnd();
			this.canvas.dispatchEvent(new CustomEvent('granim:end'));
		}
	}
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function(newBlendingMode) {
	this.context.clearRect(0, 0, this.x1, this.y1);
	this.context.globalCompositeOperation =
		this.image.blendingMode = newBlendingMode;
	this.validateInput('blendingMode');
	if (this.isPaused) this.refreshColors();
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function(newDirection) {
	this.context.clearRect(0, 0, this.x1, this.y1);
	this.direction = newDirection;
	this.validateInput('direction');
	if (this.isPaused) this.refreshColors();
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = function(state) {
	var _this = this;
	var nextColors, colorDiff;

	// Prevent transitioning to the same state
	if (this.activeState === state) {
		return;
	}

	// Setting the good properties for the transition
	if (!this.isPaused) {
		this.isPaused = true;
		this.pause();
	}

	this.channelsIndex = -1;
	this.activetransitionSpeed = this.stateTransitionSpeed;
	this.activeColorDiff = [];
	this.activeColors = this.getCurrentColors();
	this.progress = 0;
	this.previousTimeStamp = null;
	this.isChangingState = true;

	// Compute the gradient diff between the last frame gradient
	// and the first one of the new state
	this.states[state].gradients[0].forEach(function(color, i, arr) {
		nextColors = _this.hexToRgb(_this.states[state].gradients[0][i]);
		colorDiff = _this.colorDiff(_this.activeColors[i], nextColors);
		_this.activeColorDiff.push(colorDiff);
	});

	// Start the animation
	this.activeState = state;
	this.play();
};

},{}],7:[function(require,module,exports){
'use strict';

module.exports = function() {
	if (!this.isPaused) {
		cancelAnimationFrame(this.animation);

	} else {
		this.isPaused = false;
	}
	this.isCleared = true;
	this.context.clearRect(0, 0, this.x1, this.y1);
};

},{}],8:[function(require,module,exports){
'use strict';

module.exports = function(colorA, colorB) {
	var i;
	var colorDiff = [];

	for (i = 0; i < 3; i++) {
		colorDiff.push(colorB[i] - colorA[i])
	}

	return colorDiff;
};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = function() {
	this.onResize('removeListeners');
	this.onScroll('removeListeners');
	this.clear();
};

},{}],10:[function(require,module,exports){
'use strict';

module.exports = function() {
	if ( typeof window.CustomEvent === "function" ) return;

	function CustomEvent (event, params) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
};

},{}],11:[function(require,module,exports){
'use strict';

module.exports = function() {
	var i, j;
	var currentColors = [];

	for (i = 0; i < this.currentColors.length; i++) {
		currentColors.push([]);
		for (j = 0; j < 3; j++) {currentColors[i].push(this.currentColors[i][j])}
	}

	// Return a deep copy of the current colors
	return currentColors;
};

},{}],12:[function(require,module,exports){
'use strict';

module.exports = function() {
	this.x1 = this.canvas.offsetWidth;
	this.y1 = this.canvas.offsetHeight;
};

},{}],13:[function(require,module,exports){
'use strict';

module.exports = function(element) {
	if (element instanceof HTMLCanvasElement) {
		this.canvas = element;

	} else if (typeof element === "string") {
		this.canvas = document.querySelector(element);

	} else {
		throw new Error('The element you used is neither a String, nor a HTMLCanvasElement');
	}

	if (!this.canvas) {
		throw new Error('`' + element + '` could not be found in the DOM');
	}
};

},{}],14:[function(require,module,exports){
'use strict';

module.exports = function() {
	var currentColors = this.getCurrentColors();
	var gradientAverage = null;
	var lightnessAverage, i;
	var colorsAverage = currentColors.map(function(el) {
		// Compute the average lightness of each color
		// in the current gradient
		return Math.max(el[0], el[1], el[2]);
	});

	for (i = 0; i < colorsAverage.length; i++) {
		// Add all the average lightness of each color
		gradientAverage = gradientAverage === null ?
			colorsAverage[i] : gradientAverage + colorsAverage[i];

		if (i === colorsAverage.length - 1) {
			// if it's the last lightness average
			// divide it by the total length to
			// have the global average lightness
			lightnessAverage = Math.round(gradientAverage / (i + 1));
		}
	}

	return lightnessAverage >= 128 ? 'light' : 'dark';
};

},{}],15:[function(require,module,exports){
'use strict';

module.exports = function(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	] : null;
};

},{}],16:[function(require,module,exports){
'use strict';

module.exports = function() {
	var i, colorPosition;
	var gradient = this.setDirection();
	var elToSetClassOnClass = document.querySelector(this.elToSetClassOn).classList;

	if (this.shouldClearCanvasOnEachFrame) this.context.clearRect(0, 0, this.x1, this.y1);

	if (this.image) {
		this.context.drawImage(
			this.imageNode,
			this.imagePosition.x,
			this.imagePosition.y,
			this.imagePosition.width,
			this.imagePosition.height
		);
	}

	for (i = 0; i < this.currentColors.length; i++) {
		// Ensure first and last position to be 0 and 100
		colorPosition = !i ? 0 : ((1 / (this.currentColors.length - 1)) * i).toFixed(2);

		gradient.addColorStop(colorPosition, 'rgba(' +
			this.currentColors[i][0] + ', ' +
			this.currentColors[i][1] + ', ' +
			this.currentColors[i][2] + ', ' +
			this.opacity[i] + ')'
		);
	}

	if (this.name) {
		if (this.getLightness() === 'light') {
			elToSetClassOnClass.remove(this.name + '-dark');
			elToSetClassOnClass.add(this.name + '-light');

		} else {
			elToSetClassOnClass.remove(this.name + '-light');
			elToSetClassOnClass.add(this.name + '-dark');
		}
	}

	this.context.fillStyle = gradient;
	this.context.fillRect(0, 0, this.x1, this.y1);
};

},{}],17:[function(require,module,exports){
'use strict';

module.exports = function(type) {
	if (type === 'removeListeners') {
		window.removeEventListener('resize', this.setSizeAttributesNameSpace);
		return;
	}

	window.addEventListener('resize', this.setSizeAttributesNameSpace);
};

},{}],18:[function(require,module,exports){
'use strict';

module.exports = function(type) {
	if (type === 'removeListeners') {
		window.removeEventListener('scroll', this.pauseWhenNotInViewNameSpace);
		return;
	}

	window.addEventListener('scroll', this.pauseWhenNotInViewNameSpace);
	this.pauseWhenNotInViewNameSpace();
};

},{}],19:[function(require,module,exports){
'use strict';

module.exports = function(state) {
	var isPausedBecauseNotInView = state === 'isPausedBecauseNotInView';
	if (this.isCleared) return;
	if (!isPausedBecauseNotInView) this.isPaused = true;
	cancelAnimationFrame(this.animation);
	this.animating = false;
};

},{}],20:[function(require,module,exports){
'use strict';

module.exports = function() {
	var _this = this;
	if (this.scrollDebounceTimeout) clearTimeout(this.scrollDebounceTimeout);

	this.scrollDebounceTimeout = setTimeout(function() {
		var elPos = _this.canvas.getBoundingClientRect();
		_this.isCanvasInWindowView = !(elPos.bottom < 0 || elPos.right < 0 ||
			elPos.left > window.innerWidth || elPos.top > window.innerHeight);

		if (_this.isCanvasInWindowView) {
			if (!_this.isPaused || _this.firstScrollInit) {
				if (_this.image && !_this.isImgLoaded) {return}
				_this.isPausedBecauseNotInView = false;
				_this.play('isPlayedBecauseInView');
				_this.firstScrollInit = false;
			}

		} else {
			if (!_this.image && _this.firstScrollInit) {
				_this.refreshColors();
				_this.firstScrollInit = false;
			}

			if (!_this.isPaused && !_this.isPausedBecauseNotInView) {
				_this.isPausedBecauseNotInView = true;
				_this.pause('isPausedBecauseNotInView');
			}
		}
	}, this.scrollDebounceThreshold);
};

},{}],21:[function(require,module,exports){
'use strict';

module.exports = function(state) {
	var isPlayedBecauseInView = state === 'isPlayedBecauseInView';
	if (!isPlayedBecauseInView) this.isPaused = false;
	this.isCleared = false;
	if (!this.animating) {
		this.animation = requestAnimationFrame(this.animateColors.bind(this));
		this.animating = true;
	}
};

},{}],22:[function(require,module,exports){
'use strict';

module.exports = function() {
	var _this = this;

	if (!this.imagePosition) {
		this.imagePosition = { x: 0, y: 0, width: 0, height: 0 };
	}

	if (this.image.blendingMode) {
		this.context.globalCompositeOperation = this.image.blendingMode;
	}

	if (this.imageNode) {
		setImagePosition();
		return;
	}

	this.imageNode = new Image();
	this.imageNode.onerror = function() {
		throw new Error('Granim: The image source is invalid.');
	};
	this.imageNode.onload = function() {
		_this.imgOriginalWidth = _this.imageNode.width;
		_this.imgOriginalHeight = _this.imageNode.height;
		setImagePosition();
		_this.refreshColors();
		if (!_this.isPausedWhenNotInView || _this.isCanvasInWindowView) {
			_this.animation = requestAnimationFrame(_this.animateColors.bind(_this));
		}
		_this.isImgLoaded = true;
	};
	this.imageNode.src = this.image.source;

	function setImagePosition() {
		var i, currentAxis;

		for (i = 0; i < 2; i++) {
			currentAxis = !i ? 'x' : 'y';
			setImageAxisPosition(currentAxis);
		}

		function setImageAxisPosition(axis) {
			var canvasWidthOrHeight = _this[axis + '1'];
			var imgOriginalWidthOrHeight = _this[axis === 'x' ? 'imgOriginalWidth' : 'imgOriginalHeight'];
			var imageAlignIndex = axis === 'x' ? _this.image.position[0] : _this.image.position[1];
			var imageAxisPosition;
			switch (imageAlignIndex) {
				case 'center':
					imageAxisPosition = imgOriginalWidthOrHeight > canvasWidthOrHeight ?
					-(imgOriginalWidthOrHeight - canvasWidthOrHeight) / 2 :
					(canvasWidthOrHeight - imgOriginalWidthOrHeight) / 2;
					_this.imagePosition[axis] = imageAxisPosition;
					_this.imagePosition[axis === 'x' ? 'width' : 'height'] = imgOriginalWidthOrHeight;
					break;

				case 'top':
					_this.imagePosition['y'] = 0;
					_this.imagePosition['height'] = imgOriginalWidthOrHeight;
					break;

				case 'bottom':
					_this.imagePosition['y'] = canvasWidthOrHeight - imgOriginalWidthOrHeight;
					_this.imagePosition['height'] = imgOriginalWidthOrHeight;
					break;

				case 'right':
					_this.imagePosition['x'] = canvasWidthOrHeight - imgOriginalWidthOrHeight;
					_this.imagePosition['width'] = imgOriginalWidthOrHeight;
					break;

				case 'left':
					_this.imagePosition['x'] = 0;
					_this.imagePosition['width'] = imgOriginalWidthOrHeight;
					break;
			}

			if (_this.image.stretchMode) {
				imageAlignIndex = axis === 'x' ? _this.image.stretchMode[0] : _this.image.stretchMode[1];
				switch (imageAlignIndex) {
					case 'stretch':
						_this.imagePosition[axis] = 0;
						_this.imagePosition[axis === 'x' ? 'width' : 'height'] = canvasWidthOrHeight;
						break;

					case 'stretch-if-bigger':
						if (imgOriginalWidthOrHeight < canvasWidthOrHeight) break;
						_this.imagePosition[axis] = 0;
						_this.imagePosition[axis === 'x' ? 'width' : 'height'] = canvasWidthOrHeight;
						break;

					case 'stretch-if-smaller':
						if (imgOriginalWidthOrHeight > canvasWidthOrHeight) break;
						_this.imagePosition[axis] = 0;
						_this.imagePosition[axis === 'x' ? 'width' : 'height'] = canvasWidthOrHeight;
						break;
				}
			}
		}
	}
};

},{}],23:[function(require,module,exports){
'use strict';

module.exports = function(progressPercent) {
	var _this = this;
	var activeChannel, i, j;

	// Loop through each colors of the active gradient
	for (i = 0; i < this.activeColors.length; i++) {

		// Generate RGB colors
		for (j = 0; j < 3; j++) {
			activeChannel = _this.activeColors[i][j] +
				Math.ceil(_this.activeColorDiff[i][j] / 100 * progressPercent);

			// Prevent colors values from going < 0 & > 255
			if (activeChannel <= 255 && activeChannel >= 0) {
				_this.currentColors[i][j] = activeChannel;
			}
		}
	}

	this.makeGradient();
};

},{}],24:[function(require,module,exports){
'use strict';

module.exports = function() {
	var _this = this;
	var colorDiff, nextColors;

	if (!this.channels[this.activeState]) this.channels[this.activeState] = [];

	// If the actual channel exist, reassign properties and exit
	// (each channel is saved to prevent recomputing it each time)
	if (this.channels[this.activeState][this.channelsIndex] !== undefined) {
		this.activeColors = this.channels[this.activeState][this.channelsIndex].colors;
		this.activeColorDiff = this.channels[this.activeState][this.channelsIndex].colorsDiff;
		return;
	}

	// Set blank properties
	this.channels[this.activeState].push([{}]);
	this.channels[this.activeState][this.channelsIndex].colors = [];
	this.channels[this.activeState][this.channelsIndex].colorsDiff = [];
	this.activeColors = [];
	this.activeColorDiff = [];

	// Go on each gradient of the current state
	this.states[this.activeState].gradients[this.channelsIndex].forEach(function(color, i) {
		// Push the hex color converted to rgb on the channel and the active color properties
		var rgbColor = _this.hexToRgb(color);
		var activeChannel = _this.channels[_this.activeState];

		activeChannel[_this.channelsIndex].colors.push(rgbColor);
		_this.activeColors.push(rgbColor);

		// If it's the first channel to be set, set the currentColors
		if (!_this.iscurrentColorsSet) {
			_this.currentColors.push(_this.hexToRgb(color));
		}

		// If it's the last gradient, compute the color diff between the last gradient and the first one,
		// else between the penultimate one and the last one
		if (_this.channelsIndex === _this.states[_this.activeState].gradients.length - 1) {
			colorDiff = _this.colorDiff(
				activeChannel[_this.channelsIndex].colors[i],
				activeChannel[0].colors[i]
			);
		} else {
			nextColors = _this.hexToRgb(_this.states[_this.activeState].gradients[_this.channelsIndex + 1][i]);
			colorDiff = _this.colorDiff(
				activeChannel[_this.channelsIndex].colors[i], nextColors
			);
		}

		activeChannel[_this.channelsIndex].colorsDiff.push(colorDiff);
		_this.activeColorDiff.push(colorDiff);
	});

	this.activetransitionSpeed = this.states[this.activeState].transitionSpeed || 5000;
	this.iscurrentColorsSet = true;
};

},{}],25:[function(require,module,exports){
'use strict';

module.exports = function() {
	var ctx = this.context;

	switch(this.direction) {
		default:
			this.triggerError('direction');
			break;
		
		case 'diagonal':
			return ctx.createLinearGradient(0, 0, this.x1, this.y1);
			break;

		case 'left-right':
			return ctx.createLinearGradient(0, 0, this.x1, 0);
			break;

		case 'top-bottom':
			return ctx.createLinearGradient(this.x1 / 2, 0, this.x1 / 2, this.y1);
			break;

		case 'radial':
			return ctx.createRadialGradient(this.x1 / 2, this.y1 / 2, this.x1 / 2, this.x1 / 2, this.y1 / 2, 0);
			break;
	}
};

},{}],26:[function(require,module,exports){
'use strict';

module.exports = function() {
	this.getDimensions();
	this.canvas.setAttribute('width', this.x1);
	this.canvas.setAttribute('height', this.y1);
	if (this.image) this.prepareImage();
	this.refreshColors();
};

},{}],27:[function(require,module,exports){
'use strict';

module.exports = function(element) {
	var siteURL = 'https://sarcadass.github.io/granim.js/api.html';
	throw new Error('Granim: Input error on "' + element + '" option.\nCheck the API ' + siteURL + '.');
};

},{}],28:[function(require,module,exports){
'use strict';

module.exports = function(inputType) {
	var xPositionValues = ['left', 'center', 'right'];
	var yPositionValues = ['top', 'center', 'bottom'];
	var stretchModeValues = ['stretch', 'stretch-if-smaller', 'stretch-if-bigger'];
	var blendingModeValues = ['multiply', 'screen', 'normal', 'overlay', 'darken',
		'lighten', 'lighter', 'color-dodge', 'color-burn', 'hard-light', 'soft-light',
		'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

	switch(inputType) {
		case 'image':
			// Validate image.position
			if ((!Array.isArray(this.image.position) || this.image.position.length !== 2) ||
				xPositionValues.indexOf(this.image.position[0]) === -1 ||
				yPositionValues.indexOf(this.image.position[1]) === -1
			) {this.triggerError('image.position')}
			// Validate image.stretchMode
			if (this.image.stretchMode) {
				if ((!Array.isArray(this.image.stretchMode) || this.image.stretchMode.length !== 2) ||
					stretchModeValues.indexOf(this.image.stretchMode[0]) === -1 ||
					stretchModeValues.indexOf(this.image.stretchMode[1]) === -1
				) {this.triggerError('image.stretchMode')}
			}
			break;
		case 'blendingMode':
			if (blendingModeValues.indexOf(this.image.blendingMode) === -1) {
				this.clear();
				this.triggerError('blendingMode');
			}
	}
};

},{}],29:[function(require,module,exports){
"use strict";

var _granim = _interopRequireDefault(require("granim"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Granim into JS file
var granimInstance1 = new _granim.default({
  element: '#basic__header--canvas',
  name: 'basic-gradient',
  direction: 'left-right',
  // 'diagonal', 'top-bottom', 'radial'
  opacity: [1, 1],
  isPausedWhenNotInView: true,
  states: {
    "default-state": {
      gradients: [['#AA076B', '#61045F'], ['#02AAB0', '#00CDAC'], ['#DA22FF', '#9733EE']]
    }
  }
});
var granimInstance2 = new _granim.default({
  element: '#canvas-image-blending',
  direction: 'top-bottom',
  opacity: [1, 1],
  isPausedWhenNotInView: true,
  image: {
    source: './src/assets/neven-krcmarek-190084-unsplash.jpg',
    blendingMode: 'multiply'
  },
  states: {
    "default-state": {
      gradients: [['#29323c', '#485563'], ['#FF6B6B', '#556270'], ['#80d3fe', '#7ea0c4'], ['#f0ab51', '#eceba3']],
      transitionSpeed: 7000
    }
  }
});
var granimInstance3 = new _granim.default({
  element: '#ftr__header--canvas',
  direction: 'top-bottom',
  opacity: [1, 1],
  isPausedWhenNotInView: true,
  image: {
    source: './src/assets/berkay-gumustekin.jpg',
    blendingMode: 'multiply'
  },
  states: {
    "default-state": {
      gradients: [['#29323c', '#485563'], ['#FF6B6B', '#556270'], ['#80d3fe', '#7ea0c4'], ['#f0ab51', '#eceba3']],
      transitionSpeed: 7000
    }
  }
});

},{"granim":1}]},{},[29])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvR3JhbmltLmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvYW5pbWF0ZUNvbG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL2NoYW5nZUJsZW5kaW5nTW9kZS5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL2NoYW5nZURpcmVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL2NoYW5nZVN0YXRlLmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvY2xlYXIuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9jb2xvckRpZmYuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9kZXN0cm95LmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvZXZlbnRQb2x5ZmlsbC5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL2dldEN1cnJlbnRDb2xvcnMuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9nZXREaW1lbnNpb25zLmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvZ2V0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL2dldExpZ2h0bmVzcy5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL2hleFRvUmdiLmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvbWFrZUdyYWRpZW50LmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvb25SZXNpemUuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9vblNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL3BhdXNlLmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvcGF1c2VXaGVuTm90SW5WaWV3LmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvcGxheS5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL3ByZXBhcmVJbWFnZS5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL3JlZnJlc2hDb2xvcnMuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9zZXRDb2xvcnMuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9zZXREaXJlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9zZXRTaXplQXR0cmlidXRlcy5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL3RyaWdnZXJFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL3ZhbGlkYXRlSW5wdXQuanMiLCJzcmMvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDL0JBOzs7O0FBREE7QUFLQSxJQUFNLGVBQWUsR0FBRyxJQUFJLGVBQUosQ0FBVztBQUNoQyxFQUFBLE9BQU8sRUFBRSx3QkFEdUI7QUFFaEMsRUFBQSxJQUFJLEVBQUUsZ0JBRjBCO0FBR2hDLEVBQUEsU0FBUyxFQUFFLFlBSHFCO0FBR1A7QUFDekIsRUFBQSxPQUFPLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUp1QjtBQUtoQyxFQUFBLHFCQUFxQixFQUFFLElBTFM7QUFNaEMsRUFBQSxNQUFNLEVBQUU7QUFDTCxxQkFBaUI7QUFDZCxNQUFBLFNBQVMsRUFBRSxDQUNSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FEUSxFQUVSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FGUSxFQUdSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FIUTtBQURHO0FBRFo7QUFOd0IsQ0FBWCxDQUF4QjtBQWlCRyxJQUFNLGVBQWUsR0FBRyxJQUFJLGVBQUosQ0FBVztBQUNoQyxFQUFBLE9BQU8sRUFBRSx3QkFEdUI7QUFFaEMsRUFBQSxTQUFTLEVBQUUsWUFGcUI7QUFHaEMsRUFBQSxPQUFPLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUh1QjtBQUloQyxFQUFBLHFCQUFxQixFQUFFLElBSlM7QUFLaEMsRUFBQSxLQUFLLEVBQUU7QUFDSixJQUFBLE1BQU0sRUFBRSxpREFESjtBQUVKLElBQUEsWUFBWSxFQUFFO0FBRlYsR0FMeUI7QUFTaEMsRUFBQSxNQUFNLEVBQUU7QUFDTCxxQkFBaUI7QUFDZCxNQUFBLFNBQVMsRUFBRSxDQUNSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FEUSxFQUVSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FGUSxFQUdSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FIUSxFQUlSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FKUSxDQURHO0FBT2QsTUFBQSxlQUFlLEVBQUU7QUFQSDtBQURaO0FBVHdCLENBQVgsQ0FBeEI7QUFzQkgsSUFBTSxlQUFlLEdBQUcsSUFBSSxlQUFKLENBQVc7QUFDaEMsRUFBQSxPQUFPLEVBQUUsc0JBRHVCO0FBRWhDLEVBQUEsU0FBUyxFQUFFLFlBRnFCO0FBR2hDLEVBQUEsT0FBTyxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FIdUI7QUFJaEMsRUFBQSxxQkFBcUIsRUFBRSxJQUpTO0FBS2hDLEVBQUEsS0FBSyxFQUFFO0FBQ0osSUFBQSxNQUFNLEVBQUUsb0NBREo7QUFFSixJQUFBLFlBQVksRUFBRTtBQUZWLEdBTHlCO0FBU2hDLEVBQUEsTUFBTSxFQUFFO0FBQ0wscUJBQWlCO0FBQ2QsTUFBQSxTQUFTLEVBQUUsQ0FDUixDQUFDLFNBQUQsRUFBWSxTQUFaLENBRFEsRUFFUixDQUFDLFNBQUQsRUFBWSxTQUFaLENBRlEsRUFHUixDQUFDLFNBQUQsRUFBWSxTQUFaLENBSFEsRUFJUixDQUFDLFNBQUQsRUFBWSxTQUFaLENBSlEsQ0FERztBQU9kLE1BQUEsZUFBZSxFQUFFO0FBUEg7QUFEWjtBQVR3QixDQUFYLENBQXhCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9HcmFuaW0uanMnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gR3JhbmltKG9wdGlvbnMpIHtcblx0dmFyIGRvZXNHcmFkaWVudFVzZU9wYWNpdHk7XG5cdHRoaXMuZ2V0RWxlbWVudChvcHRpb25zLmVsZW1lbnQpO1xuXHR0aGlzLngxID0gMDtcblx0dGhpcy55MSA9IDA7XG5cdHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCBmYWxzZTtcblx0dGhpcy5lbFRvU2V0Q2xhc3NPbiA9IG9wdGlvbnMuZWxUb1NldENsYXNzT24gfHwgJ2JvZHknO1xuXHR0aGlzLmRpcmVjdGlvbiA9IG9wdGlvbnMuZGlyZWN0aW9uIHx8ICdkaWFnb25hbCc7XG5cdHRoaXMuaXNQYXVzZWRXaGVuTm90SW5WaWV3ID0gb3B0aW9ucy5pc1BhdXNlZFdoZW5Ob3RJblZpZXcgfHwgZmFsc2U7XG5cdHRoaXMub3BhY2l0eSA9IG9wdGlvbnMub3BhY2l0eTtcblx0dGhpcy5zdGF0ZXMgPSBvcHRpb25zLnN0YXRlcztcblx0dGhpcy5zdGF0ZVRyYW5zaXRpb25TcGVlZCA9IG9wdGlvbnMuc3RhdGVUcmFuc2l0aW9uU3BlZWQgfHwgMTAwMDtcblx0dGhpcy5wcmV2aW91c1RpbWVTdGFtcCA9IG51bGw7XG5cdHRoaXMucHJvZ3Jlc3MgPSAwO1xuXHR0aGlzLmlzUGF1c2VkID0gZmFsc2U7XG5cdHRoaXMuaXNDbGVhcmVkID0gZmFsc2U7XG5cdHRoaXMuaXNQYXVzZWRCZWNhdXNlTm90SW5WaWV3ID0gZmFsc2U7XG5cdHRoaXMuaXNjdXJyZW50Q29sb3JzU2V0ID0gZmFsc2U7XG5cdHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cdHRoaXMuY2hhbm5lbHMgPSB7fTtcblx0dGhpcy5jaGFubmVsc0luZGV4ID0gMDtcblx0dGhpcy5hY3RpdmVTdGF0ZSA9IG9wdGlvbnMuZGVmYXVsdFN0YXRlTmFtZSB8fCAnZGVmYXVsdC1zdGF0ZSc7XG5cdHRoaXMuaXNDaGFuZ2luZ1N0YXRlID0gZmFsc2U7XG5cdHRoaXMuYWN0aXZlQ29sb3JzID0gW107XG5cdHRoaXMuYWN0aXZlQ29sb3JEaWZmID0gW107XG5cdHRoaXMuYWN0aXZldHJhbnNpdGlvblNwZWVkID0gbnVsbDtcblx0dGhpcy5jdXJyZW50Q29sb3JzID0gW107XG5cdHRoaXMuZXZlbnRQb2x5ZmlsbCgpO1xuXHR0aGlzLnNjcm9sbERlYm91bmNlVGhyZXNob2xkID0gb3B0aW9ucy5zY3JvbGxEZWJvdW5jZVRocmVzaG9sZCB8fCAzMDA7XG5cdHRoaXMuc2Nyb2xsRGVib3VuY2VUaW1lb3V0ID0gbnVsbDtcblx0dGhpcy5pc0ltZ0xvYWRlZCA9IGZhbHNlO1xuXHR0aGlzLmlzQ2FudmFzSW5XaW5kb3dWaWV3ID0gZmFsc2U7XG5cdHRoaXMuZmlyc3RTY3JvbGxJbml0ID0gdHJ1ZTtcblx0dGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcblx0aWYgKG9wdGlvbnMuaW1hZ2UgJiYgb3B0aW9ucy5pbWFnZS5zb3VyY2UpIHtcblx0XHR0aGlzLmltYWdlID0ge1xuXHRcdFx0c291cmNlOiBvcHRpb25zLmltYWdlLnNvdXJjZSxcblx0XHRcdHBvc2l0aW9uOiBvcHRpb25zLmltYWdlLnBvc2l0aW9uIHx8IFsnY2VudGVyJywgJ2NlbnRlciddLFxuXHRcdFx0c3RyZXRjaE1vZGU6IG9wdGlvbnMuaW1hZ2Uuc3RyZXRjaE1vZGUgfHwgZmFsc2UsXG5cdFx0XHRibGVuZGluZ01vZGU6IG9wdGlvbnMuaW1hZ2UuYmxlbmRpbmdNb2RlIHx8IGZhbHNlXG5cdFx0fTtcblx0fVxuXHRkb2VzR3JhZGllbnRVc2VPcGFjaXR5ID0gdGhpcy5vcGFjaXR5Lm1hcChmdW5jdGlvbihlbCkge3JldHVybiBlbCAhPT0gMX0pXG5cdFx0LmluZGV4T2YodHJ1ZSkgIT09IC0xO1xuXHR0aGlzLnNob3VsZENsZWFyQ2FudmFzT25FYWNoRnJhbWUgPSAhIXRoaXMuaW1hZ2UgfHwgZG9lc0dyYWRpZW50VXNlT3BhY2l0eTtcblx0dGhpcy5ldmVudHMgPSB7XG5cdFx0c3RhcnQ6IG5ldyBDdXN0b21FdmVudCgnZ3JhbmltOnN0YXJ0JyksXG5cdFx0ZW5kOiBuZXcgQ3VzdG9tRXZlbnQoJ2dyYW5pbTplbmQnKSxcblx0XHRncmFkaWVudENoYW5nZTogZnVuY3Rpb24oZGV0YWlscykge1xuXHRcdFx0cmV0dXJuIG5ldyBDdXN0b21FdmVudCgnZ3JhbmltOmdyYWRpZW50Q2hhbmdlJywge1xuXHRcdFx0XHRkZXRhaWw6IHtcblx0XHRcdFx0XHRpc0xvb3Bpbmc6IGRldGFpbHMuaXNMb29waW5nLFxuXHRcdFx0XHRcdGNvbG9yc0Zyb206IGRldGFpbHMuY29sb3JzRnJvbSxcblx0XHRcdFx0XHRjb2xvcnNUbzogZGV0YWlscy5jb2xvcnNUbyxcblx0XHRcdFx0XHRhY3RpdmVTdGF0ZTogZGV0YWlscy5hY3RpdmVTdGF0ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRidWJibGVzOiBmYWxzZSxcblx0XHRcdFx0Y2FuY2VsYWJsZTogZmFsc2Vcblx0XHRcdH0pXG5cdFx0fVxuXHR9O1xuXHR0aGlzLmNhbGxiYWNrcyA9IHtcblx0XHRvblN0YXJ0OiB0eXBlb2Ygb3B0aW9ucy5vblN0YXJ0ID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5vblN0YXJ0IDogZmFsc2UsXG5cdFx0b25HcmFkaWVudENoYW5nZTogdHlwZW9mIG9wdGlvbnMub25HcmFkaWVudENoYW5nZSA9PT0gJ2Z1bmN0aW9uJyA/XG5cdFx0XHRvcHRpb25zLm9uR3JhZGllbnRDaGFuZ2UgOlxuXHRcdFx0ZmFsc2UsXG5cdFx0b25FbmQ6IHR5cGVvZiBvcHRpb25zLm9uRW5kID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5vbkVuZCA6IGZhbHNlXG5cdH07XG5cdHRoaXMuZ2V0RGltZW5zaW9ucygpO1xuXHR0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdGhpcy54MSk7XG5cdHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy55MSk7XG5cdHRoaXMuc2V0Q29sb3JzKCk7XG5cblx0aWYgKHRoaXMuaW1hZ2UpIHtcblx0XHR0aGlzLnZhbGlkYXRlSW5wdXQoJ2ltYWdlJyk7XG5cdFx0dGhpcy5wcmVwYXJlSW1hZ2UoKTtcblx0fVxuXG5cdHRoaXMucGF1c2VXaGVuTm90SW5WaWV3TmFtZVNwYWNlID0gdGhpcy5wYXVzZVdoZW5Ob3RJblZpZXcuYmluZCh0aGlzKTtcblx0dGhpcy5zZXRTaXplQXR0cmlidXRlc05hbWVTcGFjZSA9IHRoaXMuc2V0U2l6ZUF0dHJpYnV0ZXMuYmluZCh0aGlzKTtcblx0dGhpcy5vblJlc2l6ZSgpO1xuXG5cdGlmICh0aGlzLmlzUGF1c2VkV2hlbk5vdEluVmlldykge1xuXHRcdHRoaXMub25TY3JvbGwoKTtcblx0fSBlbHNlIHtcblx0XHRpZiAoIXRoaXMuaW1hZ2UpIHtcblx0XHRcdHRoaXMucmVmcmVzaENvbG9ycygpO1xuXHRcdFx0dGhpcy5hbmltYXRpb24gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlQ29sb3JzLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdC8vIENhbGxiYWNrIGFuZCBFdmVudFxuXHRpZiAodGhpcy5jYWxsYmFja3Mub25TdGFydCkgdGhpcy5jYWxsYmFja3Mub25TdGFydCgpO1xuXHR0aGlzLmNhbnZhcy5kaXNwYXRjaEV2ZW50KHRoaXMuZXZlbnRzLnN0YXJ0KTtcbn1cblxuR3JhbmltLnByb3RvdHlwZS5vblJlc2l6ZSA9IHJlcXVpcmUoJy4vb25SZXNpemUuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5vblNjcm9sbCA9IHJlcXVpcmUoJy4vb25TY3JvbGwuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS52YWxpZGF0ZUlucHV0ID0gcmVxdWlyZSgnLi92YWxpZGF0ZUlucHV0LmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUudHJpZ2dlckVycm9yID0gcmVxdWlyZSgnLi90cmlnZ2VyRXJyb3IuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5wcmVwYXJlSW1hZ2UgPSByZXF1aXJlKCcuL3ByZXBhcmVJbWFnZS5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLmV2ZW50UG9seWZpbGwgPSByZXF1aXJlKCcuL2V2ZW50UG9seWZpbGwuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5jb2xvckRpZmYgPSByZXF1aXJlKCcuL2NvbG9yRGlmZi5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLmhleFRvUmdiID0gcmVxdWlyZSgnLi9oZXhUb1JnYi5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLnNldERpcmVjdGlvbiA9IHJlcXVpcmUoJy4vc2V0RGlyZWN0aW9uLmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuc2V0Q29sb3JzID0gcmVxdWlyZSgnLi9zZXRDb2xvcnMuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5nZXRFbGVtZW50ID0gcmVxdWlyZSgnLi9nZXRFbGVtZW50LmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuZ2V0RGltZW5zaW9ucyA9IHJlcXVpcmUoJy4vZ2V0RGltZW5zaW9ucy5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLmdldExpZ2h0bmVzcyA9IHJlcXVpcmUoJy4vZ2V0TGlnaHRuZXNzLmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuZ2V0Q3VycmVudENvbG9ycyA9IHJlcXVpcmUoJy4vZ2V0Q3VycmVudENvbG9ycy5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLmFuaW1hdGVDb2xvcnMgPSByZXF1aXJlKCcuL2FuaW1hdGVDb2xvcnMuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5yZWZyZXNoQ29sb3JzID0gcmVxdWlyZSgnLi9yZWZyZXNoQ29sb3JzLmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUubWFrZUdyYWRpZW50ID0gcmVxdWlyZSgnLi9tYWtlR3JhZGllbnQuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5wYXVzZSA9IHJlcXVpcmUoJy4vcGF1c2UuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5wbGF5ID0gcmVxdWlyZSgnLi9wbGF5LmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuY2xlYXIgPSByZXF1aXJlKCcuL2NsZWFyLmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuZGVzdHJveSA9IHJlcXVpcmUoJy4vZGVzdHJveS5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLnBhdXNlV2hlbk5vdEluVmlldyA9IHJlcXVpcmUoJy4vcGF1c2VXaGVuTm90SW5WaWV3LmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuc2V0U2l6ZUF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL3NldFNpemVBdHRyaWJ1dGVzLmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuY2hhbmdlRGlyZWN0aW9uID0gcmVxdWlyZSgnLi9jaGFuZ2VEaXJlY3Rpb24uanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5jaGFuZ2VCbGVuZGluZ01vZGUgPSByZXF1aXJlKCcuL2NoYW5nZUJsZW5kaW5nTW9kZS5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLmNoYW5nZVN0YXRlID0gcmVxdWlyZSgnLi9jaGFuZ2VTdGF0ZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYW5pbTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aW1lc3RhbXApIHtcblx0dmFyIHdhc1dpbmRvd0lkbGVkID0gdGltZXN0YW1wIC0gdGhpcy5wcmV2aW91c1RpbWVTdGFtcCA+IDEwMDtcblx0dmFyIGlzTG9vcCA9IHRoaXMuc3RhdGVzW3RoaXMuYWN0aXZlU3RhdGVdLmxvb3AgIT09IHVuZGVmaW5lZCA/IHRoaXMuc3RhdGVzW3RoaXMuYWN0aXZlU3RhdGVdLmxvb3AgOiB0cnVlO1xuXHR2YXIgcHJvZ3Jlc3NQZXJjZW50LCBpc0xvb3BpbmcsIG5leHRHcmFkaWVudDtcblxuXHQvLyBJZiB0YWIgd2FzIGluYWN0aXZlIHRoZW4gcmVzdW1lZCwgcmVzZXQgdGhlIHByZXZpb3VzIHRpbWVzdGFtcFxuXHRpZiAodGhpcy5wcmV2aW91c1RpbWVTdGFtcCA9PT0gbnVsbCB8fCB3YXNXaW5kb3dJZGxlZCkge1xuXHRcdHRoaXMucHJldmlvdXNUaW1lU3RhbXAgPSB0aW1lc3RhbXA7XG5cdH1cblxuXHQvLyBDb21wdXRlIHByb2dyZXNzIGFuZCBzYXZlIHRoZSB0aW1lc3RhbXBcblx0dGhpcy5wcm9ncmVzcyA9IHRoaXMucHJvZ3Jlc3MgKyAodGltZXN0YW1wIC0gdGhpcy5wcmV2aW91c1RpbWVTdGFtcCk7XG5cdHByb2dyZXNzUGVyY2VudCA9ICh0aGlzLnByb2dyZXNzIC8gdGhpcy5hY3RpdmV0cmFuc2l0aW9uU3BlZWQgKiAxMDApLnRvRml4ZWQoMik7XG5cdHRoaXMucHJldmlvdXNUaW1lU3RhbXAgPSB0aW1lc3RhbXA7XG5cblx0Ly8gU2V0IHRoZSBuZXcgZ3JhZGllbnQgY29sb3JzIGluIGEgcHJvcGVydHlcblx0dGhpcy5yZWZyZXNoQ29sb3JzKHByb2dyZXNzUGVyY2VudCk7XG5cblx0Ly8gQ29udGludWUgdGhlIGFuaW1hdGlvbiBvciBwcmVwYXJlIGZvciB0aGUgbmV4dCBvbmVcblx0aWYgKHByb2dyZXNzUGVyY2VudCA8IDEwMCkge1xuXHRcdHRoaXMuYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZUNvbG9ycy5iaW5kKHRoaXMpKTtcblxuXHR9IGVsc2Uge1xuXHRcdC8vIGlmIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBpbmRleCBpcyBpbmZlcmlvciB0byB0aGUgcGVudWx0aW1hdGUgZ3JhZGllbnRcblx0XHQvLyBvciB0byB0aGUgbGFzdCBncmFkaWVudCB3aXRoIHRoZSBsb29wIG1vZGUgYWN0aXZhdGVkXG5cdFx0aWYgKHRoaXMuY2hhbm5lbHNJbmRleCA8IHRoaXMuc3RhdGVzW3RoaXMuYWN0aXZlU3RhdGVdLmdyYWRpZW50cy5sZW5ndGggLSAyIHx8IGlzTG9vcCkge1xuXG5cdFx0XHQvLyBTZXQgdGhlIGFjdGl2ZSB0cmFuc2l0aW9uIHNwZWVkIHRvIHRoZSBhY3RpdmUgc3RhdGUgb25lIGFmdGVyIGNoYW5naW5nIHN0YXRlXG5cdFx0XHRpZiAodGhpcy5pc0NoYW5naW5nU3RhdGUpIHtcblx0XHRcdFx0dGhpcy5hY3RpdmV0cmFuc2l0aW9uU3BlZWQgPSB0aGlzLnN0YXRlc1t0aGlzLmFjdGl2ZVN0YXRlXS50cmFuc2l0aW9uU3BlZWQgfHwgNTAwMDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVzZXR0aW5nIHByb3BlcnRpZXNcblx0XHRcdHRoaXMucHJldmlvdXNUaW1lU3RhbXAgPSBudWxsO1xuXHRcdFx0dGhpcy5wcm9ncmVzcyA9IDA7XG5cdFx0XHR0aGlzLmNoYW5uZWxzSW5kZXgrKztcblx0XHRcdGlzTG9vcGluZyA9IGZhbHNlO1xuXG5cdFx0XHQvLyBJZiBpdCdzIGdvaW5nIHRvIGxvb3Agb3IgaWYgaXQncyB0aGUgdHJhbnNpdGlvbiBhZnRlciB0aGUgbG9vcFxuXHRcdFx0aWYgKHRoaXMuY2hhbm5lbHNJbmRleCA9PT0gdGhpcy5zdGF0ZXNbdGhpcy5hY3RpdmVTdGF0ZV0uZ3JhZGllbnRzLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0aXNMb29waW5nID0gdHJ1ZTtcblx0XHRcdFx0XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuY2hhbm5lbHNJbmRleCA9PT0gdGhpcy5zdGF0ZXNbdGhpcy5hY3RpdmVTdGF0ZV0uZ3JhZGllbnRzLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLmNoYW5uZWxzSW5kZXggPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaGVja2luZyB0aGUgbmV4dCBncmFkaWVudCB0byBzZW5kIGluIGFyZ3Mgb2YgYW4gZXZlbnQgYW5kIGEgY2FsbGJhY2tcblx0XHRcdG5leHRHcmFkaWVudCA9IHRoaXMuc3RhdGVzW3RoaXMuYWN0aXZlU3RhdGVdLmdyYWRpZW50c1t0aGlzLmNoYW5uZWxzSW5kZXggKyAxXSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdFx0dGhpcy5zdGF0ZXNbdGhpcy5hY3RpdmVTdGF0ZV0uZ3JhZGllbnRzWzBdIDpcblx0XHRcdFx0dGhpcy5zdGF0ZXNbdGhpcy5hY3RpdmVTdGF0ZV0uZ3JhZGllbnRzW3RoaXMuY2hhbm5lbHNJbmRleCArIDFdO1xuXG5cdFx0XHQvLyBDb21wdXRlIHRoZSBjb2xvcnMgZm9yIHRoZSB0cmFuc2l0aW9uIGFuZCByZW5kZXIgYSBuZXcgZnJhbWVcblx0XHRcdHRoaXMuc2V0Q29sb3JzKCk7XG5cdFx0XHR0aGlzLmFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGVDb2xvcnMuYmluZCh0aGlzKSk7XG5cdFx0XHRcblx0XHRcdC8vIENhbGxiYWNrIGFuZCBFdmVudFxuXHRcdFx0aWYgKHRoaXMuY2FsbGJhY2tzLm9uR3JhZGllbnRDaGFuZ2UpIHRoaXMuY2FsbGJhY2tzLm9uR3JhZGllbnRDaGFuZ2Uoe1xuXHRcdFx0XHRpc0xvb3Bpbmc6IGlzTG9vcGluZyxcblx0XHRcdFx0Y29sb3JzRnJvbTogdGhpcy5zdGF0ZXNbdGhpcy5hY3RpdmVTdGF0ZV0uZ3JhZGllbnRzW3RoaXMuY2hhbm5lbHNJbmRleF0sXG5cdFx0XHRcdGNvbG9yc1RvOiBuZXh0R3JhZGllbnQsXG5cdFx0XHRcdGFjdGl2ZVN0YXRlOiB0aGlzLmFjdGl2ZVN0YXRlXG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5jYW52YXMuZGlzcGF0Y2hFdmVudCh0aGlzLmV2ZW50cy5ncmFkaWVudENoYW5nZSh7XG5cdFx0XHRcdFx0aXNMb29waW5nOiBpc0xvb3BpbmcsXG5cdFx0XHRcdFx0Y29sb3JzRnJvbTogdGhpcy5zdGF0ZXNbdGhpcy5hY3RpdmVTdGF0ZV0uZ3JhZGllbnRzW3RoaXMuY2hhbm5lbHNJbmRleF0sXG5cdFx0XHRcdFx0Y29sb3JzVG86IG5leHRHcmFkaWVudCxcblx0XHRcdFx0XHRhY3RpdmVTdGF0ZTogdGhpcy5hY3RpdmVTdGF0ZVxuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblxuXHRcdC8vIEVsc2UgaWYgaXQgd2FzIHRoZSBsYXN0IGdyYWRpZW50IG9uIHRoZSBsaXN0IGFuZCB0aGUgbG9vcCBtb2RlIGlzIG9mZlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbik7XG5cblx0XHRcdC8vIENhbGxiYWNrIGFuZCBFdmVudFxuXHRcdFx0aWYgKHRoaXMuY2FsbGJhY2tzLm9uRW5kKSB0aGlzLmNhbGxiYWNrcy5vbkVuZCgpO1xuXHRcdFx0dGhpcy5jYW52YXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2dyYW5pbTplbmQnKSk7XG5cdFx0fVxuXHR9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5ld0JsZW5kaW5nTW9kZSkge1xuXHR0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMueDEsIHRoaXMueTEpO1xuXHR0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID1cblx0XHR0aGlzLmltYWdlLmJsZW5kaW5nTW9kZSA9IG5ld0JsZW5kaW5nTW9kZTtcblx0dGhpcy52YWxpZGF0ZUlucHV0KCdibGVuZGluZ01vZGUnKTtcblx0aWYgKHRoaXMuaXNQYXVzZWQpIHRoaXMucmVmcmVzaENvbG9ycygpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuZXdEaXJlY3Rpb24pIHtcblx0dGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLngxLCB0aGlzLnkxKTtcblx0dGhpcy5kaXJlY3Rpb24gPSBuZXdEaXJlY3Rpb247XG5cdHRoaXMudmFsaWRhdGVJbnB1dCgnZGlyZWN0aW9uJyk7XG5cdGlmICh0aGlzLmlzUGF1c2VkKSB0aGlzLnJlZnJlc2hDb2xvcnMoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RhdGUpIHtcblx0dmFyIF90aGlzID0gdGhpcztcblx0dmFyIG5leHRDb2xvcnMsIGNvbG9yRGlmZjtcblxuXHQvLyBQcmV2ZW50IHRyYW5zaXRpb25pbmcgdG8gdGhlIHNhbWUgc3RhdGVcblx0aWYgKHRoaXMuYWN0aXZlU3RhdGUgPT09IHN0YXRlKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gU2V0dGluZyB0aGUgZ29vZCBwcm9wZXJ0aWVzIGZvciB0aGUgdHJhbnNpdGlvblxuXHRpZiAoIXRoaXMuaXNQYXVzZWQpIHtcblx0XHR0aGlzLmlzUGF1c2VkID0gdHJ1ZTtcblx0XHR0aGlzLnBhdXNlKCk7XG5cdH1cblxuXHR0aGlzLmNoYW5uZWxzSW5kZXggPSAtMTtcblx0dGhpcy5hY3RpdmV0cmFuc2l0aW9uU3BlZWQgPSB0aGlzLnN0YXRlVHJhbnNpdGlvblNwZWVkO1xuXHR0aGlzLmFjdGl2ZUNvbG9yRGlmZiA9IFtdO1xuXHR0aGlzLmFjdGl2ZUNvbG9ycyA9IHRoaXMuZ2V0Q3VycmVudENvbG9ycygpO1xuXHR0aGlzLnByb2dyZXNzID0gMDtcblx0dGhpcy5wcmV2aW91c1RpbWVTdGFtcCA9IG51bGw7XG5cdHRoaXMuaXNDaGFuZ2luZ1N0YXRlID0gdHJ1ZTtcblxuXHQvLyBDb21wdXRlIHRoZSBncmFkaWVudCBkaWZmIGJldHdlZW4gdGhlIGxhc3QgZnJhbWUgZ3JhZGllbnRcblx0Ly8gYW5kIHRoZSBmaXJzdCBvbmUgb2YgdGhlIG5ldyBzdGF0ZVxuXHR0aGlzLnN0YXRlc1tzdGF0ZV0uZ3JhZGllbnRzWzBdLmZvckVhY2goZnVuY3Rpb24oY29sb3IsIGksIGFycikge1xuXHRcdG5leHRDb2xvcnMgPSBfdGhpcy5oZXhUb1JnYihfdGhpcy5zdGF0ZXNbc3RhdGVdLmdyYWRpZW50c1swXVtpXSk7XG5cdFx0Y29sb3JEaWZmID0gX3RoaXMuY29sb3JEaWZmKF90aGlzLmFjdGl2ZUNvbG9yc1tpXSwgbmV4dENvbG9ycyk7XG5cdFx0X3RoaXMuYWN0aXZlQ29sb3JEaWZmLnB1c2goY29sb3JEaWZmKTtcblx0fSk7XG5cblx0Ly8gU3RhcnQgdGhlIGFuaW1hdGlvblxuXHR0aGlzLmFjdGl2ZVN0YXRlID0gc3RhdGU7XG5cdHRoaXMucGxheSgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0aWYgKCF0aGlzLmlzUGF1c2VkKSB7XG5cdFx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb24pO1xuXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xuXHR9XG5cdHRoaXMuaXNDbGVhcmVkID0gdHJ1ZTtcblx0dGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLngxLCB0aGlzLnkxKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29sb3JBLCBjb2xvckIpIHtcblx0dmFyIGk7XG5cdHZhciBjb2xvckRpZmYgPSBbXTtcblxuXHRmb3IgKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0Y29sb3JEaWZmLnB1c2goY29sb3JCW2ldIC0gY29sb3JBW2ldKVxuXHR9XG5cblx0cmV0dXJuIGNvbG9yRGlmZjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMub25SZXNpemUoJ3JlbW92ZUxpc3RlbmVycycpO1xuXHR0aGlzLm9uU2Nyb2xsKCdyZW1vdmVMaXN0ZW5lcnMnKTtcblx0dGhpcy5jbGVhcigpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0aWYgKCB0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIgKSByZXR1cm47XG5cblx0ZnVuY3Rpb24gQ3VzdG9tRXZlbnQgKGV2ZW50LCBwYXJhbXMpIHtcblx0XHRwYXJhbXMgPSBwYXJhbXMgfHwgeyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkIH07XG5cdFx0dmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG5cdFx0cmV0dXJuIGV2dDtcblx0fVxuXG5cdEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG5cblx0d2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgaSwgajtcblx0dmFyIGN1cnJlbnRDb2xvcnMgPSBbXTtcblxuXHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50Q29sb3JzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y3VycmVudENvbG9ycy5wdXNoKFtdKTtcblx0XHRmb3IgKGogPSAwOyBqIDwgMzsgaisrKSB7Y3VycmVudENvbG9yc1tpXS5wdXNoKHRoaXMuY3VycmVudENvbG9yc1tpXVtqXSl9XG5cdH1cblxuXHQvLyBSZXR1cm4gYSBkZWVwIGNvcHkgb2YgdGhlIGN1cnJlbnQgY29sb3JzXG5cdHJldHVybiBjdXJyZW50Q29sb3JzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dGhpcy54MSA9IHRoaXMuY2FudmFzLm9mZnNldFdpZHRoO1xuXHR0aGlzLnkxID0gdGhpcy5jYW52YXMub2Zmc2V0SGVpZ2h0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbGVtZW50KSB7XG5cdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpIHtcblx0XHR0aGlzLmNhbnZhcyA9IGVsZW1lbnQ7XG5cblx0fSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHRoaXMuY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcblxuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcignVGhlIGVsZW1lbnQgeW91IHVzZWQgaXMgbmVpdGhlciBhIFN0cmluZywgbm9yIGEgSFRNTENhbnZhc0VsZW1lbnQnKTtcblx0fVxuXG5cdGlmICghdGhpcy5jYW52YXMpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2AnICsgZWxlbWVudCArICdgIGNvdWxkIG5vdCBiZSBmb3VuZCBpbiB0aGUgRE9NJyk7XG5cdH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHZhciBjdXJyZW50Q29sb3JzID0gdGhpcy5nZXRDdXJyZW50Q29sb3JzKCk7XG5cdHZhciBncmFkaWVudEF2ZXJhZ2UgPSBudWxsO1xuXHR2YXIgbGlnaHRuZXNzQXZlcmFnZSwgaTtcblx0dmFyIGNvbG9yc0F2ZXJhZ2UgPSBjdXJyZW50Q29sb3JzLm1hcChmdW5jdGlvbihlbCkge1xuXHRcdC8vIENvbXB1dGUgdGhlIGF2ZXJhZ2UgbGlnaHRuZXNzIG9mIGVhY2ggY29sb3Jcblx0XHQvLyBpbiB0aGUgY3VycmVudCBncmFkaWVudFxuXHRcdHJldHVybiBNYXRoLm1heChlbFswXSwgZWxbMV0sIGVsWzJdKTtcblx0fSk7XG5cblx0Zm9yIChpID0gMDsgaSA8IGNvbG9yc0F2ZXJhZ2UubGVuZ3RoOyBpKyspIHtcblx0XHQvLyBBZGQgYWxsIHRoZSBhdmVyYWdlIGxpZ2h0bmVzcyBvZiBlYWNoIGNvbG9yXG5cdFx0Z3JhZGllbnRBdmVyYWdlID0gZ3JhZGllbnRBdmVyYWdlID09PSBudWxsID9cblx0XHRcdGNvbG9yc0F2ZXJhZ2VbaV0gOiBncmFkaWVudEF2ZXJhZ2UgKyBjb2xvcnNBdmVyYWdlW2ldO1xuXG5cdFx0aWYgKGkgPT09IGNvbG9yc0F2ZXJhZ2UubGVuZ3RoIC0gMSkge1xuXHRcdFx0Ly8gaWYgaXQncyB0aGUgbGFzdCBsaWdodG5lc3MgYXZlcmFnZVxuXHRcdFx0Ly8gZGl2aWRlIGl0IGJ5IHRoZSB0b3RhbCBsZW5ndGggdG9cblx0XHRcdC8vIGhhdmUgdGhlIGdsb2JhbCBhdmVyYWdlIGxpZ2h0bmVzc1xuXHRcdFx0bGlnaHRuZXNzQXZlcmFnZSA9IE1hdGgucm91bmQoZ3JhZGllbnRBdmVyYWdlIC8gKGkgKyAxKSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGxpZ2h0bmVzc0F2ZXJhZ2UgPj0gMTI4ID8gJ2xpZ2h0JyA6ICdkYXJrJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaGV4KSB7XG5cdC8vIEV4cGFuZCBzaG9ydGhhbmQgZm9ybSAoZS5nLiBcIjAzRlwiKSB0byBmdWxsIGZvcm0gKGUuZy4gXCIwMDMzRkZcIilcblx0dmFyIHNob3J0aGFuZFJlZ2V4ID0gL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaTtcblx0aGV4ID0gaGV4LnJlcGxhY2Uoc2hvcnRoYW5kUmVnZXgsIGZ1bmN0aW9uKG0sIHIsIGcsIGIpIHtcblx0XHRyZXR1cm4gciArIHIgKyBnICsgZyArIGIgKyBiO1xuXHR9KTtcblxuXHR2YXIgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG5cdHJldHVybiByZXN1bHQgPyBbXG5cdFx0cGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG5cdFx0cGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG5cdFx0cGFyc2VJbnQocmVzdWx0WzNdLCAxNilcblx0XSA6IG51bGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgaSwgY29sb3JQb3NpdGlvbjtcblx0dmFyIGdyYWRpZW50ID0gdGhpcy5zZXREaXJlY3Rpb24oKTtcblx0dmFyIGVsVG9TZXRDbGFzc09uQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZWxUb1NldENsYXNzT24pLmNsYXNzTGlzdDtcblxuXHRpZiAodGhpcy5zaG91bGRDbGVhckNhbnZhc09uRWFjaEZyYW1lKSB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMueDEsIHRoaXMueTEpO1xuXG5cdGlmICh0aGlzLmltYWdlKSB7XG5cdFx0dGhpcy5jb250ZXh0LmRyYXdJbWFnZShcblx0XHRcdHRoaXMuaW1hZ2VOb2RlLFxuXHRcdFx0dGhpcy5pbWFnZVBvc2l0aW9uLngsXG5cdFx0XHR0aGlzLmltYWdlUG9zaXRpb24ueSxcblx0XHRcdHRoaXMuaW1hZ2VQb3NpdGlvbi53aWR0aCxcblx0XHRcdHRoaXMuaW1hZ2VQb3NpdGlvbi5oZWlnaHRcblx0XHQpO1xuXHR9XG5cblx0Zm9yIChpID0gMDsgaSA8IHRoaXMuY3VycmVudENvbG9ycy5sZW5ndGg7IGkrKykge1xuXHRcdC8vIEVuc3VyZSBmaXJzdCBhbmQgbGFzdCBwb3NpdGlvbiB0byBiZSAwIGFuZCAxMDBcblx0XHRjb2xvclBvc2l0aW9uID0gIWkgPyAwIDogKCgxIC8gKHRoaXMuY3VycmVudENvbG9ycy5sZW5ndGggLSAxKSkgKiBpKS50b0ZpeGVkKDIpO1xuXG5cdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKGNvbG9yUG9zaXRpb24sICdyZ2JhKCcgK1xuXHRcdFx0dGhpcy5jdXJyZW50Q29sb3JzW2ldWzBdICsgJywgJyArXG5cdFx0XHR0aGlzLmN1cnJlbnRDb2xvcnNbaV1bMV0gKyAnLCAnICtcblx0XHRcdHRoaXMuY3VycmVudENvbG9yc1tpXVsyXSArICcsICcgK1xuXHRcdFx0dGhpcy5vcGFjaXR5W2ldICsgJyknXG5cdFx0KTtcblx0fVxuXG5cdGlmICh0aGlzLm5hbWUpIHtcblx0XHRpZiAodGhpcy5nZXRMaWdodG5lc3MoKSA9PT0gJ2xpZ2h0Jykge1xuXHRcdFx0ZWxUb1NldENsYXNzT25DbGFzcy5yZW1vdmUodGhpcy5uYW1lICsgJy1kYXJrJyk7XG5cdFx0XHRlbFRvU2V0Q2xhc3NPbkNsYXNzLmFkZCh0aGlzLm5hbWUgKyAnLWxpZ2h0Jyk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWxUb1NldENsYXNzT25DbGFzcy5yZW1vdmUodGhpcy5uYW1lICsgJy1saWdodCcpO1xuXHRcdFx0ZWxUb1NldENsYXNzT25DbGFzcy5hZGQodGhpcy5uYW1lICsgJy1kYXJrJyk7XG5cdFx0fVxuXHR9XG5cblx0dGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuXHR0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy54MSwgdGhpcy55MSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHR5cGUpIHtcblx0aWYgKHR5cGUgPT09ICdyZW1vdmVMaXN0ZW5lcnMnKSB7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2V0U2l6ZUF0dHJpYnV0ZXNOYW1lU3BhY2UpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNldFNpemVBdHRyaWJ1dGVzTmFtZVNwYWNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odHlwZSkge1xuXHRpZiAodHlwZSA9PT0gJ3JlbW92ZUxpc3RlbmVycycpIHtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5wYXVzZVdoZW5Ob3RJblZpZXdOYW1lU3BhY2UpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnBhdXNlV2hlbk5vdEluVmlld05hbWVTcGFjZSk7XG5cdHRoaXMucGF1c2VXaGVuTm90SW5WaWV3TmFtZVNwYWNlKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0YXRlKSB7XG5cdHZhciBpc1BhdXNlZEJlY2F1c2VOb3RJblZpZXcgPSBzdGF0ZSA9PT0gJ2lzUGF1c2VkQmVjYXVzZU5vdEluVmlldyc7XG5cdGlmICh0aGlzLmlzQ2xlYXJlZCkgcmV0dXJuO1xuXHRpZiAoIWlzUGF1c2VkQmVjYXVzZU5vdEluVmlldykgdGhpcy5pc1BhdXNlZCA9IHRydWU7XG5cdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uKTtcblx0dGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHZhciBfdGhpcyA9IHRoaXM7XG5cdGlmICh0aGlzLnNjcm9sbERlYm91bmNlVGltZW91dCkgY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsRGVib3VuY2VUaW1lb3V0KTtcblxuXHR0aGlzLnNjcm9sbERlYm91bmNlVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGVsUG9zID0gX3RoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdF90aGlzLmlzQ2FudmFzSW5XaW5kb3dWaWV3ID0gIShlbFBvcy5ib3R0b20gPCAwIHx8IGVsUG9zLnJpZ2h0IDwgMCB8fFxuXHRcdFx0ZWxQb3MubGVmdCA+IHdpbmRvdy5pbm5lcldpZHRoIHx8IGVsUG9zLnRvcCA+IHdpbmRvdy5pbm5lckhlaWdodCk7XG5cblx0XHRpZiAoX3RoaXMuaXNDYW52YXNJbldpbmRvd1ZpZXcpIHtcblx0XHRcdGlmICghX3RoaXMuaXNQYXVzZWQgfHwgX3RoaXMuZmlyc3RTY3JvbGxJbml0KSB7XG5cdFx0XHRcdGlmIChfdGhpcy5pbWFnZSAmJiAhX3RoaXMuaXNJbWdMb2FkZWQpIHtyZXR1cm59XG5cdFx0XHRcdF90aGlzLmlzUGF1c2VkQmVjYXVzZU5vdEluVmlldyA9IGZhbHNlO1xuXHRcdFx0XHRfdGhpcy5wbGF5KCdpc1BsYXllZEJlY2F1c2VJblZpZXcnKTtcblx0XHRcdFx0X3RoaXMuZmlyc3RTY3JvbGxJbml0ID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCFfdGhpcy5pbWFnZSAmJiBfdGhpcy5maXJzdFNjcm9sbEluaXQpIHtcblx0XHRcdFx0X3RoaXMucmVmcmVzaENvbG9ycygpO1xuXHRcdFx0XHRfdGhpcy5maXJzdFNjcm9sbEluaXQgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFfdGhpcy5pc1BhdXNlZCAmJiAhX3RoaXMuaXNQYXVzZWRCZWNhdXNlTm90SW5WaWV3KSB7XG5cdFx0XHRcdF90aGlzLmlzUGF1c2VkQmVjYXVzZU5vdEluVmlldyA9IHRydWU7XG5cdFx0XHRcdF90aGlzLnBhdXNlKCdpc1BhdXNlZEJlY2F1c2VOb3RJblZpZXcnKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHRoaXMuc2Nyb2xsRGVib3VuY2VUaHJlc2hvbGQpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdGF0ZSkge1xuXHR2YXIgaXNQbGF5ZWRCZWNhdXNlSW5WaWV3ID0gc3RhdGUgPT09ICdpc1BsYXllZEJlY2F1c2VJblZpZXcnO1xuXHRpZiAoIWlzUGxheWVkQmVjYXVzZUluVmlldykgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xuXHR0aGlzLmlzQ2xlYXJlZCA9IGZhbHNlO1xuXHRpZiAoIXRoaXMuYW5pbWF0aW5nKSB7XG5cdFx0dGhpcy5hbmltYXRpb24gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlQ29sb3JzLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuYW5pbWF0aW5nID0gdHJ1ZTtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dmFyIF90aGlzID0gdGhpcztcblxuXHRpZiAoIXRoaXMuaW1hZ2VQb3NpdGlvbikge1xuXHRcdHRoaXMuaW1hZ2VQb3NpdGlvbiA9IHsgeDogMCwgeTogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xuXHR9XG5cblx0aWYgKHRoaXMuaW1hZ2UuYmxlbmRpbmdNb2RlKSB7XG5cdFx0dGhpcy5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHRoaXMuaW1hZ2UuYmxlbmRpbmdNb2RlO1xuXHR9XG5cblx0aWYgKHRoaXMuaW1hZ2VOb2RlKSB7XG5cdFx0c2V0SW1hZ2VQb3NpdGlvbigpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHRoaXMuaW1hZ2VOb2RlID0gbmV3IEltYWdlKCk7XG5cdHRoaXMuaW1hZ2VOb2RlLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0dyYW5pbTogVGhlIGltYWdlIHNvdXJjZSBpcyBpbnZhbGlkLicpO1xuXHR9O1xuXHR0aGlzLmltYWdlTm9kZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRfdGhpcy5pbWdPcmlnaW5hbFdpZHRoID0gX3RoaXMuaW1hZ2VOb2RlLndpZHRoO1xuXHRcdF90aGlzLmltZ09yaWdpbmFsSGVpZ2h0ID0gX3RoaXMuaW1hZ2VOb2RlLmhlaWdodDtcblx0XHRzZXRJbWFnZVBvc2l0aW9uKCk7XG5cdFx0X3RoaXMucmVmcmVzaENvbG9ycygpO1xuXHRcdGlmICghX3RoaXMuaXNQYXVzZWRXaGVuTm90SW5WaWV3IHx8IF90aGlzLmlzQ2FudmFzSW5XaW5kb3dWaWV3KSB7XG5cdFx0XHRfdGhpcy5hbmltYXRpb24gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3RoaXMuYW5pbWF0ZUNvbG9ycy5iaW5kKF90aGlzKSk7XG5cdFx0fVxuXHRcdF90aGlzLmlzSW1nTG9hZGVkID0gdHJ1ZTtcblx0fTtcblx0dGhpcy5pbWFnZU5vZGUuc3JjID0gdGhpcy5pbWFnZS5zb3VyY2U7XG5cblx0ZnVuY3Rpb24gc2V0SW1hZ2VQb3NpdGlvbigpIHtcblx0XHR2YXIgaSwgY3VycmVudEF4aXM7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgMjsgaSsrKSB7XG5cdFx0XHRjdXJyZW50QXhpcyA9ICFpID8gJ3gnIDogJ3knO1xuXHRcdFx0c2V0SW1hZ2VBeGlzUG9zaXRpb24oY3VycmVudEF4aXMpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldEltYWdlQXhpc1Bvc2l0aW9uKGF4aXMpIHtcblx0XHRcdHZhciBjYW52YXNXaWR0aE9ySGVpZ2h0ID0gX3RoaXNbYXhpcyArICcxJ107XG5cdFx0XHR2YXIgaW1nT3JpZ2luYWxXaWR0aE9ySGVpZ2h0ID0gX3RoaXNbYXhpcyA9PT0gJ3gnID8gJ2ltZ09yaWdpbmFsV2lkdGgnIDogJ2ltZ09yaWdpbmFsSGVpZ2h0J107XG5cdFx0XHR2YXIgaW1hZ2VBbGlnbkluZGV4ID0gYXhpcyA9PT0gJ3gnID8gX3RoaXMuaW1hZ2UucG9zaXRpb25bMF0gOiBfdGhpcy5pbWFnZS5wb3NpdGlvblsxXTtcblx0XHRcdHZhciBpbWFnZUF4aXNQb3NpdGlvbjtcblx0XHRcdHN3aXRjaCAoaW1hZ2VBbGlnbkluZGV4KSB7XG5cdFx0XHRcdGNhc2UgJ2NlbnRlcic6XG5cdFx0XHRcdFx0aW1hZ2VBeGlzUG9zaXRpb24gPSBpbWdPcmlnaW5hbFdpZHRoT3JIZWlnaHQgPiBjYW52YXNXaWR0aE9ySGVpZ2h0ID9cblx0XHRcdFx0XHQtKGltZ09yaWdpbmFsV2lkdGhPckhlaWdodCAtIGNhbnZhc1dpZHRoT3JIZWlnaHQpIC8gMiA6XG5cdFx0XHRcdFx0KGNhbnZhc1dpZHRoT3JIZWlnaHQgLSBpbWdPcmlnaW5hbFdpZHRoT3JIZWlnaHQpIC8gMjtcblx0XHRcdFx0XHRfdGhpcy5pbWFnZVBvc2l0aW9uW2F4aXNdID0gaW1hZ2VBeGlzUG9zaXRpb247XG5cdFx0XHRcdFx0X3RoaXMuaW1hZ2VQb3NpdGlvbltheGlzID09PSAneCcgPyAnd2lkdGgnIDogJ2hlaWdodCddID0gaW1nT3JpZ2luYWxXaWR0aE9ySGVpZ2h0O1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ3RvcCc6XG5cdFx0XHRcdFx0X3RoaXMuaW1hZ2VQb3NpdGlvblsneSddID0gMDtcblx0XHRcdFx0XHRfdGhpcy5pbWFnZVBvc2l0aW9uWydoZWlnaHQnXSA9IGltZ09yaWdpbmFsV2lkdGhPckhlaWdodDtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdib3R0b20nOlxuXHRcdFx0XHRcdF90aGlzLmltYWdlUG9zaXRpb25bJ3knXSA9IGNhbnZhc1dpZHRoT3JIZWlnaHQgLSBpbWdPcmlnaW5hbFdpZHRoT3JIZWlnaHQ7XG5cdFx0XHRcdFx0X3RoaXMuaW1hZ2VQb3NpdGlvblsnaGVpZ2h0J10gPSBpbWdPcmlnaW5hbFdpZHRoT3JIZWlnaHQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAncmlnaHQnOlxuXHRcdFx0XHRcdF90aGlzLmltYWdlUG9zaXRpb25bJ3gnXSA9IGNhbnZhc1dpZHRoT3JIZWlnaHQgLSBpbWdPcmlnaW5hbFdpZHRoT3JIZWlnaHQ7XG5cdFx0XHRcdFx0X3RoaXMuaW1hZ2VQb3NpdGlvblsnd2lkdGgnXSA9IGltZ09yaWdpbmFsV2lkdGhPckhlaWdodDtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdsZWZ0Jzpcblx0XHRcdFx0XHRfdGhpcy5pbWFnZVBvc2l0aW9uWyd4J10gPSAwO1xuXHRcdFx0XHRcdF90aGlzLmltYWdlUG9zaXRpb25bJ3dpZHRoJ10gPSBpbWdPcmlnaW5hbFdpZHRoT3JIZWlnaHQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChfdGhpcy5pbWFnZS5zdHJldGNoTW9kZSkge1xuXHRcdFx0XHRpbWFnZUFsaWduSW5kZXggPSBheGlzID09PSAneCcgPyBfdGhpcy5pbWFnZS5zdHJldGNoTW9kZVswXSA6IF90aGlzLmltYWdlLnN0cmV0Y2hNb2RlWzFdO1xuXHRcdFx0XHRzd2l0Y2ggKGltYWdlQWxpZ25JbmRleCkge1xuXHRcdFx0XHRcdGNhc2UgJ3N0cmV0Y2gnOlxuXHRcdFx0XHRcdFx0X3RoaXMuaW1hZ2VQb3NpdGlvbltheGlzXSA9IDA7XG5cdFx0XHRcdFx0XHRfdGhpcy5pbWFnZVBvc2l0aW9uW2F4aXMgPT09ICd4JyA/ICd3aWR0aCcgOiAnaGVpZ2h0J10gPSBjYW52YXNXaWR0aE9ySGVpZ2h0O1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdzdHJldGNoLWlmLWJpZ2dlcic6XG5cdFx0XHRcdFx0XHRpZiAoaW1nT3JpZ2luYWxXaWR0aE9ySGVpZ2h0IDwgY2FudmFzV2lkdGhPckhlaWdodCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRfdGhpcy5pbWFnZVBvc2l0aW9uW2F4aXNdID0gMDtcblx0XHRcdFx0XHRcdF90aGlzLmltYWdlUG9zaXRpb25bYXhpcyA9PT0gJ3gnID8gJ3dpZHRoJyA6ICdoZWlnaHQnXSA9IGNhbnZhc1dpZHRoT3JIZWlnaHQ7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJ3N0cmV0Y2gtaWYtc21hbGxlcic6XG5cdFx0XHRcdFx0XHRpZiAoaW1nT3JpZ2luYWxXaWR0aE9ySGVpZ2h0ID4gY2FudmFzV2lkdGhPckhlaWdodCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRfdGhpcy5pbWFnZVBvc2l0aW9uW2F4aXNdID0gMDtcblx0XHRcdFx0XHRcdF90aGlzLmltYWdlUG9zaXRpb25bYXhpcyA9PT0gJ3gnID8gJ3dpZHRoJyA6ICdoZWlnaHQnXSA9IGNhbnZhc1dpZHRoT3JIZWlnaHQ7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwcm9ncmVzc1BlcmNlbnQpIHtcblx0dmFyIF90aGlzID0gdGhpcztcblx0dmFyIGFjdGl2ZUNoYW5uZWwsIGksIGo7XG5cblx0Ly8gTG9vcCB0aHJvdWdoIGVhY2ggY29sb3JzIG9mIHRoZSBhY3RpdmUgZ3JhZGllbnRcblx0Zm9yIChpID0gMDsgaSA8IHRoaXMuYWN0aXZlQ29sb3JzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHQvLyBHZW5lcmF0ZSBSR0IgY29sb3JzXG5cdFx0Zm9yIChqID0gMDsgaiA8IDM7IGorKykge1xuXHRcdFx0YWN0aXZlQ2hhbm5lbCA9IF90aGlzLmFjdGl2ZUNvbG9yc1tpXVtqXSArXG5cdFx0XHRcdE1hdGguY2VpbChfdGhpcy5hY3RpdmVDb2xvckRpZmZbaV1bal0gLyAxMDAgKiBwcm9ncmVzc1BlcmNlbnQpO1xuXG5cdFx0XHQvLyBQcmV2ZW50IGNvbG9ycyB2YWx1ZXMgZnJvbSBnb2luZyA8IDAgJiA+IDI1NVxuXHRcdFx0aWYgKGFjdGl2ZUNoYW5uZWwgPD0gMjU1ICYmIGFjdGl2ZUNoYW5uZWwgPj0gMCkge1xuXHRcdFx0XHRfdGhpcy5jdXJyZW50Q29sb3JzW2ldW2pdID0gYWN0aXZlQ2hhbm5lbDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR0aGlzLm1ha2VHcmFkaWVudCgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dmFyIF90aGlzID0gdGhpcztcblx0dmFyIGNvbG9yRGlmZiwgbmV4dENvbG9ycztcblxuXHRpZiAoIXRoaXMuY2hhbm5lbHNbdGhpcy5hY3RpdmVTdGF0ZV0pIHRoaXMuY2hhbm5lbHNbdGhpcy5hY3RpdmVTdGF0ZV0gPSBbXTtcblxuXHQvLyBJZiB0aGUgYWN0dWFsIGNoYW5uZWwgZXhpc3QsIHJlYXNzaWduIHByb3BlcnRpZXMgYW5kIGV4aXRcblx0Ly8gKGVhY2ggY2hhbm5lbCBpcyBzYXZlZCB0byBwcmV2ZW50IHJlY29tcHV0aW5nIGl0IGVhY2ggdGltZSlcblx0aWYgKHRoaXMuY2hhbm5lbHNbdGhpcy5hY3RpdmVTdGF0ZV1bdGhpcy5jaGFubmVsc0luZGV4XSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhpcy5hY3RpdmVDb2xvcnMgPSB0aGlzLmNoYW5uZWxzW3RoaXMuYWN0aXZlU3RhdGVdW3RoaXMuY2hhbm5lbHNJbmRleF0uY29sb3JzO1xuXHRcdHRoaXMuYWN0aXZlQ29sb3JEaWZmID0gdGhpcy5jaGFubmVsc1t0aGlzLmFjdGl2ZVN0YXRlXVt0aGlzLmNoYW5uZWxzSW5kZXhdLmNvbG9yc0RpZmY7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gU2V0IGJsYW5rIHByb3BlcnRpZXNcblx0dGhpcy5jaGFubmVsc1t0aGlzLmFjdGl2ZVN0YXRlXS5wdXNoKFt7fV0pO1xuXHR0aGlzLmNoYW5uZWxzW3RoaXMuYWN0aXZlU3RhdGVdW3RoaXMuY2hhbm5lbHNJbmRleF0uY29sb3JzID0gW107XG5cdHRoaXMuY2hhbm5lbHNbdGhpcy5hY3RpdmVTdGF0ZV1bdGhpcy5jaGFubmVsc0luZGV4XS5jb2xvcnNEaWZmID0gW107XG5cdHRoaXMuYWN0aXZlQ29sb3JzID0gW107XG5cdHRoaXMuYWN0aXZlQ29sb3JEaWZmID0gW107XG5cblx0Ly8gR28gb24gZWFjaCBncmFkaWVudCBvZiB0aGUgY3VycmVudCBzdGF0ZVxuXHR0aGlzLnN0YXRlc1t0aGlzLmFjdGl2ZVN0YXRlXS5ncmFkaWVudHNbdGhpcy5jaGFubmVsc0luZGV4XS5mb3JFYWNoKGZ1bmN0aW9uKGNvbG9yLCBpKSB7XG5cdFx0Ly8gUHVzaCB0aGUgaGV4IGNvbG9yIGNvbnZlcnRlZCB0byByZ2Igb24gdGhlIGNoYW5uZWwgYW5kIHRoZSBhY3RpdmUgY29sb3IgcHJvcGVydGllc1xuXHRcdHZhciByZ2JDb2xvciA9IF90aGlzLmhleFRvUmdiKGNvbG9yKTtcblx0XHR2YXIgYWN0aXZlQ2hhbm5lbCA9IF90aGlzLmNoYW5uZWxzW190aGlzLmFjdGl2ZVN0YXRlXTtcblxuXHRcdGFjdGl2ZUNoYW5uZWxbX3RoaXMuY2hhbm5lbHNJbmRleF0uY29sb3JzLnB1c2gocmdiQ29sb3IpO1xuXHRcdF90aGlzLmFjdGl2ZUNvbG9ycy5wdXNoKHJnYkNvbG9yKTtcblxuXHRcdC8vIElmIGl0J3MgdGhlIGZpcnN0IGNoYW5uZWwgdG8gYmUgc2V0LCBzZXQgdGhlIGN1cnJlbnRDb2xvcnNcblx0XHRpZiAoIV90aGlzLmlzY3VycmVudENvbG9yc1NldCkge1xuXHRcdFx0X3RoaXMuY3VycmVudENvbG9ycy5wdXNoKF90aGlzLmhleFRvUmdiKGNvbG9yKSk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgaXQncyB0aGUgbGFzdCBncmFkaWVudCwgY29tcHV0ZSB0aGUgY29sb3IgZGlmZiBiZXR3ZWVuIHRoZSBsYXN0IGdyYWRpZW50IGFuZCB0aGUgZmlyc3Qgb25lLFxuXHRcdC8vIGVsc2UgYmV0d2VlbiB0aGUgcGVudWx0aW1hdGUgb25lIGFuZCB0aGUgbGFzdCBvbmVcblx0XHRpZiAoX3RoaXMuY2hhbm5lbHNJbmRleCA9PT0gX3RoaXMuc3RhdGVzW190aGlzLmFjdGl2ZVN0YXRlXS5ncmFkaWVudHMubGVuZ3RoIC0gMSkge1xuXHRcdFx0Y29sb3JEaWZmID0gX3RoaXMuY29sb3JEaWZmKFxuXHRcdFx0XHRhY3RpdmVDaGFubmVsW190aGlzLmNoYW5uZWxzSW5kZXhdLmNvbG9yc1tpXSxcblx0XHRcdFx0YWN0aXZlQ2hhbm5lbFswXS5jb2xvcnNbaV1cblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5leHRDb2xvcnMgPSBfdGhpcy5oZXhUb1JnYihfdGhpcy5zdGF0ZXNbX3RoaXMuYWN0aXZlU3RhdGVdLmdyYWRpZW50c1tfdGhpcy5jaGFubmVsc0luZGV4ICsgMV1baV0pO1xuXHRcdFx0Y29sb3JEaWZmID0gX3RoaXMuY29sb3JEaWZmKFxuXHRcdFx0XHRhY3RpdmVDaGFubmVsW190aGlzLmNoYW5uZWxzSW5kZXhdLmNvbG9yc1tpXSwgbmV4dENvbG9yc1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRhY3RpdmVDaGFubmVsW190aGlzLmNoYW5uZWxzSW5kZXhdLmNvbG9yc0RpZmYucHVzaChjb2xvckRpZmYpO1xuXHRcdF90aGlzLmFjdGl2ZUNvbG9yRGlmZi5wdXNoKGNvbG9yRGlmZik7XG5cdH0pO1xuXG5cdHRoaXMuYWN0aXZldHJhbnNpdGlvblNwZWVkID0gdGhpcy5zdGF0ZXNbdGhpcy5hY3RpdmVTdGF0ZV0udHJhbnNpdGlvblNwZWVkIHx8IDUwMDA7XG5cdHRoaXMuaXNjdXJyZW50Q29sb3JzU2V0ID0gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHZhciBjdHggPSB0aGlzLmNvbnRleHQ7XG5cblx0c3dpdGNoKHRoaXMuZGlyZWN0aW9uKSB7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRoaXMudHJpZ2dlckVycm9yKCdkaXJlY3Rpb24nKTtcblx0XHRcdGJyZWFrO1xuXHRcdFxuXHRcdGNhc2UgJ2RpYWdvbmFsJzpcblx0XHRcdHJldHVybiBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgdGhpcy54MSwgdGhpcy55MSk7XG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgJ2xlZnQtcmlnaHQnOlxuXHRcdFx0cmV0dXJuIGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCB0aGlzLngxLCAwKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSAndG9wLWJvdHRvbSc6XG5cdFx0XHRyZXR1cm4gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KHRoaXMueDEgLyAyLCAwLCB0aGlzLngxIC8gMiwgdGhpcy55MSk7XG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgJ3JhZGlhbCc6XG5cdFx0XHRyZXR1cm4gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KHRoaXMueDEgLyAyLCB0aGlzLnkxIC8gMiwgdGhpcy54MSAvIDIsIHRoaXMueDEgLyAyLCB0aGlzLnkxIC8gMiwgMCk7XG5cdFx0XHRicmVhaztcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5nZXREaW1lbnNpb25zKCk7XG5cdHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLngxKTtcblx0dGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB0aGlzLnkxKTtcblx0aWYgKHRoaXMuaW1hZ2UpIHRoaXMucHJlcGFyZUltYWdlKCk7XG5cdHRoaXMucmVmcmVzaENvbG9ycygpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbGVtZW50KSB7XG5cdHZhciBzaXRlVVJMID0gJ2h0dHBzOi8vc2FyY2FkYXNzLmdpdGh1Yi5pby9ncmFuaW0uanMvYXBpLmh0bWwnO1xuXHR0aHJvdyBuZXcgRXJyb3IoJ0dyYW5pbTogSW5wdXQgZXJyb3Igb24gXCInICsgZWxlbWVudCArICdcIiBvcHRpb24uXFxuQ2hlY2sgdGhlIEFQSSAnICsgc2l0ZVVSTCArICcuJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlucHV0VHlwZSkge1xuXHR2YXIgeFBvc2l0aW9uVmFsdWVzID0gWydsZWZ0JywgJ2NlbnRlcicsICdyaWdodCddO1xuXHR2YXIgeVBvc2l0aW9uVmFsdWVzID0gWyd0b3AnLCAnY2VudGVyJywgJ2JvdHRvbSddO1xuXHR2YXIgc3RyZXRjaE1vZGVWYWx1ZXMgPSBbJ3N0cmV0Y2gnLCAnc3RyZXRjaC1pZi1zbWFsbGVyJywgJ3N0cmV0Y2gtaWYtYmlnZ2VyJ107XG5cdHZhciBibGVuZGluZ01vZGVWYWx1ZXMgPSBbJ211bHRpcGx5JywgJ3NjcmVlbicsICdub3JtYWwnLCAnb3ZlcmxheScsICdkYXJrZW4nLFxuXHRcdCdsaWdodGVuJywgJ2xpZ2h0ZXInLCAnY29sb3ItZG9kZ2UnLCAnY29sb3ItYnVybicsICdoYXJkLWxpZ2h0JywgJ3NvZnQtbGlnaHQnLFxuXHRcdCdkaWZmZXJlbmNlJywgJ2V4Y2x1c2lvbicsICdodWUnLCAnc2F0dXJhdGlvbicsICdjb2xvcicsICdsdW1pbm9zaXR5J107XG5cblx0c3dpdGNoKGlucHV0VHlwZSkge1xuXHRcdGNhc2UgJ2ltYWdlJzpcblx0XHRcdC8vIFZhbGlkYXRlIGltYWdlLnBvc2l0aW9uXG5cdFx0XHRpZiAoKCFBcnJheS5pc0FycmF5KHRoaXMuaW1hZ2UucG9zaXRpb24pIHx8IHRoaXMuaW1hZ2UucG9zaXRpb24ubGVuZ3RoICE9PSAyKSB8fFxuXHRcdFx0XHR4UG9zaXRpb25WYWx1ZXMuaW5kZXhPZih0aGlzLmltYWdlLnBvc2l0aW9uWzBdKSA9PT0gLTEgfHxcblx0XHRcdFx0eVBvc2l0aW9uVmFsdWVzLmluZGV4T2YodGhpcy5pbWFnZS5wb3NpdGlvblsxXSkgPT09IC0xXG5cdFx0XHQpIHt0aGlzLnRyaWdnZXJFcnJvcignaW1hZ2UucG9zaXRpb24nKX1cblx0XHRcdC8vIFZhbGlkYXRlIGltYWdlLnN0cmV0Y2hNb2RlXG5cdFx0XHRpZiAodGhpcy5pbWFnZS5zdHJldGNoTW9kZSkge1xuXHRcdFx0XHRpZiAoKCFBcnJheS5pc0FycmF5KHRoaXMuaW1hZ2Uuc3RyZXRjaE1vZGUpIHx8IHRoaXMuaW1hZ2Uuc3RyZXRjaE1vZGUubGVuZ3RoICE9PSAyKSB8fFxuXHRcdFx0XHRcdHN0cmV0Y2hNb2RlVmFsdWVzLmluZGV4T2YodGhpcy5pbWFnZS5zdHJldGNoTW9kZVswXSkgPT09IC0xIHx8XG5cdFx0XHRcdFx0c3RyZXRjaE1vZGVWYWx1ZXMuaW5kZXhPZih0aGlzLmltYWdlLnN0cmV0Y2hNb2RlWzFdKSA9PT0gLTFcblx0XHRcdFx0KSB7dGhpcy50cmlnZ2VyRXJyb3IoJ2ltYWdlLnN0cmV0Y2hNb2RlJyl9XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdibGVuZGluZ01vZGUnOlxuXHRcdFx0aWYgKGJsZW5kaW5nTW9kZVZhbHVlcy5pbmRleE9mKHRoaXMuaW1hZ2UuYmxlbmRpbmdNb2RlKSA9PT0gLTEpIHtcblx0XHRcdFx0dGhpcy5jbGVhcigpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXJFcnJvcignYmxlbmRpbmdNb2RlJyk7XG5cdFx0XHR9XG5cdH1cbn07XG4iLCIvLyBpbXBvcnQgR3JhbmltIGludG8gSlMgZmlsZVxuaW1wb3J0IEdyYW5pbSBmcm9tICdncmFuaW0nO1xuXG5cblxuY29uc3QgZ3JhbmltSW5zdGFuY2UxID0gbmV3IEdyYW5pbSh7XG4gICBlbGVtZW50OiAnI2Jhc2ljX19oZWFkZXItLWNhbnZhcycsXG4gICBuYW1lOiAnYmFzaWMtZ3JhZGllbnQnLFxuICAgZGlyZWN0aW9uOiAnbGVmdC1yaWdodCcsIC8vICdkaWFnb25hbCcsICd0b3AtYm90dG9tJywgJ3JhZGlhbCdcbiAgIG9wYWNpdHk6IFsxLCAxXSxcbiAgIGlzUGF1c2VkV2hlbk5vdEluVmlldzogdHJ1ZSxcbiAgIHN0YXRlczoge1xuICAgICAgXCJkZWZhdWx0LXN0YXRlXCI6IHtcbiAgICAgICAgIGdyYWRpZW50czogW1xuICAgICAgICAgICAgWycjQUEwNzZCJywgJyM2MTA0NUYnXSxcbiAgICAgICAgICAgIFsnIzAyQUFCMCcsICcjMDBDREFDJ10sXG4gICAgICAgICAgICBbJyNEQTIyRkYnLCAnIzk3MzNFRSddXG4gICAgICAgICBdXG4gICAgICB9XG4gICB9XG59KTtcbiAgIFxuICAgY29uc3QgZ3JhbmltSW5zdGFuY2UyID0gbmV3IEdyYW5pbSh7XG4gICAgICBlbGVtZW50OiAnI2NhbnZhcy1pbWFnZS1ibGVuZGluZycsXG4gICAgICBkaXJlY3Rpb246ICd0b3AtYm90dG9tJyxcbiAgICAgIG9wYWNpdHk6IFsxLCAxXSxcbiAgICAgIGlzUGF1c2VkV2hlbk5vdEluVmlldzogdHJ1ZSxcbiAgICAgIGltYWdlOiB7XG4gICAgICAgICBzb3VyY2U6ICcuL3NyYy9hc3NldHMvbmV2ZW4ta3JjbWFyZWstMTkwMDg0LXVuc3BsYXNoLmpwZycsXG4gICAgICAgICBibGVuZGluZ01vZGU6ICdtdWx0aXBseSdcbiAgICAgIH0sXG4gICAgICBzdGF0ZXM6IHtcbiAgICAgICAgIFwiZGVmYXVsdC1zdGF0ZVwiOiB7XG4gICAgICAgICAgICBncmFkaWVudHM6IFtcbiAgICAgICAgICAgICAgIFsnIzI5MzIzYycsICcjNDg1NTYzJ10sXG4gICAgICAgICAgICAgICBbJyNGRjZCNkInLCAnIzU1NjI3MCddLFxuICAgICAgICAgICAgICAgWycjODBkM2ZlJywgJyM3ZWEwYzQnXSxcbiAgICAgICAgICAgICAgIFsnI2YwYWI1MScsICcjZWNlYmEzJ11cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB0cmFuc2l0aW9uU3BlZWQ6IDcwMDBcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgIH0pO1xuXG5jb25zdCBncmFuaW1JbnN0YW5jZTMgPSBuZXcgR3JhbmltKHtcbiAgIGVsZW1lbnQ6ICcjZnRyX19oZWFkZXItLWNhbnZhcycsXG4gICBkaXJlY3Rpb246ICd0b3AtYm90dG9tJyxcbiAgIG9wYWNpdHk6IFsxLCAxXSxcbiAgIGlzUGF1c2VkV2hlbk5vdEluVmlldzogdHJ1ZSxcbiAgIGltYWdlOiB7XG4gICAgICBzb3VyY2U6ICcuL3NyYy9hc3NldHMvYmVya2F5LWd1bXVzdGVraW4uanBnJyxcbiAgICAgIGJsZW5kaW5nTW9kZTogJ211bHRpcGx5J1xuICAgfSxcbiAgIHN0YXRlczoge1xuICAgICAgXCJkZWZhdWx0LXN0YXRlXCI6IHtcbiAgICAgICAgIGdyYWRpZW50czogW1xuICAgICAgICAgICAgWycjMjkzMjNjJywgJyM0ODU1NjMnXSxcbiAgICAgICAgICAgIFsnI0ZGNkI2QicsICcjNTU2MjcwJ10sXG4gICAgICAgICAgICBbJyM4MGQzZmUnLCAnIzdlYTBjNCddLFxuICAgICAgICAgICAgWycjZjBhYjUxJywgJyNlY2ViYTMnXVxuICAgICAgICAgXSxcbiAgICAgICAgIHRyYW5zaXRpb25TcGVlZDogNzAwMFxuICAgICAgfVxuICAgfVxufSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIl19
