import Model from '../models/model';

const portsModel = new Model('dw_port');

export const portsPage = async (req, res) => {
  try {
    const data = await portsModel.select('*');
    res.status(200).json({ ports: data.rows });
  } catch (err) {
    res.status(200).json({ ports: err.stack });
  }
};
