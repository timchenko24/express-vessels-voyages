import Model from '../models/model';

const portsModel = new Model('dw_port');

export const portsPage = async (req, res) => {
  try {
    const data = await portsModel.select(
      'p.id, c.name as country, p.name, p.type, p.longitude, p.latitude',
      ' as p inner join dw_portcountry as c on p.country_id = c.id'
    );
    res.status(200).json({ ports: data.rows });
  } catch (err) {
    res.status(200).json({ ports: err.stack });
  }
};
