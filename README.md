# hapi-auth

server setup

sudo apt update
sudo apt install -y git curl

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

node -v
npm -v

git clone https://github.com/your-username/your-repo.git
cd your-repo

/// create env file if it not exists
nano .env
PORT=3000
DB_URL=mongodb://...
JWT_SECRET=your_secret

npm install
npm install dotenv

/////////////
node index.js

## using pm2

sudo npm install -g pm2
pm2 start index.js

pm2 status
