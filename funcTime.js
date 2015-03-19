/**
 * Created by Nitai J. Perez
 * nitai.perez@gmail.com
 * 18/03/2015.
 */

var _times = {};

function time(label) {

    // Init label:
    if (!_times[label]) _times[label] = {calls: 0, min: Infinity, max: -1};
    // Avoid overriding processes:
    if (_times[label].timestamp) {
        console.error("Previous timestamp exists for label '%s'. Parallel running support will be implemented in future version", label);
    } else {
        return (_times[label].timestamp = Date.now());
    }
}

function timeEnd(label) {
    // If label is missing, no action should occur
    if (_times[label].timestamp) {

        // Label called, increment count:
        var calls = _times[label].calls = (_times[label].calls + 1);

        // Set duration:
        var duration = _times[label].duration = Date.now() - _times[label].timestamp;

        // Set min/max
        _times[label].min = Math.min(_times[label].min, duration);
        _times[label].max = Math.max(_times[label].max, duration);

        // Update average:
        var avg = _times[label].avg =
            _times[label].avg
                ? ((_times[label].avg * (calls - 1)) + duration) / calls
                : duration;

        // Clear time:
        _times[label].timestamp = 0;

        // Log result:
        console.log('[functime - %s]: %dms (avg: %dms across %s calls)', label, duration.toFixed(2), avg.toFixed(2), calls);
    }
}

// Getters:
// @formatter:off
function $execTime(label)    { return _times[label || this.$label || this.name].duration || null; }
function $execTimeAvg(label) { return _times[label || this.$label || this.name].avg      || null; }
function $execTimeMax(label) { return _times[label || this.$label || this.name].max      || null; }
function $execTimeMin(label) { return _times[label || this.$label || this.name].min      || null; }
function $execCount(label)   { return _times[label || this.$label || this.name].calls    || null; }
// @formatter:on

function register(wrapped, label) {
    wrapped.$label = label;
    wrapped.$execTime = $execTime;
    wrapped.$execTimeAvg = $execTimeAvg;
    wrapped.$execCount = $execCount;
    wrapped.$execTimeMax = $execTimeMax;
    wrapped.$execTimeMin = $execTimeMin;
    return wrapped;
}

Function.prototype.time = function (label) {
    var func = this;
    label = label || func.name;
    time(label);
    var wrapped = function () {
        timeEnd(label);
        func.apply(this, arguments);
    };

    // Register methods:
    return register(wrapped, label);
};

module.exports = {
    execTime: $execTime,
    execTimeAvg: $execTimeAvg,
    execTimeMax: $execTimeMax,
    execTimeMin: $execTimeMin,
    execCount: $execCount
};