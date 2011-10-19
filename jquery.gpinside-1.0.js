/**
 * jQuery.gpInside 1.0
 * http://ginpen.com/jquery/gpinside/
 * https://github.com/ginpei/jQuery.gpInside
 *
 * Copyright (c) 2011 Takanashi Ginpei
 * http://ginpen.com
 *
 * Released under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
;(function($) {
    try {
        if (window.com.ginpen.gpInside) { return; }
    } catch (e) {}

    if (!window.com) { window.com = {}; }
    if (!com.ginpen) { com.ginpen = {}; }

    var gpInside = com.ginpen.gpInside = {
        /**
         * The version of this applycation.
         * @type String
         */
        VERSION: '1.0',

        /**
         * Default settings.
         * @type Object
         */
        DEFAULT: {
            autoAppearance: true,
            type: null
        },

        /**
         * @param {Object} settings
         * @returns {Object}
         */
        mergeSettings: function(settings) {
            return $.extend({}, gpInside.DEFAULT, settings);
        },

        /**
         * Set nice position.
         * @param {HtmlElement} $el The target.
         * @param {Object} settings
         */
        adjust: function($el, settings) {
            var vals = this._getValues($el, settings);
            this._calclatePosition(vals, $el, settings);
            this._setPosition(vals, $el, settings);

            if (settings.autoAppearance) {
                $el.show();
            }
        },

        /**
         * @param {HtmlElement} $el The target.
         * @param {Object} settings
         */
        _getValues: function($el, settings) {
            var left = settings.left;
            var top = settings.top;
            if (isNaN(left) || isNaN(top)) {
                var offset = $el.offset();
                if (isNaN(left)) {
                    left = offset.left;
                }
                if (isNaN(top)) {
                    top = offset.top;
                }
            }

            var width = $el.outerWidth(true);
            var height = $el.outerHeight(true);

            var clientWidth = document.documentElement.clientWidth
                || document.body.clientWidth;
            var clientHeight = document.documentElement.clientHeight
                || document.body.clientHeight;

            var scrollLeft = document.documentElement.scrollLeft
                    || document.body.scrollLeft;
            var scrollTop = document.documentElement.scrollTop
                    || document.body.scrollTop;

            return {
                clientHeight: clientHeight,
                clientWidth: clientWidth,
                height: height,
                left: left,
                scrollLeft: scrollLeft,
                scrollTop: scrollTop,
                top: top,
                width: width
            };
        },

        /**
         * @param {Object} v Values by _getValues().
         * @param {HtmlElement} $el The target.
         * @param {Object} settings
         * @returns {Object} Return manipulated <v>.
         */
        _calclatePosition: function(v, $el, settings) {
            switch(settings.type) {
                case 'center':
                    this._calclateCenterPosition(v, $el, settings);
                    break;

                case 'contextmenu':
                    this._calclateContextmenuPosition(v, $el, settings);
                    break;

                default:
                    this._calclateContainPosition(v, $el, settings);
            }

            return v;
        },

        /**
         * @param {Object} v Values by _getValues().
         * @param {HtmlElement} $el The target.
         * @param {Object} settings
         * @returns {Object} Return manipulated <v>.
         */
        _calclateContainPosition: function(v, $el, settings) {
            if (v.left + v.width > v.scrollLeft + v.clientWidth) {
                v.left = v.scrollLeft + v.clientWidth - v.width;

                if (v.left < 0) {
                    v.left = 0;
                }
            }

            if (v.top + v.height > v.scrollTop + v.clientHeight) {
                v.top = v.scrollTop + v.clientHeight - v.height;

                if (v.top < 0) {
                    v.top = 0;
                }
            }

            return v;
        },

        /**
         * @param {Object} v Values by _getValues().
         * @param {HtmlElement} $el The target.
         * @param {Object} settings
         * @returns {Object} Return manipulated <v>.
         */
        _calclateCenterPosition: function(v, $el, settings) {
            v.left = (v.clientWidth - v.width) / 2;
            v.top = (v.clientHeight - v.height) / 2;

            this._calclateContainPosition(v, $el, settings);

            return v;
        },

        /**
         * @param {Object} v Values by _getValues().
         * @param {HtmlElement} $el The target.
         * @param {Object} settings
         * @returns {Object} Return manipulated <v>.
         */
        _calclateContextmenuPosition: function(v, $el, settings) {
            if (v.left + v.width > v.scrollLeft + v.clientWidth) {
                v.left -= v.width;
            }
            if (v.top + v.height > v.scrollTop + v.clientHeight) {
                v.top -= v.height;
            }

            this._calclateContainPosition(v, $el, settings);

            return v;
        },

        /**
         * @param {Object} v Values by _getValues().
         * @param {HtmlElement} $el The target.
         * @param {Object} settings
         * @returns {Object} Return manipulated <v>.
         */
        _setPosition: function(v, $el, settings) {
            $el.css({
                left: v.left,
                top: v.top
            });
        },

        banpei: null
    };

    // jQuery method interface
    $.fn.gpInside = function(settings) {
        settings = gpInside.mergeSettings(settings);
        for (var i = 0, l = this.length; i < l; i++) {
            gpInside.adjust(this.eq(i), settings);
        }

        return this;
    };

    // Shortcut interface
    $.fn.gpCenter = function(settings) {
        settings = settings || {};
        settings.type = 'center';
        return this.gpInside(settings);
    };
}(jQuery));
