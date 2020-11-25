import Model from '../models/model';
import { generateClauseById, generateClauseByParams } from '../utils';

const voyagesModel = new Model('dw_voyage as v');

export const voyagesPage = async (req, res) => {
  try {
    let clause = '';

    const params = {
      route: (val) => `LOWER(concat(p.name, ' - ', pp.name)) = LOWER('${val}')`,
      vessel: (val) => `LOWER(ves.name) = LOWER('${val}')`,
      time_in_port__lte: (val) => `v.time_in_port <= '${val}'`,
      time_in_port__gte: (val) => `v.time_in_port >= '${val}'`,
      fuel_costs__lte: (val) => `v.fuel_costs <= '${val}'`,
      fuel_costs__gte: (val) => `v.fuel_costs >= '${val}'`,
      crew_costs__lte: (val) => `v.crew_costs <= '${val}'`,
      crew_costs__gte: (val) => `v.crew_costs >= '${val}'`,
      port_charges__lte: (val) => `v.port_charges <= '${val}'`,
      port_charges__gte: (val) => `v.port_charges >= '${val}'`,
      insurance_costs__lte: (val) => `v.insurance_costs <= '${val}'`,
      insurance_costs__gte: (val) => `v.insurance_costs >= '${val}'`,
      total_costs__lte: (val) => `v.total_costs <= '${val}'`,
      total_costs__gte: (val) => `v.total_costs >= '${val}'`,
      cargo_income__lte: (val) => `v.cargo_income <= '${val}'`,
      cargo_income__gte: (val) => `v.cargo_income >= '${val}'`,
      net_total_freight__lte: (val) => `v.net_total_freight <= '${val}'`,
      net_total_freight__gte: (val) => `v.net_total_freight >= '${val}'`,
      voyage_profit__lte: (val) => `v.voyage_profit <= '${val}'`,
      voyage_profit__gte: (val) => `v.voyage_profit >= '${val}'`,
    };

    clause += generateClauseById(req, 'v.id');

    clause += generateClauseByParams(req, params);

    const data = await voyagesModel.select(
      // eslint-disable-next-line no-useless-escape
      `v.id,
              concat(p.name, ' - ', pp.name) as route,
              ves.name as vessel,
              TO_TIMESTAMP(to_char(dat.year, '9999') || to_char(dat.month, '09') || to_char(dat.day, '09') || to_char(dat.hour, '09') || to_char(dat.minute, '09'), 'YYYYMMDD HH24:MI') as departure_date,
              TO_TIMESTAMP(to_char(dat1.year, '9999') || to_char(dat1.month, '09') || to_char(dat1.day, '09') || to_char(dat1.hour, '09') || to_char(dat1.minute, '09'),'YYYYMMDD HH24:MI') as arrival_date,
              v.time_in_port,
              v.fuel_costs,
              v.crew_costs,
              v.port_charges,
              v.insurance_costs,
              v.total_costs,
              v.cargo_income,
              v.net_total_freight,
              v.voyage_profit`,
      ` inner join dw_route as r on v.route_id = r.id
              inner join dw_port as p on r.departure_port_id = p.id
              inner join dw_port as pp on r.destination_port_id = pp.id
              inner join dw_vessel as ves on v.mmsi_id = ves.mmsi
              inner join dw_date as dat on v.departure_date_id = dat.id
              inner join dw_date as dat1 on v.arrival_date_id = dat1.id ${clause}`
    );

    res.status(200).json({ voyages: data.rows });
  } catch (err) {
    res.status(200).json({ voyages: err.stack });
  }
};
