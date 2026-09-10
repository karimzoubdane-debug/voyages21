// Liste des origines autorisees a appeler cet endpoint.
// Tout autre site qui essaie d'utiliser ton endpoint (et donc tes credits Anthropic)
// recoit un 403. La verification se fait sur l'en-tete Origin (envoye automatiquement
// par les navigateurs lors de requetes cross-origin) avec un fallback sur Referer.
const ALLOWED_ORIGIN_REGEX = [
    /^https:\/\/prof-python-abderrahman\.vercel\.app$/,
    /^https:\/\/prof-python-abderrahman-[a-z0-9-]+\.vercel\.app$/, // previews du meme projet
    /^http:\/\/localhost(:\d+)?$/, // dev local
    /^http:\/\/127\.0\.0\.1(:\d+)?$/
];

function isAllowedOrigin(origin) {
    if (!origin) return false;
    return ALLOWED_ORIGIN_REGEX.some(rx => rx.test(origin));
}

export default async function handler(req, res) {
    // ─── MODE MAINTENANCE : Application desactivee jusqu'a nouvel ordre ───
    // Aucun appel a Anthropic n'est effectue, donc aucun credit n'est consomme.
    // Pour REACTIVER : supprime (ou commente) ce bloc return ci-dessous.
    return res.status(503).json({
        error: {
            message: "Application temporairement indisponible. Service suspendu jusqu'a nouvel ordre. Merci de votre comprehension."
        }
    });

    if (req.method !== "POST") {
        return res.status(405).json({ error: { message: "Method not allowed" } });
    }

    // ─── Controle d'origine : empeche les sites tiers de cramer tes credits ───
    const origin = req.headers.origin || "";
    let originForCheck = origin;
    if (!originForCheck && req.headers.referer) {
        try { originForCheck = new URL(req.headers.referer).origin; } catch {}
    }
    if (!isAllowedOrigin(originForCheck)) {
        return res.status(403).json({
            error: { message: "Origin non autorisee. Cet endpoint n'est utilisable que depuis prof-python-abderrahman.vercel.app." }
        });
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

