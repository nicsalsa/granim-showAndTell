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

},{"granim":1}]},{},[29])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvR3JhbmltLmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvYW5pbWF0ZUNvbG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL2NoYW5nZUJsZW5kaW5nTW9kZS5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL2NoYW5nZURpcmVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL2NoYW5nZVN0YXRlLmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvY2xlYXIuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9jb2xvckRpZmYuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9kZXN0cm95LmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvZXZlbnRQb2x5ZmlsbC5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL2dldEN1cnJlbnRDb2xvcnMuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9nZXREaW1lbnNpb25zLmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvZ2V0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL2dldExpZ2h0bmVzcy5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL2hleFRvUmdiLmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvbWFrZUdyYWRpZW50LmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvb25SZXNpemUuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9vblNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL3BhdXNlLmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvcGF1c2VXaGVuTm90SW5WaWV3LmpzIiwibm9kZV9tb2R1bGVzL2dyYW5pbS9saWIvcGxheS5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL3ByZXBhcmVJbWFnZS5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL3JlZnJlc2hDb2xvcnMuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9zZXRDb2xvcnMuanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9zZXREaXJlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvZ3JhbmltL2xpYi9zZXRTaXplQXR0cmlidXRlcy5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL3RyaWdnZXJFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9ncmFuaW0vbGliL3ZhbGlkYXRlSW5wdXQuanMiLCJzcmMvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDL0JBOzs7O0FBREE7QUFLQSxJQUFNLGVBQWUsR0FBRyxJQUFJLGVBQUosQ0FBVztBQUNoQyxFQUFBLE9BQU8sRUFBRSx3QkFEdUI7QUFFaEMsRUFBQSxJQUFJLEVBQUUsZ0JBRjBCO0FBR2hDLEVBQUEsU0FBUyxFQUFFLFlBSHFCO0FBR1A7QUFDekIsRUFBQSxPQUFPLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUp1QjtBQUtoQyxFQUFBLHFCQUFxQixFQUFFLElBTFM7QUFNaEMsRUFBQSxNQUFNLEVBQUU7QUFDTCxxQkFBaUI7QUFDZCxNQUFBLFNBQVMsRUFBRSxDQUNSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FEUSxFQUVSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FGUSxFQUdSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FIUTtBQURHO0FBRFo7QUFOd0IsQ0FBWCxDQUF4QjtBQWlCRyxJQUFNLGVBQWUsR0FBRyxJQUFJLGVBQUosQ0FBVztBQUNoQyxFQUFBLE9BQU8sRUFBRSx3QkFEdUI7QUFFaEMsRUFBQSxTQUFTLEVBQUUsWUFGcUI7QUFHaEMsRUFBQSxPQUFPLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUh1QjtBQUloQyxFQUFBLHFCQUFxQixFQUFFLElBSlM7QUFLaEMsRUFBQSxLQUFLLEVBQUU7QUFDSixJQUFBLE1BQU0sRUFBRSxpREFESjtBQUVKLElBQUEsWUFBWSxFQUFFO0FBRlYsR0FMeUI7QUFTaEMsRUFBQSxNQUFNLEVBQUU7QUFDTCxxQkFBaUI7QUFDZCxNQUFBLFNBQVMsRUFBRSxDQUNSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FEUSxFQUVSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FGUSxFQUdSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FIUSxFQUlSLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FKUSxDQURHO0FBT2QsTUFBQSxlQUFlLEVBQUU7QUFQSDtBQURaO0FBVHdCLENBQVgsQ0FBeEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL0dyYW5pbS5qcycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBHcmFuaW0ob3B0aW9ucykge1xuXHR2YXIgZG9lc0dyYWRpZW50VXNlT3BhY2l0eTtcblx0dGhpcy5nZXRFbGVtZW50KG9wdGlvbnMuZWxlbWVudCk7XG5cdHRoaXMueDEgPSAwO1xuXHR0aGlzLnkxID0gMDtcblx0dGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IGZhbHNlO1xuXHR0aGlzLmVsVG9TZXRDbGFzc09uID0gb3B0aW9ucy5lbFRvU2V0Q2xhc3NPbiB8fCAnYm9keSc7XG5cdHRoaXMuZGlyZWN0aW9uID0gb3B0aW9ucy5kaXJlY3Rpb24gfHwgJ2RpYWdvbmFsJztcblx0dGhpcy5pc1BhdXNlZFdoZW5Ob3RJblZpZXcgPSBvcHRpb25zLmlzUGF1c2VkV2hlbk5vdEluVmlldyB8fCBmYWxzZTtcblx0dGhpcy5vcGFjaXR5ID0gb3B0aW9ucy5vcGFjaXR5O1xuXHR0aGlzLnN0YXRlcyA9IG9wdGlvbnMuc3RhdGVzO1xuXHR0aGlzLnN0YXRlVHJhbnNpdGlvblNwZWVkID0gb3B0aW9ucy5zdGF0ZVRyYW5zaXRpb25TcGVlZCB8fCAxMDAwO1xuXHR0aGlzLnByZXZpb3VzVGltZVN0YW1wID0gbnVsbDtcblx0dGhpcy5wcm9ncmVzcyA9IDA7XG5cdHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcblx0dGhpcy5pc0NsZWFyZWQgPSBmYWxzZTtcblx0dGhpcy5pc1BhdXNlZEJlY2F1c2VOb3RJblZpZXcgPSBmYWxzZTtcblx0dGhpcy5pc2N1cnJlbnRDb2xvcnNTZXQgPSBmYWxzZTtcblx0dGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblx0dGhpcy5jaGFubmVscyA9IHt9O1xuXHR0aGlzLmNoYW5uZWxzSW5kZXggPSAwO1xuXHR0aGlzLmFjdGl2ZVN0YXRlID0gb3B0aW9ucy5kZWZhdWx0U3RhdGVOYW1lIHx8ICdkZWZhdWx0LXN0YXRlJztcblx0dGhpcy5pc0NoYW5naW5nU3RhdGUgPSBmYWxzZTtcblx0dGhpcy5hY3RpdmVDb2xvcnMgPSBbXTtcblx0dGhpcy5hY3RpdmVDb2xvckRpZmYgPSBbXTtcblx0dGhpcy5hY3RpdmV0cmFuc2l0aW9uU3BlZWQgPSBudWxsO1xuXHR0aGlzLmN1cnJlbnRDb2xvcnMgPSBbXTtcblx0dGhpcy5ldmVudFBvbHlmaWxsKCk7XG5cdHRoaXMuc2Nyb2xsRGVib3VuY2VUaHJlc2hvbGQgPSBvcHRpb25zLnNjcm9sbERlYm91bmNlVGhyZXNob2xkIHx8IDMwMDtcblx0dGhpcy5zY3JvbGxEZWJvdW5jZVRpbWVvdXQgPSBudWxsO1xuXHR0aGlzLmlzSW1nTG9hZGVkID0gZmFsc2U7XG5cdHRoaXMuaXNDYW52YXNJbldpbmRvd1ZpZXcgPSBmYWxzZTtcblx0dGhpcy5maXJzdFNjcm9sbEluaXQgPSB0cnVlO1xuXHR0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xuXHRpZiAob3B0aW9ucy5pbWFnZSAmJiBvcHRpb25zLmltYWdlLnNvdXJjZSkge1xuXHRcdHRoaXMuaW1hZ2UgPSB7XG5cdFx0XHRzb3VyY2U6IG9wdGlvbnMuaW1hZ2Uuc291cmNlLFxuXHRcdFx0cG9zaXRpb246IG9wdGlvbnMuaW1hZ2UucG9zaXRpb24gfHwgWydjZW50ZXInLCAnY2VudGVyJ10sXG5cdFx0XHRzdHJldGNoTW9kZTogb3B0aW9ucy5pbWFnZS5zdHJldGNoTW9kZSB8fCBmYWxzZSxcblx0XHRcdGJsZW5kaW5nTW9kZTogb3B0aW9ucy5pbWFnZS5ibGVuZGluZ01vZGUgfHwgZmFsc2Vcblx0XHR9O1xuXHR9XG5cdGRvZXNHcmFkaWVudFVzZU9wYWNpdHkgPSB0aGlzLm9wYWNpdHkubWFwKGZ1bmN0aW9uKGVsKSB7cmV0dXJuIGVsICE9PSAxfSlcblx0XHQuaW5kZXhPZih0cnVlKSAhPT0gLTE7XG5cdHRoaXMuc2hvdWxkQ2xlYXJDYW52YXNPbkVhY2hGcmFtZSA9ICEhdGhpcy5pbWFnZSB8fCBkb2VzR3JhZGllbnRVc2VPcGFjaXR5O1xuXHR0aGlzLmV2ZW50cyA9IHtcblx0XHRzdGFydDogbmV3IEN1c3RvbUV2ZW50KCdncmFuaW06c3RhcnQnKSxcblx0XHRlbmQ6IG5ldyBDdXN0b21FdmVudCgnZ3JhbmltOmVuZCcpLFxuXHRcdGdyYWRpZW50Q2hhbmdlOiBmdW5jdGlvbihkZXRhaWxzKSB7XG5cdFx0XHRyZXR1cm4gbmV3IEN1c3RvbUV2ZW50KCdncmFuaW06Z3JhZGllbnRDaGFuZ2UnLCB7XG5cdFx0XHRcdGRldGFpbDoge1xuXHRcdFx0XHRcdGlzTG9vcGluZzogZGV0YWlscy5pc0xvb3BpbmcsXG5cdFx0XHRcdFx0Y29sb3JzRnJvbTogZGV0YWlscy5jb2xvcnNGcm9tLFxuXHRcdFx0XHRcdGNvbG9yc1RvOiBkZXRhaWxzLmNvbG9yc1RvLFxuXHRcdFx0XHRcdGFjdGl2ZVN0YXRlOiBkZXRhaWxzLmFjdGl2ZVN0YXRlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJ1YmJsZXM6IGZhbHNlLFxuXHRcdFx0XHRjYW5jZWxhYmxlOiBmYWxzZVxuXHRcdFx0fSlcblx0XHR9XG5cdH07XG5cdHRoaXMuY2FsbGJhY2tzID0ge1xuXHRcdG9uU3RhcnQ6IHR5cGVvZiBvcHRpb25zLm9uU3RhcnQgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLm9uU3RhcnQgOiBmYWxzZSxcblx0XHRvbkdyYWRpZW50Q2hhbmdlOiB0eXBlb2Ygb3B0aW9ucy5vbkdyYWRpZW50Q2hhbmdlID09PSAnZnVuY3Rpb24nID9cblx0XHRcdG9wdGlvbnMub25HcmFkaWVudENoYW5nZSA6XG5cdFx0XHRmYWxzZSxcblx0XHRvbkVuZDogdHlwZW9mIG9wdGlvbnMub25FbmQgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLm9uRW5kIDogZmFsc2Vcblx0fTtcblx0dGhpcy5nZXREaW1lbnNpb25zKCk7XG5cdHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLngxKTtcblx0dGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB0aGlzLnkxKTtcblx0dGhpcy5zZXRDb2xvcnMoKTtcblxuXHRpZiAodGhpcy5pbWFnZSkge1xuXHRcdHRoaXMudmFsaWRhdGVJbnB1dCgnaW1hZ2UnKTtcblx0XHR0aGlzLnByZXBhcmVJbWFnZSgpO1xuXHR9XG5cblx0dGhpcy5wYXVzZVdoZW5Ob3RJblZpZXdOYW1lU3BhY2UgPSB0aGlzLnBhdXNlV2hlbk5vdEluVmlldy5iaW5kKHRoaXMpO1xuXHR0aGlzLnNldFNpemVBdHRyaWJ1dGVzTmFtZVNwYWNlID0gdGhpcy5zZXRTaXplQXR0cmlidXRlcy5iaW5kKHRoaXMpO1xuXHR0aGlzLm9uUmVzaXplKCk7XG5cblx0aWYgKHRoaXMuaXNQYXVzZWRXaGVuTm90SW5WaWV3KSB7XG5cdFx0dGhpcy5vblNjcm9sbCgpO1xuXHR9IGVsc2Uge1xuXHRcdGlmICghdGhpcy5pbWFnZSkge1xuXHRcdFx0dGhpcy5yZWZyZXNoQ29sb3JzKCk7XG5cdFx0XHR0aGlzLmFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGVDb2xvcnMuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmFuaW1hdGluZyA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2FsbGJhY2sgYW5kIEV2ZW50XG5cdGlmICh0aGlzLmNhbGxiYWNrcy5vblN0YXJ0KSB0aGlzLmNhbGxiYWNrcy5vblN0YXJ0KCk7XG5cdHRoaXMuY2FudmFzLmRpc3BhdGNoRXZlbnQodGhpcy5ldmVudHMuc3RhcnQpO1xufVxuXG5HcmFuaW0ucHJvdG90eXBlLm9uUmVzaXplID0gcmVxdWlyZSgnLi9vblJlc2l6ZS5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLm9uU2Nyb2xsID0gcmVxdWlyZSgnLi9vblNjcm9sbC5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLnZhbGlkYXRlSW5wdXQgPSByZXF1aXJlKCcuL3ZhbGlkYXRlSW5wdXQuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS50cmlnZ2VyRXJyb3IgPSByZXF1aXJlKCcuL3RyaWdnZXJFcnJvci5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLnByZXBhcmVJbWFnZSA9IHJlcXVpcmUoJy4vcHJlcGFyZUltYWdlLmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuZXZlbnRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vZXZlbnRQb2x5ZmlsbC5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLmNvbG9yRGlmZiA9IHJlcXVpcmUoJy4vY29sb3JEaWZmLmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuaGV4VG9SZ2IgPSByZXF1aXJlKCcuL2hleFRvUmdiLmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuc2V0RGlyZWN0aW9uID0gcmVxdWlyZSgnLi9zZXREaXJlY3Rpb24uanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5zZXRDb2xvcnMgPSByZXF1aXJlKCcuL3NldENvbG9ycy5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLmdldEVsZW1lbnQgPSByZXF1aXJlKCcuL2dldEVsZW1lbnQuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5nZXREaW1lbnNpb25zID0gcmVxdWlyZSgnLi9nZXREaW1lbnNpb25zLmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuZ2V0TGlnaHRuZXNzID0gcmVxdWlyZSgnLi9nZXRMaWdodG5lc3MuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5nZXRDdXJyZW50Q29sb3JzID0gcmVxdWlyZSgnLi9nZXRDdXJyZW50Q29sb3JzLmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuYW5pbWF0ZUNvbG9ycyA9IHJlcXVpcmUoJy4vYW5pbWF0ZUNvbG9ycy5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLnJlZnJlc2hDb2xvcnMgPSByZXF1aXJlKCcuL3JlZnJlc2hDb2xvcnMuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5tYWtlR3JhZGllbnQgPSByZXF1aXJlKCcuL21ha2VHcmFkaWVudC5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLnBhdXNlID0gcmVxdWlyZSgnLi9wYXVzZS5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLnBsYXkgPSByZXF1aXJlKCcuL3BsYXkuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5jbGVhciA9IHJlcXVpcmUoJy4vY2xlYXIuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5kZXN0cm95ID0gcmVxdWlyZSgnLi9kZXN0cm95LmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUucGF1c2VXaGVuTm90SW5WaWV3ID0gcmVxdWlyZSgnLi9wYXVzZVdoZW5Ob3RJblZpZXcuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5zZXRTaXplQXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vc2V0U2l6ZUF0dHJpYnV0ZXMuanMnKTtcblxuR3JhbmltLnByb3RvdHlwZS5jaGFuZ2VEaXJlY3Rpb24gPSByZXF1aXJlKCcuL2NoYW5nZURpcmVjdGlvbi5qcycpO1xuXG5HcmFuaW0ucHJvdG90eXBlLmNoYW5nZUJsZW5kaW5nTW9kZSA9IHJlcXVpcmUoJy4vY2hhbmdlQmxlbmRpbmdNb2RlLmpzJyk7XG5cbkdyYW5pbS5wcm90b3R5cGUuY2hhbmdlU3RhdGUgPSByZXF1aXJlKCcuL2NoYW5nZVN0YXRlLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gR3JhbmltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRpbWVzdGFtcCkge1xuXHR2YXIgd2FzV2luZG93SWRsZWQgPSB0aW1lc3RhbXAgLSB0aGlzLnByZXZpb3VzVGltZVN0YW1wID4gMTAwO1xuXHR2YXIgaXNMb29wID0gdGhpcy5zdGF0ZXNbdGhpcy5hY3RpdmVTdGF0ZV0ubG9vcCAhPT0gdW5kZWZpbmVkID8gdGhpcy5zdGF0ZXNbdGhpcy5hY3RpdmVTdGF0ZV0ubG9vcCA6IHRydWU7XG5cdHZhciBwcm9ncmVzc1BlcmNlbnQsIGlzTG9vcGluZywgbmV4dEdyYWRpZW50O1xuXG5cdC8vIElmIHRhYiB3YXMgaW5hY3RpdmUgdGhlbiByZXN1bWVkLCByZXNldCB0aGUgcHJldmlvdXMgdGltZXN0YW1wXG5cdGlmICh0aGlzLnByZXZpb3VzVGltZVN0YW1wID09PSBudWxsIHx8IHdhc1dpbmRvd0lkbGVkKSB7XG5cdFx0dGhpcy5wcmV2aW91c1RpbWVTdGFtcCA9IHRpbWVzdGFtcDtcblx0fVxuXG5cdC8vIENvbXB1dGUgcHJvZ3Jlc3MgYW5kIHNhdmUgdGhlIHRpbWVzdGFtcFxuXHR0aGlzLnByb2dyZXNzID0gdGhpcy5wcm9ncmVzcyArICh0aW1lc3RhbXAgLSB0aGlzLnByZXZpb3VzVGltZVN0YW1wKTtcblx0cHJvZ3Jlc3NQZXJjZW50ID0gKHRoaXMucHJvZ3Jlc3MgLyB0aGlzLmFjdGl2ZXRyYW5zaXRpb25TcGVlZCAqIDEwMCkudG9GaXhlZCgyKTtcblx0dGhpcy5wcmV2aW91c1RpbWVTdGFtcCA9IHRpbWVzdGFtcDtcblxuXHQvLyBTZXQgdGhlIG5ldyBncmFkaWVudCBjb2xvcnMgaW4gYSBwcm9wZXJ0eVxuXHR0aGlzLnJlZnJlc2hDb2xvcnMocHJvZ3Jlc3NQZXJjZW50KTtcblxuXHQvLyBDb250aW51ZSB0aGUgYW5pbWF0aW9uIG9yIHByZXBhcmUgZm9yIHRoZSBuZXh0IG9uZVxuXHRpZiAocHJvZ3Jlc3NQZXJjZW50IDwgMTAwKSB7XG5cdFx0dGhpcy5hbmltYXRpb24gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlQ29sb3JzLmJpbmQodGhpcykpO1xuXG5cdH0gZWxzZSB7XG5cdFx0Ly8gaWYgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIGluZGV4IGlzIGluZmVyaW9yIHRvIHRoZSBwZW51bHRpbWF0ZSBncmFkaWVudFxuXHRcdC8vIG9yIHRvIHRoZSBsYXN0IGdyYWRpZW50IHdpdGggdGhlIGxvb3AgbW9kZSBhY3RpdmF0ZWRcblx0XHRpZiAodGhpcy5jaGFubmVsc0luZGV4IDwgdGhpcy5zdGF0ZXNbdGhpcy5hY3RpdmVTdGF0ZV0uZ3JhZGllbnRzLmxlbmd0aCAtIDIgfHwgaXNMb29wKSB7XG5cblx0XHRcdC8vIFNldCB0aGUgYWN0aXZlIHRyYW5zaXRpb24gc3BlZWQgdG8gdGhlIGFjdGl2ZSBzdGF0ZSBvbmUgYWZ0ZXIgY2hhbmdpbmcgc3RhdGVcblx0XHRcdGlmICh0aGlzLmlzQ2hhbmdpbmdTdGF0ZSkge1xuXHRcdFx0XHR0aGlzLmFjdGl2ZXRyYW5zaXRpb25TcGVlZCA9IHRoaXMuc3RhdGVzW3RoaXMuYWN0aXZlU3RhdGVdLnRyYW5zaXRpb25TcGVlZCB8fCA1MDAwO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXNldHRpbmcgcHJvcGVydGllc1xuXHRcdFx0dGhpcy5wcmV2aW91c1RpbWVTdGFtcCA9IG51bGw7XG5cdFx0XHR0aGlzLnByb2dyZXNzID0gMDtcblx0XHRcdHRoaXMuY2hhbm5lbHNJbmRleCsrO1xuXHRcdFx0aXNMb29waW5nID0gZmFsc2U7XG5cblx0XHRcdC8vIElmIGl0J3MgZ29pbmcgdG8gbG9vcCBvciBpZiBpdCdzIHRoZSB0cmFuc2l0aW9uIGFmdGVyIHRoZSBsb29wXG5cdFx0XHRpZiAodGhpcy5jaGFubmVsc0luZGV4ID09PSB0aGlzLnN0YXRlc1t0aGlzLmFjdGl2ZVN0YXRlXS5ncmFkaWVudHMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRpc0xvb3BpbmcgPSB0cnVlO1xuXHRcdFx0XHRcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5jaGFubmVsc0luZGV4ID09PSB0aGlzLnN0YXRlc1t0aGlzLmFjdGl2ZVN0YXRlXS5ncmFkaWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuY2hhbm5lbHNJbmRleCA9IDA7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoZWNraW5nIHRoZSBuZXh0IGdyYWRpZW50IHRvIHNlbmQgaW4gYXJncyBvZiBhbiBldmVudCBhbmQgYSBjYWxsYmFja1xuXHRcdFx0bmV4dEdyYWRpZW50ID0gdGhpcy5zdGF0ZXNbdGhpcy5hY3RpdmVTdGF0ZV0uZ3JhZGllbnRzW3RoaXMuY2hhbm5lbHNJbmRleCArIDFdID09PSB1bmRlZmluZWQgP1xuXHRcdFx0XHR0aGlzLnN0YXRlc1t0aGlzLmFjdGl2ZVN0YXRlXS5ncmFkaWVudHNbMF0gOlxuXHRcdFx0XHR0aGlzLnN0YXRlc1t0aGlzLmFjdGl2ZVN0YXRlXS5ncmFkaWVudHNbdGhpcy5jaGFubmVsc0luZGV4ICsgMV07XG5cblx0XHRcdC8vIENvbXB1dGUgdGhlIGNvbG9ycyBmb3IgdGhlIHRyYW5zaXRpb24gYW5kIHJlbmRlciBhIG5ldyBmcmFtZVxuXHRcdFx0dGhpcy5zZXRDb2xvcnMoKTtcblx0XHRcdHRoaXMuYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZUNvbG9ycy5iaW5kKHRoaXMpKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ2FsbGJhY2sgYW5kIEV2ZW50XG5cdFx0XHRpZiAodGhpcy5jYWxsYmFja3Mub25HcmFkaWVudENoYW5nZSkgdGhpcy5jYWxsYmFja3Mub25HcmFkaWVudENoYW5nZSh7XG5cdFx0XHRcdGlzTG9vcGluZzogaXNMb29waW5nLFxuXHRcdFx0XHRjb2xvcnNGcm9tOiB0aGlzLnN0YXRlc1t0aGlzLmFjdGl2ZVN0YXRlXS5ncmFkaWVudHNbdGhpcy5jaGFubmVsc0luZGV4XSxcblx0XHRcdFx0Y29sb3JzVG86IG5leHRHcmFkaWVudCxcblx0XHRcdFx0YWN0aXZlU3RhdGU6IHRoaXMuYWN0aXZlU3RhdGVcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmNhbnZhcy5kaXNwYXRjaEV2ZW50KHRoaXMuZXZlbnRzLmdyYWRpZW50Q2hhbmdlKHtcblx0XHRcdFx0XHRpc0xvb3Bpbmc6IGlzTG9vcGluZyxcblx0XHRcdFx0XHRjb2xvcnNGcm9tOiB0aGlzLnN0YXRlc1t0aGlzLmFjdGl2ZVN0YXRlXS5ncmFkaWVudHNbdGhpcy5jaGFubmVsc0luZGV4XSxcblx0XHRcdFx0XHRjb2xvcnNUbzogbmV4dEdyYWRpZW50LFxuXHRcdFx0XHRcdGFjdGl2ZVN0YXRlOiB0aGlzLmFjdGl2ZVN0YXRlXG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXG5cdFx0Ly8gRWxzZSBpZiBpdCB3YXMgdGhlIGxhc3QgZ3JhZGllbnQgb24gdGhlIGxpc3QgYW5kIHRoZSBsb29wIG1vZGUgaXMgb2ZmXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uKTtcblxuXHRcdFx0Ly8gQ2FsbGJhY2sgYW5kIEV2ZW50XG5cdFx0XHRpZiAodGhpcy5jYWxsYmFja3Mub25FbmQpIHRoaXMuY2FsbGJhY2tzLm9uRW5kKCk7XG5cdFx0XHR0aGlzLmNhbnZhcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnZ3JhbmltOmVuZCcpKTtcblx0XHR9XG5cdH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmV3QmxlbmRpbmdNb2RlKSB7XG5cdHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy54MSwgdGhpcy55MSk7XG5cdHRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPVxuXHRcdHRoaXMuaW1hZ2UuYmxlbmRpbmdNb2RlID0gbmV3QmxlbmRpbmdNb2RlO1xuXHR0aGlzLnZhbGlkYXRlSW5wdXQoJ2JsZW5kaW5nTW9kZScpO1xuXHRpZiAodGhpcy5pc1BhdXNlZCkgdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5ld0RpcmVjdGlvbikge1xuXHR0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMueDEsIHRoaXMueTEpO1xuXHR0aGlzLmRpcmVjdGlvbiA9IG5ld0RpcmVjdGlvbjtcblx0dGhpcy52YWxpZGF0ZUlucHV0KCdkaXJlY3Rpb24nKTtcblx0aWYgKHRoaXMuaXNQYXVzZWQpIHRoaXMucmVmcmVzaENvbG9ycygpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdGF0ZSkge1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHR2YXIgbmV4dENvbG9ycywgY29sb3JEaWZmO1xuXG5cdC8vIFByZXZlbnQgdHJhbnNpdGlvbmluZyB0byB0aGUgc2FtZSBzdGF0ZVxuXHRpZiAodGhpcy5hY3RpdmVTdGF0ZSA9PT0gc3RhdGUpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBTZXR0aW5nIHRoZSBnb29kIHByb3BlcnRpZXMgZm9yIHRoZSB0cmFuc2l0aW9uXG5cdGlmICghdGhpcy5pc1BhdXNlZCkge1xuXHRcdHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xuXHRcdHRoaXMucGF1c2UoKTtcblx0fVxuXG5cdHRoaXMuY2hhbm5lbHNJbmRleCA9IC0xO1xuXHR0aGlzLmFjdGl2ZXRyYW5zaXRpb25TcGVlZCA9IHRoaXMuc3RhdGVUcmFuc2l0aW9uU3BlZWQ7XG5cdHRoaXMuYWN0aXZlQ29sb3JEaWZmID0gW107XG5cdHRoaXMuYWN0aXZlQ29sb3JzID0gdGhpcy5nZXRDdXJyZW50Q29sb3JzKCk7XG5cdHRoaXMucHJvZ3Jlc3MgPSAwO1xuXHR0aGlzLnByZXZpb3VzVGltZVN0YW1wID0gbnVsbDtcblx0dGhpcy5pc0NoYW5naW5nU3RhdGUgPSB0cnVlO1xuXG5cdC8vIENvbXB1dGUgdGhlIGdyYWRpZW50IGRpZmYgYmV0d2VlbiB0aGUgbGFzdCBmcmFtZSBncmFkaWVudFxuXHQvLyBhbmQgdGhlIGZpcnN0IG9uZSBvZiB0aGUgbmV3IHN0YXRlXG5cdHRoaXMuc3RhdGVzW3N0YXRlXS5ncmFkaWVudHNbMF0uZm9yRWFjaChmdW5jdGlvbihjb2xvciwgaSwgYXJyKSB7XG5cdFx0bmV4dENvbG9ycyA9IF90aGlzLmhleFRvUmdiKF90aGlzLnN0YXRlc1tzdGF0ZV0uZ3JhZGllbnRzWzBdW2ldKTtcblx0XHRjb2xvckRpZmYgPSBfdGhpcy5jb2xvckRpZmYoX3RoaXMuYWN0aXZlQ29sb3JzW2ldLCBuZXh0Q29sb3JzKTtcblx0XHRfdGhpcy5hY3RpdmVDb2xvckRpZmYucHVzaChjb2xvckRpZmYpO1xuXHR9KTtcblxuXHQvLyBTdGFydCB0aGUgYW5pbWF0aW9uXG5cdHRoaXMuYWN0aXZlU3RhdGUgPSBzdGF0ZTtcblx0dGhpcy5wbGF5KCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIXRoaXMuaXNQYXVzZWQpIHtcblx0XHRjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbik7XG5cblx0fSBlbHNlIHtcblx0XHR0aGlzLmlzUGF1c2VkID0gZmFsc2U7XG5cdH1cblx0dGhpcy5pc0NsZWFyZWQgPSB0cnVlO1xuXHR0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMueDEsIHRoaXMueTEpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb2xvckEsIGNvbG9yQikge1xuXHR2YXIgaTtcblx0dmFyIGNvbG9yRGlmZiA9IFtdO1xuXG5cdGZvciAoaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHRjb2xvckRpZmYucHVzaChjb2xvckJbaV0gLSBjb2xvckFbaV0pXG5cdH1cblxuXHRyZXR1cm4gY29sb3JEaWZmO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5vblJlc2l6ZSgncmVtb3ZlTGlzdGVuZXJzJyk7XG5cdHRoaXMub25TY3JvbGwoJ3JlbW92ZUxpc3RlbmVycycpO1xuXHR0aGlzLmNsZWFyKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIiApIHJldHVybjtcblxuXHRmdW5jdGlvbiBDdXN0b21FdmVudCAoZXZlbnQsIHBhcmFtcykge1xuXHRcdHBhcmFtcyA9IHBhcmFtcyB8fCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWQgfTtcblx0XHR2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0ZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcblx0XHRyZXR1cm4gZXZ0O1xuXHR9XG5cblx0Q3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcblxuXHR3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHZhciBpLCBqO1xuXHR2YXIgY3VycmVudENvbG9ycyA9IFtdO1xuXG5cdGZvciAoaSA9IDA7IGkgPCB0aGlzLmN1cnJlbnRDb2xvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRjdXJyZW50Q29sb3JzLnB1c2goW10pO1xuXHRcdGZvciAoaiA9IDA7IGogPCAzOyBqKyspIHtjdXJyZW50Q29sb3JzW2ldLnB1c2godGhpcy5jdXJyZW50Q29sb3JzW2ldW2pdKX1cblx0fVxuXG5cdC8vIFJldHVybiBhIGRlZXAgY29weSBvZiB0aGUgY3VycmVudCBjb2xvcnNcblx0cmV0dXJuIGN1cnJlbnRDb2xvcnM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLngxID0gdGhpcy5jYW52YXMub2Zmc2V0V2lkdGg7XG5cdHRoaXMueTEgPSB0aGlzLmNhbnZhcy5vZmZzZXRIZWlnaHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xuXHRcdHRoaXMuY2FudmFzID0gZWxlbWVudDtcblxuXHR9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50ID09PSBcInN0cmluZ1wiKSB7XG5cdFx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xuXG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgZWxlbWVudCB5b3UgdXNlZCBpcyBuZWl0aGVyIGEgU3RyaW5nLCBub3IgYSBIVE1MQ2FudmFzRWxlbWVudCcpO1xuXHR9XG5cblx0aWYgKCF0aGlzLmNhbnZhcykge1xuXHRcdHRocm93IG5ldyBFcnJvcignYCcgKyBlbGVtZW50ICsgJ2AgY291bGQgbm90IGJlIGZvdW5kIGluIHRoZSBET00nKTtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dmFyIGN1cnJlbnRDb2xvcnMgPSB0aGlzLmdldEN1cnJlbnRDb2xvcnMoKTtcblx0dmFyIGdyYWRpZW50QXZlcmFnZSA9IG51bGw7XG5cdHZhciBsaWdodG5lc3NBdmVyYWdlLCBpO1xuXHR2YXIgY29sb3JzQXZlcmFnZSA9IGN1cnJlbnRDb2xvcnMubWFwKGZ1bmN0aW9uKGVsKSB7XG5cdFx0Ly8gQ29tcHV0ZSB0aGUgYXZlcmFnZSBsaWdodG5lc3Mgb2YgZWFjaCBjb2xvclxuXHRcdC8vIGluIHRoZSBjdXJyZW50IGdyYWRpZW50XG5cdFx0cmV0dXJuIE1hdGgubWF4KGVsWzBdLCBlbFsxXSwgZWxbMl0pO1xuXHR9KTtcblxuXHRmb3IgKGkgPSAwOyBpIDwgY29sb3JzQXZlcmFnZS5sZW5ndGg7IGkrKykge1xuXHRcdC8vIEFkZCBhbGwgdGhlIGF2ZXJhZ2UgbGlnaHRuZXNzIG9mIGVhY2ggY29sb3Jcblx0XHRncmFkaWVudEF2ZXJhZ2UgPSBncmFkaWVudEF2ZXJhZ2UgPT09IG51bGwgP1xuXHRcdFx0Y29sb3JzQXZlcmFnZVtpXSA6IGdyYWRpZW50QXZlcmFnZSArIGNvbG9yc0F2ZXJhZ2VbaV07XG5cblx0XHRpZiAoaSA9PT0gY29sb3JzQXZlcmFnZS5sZW5ndGggLSAxKSB7XG5cdFx0XHQvLyBpZiBpdCdzIHRoZSBsYXN0IGxpZ2h0bmVzcyBhdmVyYWdlXG5cdFx0XHQvLyBkaXZpZGUgaXQgYnkgdGhlIHRvdGFsIGxlbmd0aCB0b1xuXHRcdFx0Ly8gaGF2ZSB0aGUgZ2xvYmFsIGF2ZXJhZ2UgbGlnaHRuZXNzXG5cdFx0XHRsaWdodG5lc3NBdmVyYWdlID0gTWF0aC5yb3VuZChncmFkaWVudEF2ZXJhZ2UgLyAoaSArIDEpKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbGlnaHRuZXNzQXZlcmFnZSA+PSAxMjggPyAnbGlnaHQnIDogJ2RhcmsnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihoZXgpIHtcblx0Ly8gRXhwYW5kIHNob3J0aGFuZCBmb3JtIChlLmcuIFwiMDNGXCIpIHRvIGZ1bGwgZm9ybSAoZS5nLiBcIjAwMzNGRlwiKVxuXHR2YXIgc2hvcnRoYW5kUmVnZXggPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pO1xuXHRoZXggPSBoZXgucmVwbGFjZShzaG9ydGhhbmRSZWdleCwgZnVuY3Rpb24obSwgciwgZywgYikge1xuXHRcdHJldHVybiByICsgciArIGcgKyBnICsgYiArIGI7XG5cdH0pO1xuXG5cdHZhciByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcblx0cmV0dXJuIHJlc3VsdCA/IFtcblx0XHRwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcblx0XHRwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcblx0XHRwYXJzZUludChyZXN1bHRbM10sIDE2KVxuXHRdIDogbnVsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHZhciBpLCBjb2xvclBvc2l0aW9uO1xuXHR2YXIgZ3JhZGllbnQgPSB0aGlzLnNldERpcmVjdGlvbigpO1xuXHR2YXIgZWxUb1NldENsYXNzT25DbGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lbFRvU2V0Q2xhc3NPbikuY2xhc3NMaXN0O1xuXG5cdGlmICh0aGlzLnNob3VsZENsZWFyQ2FudmFzT25FYWNoRnJhbWUpIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy54MSwgdGhpcy55MSk7XG5cblx0aWYgKHRoaXMuaW1hZ2UpIHtcblx0XHR0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuXHRcdFx0dGhpcy5pbWFnZU5vZGUsXG5cdFx0XHR0aGlzLmltYWdlUG9zaXRpb24ueCxcblx0XHRcdHRoaXMuaW1hZ2VQb3NpdGlvbi55LFxuXHRcdFx0dGhpcy5pbWFnZVBvc2l0aW9uLndpZHRoLFxuXHRcdFx0dGhpcy5pbWFnZVBvc2l0aW9uLmhlaWdodFxuXHRcdCk7XG5cdH1cblxuXHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50Q29sb3JzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gRW5zdXJlIGZpcnN0IGFuZCBsYXN0IHBvc2l0aW9uIHRvIGJlIDAgYW5kIDEwMFxuXHRcdGNvbG9yUG9zaXRpb24gPSAhaSA/IDAgOiAoKDEgLyAodGhpcy5jdXJyZW50Q29sb3JzLmxlbmd0aCAtIDEpKSAqIGkpLnRvRml4ZWQoMik7XG5cblx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoY29sb3JQb3NpdGlvbiwgJ3JnYmEoJyArXG5cdFx0XHR0aGlzLmN1cnJlbnRDb2xvcnNbaV1bMF0gKyAnLCAnICtcblx0XHRcdHRoaXMuY3VycmVudENvbG9yc1tpXVsxXSArICcsICcgK1xuXHRcdFx0dGhpcy5jdXJyZW50Q29sb3JzW2ldWzJdICsgJywgJyArXG5cdFx0XHR0aGlzLm9wYWNpdHlbaV0gKyAnKSdcblx0XHQpO1xuXHR9XG5cblx0aWYgKHRoaXMubmFtZSkge1xuXHRcdGlmICh0aGlzLmdldExpZ2h0bmVzcygpID09PSAnbGlnaHQnKSB7XG5cdFx0XHRlbFRvU2V0Q2xhc3NPbkNsYXNzLnJlbW92ZSh0aGlzLm5hbWUgKyAnLWRhcmsnKTtcblx0XHRcdGVsVG9TZXRDbGFzc09uQ2xhc3MuYWRkKHRoaXMubmFtZSArICctbGlnaHQnKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbFRvU2V0Q2xhc3NPbkNsYXNzLnJlbW92ZSh0aGlzLm5hbWUgKyAnLWxpZ2h0Jyk7XG5cdFx0XHRlbFRvU2V0Q2xhc3NPbkNsYXNzLmFkZCh0aGlzLm5hbWUgKyAnLWRhcmsnKTtcblx0XHR9XG5cdH1cblxuXHR0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG5cdHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLngxLCB0aGlzLnkxKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odHlwZSkge1xuXHRpZiAodHlwZSA9PT0gJ3JlbW92ZUxpc3RlbmVycycpIHtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zZXRTaXplQXR0cmlidXRlc05hbWVTcGFjZSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2V0U2l6ZUF0dHJpYnV0ZXNOYW1lU3BhY2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0eXBlKSB7XG5cdGlmICh0eXBlID09PSAncmVtb3ZlTGlzdGVuZXJzJykge1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnBhdXNlV2hlbk5vdEluVmlld05hbWVTcGFjZSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMucGF1c2VXaGVuTm90SW5WaWV3TmFtZVNwYWNlKTtcblx0dGhpcy5wYXVzZVdoZW5Ob3RJblZpZXdOYW1lU3BhY2UoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RhdGUpIHtcblx0dmFyIGlzUGF1c2VkQmVjYXVzZU5vdEluVmlldyA9IHN0YXRlID09PSAnaXNQYXVzZWRCZWNhdXNlTm90SW5WaWV3Jztcblx0aWYgKHRoaXMuaXNDbGVhcmVkKSByZXR1cm47XG5cdGlmICghaXNQYXVzZWRCZWNhdXNlTm90SW5WaWV3KSB0aGlzLmlzUGF1c2VkID0gdHJ1ZTtcblx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb24pO1xuXHR0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dmFyIF90aGlzID0gdGhpcztcblx0aWYgKHRoaXMuc2Nyb2xsRGVib3VuY2VUaW1lb3V0KSBjbGVhclRpbWVvdXQodGhpcy5zY3JvbGxEZWJvdW5jZVRpbWVvdXQpO1xuXG5cdHRoaXMuc2Nyb2xsRGVib3VuY2VUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHR2YXIgZWxQb3MgPSBfdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0X3RoaXMuaXNDYW52YXNJbldpbmRvd1ZpZXcgPSAhKGVsUG9zLmJvdHRvbSA8IDAgfHwgZWxQb3MucmlnaHQgPCAwIHx8XG5cdFx0XHRlbFBvcy5sZWZ0ID4gd2luZG93LmlubmVyV2lkdGggfHwgZWxQb3MudG9wID4gd2luZG93LmlubmVySGVpZ2h0KTtcblxuXHRcdGlmIChfdGhpcy5pc0NhbnZhc0luV2luZG93Vmlldykge1xuXHRcdFx0aWYgKCFfdGhpcy5pc1BhdXNlZCB8fCBfdGhpcy5maXJzdFNjcm9sbEluaXQpIHtcblx0XHRcdFx0aWYgKF90aGlzLmltYWdlICYmICFfdGhpcy5pc0ltZ0xvYWRlZCkge3JldHVybn1cblx0XHRcdFx0X3RoaXMuaXNQYXVzZWRCZWNhdXNlTm90SW5WaWV3ID0gZmFsc2U7XG5cdFx0XHRcdF90aGlzLnBsYXkoJ2lzUGxheWVkQmVjYXVzZUluVmlldycpO1xuXHRcdFx0XHRfdGhpcy5maXJzdFNjcm9sbEluaXQgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIV90aGlzLmltYWdlICYmIF90aGlzLmZpcnN0U2Nyb2xsSW5pdCkge1xuXHRcdFx0XHRfdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG5cdFx0XHRcdF90aGlzLmZpcnN0U2Nyb2xsSW5pdCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIV90aGlzLmlzUGF1c2VkICYmICFfdGhpcy5pc1BhdXNlZEJlY2F1c2VOb3RJblZpZXcpIHtcblx0XHRcdFx0X3RoaXMuaXNQYXVzZWRCZWNhdXNlTm90SW5WaWV3ID0gdHJ1ZTtcblx0XHRcdFx0X3RoaXMucGF1c2UoJ2lzUGF1c2VkQmVjYXVzZU5vdEluVmlldycpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwgdGhpcy5zY3JvbGxEZWJvdW5jZVRocmVzaG9sZCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0YXRlKSB7XG5cdHZhciBpc1BsYXllZEJlY2F1c2VJblZpZXcgPSBzdGF0ZSA9PT0gJ2lzUGxheWVkQmVjYXVzZUluVmlldyc7XG5cdGlmICghaXNQbGF5ZWRCZWNhdXNlSW5WaWV3KSB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XG5cdHRoaXMuaXNDbGVhcmVkID0gZmFsc2U7XG5cdGlmICghdGhpcy5hbmltYXRpbmcpIHtcblx0XHR0aGlzLmFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGVDb2xvcnMuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuXHR9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdGlmICghdGhpcy5pbWFnZVBvc2l0aW9uKSB7XG5cdFx0dGhpcy5pbWFnZVBvc2l0aW9uID0geyB4OiAwLCB5OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH07XG5cdH1cblxuXHRpZiAodGhpcy5pbWFnZS5ibGVuZGluZ01vZGUpIHtcblx0XHR0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gdGhpcy5pbWFnZS5ibGVuZGluZ01vZGU7XG5cdH1cblxuXHRpZiAodGhpcy5pbWFnZU5vZGUpIHtcblx0XHRzZXRJbWFnZVBvc2l0aW9uKCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dGhpcy5pbWFnZU5vZGUgPSBuZXcgSW1hZ2UoKTtcblx0dGhpcy5pbWFnZU5vZGUub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignR3JhbmltOiBUaGUgaW1hZ2Ugc291cmNlIGlzIGludmFsaWQuJyk7XG5cdH07XG5cdHRoaXMuaW1hZ2VOb2RlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdF90aGlzLmltZ09yaWdpbmFsV2lkdGggPSBfdGhpcy5pbWFnZU5vZGUud2lkdGg7XG5cdFx0X3RoaXMuaW1nT3JpZ2luYWxIZWlnaHQgPSBfdGhpcy5pbWFnZU5vZGUuaGVpZ2h0O1xuXHRcdHNldEltYWdlUG9zaXRpb24oKTtcblx0XHRfdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG5cdFx0aWYgKCFfdGhpcy5pc1BhdXNlZFdoZW5Ob3RJblZpZXcgfHwgX3RoaXMuaXNDYW52YXNJbldpbmRvd1ZpZXcpIHtcblx0XHRcdF90aGlzLmFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5hbmltYXRlQ29sb3JzLmJpbmQoX3RoaXMpKTtcblx0XHR9XG5cdFx0X3RoaXMuaXNJbWdMb2FkZWQgPSB0cnVlO1xuXHR9O1xuXHR0aGlzLmltYWdlTm9kZS5zcmMgPSB0aGlzLmltYWdlLnNvdXJjZTtcblxuXHRmdW5jdGlvbiBzZXRJbWFnZVBvc2l0aW9uKCkge1xuXHRcdHZhciBpLCBjdXJyZW50QXhpcztcblxuXHRcdGZvciAoaSA9IDA7IGkgPCAyOyBpKyspIHtcblx0XHRcdGN1cnJlbnRBeGlzID0gIWkgPyAneCcgOiAneSc7XG5cdFx0XHRzZXRJbWFnZUF4aXNQb3NpdGlvbihjdXJyZW50QXhpcyk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0SW1hZ2VBeGlzUG9zaXRpb24oYXhpcykge1xuXHRcdFx0dmFyIGNhbnZhc1dpZHRoT3JIZWlnaHQgPSBfdGhpc1theGlzICsgJzEnXTtcblx0XHRcdHZhciBpbWdPcmlnaW5hbFdpZHRoT3JIZWlnaHQgPSBfdGhpc1theGlzID09PSAneCcgPyAnaW1nT3JpZ2luYWxXaWR0aCcgOiAnaW1nT3JpZ2luYWxIZWlnaHQnXTtcblx0XHRcdHZhciBpbWFnZUFsaWduSW5kZXggPSBheGlzID09PSAneCcgPyBfdGhpcy5pbWFnZS5wb3NpdGlvblswXSA6IF90aGlzLmltYWdlLnBvc2l0aW9uWzFdO1xuXHRcdFx0dmFyIGltYWdlQXhpc1Bvc2l0aW9uO1xuXHRcdFx0c3dpdGNoIChpbWFnZUFsaWduSW5kZXgpIHtcblx0XHRcdFx0Y2FzZSAnY2VudGVyJzpcblx0XHRcdFx0XHRpbWFnZUF4aXNQb3NpdGlvbiA9IGltZ09yaWdpbmFsV2lkdGhPckhlaWdodCA+IGNhbnZhc1dpZHRoT3JIZWlnaHQgP1xuXHRcdFx0XHRcdC0oaW1nT3JpZ2luYWxXaWR0aE9ySGVpZ2h0IC0gY2FudmFzV2lkdGhPckhlaWdodCkgLyAyIDpcblx0XHRcdFx0XHQoY2FudmFzV2lkdGhPckhlaWdodCAtIGltZ09yaWdpbmFsV2lkdGhPckhlaWdodCkgLyAyO1xuXHRcdFx0XHRcdF90aGlzLmltYWdlUG9zaXRpb25bYXhpc10gPSBpbWFnZUF4aXNQb3NpdGlvbjtcblx0XHRcdFx0XHRfdGhpcy5pbWFnZVBvc2l0aW9uW2F4aXMgPT09ICd4JyA/ICd3aWR0aCcgOiAnaGVpZ2h0J10gPSBpbWdPcmlnaW5hbFdpZHRoT3JIZWlnaHQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAndG9wJzpcblx0XHRcdFx0XHRfdGhpcy5pbWFnZVBvc2l0aW9uWyd5J10gPSAwO1xuXHRcdFx0XHRcdF90aGlzLmltYWdlUG9zaXRpb25bJ2hlaWdodCddID0gaW1nT3JpZ2luYWxXaWR0aE9ySGVpZ2h0O1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ2JvdHRvbSc6XG5cdFx0XHRcdFx0X3RoaXMuaW1hZ2VQb3NpdGlvblsneSddID0gY2FudmFzV2lkdGhPckhlaWdodCAtIGltZ09yaWdpbmFsV2lkdGhPckhlaWdodDtcblx0XHRcdFx0XHRfdGhpcy5pbWFnZVBvc2l0aW9uWydoZWlnaHQnXSA9IGltZ09yaWdpbmFsV2lkdGhPckhlaWdodDtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdyaWdodCc6XG5cdFx0XHRcdFx0X3RoaXMuaW1hZ2VQb3NpdGlvblsneCddID0gY2FudmFzV2lkdGhPckhlaWdodCAtIGltZ09yaWdpbmFsV2lkdGhPckhlaWdodDtcblx0XHRcdFx0XHRfdGhpcy5pbWFnZVBvc2l0aW9uWyd3aWR0aCddID0gaW1nT3JpZ2luYWxXaWR0aE9ySGVpZ2h0O1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ2xlZnQnOlxuXHRcdFx0XHRcdF90aGlzLmltYWdlUG9zaXRpb25bJ3gnXSA9IDA7XG5cdFx0XHRcdFx0X3RoaXMuaW1hZ2VQb3NpdGlvblsnd2lkdGgnXSA9IGltZ09yaWdpbmFsV2lkdGhPckhlaWdodDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0aWYgKF90aGlzLmltYWdlLnN0cmV0Y2hNb2RlKSB7XG5cdFx0XHRcdGltYWdlQWxpZ25JbmRleCA9IGF4aXMgPT09ICd4JyA/IF90aGlzLmltYWdlLnN0cmV0Y2hNb2RlWzBdIDogX3RoaXMuaW1hZ2Uuc3RyZXRjaE1vZGVbMV07XG5cdFx0XHRcdHN3aXRjaCAoaW1hZ2VBbGlnbkluZGV4KSB7XG5cdFx0XHRcdFx0Y2FzZSAnc3RyZXRjaCc6XG5cdFx0XHRcdFx0XHRfdGhpcy5pbWFnZVBvc2l0aW9uW2F4aXNdID0gMDtcblx0XHRcdFx0XHRcdF90aGlzLmltYWdlUG9zaXRpb25bYXhpcyA9PT0gJ3gnID8gJ3dpZHRoJyA6ICdoZWlnaHQnXSA9IGNhbnZhc1dpZHRoT3JIZWlnaHQ7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJ3N0cmV0Y2gtaWYtYmlnZ2VyJzpcblx0XHRcdFx0XHRcdGlmIChpbWdPcmlnaW5hbFdpZHRoT3JIZWlnaHQgPCBjYW52YXNXaWR0aE9ySGVpZ2h0KSBicmVhaztcblx0XHRcdFx0XHRcdF90aGlzLmltYWdlUG9zaXRpb25bYXhpc10gPSAwO1xuXHRcdFx0XHRcdFx0X3RoaXMuaW1hZ2VQb3NpdGlvbltheGlzID09PSAneCcgPyAnd2lkdGgnIDogJ2hlaWdodCddID0gY2FudmFzV2lkdGhPckhlaWdodDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnc3RyZXRjaC1pZi1zbWFsbGVyJzpcblx0XHRcdFx0XHRcdGlmIChpbWdPcmlnaW5hbFdpZHRoT3JIZWlnaHQgPiBjYW52YXNXaWR0aE9ySGVpZ2h0KSBicmVhaztcblx0XHRcdFx0XHRcdF90aGlzLmltYWdlUG9zaXRpb25bYXhpc10gPSAwO1xuXHRcdFx0XHRcdFx0X3RoaXMuaW1hZ2VQb3NpdGlvbltheGlzID09PSAneCcgPyAnd2lkdGgnIDogJ2hlaWdodCddID0gY2FudmFzV2lkdGhPckhlaWdodDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHByb2dyZXNzUGVyY2VudCkge1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHR2YXIgYWN0aXZlQ2hhbm5lbCwgaSwgajtcblxuXHQvLyBMb29wIHRocm91Z2ggZWFjaCBjb2xvcnMgb2YgdGhlIGFjdGl2ZSBncmFkaWVudFxuXHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5hY3RpdmVDb2xvcnMubGVuZ3RoOyBpKyspIHtcblxuXHRcdC8vIEdlbmVyYXRlIFJHQiBjb2xvcnNcblx0XHRmb3IgKGogPSAwOyBqIDwgMzsgaisrKSB7XG5cdFx0XHRhY3RpdmVDaGFubmVsID0gX3RoaXMuYWN0aXZlQ29sb3JzW2ldW2pdICtcblx0XHRcdFx0TWF0aC5jZWlsKF90aGlzLmFjdGl2ZUNvbG9yRGlmZltpXVtqXSAvIDEwMCAqIHByb2dyZXNzUGVyY2VudCk7XG5cblx0XHRcdC8vIFByZXZlbnQgY29sb3JzIHZhbHVlcyBmcm9tIGdvaW5nIDwgMCAmID4gMjU1XG5cdFx0XHRpZiAoYWN0aXZlQ2hhbm5lbCA8PSAyNTUgJiYgYWN0aXZlQ2hhbm5lbCA+PSAwKSB7XG5cdFx0XHRcdF90aGlzLmN1cnJlbnRDb2xvcnNbaV1bal0gPSBhY3RpdmVDaGFubmVsO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHRoaXMubWFrZUdyYWRpZW50KCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHR2YXIgY29sb3JEaWZmLCBuZXh0Q29sb3JzO1xuXG5cdGlmICghdGhpcy5jaGFubmVsc1t0aGlzLmFjdGl2ZVN0YXRlXSkgdGhpcy5jaGFubmVsc1t0aGlzLmFjdGl2ZVN0YXRlXSA9IFtdO1xuXG5cdC8vIElmIHRoZSBhY3R1YWwgY2hhbm5lbCBleGlzdCwgcmVhc3NpZ24gcHJvcGVydGllcyBhbmQgZXhpdFxuXHQvLyAoZWFjaCBjaGFubmVsIGlzIHNhdmVkIHRvIHByZXZlbnQgcmVjb21wdXRpbmcgaXQgZWFjaCB0aW1lKVxuXHRpZiAodGhpcy5jaGFubmVsc1t0aGlzLmFjdGl2ZVN0YXRlXVt0aGlzLmNoYW5uZWxzSW5kZXhdICE9PSB1bmRlZmluZWQpIHtcblx0XHR0aGlzLmFjdGl2ZUNvbG9ycyA9IHRoaXMuY2hhbm5lbHNbdGhpcy5hY3RpdmVTdGF0ZV1bdGhpcy5jaGFubmVsc0luZGV4XS5jb2xvcnM7XG5cdFx0dGhpcy5hY3RpdmVDb2xvckRpZmYgPSB0aGlzLmNoYW5uZWxzW3RoaXMuYWN0aXZlU3RhdGVdW3RoaXMuY2hhbm5lbHNJbmRleF0uY29sb3JzRGlmZjtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBTZXQgYmxhbmsgcHJvcGVydGllc1xuXHR0aGlzLmNoYW5uZWxzW3RoaXMuYWN0aXZlU3RhdGVdLnB1c2goW3t9XSk7XG5cdHRoaXMuY2hhbm5lbHNbdGhpcy5hY3RpdmVTdGF0ZV1bdGhpcy5jaGFubmVsc0luZGV4XS5jb2xvcnMgPSBbXTtcblx0dGhpcy5jaGFubmVsc1t0aGlzLmFjdGl2ZVN0YXRlXVt0aGlzLmNoYW5uZWxzSW5kZXhdLmNvbG9yc0RpZmYgPSBbXTtcblx0dGhpcy5hY3RpdmVDb2xvcnMgPSBbXTtcblx0dGhpcy5hY3RpdmVDb2xvckRpZmYgPSBbXTtcblxuXHQvLyBHbyBvbiBlYWNoIGdyYWRpZW50IG9mIHRoZSBjdXJyZW50IHN0YXRlXG5cdHRoaXMuc3RhdGVzW3RoaXMuYWN0aXZlU3RhdGVdLmdyYWRpZW50c1t0aGlzLmNoYW5uZWxzSW5kZXhdLmZvckVhY2goZnVuY3Rpb24oY29sb3IsIGkpIHtcblx0XHQvLyBQdXNoIHRoZSBoZXggY29sb3IgY29udmVydGVkIHRvIHJnYiBvbiB0aGUgY2hhbm5lbCBhbmQgdGhlIGFjdGl2ZSBjb2xvciBwcm9wZXJ0aWVzXG5cdFx0dmFyIHJnYkNvbG9yID0gX3RoaXMuaGV4VG9SZ2IoY29sb3IpO1xuXHRcdHZhciBhY3RpdmVDaGFubmVsID0gX3RoaXMuY2hhbm5lbHNbX3RoaXMuYWN0aXZlU3RhdGVdO1xuXG5cdFx0YWN0aXZlQ2hhbm5lbFtfdGhpcy5jaGFubmVsc0luZGV4XS5jb2xvcnMucHVzaChyZ2JDb2xvcik7XG5cdFx0X3RoaXMuYWN0aXZlQ29sb3JzLnB1c2gocmdiQ29sb3IpO1xuXG5cdFx0Ly8gSWYgaXQncyB0aGUgZmlyc3QgY2hhbm5lbCB0byBiZSBzZXQsIHNldCB0aGUgY3VycmVudENvbG9yc1xuXHRcdGlmICghX3RoaXMuaXNjdXJyZW50Q29sb3JzU2V0KSB7XG5cdFx0XHRfdGhpcy5jdXJyZW50Q29sb3JzLnB1c2goX3RoaXMuaGV4VG9SZ2IoY29sb3IpKTtcblx0XHR9XG5cblx0XHQvLyBJZiBpdCdzIHRoZSBsYXN0IGdyYWRpZW50LCBjb21wdXRlIHRoZSBjb2xvciBkaWZmIGJldHdlZW4gdGhlIGxhc3QgZ3JhZGllbnQgYW5kIHRoZSBmaXJzdCBvbmUsXG5cdFx0Ly8gZWxzZSBiZXR3ZWVuIHRoZSBwZW51bHRpbWF0ZSBvbmUgYW5kIHRoZSBsYXN0IG9uZVxuXHRcdGlmIChfdGhpcy5jaGFubmVsc0luZGV4ID09PSBfdGhpcy5zdGF0ZXNbX3RoaXMuYWN0aXZlU3RhdGVdLmdyYWRpZW50cy5sZW5ndGggLSAxKSB7XG5cdFx0XHRjb2xvckRpZmYgPSBfdGhpcy5jb2xvckRpZmYoXG5cdFx0XHRcdGFjdGl2ZUNoYW5uZWxbX3RoaXMuY2hhbm5lbHNJbmRleF0uY29sb3JzW2ldLFxuXHRcdFx0XHRhY3RpdmVDaGFubmVsWzBdLmNvbG9yc1tpXVxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bmV4dENvbG9ycyA9IF90aGlzLmhleFRvUmdiKF90aGlzLnN0YXRlc1tfdGhpcy5hY3RpdmVTdGF0ZV0uZ3JhZGllbnRzW190aGlzLmNoYW5uZWxzSW5kZXggKyAxXVtpXSk7XG5cdFx0XHRjb2xvckRpZmYgPSBfdGhpcy5jb2xvckRpZmYoXG5cdFx0XHRcdGFjdGl2ZUNoYW5uZWxbX3RoaXMuY2hhbm5lbHNJbmRleF0uY29sb3JzW2ldLCBuZXh0Q29sb3JzXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGFjdGl2ZUNoYW5uZWxbX3RoaXMuY2hhbm5lbHNJbmRleF0uY29sb3JzRGlmZi5wdXNoKGNvbG9yRGlmZik7XG5cdFx0X3RoaXMuYWN0aXZlQ29sb3JEaWZmLnB1c2goY29sb3JEaWZmKTtcblx0fSk7XG5cblx0dGhpcy5hY3RpdmV0cmFuc2l0aW9uU3BlZWQgPSB0aGlzLnN0YXRlc1t0aGlzLmFjdGl2ZVN0YXRlXS50cmFuc2l0aW9uU3BlZWQgfHwgNTAwMDtcblx0dGhpcy5pc2N1cnJlbnRDb2xvcnNTZXQgPSB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dmFyIGN0eCA9IHRoaXMuY29udGV4dDtcblxuXHRzd2l0Y2godGhpcy5kaXJlY3Rpb24pIHtcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhpcy50cmlnZ2VyRXJyb3IoJ2RpcmVjdGlvbicpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XG5cdFx0Y2FzZSAnZGlhZ29uYWwnOlxuXHRcdFx0cmV0dXJuIGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCB0aGlzLngxLCB0aGlzLnkxKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSAnbGVmdC1yaWdodCc6XG5cdFx0XHRyZXR1cm4gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIHRoaXMueDEsIDApO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlICd0b3AtYm90dG9tJzpcblx0XHRcdHJldHVybiBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQodGhpcy54MSAvIDIsIDAsIHRoaXMueDEgLyAyLCB0aGlzLnkxKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSAncmFkaWFsJzpcblx0XHRcdHJldHVybiBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQodGhpcy54MSAvIDIsIHRoaXMueTEgLyAyLCB0aGlzLngxIC8gMiwgdGhpcy54MSAvIDIsIHRoaXMueTEgLyAyLCAwKTtcblx0XHRcdGJyZWFrO1xuXHR9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmdldERpbWVuc2lvbnMoKTtcblx0dGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMueDEpO1xuXHR0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMueTEpO1xuXHRpZiAodGhpcy5pbWFnZSkgdGhpcy5wcmVwYXJlSW1hZ2UoKTtcblx0dGhpcy5yZWZyZXNoQ29sb3JzKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0dmFyIHNpdGVVUkwgPSAnaHR0cHM6Ly9zYXJjYWRhc3MuZ2l0aHViLmlvL2dyYW5pbS5qcy9hcGkuaHRtbCc7XG5cdHRocm93IG5ldyBFcnJvcignR3JhbmltOiBJbnB1dCBlcnJvciBvbiBcIicgKyBlbGVtZW50ICsgJ1wiIG9wdGlvbi5cXG5DaGVjayB0aGUgQVBJICcgKyBzaXRlVVJMICsgJy4nKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5wdXRUeXBlKSB7XG5cdHZhciB4UG9zaXRpb25WYWx1ZXMgPSBbJ2xlZnQnLCAnY2VudGVyJywgJ3JpZ2h0J107XG5cdHZhciB5UG9zaXRpb25WYWx1ZXMgPSBbJ3RvcCcsICdjZW50ZXInLCAnYm90dG9tJ107XG5cdHZhciBzdHJldGNoTW9kZVZhbHVlcyA9IFsnc3RyZXRjaCcsICdzdHJldGNoLWlmLXNtYWxsZXInLCAnc3RyZXRjaC1pZi1iaWdnZXInXTtcblx0dmFyIGJsZW5kaW5nTW9kZVZhbHVlcyA9IFsnbXVsdGlwbHknLCAnc2NyZWVuJywgJ25vcm1hbCcsICdvdmVybGF5JywgJ2RhcmtlbicsXG5cdFx0J2xpZ2h0ZW4nLCAnbGlnaHRlcicsICdjb2xvci1kb2RnZScsICdjb2xvci1idXJuJywgJ2hhcmQtbGlnaHQnLCAnc29mdC1saWdodCcsXG5cdFx0J2RpZmZlcmVuY2UnLCAnZXhjbHVzaW9uJywgJ2h1ZScsICdzYXR1cmF0aW9uJywgJ2NvbG9yJywgJ2x1bWlub3NpdHknXTtcblxuXHRzd2l0Y2goaW5wdXRUeXBlKSB7XG5cdFx0Y2FzZSAnaW1hZ2UnOlxuXHRcdFx0Ly8gVmFsaWRhdGUgaW1hZ2UucG9zaXRpb25cblx0XHRcdGlmICgoIUFycmF5LmlzQXJyYXkodGhpcy5pbWFnZS5wb3NpdGlvbikgfHwgdGhpcy5pbWFnZS5wb3NpdGlvbi5sZW5ndGggIT09IDIpIHx8XG5cdFx0XHRcdHhQb3NpdGlvblZhbHVlcy5pbmRleE9mKHRoaXMuaW1hZ2UucG9zaXRpb25bMF0pID09PSAtMSB8fFxuXHRcdFx0XHR5UG9zaXRpb25WYWx1ZXMuaW5kZXhPZih0aGlzLmltYWdlLnBvc2l0aW9uWzFdKSA9PT0gLTFcblx0XHRcdCkge3RoaXMudHJpZ2dlckVycm9yKCdpbWFnZS5wb3NpdGlvbicpfVxuXHRcdFx0Ly8gVmFsaWRhdGUgaW1hZ2Uuc3RyZXRjaE1vZGVcblx0XHRcdGlmICh0aGlzLmltYWdlLnN0cmV0Y2hNb2RlKSB7XG5cdFx0XHRcdGlmICgoIUFycmF5LmlzQXJyYXkodGhpcy5pbWFnZS5zdHJldGNoTW9kZSkgfHwgdGhpcy5pbWFnZS5zdHJldGNoTW9kZS5sZW5ndGggIT09IDIpIHx8XG5cdFx0XHRcdFx0c3RyZXRjaE1vZGVWYWx1ZXMuaW5kZXhPZih0aGlzLmltYWdlLnN0cmV0Y2hNb2RlWzBdKSA9PT0gLTEgfHxcblx0XHRcdFx0XHRzdHJldGNoTW9kZVZhbHVlcy5pbmRleE9mKHRoaXMuaW1hZ2Uuc3RyZXRjaE1vZGVbMV0pID09PSAtMVxuXHRcdFx0XHQpIHt0aGlzLnRyaWdnZXJFcnJvcignaW1hZ2Uuc3RyZXRjaE1vZGUnKX1cblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2JsZW5kaW5nTW9kZSc6XG5cdFx0XHRpZiAoYmxlbmRpbmdNb2RlVmFsdWVzLmluZGV4T2YodGhpcy5pbWFnZS5ibGVuZGluZ01vZGUpID09PSAtMSkge1xuXHRcdFx0XHR0aGlzLmNsZWFyKCk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlckVycm9yKCdibGVuZGluZ01vZGUnKTtcblx0XHRcdH1cblx0fVxufTtcbiIsIi8vIGltcG9ydCBHcmFuaW0gaW50byBKUyBmaWxlXG5pbXBvcnQgR3JhbmltIGZyb20gJ2dyYW5pbSc7XG5cblxuXG5jb25zdCBncmFuaW1JbnN0YW5jZTEgPSBuZXcgR3JhbmltKHtcbiAgIGVsZW1lbnQ6ICcjYmFzaWNfX2hlYWRlci0tY2FudmFzJyxcbiAgIG5hbWU6ICdiYXNpYy1ncmFkaWVudCcsXG4gICBkaXJlY3Rpb246ICdsZWZ0LXJpZ2h0JywgLy8gJ2RpYWdvbmFsJywgJ3RvcC1ib3R0b20nLCAncmFkaWFsJ1xuICAgb3BhY2l0eTogWzEsIDFdLFxuICAgaXNQYXVzZWRXaGVuTm90SW5WaWV3OiB0cnVlLFxuICAgc3RhdGVzOiB7XG4gICAgICBcImRlZmF1bHQtc3RhdGVcIjoge1xuICAgICAgICAgZ3JhZGllbnRzOiBbXG4gICAgICAgICAgICBbJyNBQTA3NkInLCAnIzYxMDQ1RiddLFxuICAgICAgICAgICAgWycjMDJBQUIwJywgJyMwMENEQUMnXSxcbiAgICAgICAgICAgIFsnI0RBMjJGRicsICcjOTczM0VFJ11cbiAgICAgICAgIF1cbiAgICAgIH1cbiAgIH1cbn0pO1xuICAgXG4gICBjb25zdCBncmFuaW1JbnN0YW5jZTIgPSBuZXcgR3JhbmltKHtcbiAgICAgIGVsZW1lbnQ6ICcjY2FudmFzLWltYWdlLWJsZW5kaW5nJyxcbiAgICAgIGRpcmVjdGlvbjogJ3RvcC1ib3R0b20nLFxuICAgICAgb3BhY2l0eTogWzEsIDFdLFxuICAgICAgaXNQYXVzZWRXaGVuTm90SW5WaWV3OiB0cnVlLFxuICAgICAgaW1hZ2U6IHtcbiAgICAgICAgIHNvdXJjZTogJy4vc3JjL2Fzc2V0cy9uZXZlbi1rcmNtYXJlay0xOTAwODQtdW5zcGxhc2guanBnJyxcbiAgICAgICAgIGJsZW5kaW5nTW9kZTogJ211bHRpcGx5J1xuICAgICAgfSxcbiAgICAgIHN0YXRlczoge1xuICAgICAgICAgXCJkZWZhdWx0LXN0YXRlXCI6IHtcbiAgICAgICAgICAgIGdyYWRpZW50czogW1xuICAgICAgICAgICAgICAgWycjMjkzMjNjJywgJyM0ODU1NjMnXSxcbiAgICAgICAgICAgICAgIFsnI0ZGNkI2QicsICcjNTU2MjcwJ10sXG4gICAgICAgICAgICAgICBbJyM4MGQzZmUnLCAnIzdlYTBjNCddLFxuICAgICAgICAgICAgICAgWycjZjBhYjUxJywgJyNlY2ViYTMnXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHRyYW5zaXRpb25TcGVlZDogNzAwMFxuICAgICAgICAgfVxuICAgICAgfVxuICAgfSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iXX0=
