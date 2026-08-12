export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { system, messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "messages array required" });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1024,
            system: system || "Tu es un professeur Python.",
            messages
        })
    });

    const data = await response.json();

    if (!response.ok) {
        return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
}
