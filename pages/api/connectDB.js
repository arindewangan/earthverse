import clientPromise from "../../helpers/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("earthverse");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myUser = await db.collection("users").insertOne(bodyObject);
      res.json({ status: 200 });
      break;
    case "GET":
      const allUsers = await db.collection("users").find({}).toArray();
      res.json({ status: 200, data: allUsers });
      break;
  }
}