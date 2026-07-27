export default function handler(req, res) {
    const { query } = req;
    const { search } = query;
    
        fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=80`, {
            headers: {
                'Authorization': process.env.PEXELS_API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            res.status(200).json(data);
            return data;
            
        })
        .catch(error => {
            console.error('Error fetching Pexels images:', error);
            res.status(500).json({ error: 'Failed to fetch images' });
        });
    
    }