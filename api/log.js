export default async function header(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const SECRET = Process.env.VISIT_LOG_TOKEN; // set in vercel dashboard
  const APPS_URL = process.env.APPS_SCRIPT_URL; // set in vercel dashboard
  // optional: check req.headers.referer for your domain
  const body = { token: SECRET, path: req.body.path, ua: req.body.ua };
  const r = await fetch(APPS_URL, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(body)
  });
  const json = await r.text();
  res.status(r.status).send(json);
}