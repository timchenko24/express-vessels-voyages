import { expect, server, BASE_URL } from './setup';

describe('Vessels', () => {
  const fields = [ 'mmsi', 'name', 'year', 'flag', 'type', 'imo', 'call_sign',
    'length', 'width', 'dwt', 'grt' ];

  it('get vessels page', done => {
    server
      .get(`${BASE_URL}vessels`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.vessels).to.be.instanceOf(Array);
        res.body.vessels.forEach(m => {
          expect(m).to.have.all.keys(...fields);
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
          expect(m).to.have.all.keys(...fields);
          expect(m.flag.toLowerCase()).to.equal('malta');
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
          expect(m).to.have.all.keys(...fields);
          expect(m.flag.toLowerCase()).to.equal('liberia');
          expect(m.type.toLowerCase()).to.equal('bulk carrier');
          expect(parseInt(m.length, 10)).to.greaterThan(200);
          expect(parseInt(m.grt, 10)).to.lessThan(60000);
        });
        done();
      });
  });

  it('get vessels page by several params query', done => {
    server
      .get(`${BASE_URL}vessels?imo__gte=9000000&
        imo__lte=9200000&year__gte=1980&year__lte=2005&
        length__lte=342&width__gte=20&width__lte=40&grt__gte=20000&
        dwt__gte=40001&dwt__lte=112312`
        .replace(/\s/g, ''))
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.vessels).to.be.instanceOf(Array);
        res.body.vessels.forEach(m => {
          expect(m).to.have.all.keys(...fields);
          expect(parseInt(m.imo, 10)).to.greaterThan(9000000);
          expect(parseInt(m.imo, 10)).to.lessThan(9200000);
          expect(parseInt(m.year, 10)).to.greaterThan(1980);
          expect(parseInt(m.year, 10)).to.lessThan(2005);
          expect(parseInt(m.length, 10)).to.lessThan(342);
          expect(parseInt(m.width, 10)).to.greaterThan(20);
          expect(parseInt(m.width, 10)).to.lessThan(40);
          expect(parseInt(m.grt, 10)).to.greaterThan(20000);
          expect(parseInt(m.dwt, 10)).to.greaterThan(40001);
          expect(parseInt(m.dwt, 10)).to.lessThan(112312);
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
