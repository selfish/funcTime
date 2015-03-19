/**
 * Created by Nitai J. Perez
 * nitai.perez@ironsrc.com
 * 18/03/2015.
 */

var functime = require('../funcTime');
var should = require('should');

describe('main', function () {
    it('should attach base functions to wrapped method', function (done) {
        function test() {
            // Note this is the actual callback, so assertions go here:
            should.exist(test.$execTime);
            should.exist(test.$execTimeAvg);
            should.exist(test.$execTimeMax);
            should.exist(test.$execTimeMin);
            should.exist(test.$execCount);
            should.exist(test.$label);
            done();
        }

        test = test.time("Time to test");
        test();
    });

    it('should use function name as label for function', function (done) {
        function test() {
            // Note this is the actual callback, so assertions go here:
            should.exist(test.$label);
            test.$label.should.equal("test");
            done();
        }

        test = test.time();
        test();
    });

    it('should attach $execTime to test function and have a value larger than one second', function (done) {
        function test() {
            // Note this is the actual callback, so assertions go here:
            should.exist(test.$execTime);
            test.$execTime().should.be.greaterThan(999);
            done();
        }

        test = test.time("Time to test");
        setTimeout(test, 1000);
    });
});