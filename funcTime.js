/**
 * Created by Nitai J. Perez
 * nitai.perez@gmail.com
 * 18/03/2015.
 */

var _times = {};

function time(label) {
    // Init label:
    if (!_times[label]) _times[label] = {calls: 0};
    return (_times[label].timestamp = Date.now());
}

function timeEnd(label, func) {
    if (!_times[label]) {
        throw new Error('No such label: ' + label);
    }

    // Label called, increment count:
    var calls = _times[label].calls = (_times[label].calls + 1);

    // Set duration:
    var duration = _times[label].duration = Date.now() - _times[label].timestamp;

    // Update average:
    var avg = _times[label].avg =
        _times[label].avg
            ? ((_times[label].avg * (calls - 1)) + duration) / calls
            : duration;

    // Log result:
    console.log('%s: %dms (avg: %dms across %s calls)', label, duration.toFixed(2), avg.toFixed(2), calls);
}

function $execTime(label) {
    return _times[label || this.name].duration || null;
}

function $execTimeAvg(label) {
    return _times[label || this.name].avg || null;
}

function $execCount(label) {
    return _times[label || this.name].calls || null;
}

Function.prototype.time = function (label) {
    var func = this;
    label = label || func.name;
    time(label);
    var wrapped = function () {
        timeEnd(label, func);
        func.apply(this, arguments);
        // TODO: Make sure to restore function to original non-wrapped.
    };

    wrapped.$execTime = $execTime;
    wrapped.$execTimeAvg = $execTimeAvg;
    wrapped.$execCount = $execCount;
    return wrapped;
};