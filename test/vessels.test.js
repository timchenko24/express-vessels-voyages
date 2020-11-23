import { expect, server, BASE_URL } from './setup';

describe('Vessels', () => {
  it('get vessels page', done => {
    server
      .get(`${BASE_URL}vessels`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.vessels).to.be.instanceOf(Array);
        res.body.vessels.forEach(m => {
          expect(m).to.have.property('mmsi');
          expect(m).to.have.property('name');
          expect(m).to.have.property('year');
          expect(m).to.have.property('flag');
          expect(m).to.have.property('type');
          expect(m).to.have.property('imo');
          expect(m).to.have.property('call_sign');
          expect(m).to.have.property('length');
          expect(m).to.have.property('width');
          expect(m).to.have.property('dwt');
          expect(m).to.have.property('grt');
        });
        done();
      });
  });

  it('get vessels page by one param query', done => {
    server
      .get(`${BASE_URL}vessels?flag=malta`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.vessels).to.be.instanceOf(Array);
        res.body.vessels.forEach(m => {
          expect(m).to.have.property('mmsi');
          expect(m).to.have.property('name');
          expect(m.flag.toLowerCase()).to.equal('malta');
          expect(m).to.have.property('year');
          expect(m).to.have.property('type');
          expect(m).to.have.property('imo');
          expect(m).to.have.property('call_sign');
          expect(m).to.have.property('length');
          expect(m).to.have.property('width');
          expect(m).to.have.property('dwt');
          expect(m).to.have.property('grt');
        });
        done();
      });
  });

  it('get vessels page by several params query', done => {
    server
      .get(`${BASE_URL}vessels?flag=liberia&type=bulk%20carrier&length__gte=200&grt__lte=60000`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.vessels).to.be.instanceOf(Array);
        res.body.vessels.forEach(m => {
          expect(m).to.have.property('mmsi');
          expect(m).to.have.property('name');
          expect(m.flag.toLowerCase()).to.equal('liberia');
          expect(m).to.have.property('year');
          expect(m.type.toLowerCase()).to.equal('bulk carrier');
          expect(m).to.have.property('imo');
          expect(m).to.have.property('call_sign');
          expect(parseInt(m.length, 10)).to.greaterThan(200);
          expect(m).to.have.property('width');
          expect(m).to.have.property('dwt');
          expect(parseInt(m.grt, 10)).to.lessThan(60000);
        });
        done();
      });
  });

  it('get vessels page by mmsi', done => {
    server
      .get(`${BASE_URL}vessels/636092074`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.vessels).to.have.length(1);

        expect(res.body.vessels[0]).to.eql({
          mmsi: 636092074,
          name: 'PIET',
          year: 2011,
          flag: 'Liberia',
          type: 'Bulk Carrier',
          imo: 9568574,
          call_sign: 'A8WG6',
          length: 229,
          width: 38,
          dwt: 93200,
          grt: 51225
        });
        done();
      });
  });

  it('get vessels page by incorrect param query', done => {
    server
      .get(`${BASE_URL}vessels?a=1`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);

        expect(res.body.vessels).to.include('TypeError');
        done();
      });
  });
});
