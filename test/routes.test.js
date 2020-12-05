import { expect, server, BASE_URL } from './setup';

describe('Routes', () => {
  const fiels = [ 'id', 'departure_port', 'destination_port' ];

  it('get routes page', done => {
    server
      .get(`${BASE_URL}routes`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.routes).to.be.instanceOf(Array);
        res.body.routes.forEach(m => {
          expect(m).to.have.all.keys(...fiels);
        });
        done();
      });
  });

  it('get routes page by one param query', done => {
    server
      .get(`${BASE_URL}routes?departure_port=primorsk`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.routes).to.be.instanceOf(Array);
        res.body.routes.forEach(m => {
          expect(m).to.have.all.keys(...fiels);
          expect(m.departure_port.toLowerCase()).to.equal('primorsk');
        });
        done();
      });
  });

  it('get routes page by several params query', done => {
    server
      .get(`${BASE_URL}routes?departure_port=primorsk&destination_port=amsterdam`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.routes).to.be.instanceOf(Array);
        res.body.routes.forEach(m => {
          expect(m).to.have.all.keys(...fiels);
          expect(m.departure_port.toLowerCase()).to.equal('primorsk');
          expect(m.destination_port.toLowerCase()).to.equal('amsterdam');
        });
        done();
      });
  });

  it('get routes page by id', done => {
    server
      .get(`${BASE_URL}routes/e32589ab-2039-4738-8256-73b01524eef9`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.routes).to.have.length(1);

        expect(res.body.routes[0]).to.eql({
          id: 'e32589ab-2039-4738-8256-73b01524eef9',
          departure_port: 'ZEEBRUGGE',
          destination_port: 'HULL'
        });
        done();
      });
  });

  it('get routes page by incorrect param query', done => {
    server
      .get(`${BASE_URL}routes?a=1`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);

        expect(res.body.routes).to.include('TypeError');
        done();
      });
  });
});
