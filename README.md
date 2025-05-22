1.Hur man startar projektet

-git clone - för att klona projektet
-npm install -för att få hem alla dependencies
-skapa databas i PostgreSQL

- lägga in era credentials i en env fil, (se .envexample)
- kör node setup-db.js i terminalen för att skapa tabeller
- kör node server.js för att starta servern(http://localhost:6000)

  2.Postman

  \*Bilder finns i mappen images och är kopplade till olika end-points/ER-diagram.

//POST – skapa nya resurser

POST /users- ![Exempel på användarendpoint](images/postuser.png)
POST /channels ![Exempel på användarendpoint](images/postchannels.png)
POST /subscriptions ![Exempel på användarendpoint](images/postsubscriptions.png)
POST /messages![Exempel på användarendpoint](images/postmessages.png)

//GET – hämta resurser

GET /channels/:id/messages
GET /users/:id/channels

//DELETE – ta bort resurser

DELETE /channels/:id ![Exempel på användarendpoint](images/deletechannels.png)
DELETE /subscriptions/:userId/:channelId

//PUT eller PATCH – uppdatera resurser

PATCH /messages/:id ![Exempel på användarendpoint](images/patchmessages.png)
PATCH /channels/:id ![Exempel på användarendpoint](images/patchchannel.png)

3.Pg-admin
