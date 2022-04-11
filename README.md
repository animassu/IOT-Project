# IOT-Project

## Backend (backend)
The code for handling MQTT subscribing and decoding of the data

1. export FLASK_APP=main.py

If the above does has error, check the correct syntax here - might be different syntax

2. flask run

### Install Dependencies for Heatmapper
1. pip install git+https://github.com/TsuiSauChi/heatmappy

Reference: https://stackoverflow.com/questions/20101834/pip-install-from-git-repo-branch

## Frontend (myapp)
The frontend system that displays in the webapp

1. Install Dependencies; "npm install"
2. Execute Application; "npm start"

Shopping Mall Stores Login Details
Username: 01-55; Password: ant.design
Username: 01-40; Password: ant.design

## Database (Postgresql)
Configuration:
- Database: csc2006
- Host: 174.138.23.75
- Port: 5432
- User: postgres
- Password: cl0udplus!

## Application Features 
The application will receive data via the MQTT service in The Thing Network, then the data will be stored on the database on the cloudplus for data persistence 

Each store has different data sets personalised to their store 
![image](https://user-images.githubusercontent.com/23652958/162811158-688fef2a-d5c7-4812-863d-5d97f1f1dd50.png)

These are the charts that are providing value to the store owners

1. Number of Current People in the Store 

![image](https://user-images.githubusercontent.com/23652958/162811478-669b0f1d-6104-423c-bb37-ab5f89458dd9.png)

2. Today's Hourly Foot Traffic; showing the traffic for the current day 

![image](https://user-images.githubusercontent.com/23652958/162811625-3453232f-7a65-46df-82e1-58d4ccbc0122.png)


3. Hourly Seasonal Index; Showing the average of traffic for specific hour, for store owner to estimate the number of people within a specific hour

![image](https://user-images.githubusercontent.com/23652958/162811768-b396f5db-9732-4a7c-b2d4-a0242c7648b2.png)

4. HeatMap; Showing a rough estimate of the traffic for the shopping mall

![image](https://user-images.githubusercontent.com/23652958/162811878-099318a0-df48-4a90-981d-df2b84a4dd11.png)

