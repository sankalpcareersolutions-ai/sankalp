import fs from "fs";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Content Generator API
  app.post("/api/generate-seo-content", async (req, res) => {
    try {
      const { topic, keywords, language = "English" } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set" });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `Act as an expert SEO copywriter. Generate a comprehensive, SEO-optimized article about "${topic}".
      Target Keywords: ${keywords}
      Language: ${language}
      
      Please format the response as JSON with the following structure:
      {
        "title": "SEO Optimized Title (50-60 chars)",
        "metaDescription": "SEO Meta Description (150-160 chars)",
        "slug": "url-friendly-slug",
        "h1": "Main Heading",
        "content": "Full article content in Markdown format, including H2/H3 tags and internal linking suggestions.",
        "faqs": [{"question": "Q1", "answer": "A1"}],
        "imagePrompt": "Prompt for generating a featured image"
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const resultText = response.text();
      res.json(JSON.parse(resultText));
    } catch (error: any) {
      console.error("Error generating content:", error);
      res.status(500).json({ error: error.message });
    }
  });

  
  // Appointments API
  const dataDir = path.join(process.cwd(), 'data');
  const appointmentsFile = path.join(dataDir, 'appointments.json');

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(appointmentsFile)) {
    fs.writeFileSync(appointmentsFile, JSON.stringify([]));
  }

  app.get("/api/appointments", (req, res) => {
    try {
      const data = fs.readFileSync(appointmentsFile, "utf-8");
      res.json(JSON.parse(data));
    } catch(err) {
      res.status(500).json({ error: "Failed to read appointments" });
    }
  });

  app.post("/api/appointments", (req, res) => {
    try {
      const data = fs.readFileSync(appointmentsFile, "utf-8");
      const appointments = JSON.parse(data);
      const newAppt = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ticket_number: "TKT-" + Math.floor(1000 + Math.random() * 9000),
        ...req.body
      };
      appointments.unshift(newAppt);
      fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));
      res.json({ success: true, data: newAppt });
    } catch(err) {
      res.status(500).json({ error: "Failed to save appointment" });
    }
  });

  // Technical SEO APIs (Mocked for demonstration)
  app.post("/api/seo/generate-sitemap", (req, res) => {
    res.json({ success: true, message: "XML and HTML sitemaps generated successfully and pinged to Google." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
