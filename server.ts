import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

import { createClient } from '@supabase/supabase-js';

let envUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseUrl = envUrl.startsWith('http') ? envUrl : 'https://vazdxebogaeubgfzrkac.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/api/appointments", async (req, res) => {
    if (supabaseUrl.includes('vazdxebogaeubgfzrkac')) {
      return res.json([]);
    }
    try {
      const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    if (supabaseUrl.includes('vazdxebogaeubgfzrkac')) {
         console.warn("Using mock Supabase. Simulating successful appointment booking.");
         const apt = req.body;
         
         // Simulate Email and WhatsApp notifications
         console.log(`[NOTIFICATION SYSTEM] Sending Email to Aspirant: ${apt.email}`);
         console.log(`[NOTIFICATION SYSTEM] Sending WhatsApp to Aspirant: ${apt.mobileNumber || apt.phone}`);
         console.log(`[NOTIFICATION SYSTEM] Sending Email to Admin: sankalpcareersolutions@gmail.com`);
         console.log(`[NOTIFICATION SYSTEM] Sending WhatsApp to Admin`);

         return res.json({
           success: true,
           data: {
             id: Date.now().toString(),
             aspirant_name: apt.name,
             email: apt.email,
             mobile: apt.mobileNumber || apt.phone || '',
             date: apt.preferredDate,
             time: apt.preferredTime,
             service_type: apt.counsellingType || 'General',
             message: apt.questions || ''
           }
         });
    }
    try {
      const apt = req.body;
      
      // Server-side Data Validation
      if (!apt.name || !apt.email || !apt.preferredDate || !apt.preferredTime) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
      
      // Availability Checks (Mock logic for time slot conflict)
      const { data: existing, error: checkErr } = await supabase
        .from('appointments')
        .select('*')
        .eq('date', apt.preferredDate)
        .eq('time', apt.preferredTime);
        
      if (checkErr) throw checkErr;
      
      if (existing && existing.length >= 3) {
        return res.status(409).json({ success: false, error: "This time slot is fully booked. Please select another time." });
      }
      
      // Database Insert Operation
      const { data, error } = await supabase.from('appointments').insert([{
        aspirant_name: apt.name,
        email: apt.email,
        mobile: apt.mobileNumber || apt.phone || '',
        date: apt.preferredDate,
        time: apt.preferredTime,
        service_type: apt.counsellingType || 'General',
        message: apt.questions || ''
      }]).select();
      
      if (error) throw error;
      
      // Simulate Email and WhatsApp notifications
      console.log(`[NOTIFICATION SYSTEM] Sending Email to Aspirant: ${apt.email}`);
      console.log(`[NOTIFICATION SYSTEM] Sending WhatsApp to Aspirant: ${apt.mobileNumber || apt.phone}`);
      console.log(`[NOTIFICATION SYSTEM] Sending Email to Admin: sankalpcareersolutions@gmail.com`);
      console.log(`[NOTIFICATION SYSTEM] Sending WhatsApp to Admin`);
      
      res.json({ success: true, data: data[0] });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post("/api/generate-seo-content", async (req, res) => {
    try {
      const { topic, keywords, language = "English" } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      let data;
      try {
        if (!apiKey) throw new Error("No API key");
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
          config: { responseMimeType: "application/json" }
        });
        
        data = JSON.parse(response.text);
      } catch (err) {
        console.warn("Falling back to mock SEO data due to API error:", err);
        data = {
          title: `Ultimate Guide to ${topic}`,
          metaDescription: `Learn everything about ${topic}. Expert tips, comprehensive guide, and strategies to succeed.`,
          slug: `guide-to-${topic?.toLowerCase().replace(/\\s+/g, '-')}`,
          h1: `The Complete Guide: ${topic}`,
          content: `# ${topic}\n\nWelcome to the ultimate guide on **${topic}**.\n\n## Why is this important?\nUnderstanding this topic is crucial for your career growth and success.\n\n### Key Strategies\n1. Consistency is key.\n2. Practice regularly.\n3. Stay updated with the latest trends.\n\n## Conclusion\nBy following these strategies, you'll master ${topic} in no time!`,
          faqs: [
            { question: `What is the best way to start with ${topic}?`, answer: "Begin by understanding the fundamentals and setting clear goals." },
            { question: `How long does it take to master ${topic}?`, answer: "It depends on your dedication, but consistent effort yields results quickly." }
          ]
        };
      }
      
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to generate content" });
    }
  });

  app.post("/api/keyword-intelligence", async (req, res) => {
    try {
      const { topic } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      let data;
      
      try {
        if (!apiKey) throw new Error("No API key");
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Act as an expert SEO strategist. Generate a list of 10 high-value, long-tail keywords related to "${topic || 'defence and education counselling'}".
        Format as JSON array of objects: [{ "keyword": "...", "volume": "number e.g. 1500", "difficulty": "Low/Medium/High", "intent": "Informational/Transactional" }]`;
        
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
          config: { responseMimeType: "application/json" }
        });
        
        data = JSON.parse(response.text);
      } catch(err) {
        console.warn("Falling back to mock keyword data due to API error:", err);
        const t = topic || 'defence';
        data = [
          { keyword: `best ${t} coaching`, volume: "12,500", difficulty: "High", intent: "Transactional" },
          { keyword: `how to prepare for ${t}`, volume: "8,400", difficulty: "Medium", intent: "Informational" },
          { keyword: `${t} exam syllabus 2026`, volume: "5,200", difficulty: "Low", intent: "Informational" },
          { keyword: `top 10 ${t} academies`, volume: "3,100", difficulty: "Medium", intent: "Commercial" },
          { keyword: `${t} interview questions`, volume: "4,800", difficulty: "Low", intent: "Informational" }
        ];
      }
      
      res.json({ keywords: data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to generate keywords" });
    }
  });

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
