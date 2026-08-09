// api/pexels.js
export default async function handler(req, res) {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json({
            error: "Search term is missing"
        });
    }

    try {
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(search)}&per_page=80`,
            {
                headers: {
                    Authorization: process.env.PEXELS_API_KEY || ""
                }
            }
        );

        if (!response.ok) {
            console.error("Pexels API returned:", response.status);

            return res.status(response.status).json({
                error: "Pexels API request failed"
            });
        }

        const data = await response.json();

        return res.status(200).json(data);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Serverless execution failed"
        });
    }
}