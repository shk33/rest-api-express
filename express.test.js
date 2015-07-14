var superagent = require('superagent');
var expect = require('expect.js');

describe('express rest api server', function () {
  var id;

  it('posts an object', function (done) {
    superagent.post('http://localhost:3000/collections/test')
      .send({
        name: 'Jhon',
        email: 'jhon@rpjs.co'
      })
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.body.length).to.eql(1);
        expect(res.body[0]._id.length).to.eql(24);
        id = res.body[0]._id;
        done();
      });
  });

  it('retrives an object', function (done) {
    superagent.get('http://localhost:3000/collections/test/'+id)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.id._length).to.eql(24);
        expect(res.body.id).to.eql(id);
        done();
      });
  });

  it('retrives a collection', function (done) {
    superagent.get('http://localhost:3000/collections/test')
      .end(function (err, res) {
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item) { return item._id; })).to.contain(id);
        done();
      });
  });

  it('updates an object', function (done) {
    superagent.put('http://localhost:3000/collections/test/'+id)
      .send({
        name: 'Peter',
        email: 'peter@yahoo.com' 
      })
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.message).to.eql('success');
        done();
      });
  });
});