export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: { message: "Method not allowed" } });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
        return res.status(500).json({
            error: { message: "ANTHROPIC_API_KEY non configuree cote serveur (Vercel env vars)." }
        });
    }

    const { system, messages } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: { message: "messages array required" } });
    }

    let response;
    try {
        response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-haiku-4-5-20251001",
                max_tokens: 4096,
                system: system || "Tu es un professeur Python.",
                messages
            })
        });
    } catch (err) {
        return res.status(502).json({
            error: { message: `Echec de l'appel a Anthropic: ${err.message}` }
        });
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        // Surface des messages clairs pour les erreurs frequentes
        const status = response.status;
        const apiMsg = data?.error?.message || `HTTP ${status}`;
        let hint = "";
        if (status === 401) hint = " (cle API invalide ou expiree)";
        else if (status === 402 || /credit/i.test(apiMsg)) hint = " (credits Anthropic epuises — recharge sur console.anthropic.com)";
        else if (status === 429) hint = " (limite de debit atteinte — patiente 30s)";
        else if (status === 529) hint = " (API surchargee — reessaie dans quelques secondes)";
        return res.status(status).json({ error: { message: apiMsg + hint } });
    }

    return res.status(200).json(data);
}

