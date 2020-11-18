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
});
