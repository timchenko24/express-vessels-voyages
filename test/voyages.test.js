import { expect, server, BASE_URL } from './setup';

describe('Voyages', () => {
  const fields = [ 'id', 'route', 'vessel', 'departure_date', 'arrival_date',
    'time_in_port', 'fuel_costs', 'crew_costs', 'port_charges', 'insurance_costs',
    'total_costs', 'cargo_income', 'net_total_freight', 'voyage_profit' ];

  it('get voyages page', done => {
    server
      .get(`${BASE_URL}voyages`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.voyages).to.be.instanceOf(Array);
        res.body.voyages.forEach(m => {
          expect(m).to.have.all.keys(...fields);
        });
        done();
      });
  });

  it('get voyages page by one param query', done => {
    server
      .get(`${BASE_URL}voyages?vessel=seaturbot`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.voyages).to.be.instanceOf(Array);
        res.body.voyages.forEach(m => {
          expect(m).to.have.all.keys(...fields);
          expect(m.vessel.toLowerCase()).to.equal('seaturbot');
        });
        done();
      });
  });

  it('get voyages page by several params query', done => {
    server
      .get(`${BASE_URL}voyages?route=VYSOTSK%20-%20BILBAO&time_in_port__lte=100`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.voyages).to.be.instanceOf(Array);
        res.body.voyages.forEach(m => {
          expect(m).to.have.all.keys(...fields);
          expect(m.route.toUpperCase()).to.equal('VYSOTSK - BILBAO');
          expect(parseInt(m.time_in_port, 10)).to.lessThan(100);
        });
        done();
      });
  });

  it('get voyages page by several params query', done => {
    server
      .get(`${BASE_URL}voyages?time_in_port__gte=20&fuel_costs__lte=600000&
        fuel_costs__gte=400000&crew_costs__lte=60000&crew_costs__gte=30000&
        port_charges__lte=20000&port_charges__gte=10000&insurance_costs__lte=15000&
        insurance_costs__gte=10000&total_costs__lte=700000&total_costs__gte=600000&
        cargo_income__lte=1800000&cargo_income__gte=1500000&net_total_freight__lte=2000000&
        net_total_freight__gte=1600000&voyage_profit__lte=1100000&voyage_profit__gte=1000000`
        .replace(/\s/g, ''))
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.voyages).to.be.instanceOf(Array);
        res.body.voyages.forEach(m => {
          expect(m).to.have.all.keys(...fields);
          expect(parseInt(m.time_in_port, 10)).to.greaterThan(20);
          expect(parseInt(m.fuel_costs, 10)).to.be.within(400000, 600000);
          expect(parseInt(m.crew_costs, 10)).to.be.within(30000, 60000);
          expect(parseInt(m.port_charges, 10)).to.be.within(10000, 20000);
          expect(parseInt(m.insurance_costs, 10)).to.be.within(10000, 15000);
          expect(parseInt(m.total_costs, 10)).to.be.within(600000, 700000);
          expect(parseInt(m.cargo_income, 10)).to.be.within(1500000, 1800000);
          expect(parseInt(m.net_total_freight, 10)).to.be.within(1600000, 2000000);
          expect(parseInt(m.voyage_profit, 10)).to.be.within(1000000, 1100000);
        });
        done();
      });
  });

  it('get voyages page by id', done => {
    server
      .get(`${BASE_URL}voyages/1aaaf3a2-f212-4b1f-8d0a-0c5e437ab67e`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.voyages).to.have.length(1);

        expect(res.body.voyages[0]).to.eql({
          id: '1aaaf3a2-f212-4b1f-8d0a-0c5e437ab67e',
          route: 'UST-LUGA - BALTIYSK',
          vessel: 'BALTIYSK',
          departure_date: '2020-03-16T08:37:00.000Z',
          arrival_date: '2020-03-17T00:43:00.000Z',
          time_in_port: 28,
          fuel_costs: 17815,
          crew_costs: 1411,
          port_charges: 5628,
          insurance_costs: 307,
          total_costs: 25161,
          cargo_income: 580841,
          net_total_freight: 557755,
          voyage_profit: 532594
        });
        done();
      });
  });

  it('get voyages page by incorrect param query', done => {
    server
      .get(`${BASE_URL}voyages?a=1`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);

        expect(res.body.voyages).to.include('TypeError');
        done();
      });
  });
});
