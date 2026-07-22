> # MongoDB Setup

## MongoDB Server & Compass(Local)

Install MongoDB Community Server:

```bash
sudo dpkg -i mongodb-community.deb # Download from website then install it

sudo systemctl status mongod
sudo systemctl enable mongod
# sudo systemctl disable mongod
sudo systemctl start mongod
# sudo systemctl stop mongod
```

Install MongoDB Compass:

```bash
sudo dpkg -i mongodb-compass.deb # MongoDB compass
```