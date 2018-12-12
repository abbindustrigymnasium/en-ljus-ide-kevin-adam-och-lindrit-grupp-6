# en-ljus-ide-kevin-adam-och-lindrit-grupp-6
en-ljus-ide-kevin-adam-och-lindrit-grupp-6 lmao xd bästa gruppen kanske?

Syftet med projektet är att ha en lampa med en mikrodator i som ska kunna styras via en app i mobilen. Vi gör detta genom att koppla ihop både appen och lampan till en gemensam backend som tar värden från en databas. Vi har en armatur som vi själva byggt och använder oss av LEDstrips som vår ljuskälla.

Till backenden använder vi oss av node.js för att kunna kommunicera med vår databas, app eller lampa. Vi använder oss av GET, POST, PATCH och DELETE. Backenden är skriven i javascript och använder sig av json när den skickar värden. Backenden är den som får alla värden. Den vidarebefordar sedan dessa vidare till antingen lampan eller appen. Appen kan även använda sig av backendens funktioner för att manipulera värden i databasen. Appen går genom backend för att komma åt databasen, men kom ihåg att varken appen eller mikroprocessorn är direkt kopplade till databasen. Båda får sina värden från backend.

Våran databas är en MYSQL databas. Just denna finns inte i våran GitHub eftersom att det inte är kod som vi skapat, det är en databas som vi använder oss av.

I arduinofilken har vi all våran arduino-kod, d.v.s koden till mikroproccesorn som sitter i lampan. Syftet med koden är att kunna få värden från databasen och sedan kunna justera lampans ljus efter det. Vi kan justera om ljuset ska vara varmt eller kallt och hur starkt det ska vara. Detta möjliggörs eftersom att mikroproccesorn kan koppla upp sig till ett trådlöst nätverk.

Frontend är mobilappen som använder sig av react native och expo.



