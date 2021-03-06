export function generateClauseByParams(req, params) {
  let clause = '';

  if (Object.keys(req.query).length !== 0) {
    clause += 'where ';
    const conditions = [];
    Object.entries(req.query).forEach(([ key, val ]) => {
      conditions.push(params[key.toLowerCase()](val));
    });
    clause += conditions.join(' and ');
  }

  return clause;
}

export function generateClauseById(req, columnId) {
  let clause = '';

  if (req.params.id) {
    clause = `where ${columnId} = '${req.params.id}'`;
  }

  return clause;
}
