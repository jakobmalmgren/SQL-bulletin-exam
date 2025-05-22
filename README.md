## Beskrivning av projektet

Detta projekt är ett backend-API byggt med Node.js, Express och PostgreSQL.
SQL Bulletin är en enkel meddelandetjänst som fungerar som en digital anslagstavla. Tjänsten tillåter användare att skapa och hantera kanaler, prenumerera på dessa samt posta och läsa meddelanden i kanaler de är medlemmar i. Vi har fokuserat på och skapa projektet emot G nivå med alla guldstjärneuppgifter förutom nedanstående punkter:

-Ett meddelande kan tillhöra en eller flera kanaler.
-Det går att sortera meddelanden på datum.
-API, ER-diagram och databasstruktur reflekterar detta
-Postman-dokumentation finns även för detta utökade flöde

## 1.Hur man startar projektet

-git clone - för att klona projektet
-npm install -för att få hem alla dependencies
-skapa databas i PostgreSQL

- lägga in era credentials i en env fil, (se .envexample)
- kör node setup-db.js i terminalen för att skapa tabeller
- kör node server.js för att starta servern(http://localhost:6000)

## 2.Postman

Bilder finns i mappen images och är kopplade till olika end-points

//POST – skapa nya resurser

POST /users- ![Exempel på användarendpoint](images/postuser.png)
POST /channels ![Exempel på användarendpoint](images/postchannels.png)
POST /subscriptions ![Exempel på användarendpoint](images/postsubscriptions.png)
POST /messages![Exempel på användarendpoint](images/postmessages.png)

//GET – hämta resurser

GET /channels/:id/messages?userId=2 ![Exempel på användarendpoint](images/getmessages.png)
GET /users/:id/channels ![Exempel på användarendpoint](images/getchannels.png)

//DELETE – ta bort resurser

DELETE /channels/:id ![Exempel på användarendpoint](images/deletechannels.png)
DELETE /subscriptions/:userId/:channelId ![Exempel på användarendpoint](images/deletesubscription.png)

//PUT eller PATCH – uppdatera resurser

PATCH /messages/:id ![Exempel på användarendpoint](images/patchmessages.png)
PATCH /channels/:id ![Exempel på användarendpoint](images/patchchannel.png)

## 3.Pg-admin

För att se att datan kommit in i tabellerna använder vi oss av Pg-admin
![Exempel på Pg-admin](images/pg-admin.png)

## 4 ER-diagram

Länk till ER-diagram ![ER-DIAGRAM](images/ER-DIAGRAM.png)
