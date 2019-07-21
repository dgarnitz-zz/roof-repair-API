var rewire = require('rewire');
var chai = require('chai');
var should = chai.should();

var app = rewire("./app.js")

processLocation = app.__get__('processLocation')
processSeason = app.__get__('processSeason')


describe('helper functions', function () {

    //check processLocation
    describe('processLocation', function(){
        it('should output the correct location vector', function(done){
            processLocation("Fife").should.equal(1);
            done();
        });
        it('should output the correct location vector', function(done){
            processLocation("Tayside").should.equal(0);
            done();
        });
        it('should output the correct location vector', function(done){
            processLocation("other").should.equal(0);
            done();
        });
    });

    //check processSeason
    describe('processSeason', function(){
        it('should output the correct season vector', function(done){
            processSeason("winter").should.eql([1,0,0,0]);
            done();
        });
        it('should output the correct season vector', function(done){
            processSeason("spring").should.eql([0,1,0,0]);
            done();
        });
        it('should output the correct season vector', function(done){
            processSeason("summer").should.eql([0,0,1,0]);
            done();
        });
        it('should output the correct season vector', function(done){
            processSeason("autumn").should.eql([0,0,0,1]);
            done();
        });
        it('should output the correct season vector', function(done){
            processSeason("other").should.eql([0,0,1,0]);
            done();
        });
    });

});


