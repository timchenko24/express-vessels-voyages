import { expect, server, BASE_URL } from './setup';

describe('Ports', () => {
  it('get ports page', done => {
    server
      .get(`${BASE_URL}ports`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.ports).to.be.instanceOf(Array);
        res.body.ports.forEach(m => {
          expect(m).to.have.property('id');
          expect(m).to.have.property('country');
          expect(m).to.have.property('name');
          expect(m).to.have.property('type');
          expect(m).to.have.property('longitude');
          expect(m).to.have.property('latitude');
        });
        done();
      });
  });

  it('get ports page by one param query', done => {
    server
      .get(`${BASE_URL}ports?country=usa`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.ports).to.be.instanceOf(Array);
        res.body.ports.forEach(m => {
          expect(m).to.have.property('id');
          expect(m).to.have.property('country');
          expect(m.country.toLowerCase()).to.equal('usa');
          expect(m).to.have.property('name');
          expect(m).to.have.property('type');
          expect(m).to.have.property('longitude');
          expect(m).to.have.property('latitude');
        });
        done();
      });
  });

  it('get ports page by all param query', done => {
    server
      .get(`${BASE_URL}ports?country=usa&name=vancouver&longitude__lte=-120&latitude__gte=45.6`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.ports).to.be.instanceOf(Array);
        res.body.ports.forEach(m => {
          expect(m).to.have.property('id');
          expect(m).to.have.property('country');
          expect(m.country.toLowerCase()).to.equal('usa');
          expect(m).to.have.property('name');
          expect(m.name.toLowerCase()).to.equal('vancouver');
          expect(m).to.have.property('type');
          expect(m).to.have.property('longitude');
          expect(parseFloat(m.longitude)).to.lessThan(-120.0);
          expect(m).to.have.property('latitude');
          expect(parseFloat(m.latitude)).to.greaterThan(45.6);
        });
        done();
      });
  });

  it('get ports page by id', done => {
    server
      .get(`${BASE_URL}ports/c7dbec2e-3542-42b9-bc1a-a19d75504ba1`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.ports).to.have.length(1);

        expect(res.body.ports[0]).to.eql({
          id: 'c7dbec2e-3542-42b9-bc1a-a19d75504ba1',
          country: 'Germany',
          name: 'BREMERHAVEN',
          type: 'Port',
          longitude: '8.54626',
          latitude: '53.56870'
        });
        done();
      });
  });

  it('get ports page by incorrect param query', done => {
    server
      .get(`${BASE_URL}ports?a=1`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);

        expect(res.body.ports).to.include('TypeError');
        done();
      });
  });
});
