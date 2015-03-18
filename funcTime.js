/**
 * Created by Nitai J. Perez
 * nitai.perez@gmail.com
 * 18/03/2015.
 */

var _times = {};

function time(label) {
    // Init label:
    if (!_times[label]) _times[label] = {calls: 0};

    _times[label].timestamp = Date.now();

}
function timeEnd(label, cb) {
    if (!_times[label]) {
        throw new Error('No such label: ' + label);
    }

    // Label called, increment count:
    _times[label].calls += 1;

    // Set duration:
    cb.$execTime = _times[label].duration = Date.now() - _times[label].timestamp;

    // Update average:
    cb.$execTimeAvg = _times[label].avg =
        _times[label].avg
            ? ((_times[label].avg * (_times[label].calls - 1)) + cb.$execTime) / _times[label].calls
            : duartion;

    // log:
    console.log('%s: %dms (avg: %dms across %s calls)', label, cb.$execTime.toFixed(2), _times[label].avg.toFixed(2), _times[label].calls);
}

Function.prototype.time = function (label) {
    var func = this;
    label = label || this.name;
    time(label);
    return function () {
        timeEnd(label, func);
        func.apply(this, arguments);
        // TODO: Make sure to restore function to original non-wrapped.
    }
};