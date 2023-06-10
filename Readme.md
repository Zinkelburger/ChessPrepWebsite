## Chess Auto Prep Website
chessautoprep.com

The goal of this project is to have it host a website where you can input FENs, and these will be stored for later retreival. Once I week I will run a program to scan the TWIC database for a FEN the user input, and email the user with a list of pgns that contain their FENs.

Instead of Docker, I am going to run this site on a droplet with pm2. To run with pm2, put the webpage files into the `/var/www/html` folder. Then run `num run build`. Then run `pm2 serve build 3001 --spa`. Port 3001 is necessary because nginx is looking for localhost:3001.

The server also serves as a /save-data endpoint which writes to a data.txt file

EmailForm uses filter and the chess library to check for valid FENs. This way only valid FENs are written to the data.txt file.
