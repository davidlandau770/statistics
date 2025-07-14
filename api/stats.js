export default async function handler(req, res) {
  const SITES = [
    "text.chabadpedia.com",
    "zitut.chabadpedia.com",
    "chabadpedia.com",
    "chabadpedia.co.il"
  ];

  const fetchStats = async (site) => {
    try {
      const response = await fetch(`https://${site}/api.php?action=query&meta=siteinfo&siprop=statistics&format=json`);
      const json = await response.json();
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
    } catch (error) {
      return { site, error: error.message };
    }
  };

  const results = {};
  for (const site of SITES) {
    results[site] = await fetchStats(site);
  }

  res.status(200).json(results);
}
