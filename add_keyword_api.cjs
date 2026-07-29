const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const newApi = `
  app.post("/api/keyword-intelligence", async (req, res) => {
    try {
      const { topic } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set" });
      }
      const ai = new GoogleGenAI({ apiKey });
      const prompt = \`Act as an expert SEO strategist. Generate a list of 10 high-value, long-tail keywords related to "\${topic || 'defence and education counselling'}".
      Format as JSON array of objects: [{ "keyword": "...", "volume": "number e.g. 1500", "difficulty": "Low/Medium/High", "intent": "Informational/Transactional" }]\`;
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });
      const data = JSON.parse(response.text());
      res.json({ keywords: data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to generate keywords" });
    }
  });
`;

code = code.replace(/app\.post\("\/api\/generate-seo-content"/, newApi + '\n  app.post("/api/generate-seo-content"');

fs.writeFileSync('server.ts', code);
