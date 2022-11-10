export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body);
        let user = req.body.user;        
        let words = req.body.chosenSquares;
        let picture = req.body.imageURL;
        let price = req.body.price;
        saveDatabase(user, words, picture, price);
        res.status(200).send({ message: 'Your Data has been saved successfully' });
    } else {
        res.status(401).send({ message: 'Only POST requests allowed' })
    }
}

async function saveDatabase(user,words,picture,price) {
    let res = await fetch("http://localhost:3000/api/connectDB", {
      method: "POST",
      body: JSON.stringify({
        
        user: user,
        words: words,
        picture: picture,
        price: price
      }),
    });
    res = await res.json();
}
