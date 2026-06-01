export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // מתיר גישה מכל מקור
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const SITES = [
    "text.chabadpedia.com",
    "zitut.chabadpedia.com",
    "chabadpedia.com",
    "chabadpedia.co.il"
  ];

  const fetchStats = async (site) => {
    const url = `https://${site}/api.php?action=query&meta=siteinfo&siprop=statistics&format=json`

    try {
      const response = await fetch(url);
      const text = await response.text();
      const json = JSON.parse(text);
      const stats = json.query.statistics;

      return {
        site,
        pages: stats.pages || 0,
        articles: stats.articles || 0,
        edits: stats.edits || 0,
        files: stats.images || 0,
        users: stats.users || 0,
        activeUsers: stats.activeusers || 0,
        admins: stats.admins || 0
      };

    } catch {
      return {
        site,
        pages: "הטעינה לא הצליחה",
        articles: "הטעינה לא הצליחה",
        edits: "הטעינה לא הצליחה",
        files: "הטעינה לא הצליחה",
        users: "הטעינה לא הצליחה",
        activeUsers: "הטעינה לא הצליחה",
        admins: "הטעינה לא הצליחה"
      };

    }
  };

  const results = {};
  for (const site of SITES) {
    results[site] = await fetchStats(site);
  }

  res.status(200).json(results);
}
