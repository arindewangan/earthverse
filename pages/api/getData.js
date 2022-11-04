export default function handler(req, res) {
    if (req.method === 'POST') {
        res.status(200).send({ message: 'Your Data has been saved successfully' });
        console.log(req.body);
    } else {
        res.status(401).send({ message: 'Only POST requests allowed' })
    }
}
