import Model from '../models/model';
import { generateClauseById, generateClauseByParams } from '../utils';

const routesModel = new Model('dw_route as r');

export const routesPage = async (req, res) => {
  try {
    let clause = '';

    const params = {
      departure_port: (val) => `LOWER(p.name) = LOWER('${val}')`,
      destination_port: (val) => `LOWER(pp.name) = LOWER('${val}')`,
    };

    clause += generateClauseById(req, 'r.id');

    clause += generateClauseByParams(req, params);

    const data = await routesModel.select(
      'r.id, p.name as departure_port, pp.name as destination_port',
      ` inner join dw_port as p on r.departure_port_id = p.id
              inner join dw_port as pp on r.destination_port_id = pp.id ${clause}`
    );

    res.status(200).json({ routes: data.rows });
  } catch (err) {
    res.status(200).json({ routes: err.stack });
  }
};
