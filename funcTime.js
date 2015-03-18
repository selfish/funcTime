/**
 * Created by Nitai J. Perez
 * nitai.perez@gmail.com
 * 18/03/2015.
 */

var _times = {};

function time(label) {
    // Init label:
    if (!this._times[label]) this._times[label] = {calls: 0};

    this._times[label].timestamp = Date.now();

}
function timeEnd(label) {
    if (!this._times[label]) {
        throw new Error('No such label: ' + label);
    }

    // Label called, increment count:
    this._times[label].calls += 1;

    // Set duration:
    var duartion = Date.now() - this._times[label];

    // Update average:
    this._times[label].avg =
        this._times[label].avg
            ? ((avg * this._times[label].calls - 1) + duartion) / this._times[label].calls
            : duartion;

    // log:
    console.log('%s: %dms (avg: %dms across %s calls)', label, duartion, this._times[label].avg, this._times[label].calls);
}

/**
 * Wrap a callback in order to time it's call time.
 */
function cbTime(label, cb) {
    time(label);
    return function () {
        timeEnd(label);
        cb.apply(this, arguments);
    }
}

module.exports = {
    cb: cbTime
};