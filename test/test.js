/**
 * Created by Nitai J. Perez
 * nitai.perez@ironsrc.com
 * 18/03/2015.
 */

var functime = require('../funcTime');
var should = require('should');

describe('main', function () {
    it('should attach $execTime to test function', function (done) {
        function test() {
            // Note this is the actual callback, so assertions go here:
            should.exist(test.$execTime);
            test.$execTime.should.be.greaterThan(999);
            done();
        }
        test = test.time("Time to test");
        setTimeout(test, 1000);
    });
});