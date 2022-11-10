### Usage
1. Get the project to your computer
```console
git clone https://github.com/arindewangan/earthverse.git
cd earthverse
npm install
```

2. Create `.env.local` file inside the root folder write all these :
NEXT_PUBLIC_API_KEY: You can get it here - https://accounts.what3words.com/create-api-key?referrer=/public-api
APP_DOMAIN: RFC 4501 DNS authority that is requesting the signing.
MORALIS_API_KEY: You can get it here - https://admin.moralis.io/account/profile
NEXTAUTH_URL: Your app address. In the development stage, use http://localhost:3000.
NEXTAUTH_SECRET: Used for encrypting JWT tokens of users. You can put any value here or generate it on https://generate-secret.now.sh/32. 
MONGODB_URI= Add your mongodb URI here.

Here is  an example of .env.local file.
```
NEXT_PUBLIC_API_KEY=********
APP_DOMAIN=earthverse.app
MORALIS_API_KEY=**************************************************
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=*********************************
MONGODB_URI= "mongodb+srv://username:password@cluster0.jse7ndx.mongodb.net/?retryWrites=true&w=majority"

```

### Running the website in the development mode
```console
npm run dev
```

© 2022 Arin Dewangan.
