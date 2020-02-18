# Auxify Database Node Server
## Daniel Welch

### Auxify Backend Server

REST API for communicating with Auxify Database  
Utilizes MongoDB  
  
Stores party, song, and user data  
Dynamic party queue is not directly stored in this DB  
Used to perform CRUD operations on Party, Song, and User DBs  
Also contains endpoints for more complex database interactions  
  
User authorization and privileging handled by Gateway server  
Not directly accessible from Front-End  
  
Spotify access and querying handled by other middle-tier services  
