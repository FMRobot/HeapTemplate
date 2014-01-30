/*jslint browser:true*/
(function () {
	'use strict';

	/**
	 * The MutationObserver API string
	 * @type {String}
	 */
	var mutationObserver = 'MutationObserver',
		/**
		 * Flag to pollute the global namespace with the new API
		 * @type {Boolean}
		 */
		pollute = true,
		/**
		 * Supporting browser/vendor prefixes
		 * @type {Array}
		 */
		prefixes = [
			'WebKit',
			'Moz'
		],
		/**
		 * The number of prefixes
		 * @type {Number}
		 */
		prefixCount = prefixes.length,
		/**
		 * Incrementor
		 * @see  below for loop :)
		 * @type {Number}
		 */
		i,
		/**
		 * The mutation observer
		 *
		 * @type {Function}
		 */
		observer;

	// don't attempt to polyfil if there's no need
	if (window[mutationObserver] === undefined) {

		// walk through the prefixes
		for (i = 0; i < prefixCount; i += 1) {
			// check to see if the API exists
			if (window[prefixes[i] + mutationObserver] !== undefined) {
				// save the API and exit the loop
				observer = window[prefixes[i] + mutationObserver];
				break;
			}
		}

		// should we pollute?
		if (pollute) {
			window[mutationObserver] = observer;
		}

		// exit - return the new observer
		return observer;

	}

	// exit - return the native observer
	return window[mutationObserver];

}());
