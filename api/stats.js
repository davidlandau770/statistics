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
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      });

      console.log("requested:", url);
      console.log("final:", response.url);
      console.log("status:", response.status);
      console.log(
        "content-type:",
        response.headers.get("content-type")
      );

      const text = await response.text();

      console.log("body:");
      console.log(text.substring(0, 1000));

      return {
        site,
        status: response.status
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
