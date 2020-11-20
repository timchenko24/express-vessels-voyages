import Model from '../models/model';
import { generateClauseById, generateClauseByParams } from '../utils';

const portsModel = new Model('dw_port as p');

export const portsPage = async (req, res) => {
  try {
    let clause = '';

    const params = {
      country: (val) => `LOWER(c.name) = LOWER('${val}')`,
      name: (val) => `LOWER(p.name) = LOWER('${val}')`,
      longitude__lte: (val) => `p.longitude <= '${val}'`,
      longitude__gte: (val) => `p.longitude >= '${val}'`,
      latitude__lte: (val) => `p.longitude >= '${val}'`,
      latitude__gte: (val) => `p.latitude >= '${val}'`
    };

    clause += generateClauseById(req, 'p.id');

    clause += generateClauseByParams(req, params);

    const data = await portsModel.select(
      'p.id, c.name as country, p.name, p.type, p.longitude, p.latitude',
      ` inner join dw_portcountry as c on p.country_id = c.id ${clause}`
    );

    res.status(200).json({ ports: data.rows });
  } catch (err) {
    res.status(200).json({ ports: err.stack });
  }
};
