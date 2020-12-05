import Model from '../models/model';
import { generateClauseById, generateClauseByParams } from '../utils';

const vesselsModel = new Model('dw_vessel as v');

export const vesselsPage = async (req, res) => {
  try {
    let clause = '';

    const params = {
      type: (val) => `LOWER(t.type) = LOWER('${val}')`,
      flag: (val) => `LOWER(f.flag) = LOWER('${val}')`,
      name: (val) => `LOWER(v.name) >= '${val}'`,
      call_sign: (val) => `LOWER(v.call_sign) >= '${val}'`,
      imo__lte: (val) => `v.imo <= '${val}'`,
      imo__gte: (val) => `v.imo >= '${val}'`,
      year__lte: (val) => `b.year <= '${val}'`,
      year__gte: (val) => `b.year >= '${val}'`,
      length__lte: (val) => `v.length <= '${val}'`,
      length__gte: (val) => `v.length >= '${val}'`,
      width__lte: (val) => `v.width <= '${val}'`,
      width__gte: (val) => `v.width >= '${val}'`,
      grt__lte: (val) => `v.grt <= '${val}'`,
      grt__gte: (val) => `v.grt >= '${val}'`,
      dwt__lte: (val) => `v.dwt <= '${val}'`,
      dwt__gte: (val) => `v.dwt >= '${val}'`,
    };

    clause += generateClauseById(req, 'v.mmsi');

    clause += generateClauseByParams(req, params);

    const data = await vesselsModel.select(
      'v.mmsi, v.name, b.year, f.flag, t.type, v.imo, v.call_sign, v.length, v.width, v.dwt, v.grt',
      ` inner join dw_vesselbuild as b on v.build_id = b.id 
              inner join dw_vesselflag as f on v.flag_id = f.id 
              inner join dw_vesseltype as t on v.type_id = t.id ${clause}`
    );

    res.status(200).json({ vessels: data.rows });
  } catch (err) {
    res.status(200).json({ vessels: err.stack });
  }
};
