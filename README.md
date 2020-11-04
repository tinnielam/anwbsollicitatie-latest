# anwbsollicitatie-latest

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/anwbsollicitatie-latest)

Voor de client kant heb ik gekozen om gebruik te maken van Typescript in combinatie met React.
Dit vanwege de flexibele rendingsmethodieken en de aan rijke tools die kan worden gebruikt.
Voor de kaart heb ik een Google Maps API gebruikt en dit is tevens de eerste keer dat ik hiermee werk.
Daarnaast heb ik er ook gekozen om vooral met states te werken in combinatie met fetch requests uit de gemaakte backend, puur omdat het goed met elkaar aansluit.
Er is dus vooral Data uit de: segments, roadworks, radars, jams en de polyline gehaald.
De Google Maps File had wel iets generieker gemogen....


#TODO Het enige wat er niet gelukt is, is het buienradar effect na te bootsen. Dit had als gevolg dat de database ernstig onder druk werd gezet en hierdoor de client kant een aantal keer crashte. #Decoden van de Polyline's gingen niet zoals verwacht. Dit leverde ook wee foutmeldingen op vanwege de plugin google-maps-react. Zie ook dit probleem: https://stackoverflow.com/questions/5930630/google-maps-display-an-encoded-polyline Ik heb een poging gewaagd om eerst een polyline toe te voegen en deze vervolgens door een map heen te halen met een decoder... maar aangezien de decoder foutmeldingen geeft blijft het een raadsel.


#Grote Update :

Let Op: Het kan wel eens zijn dat de iconen niet laden, want het komt wel eens voor dat repl.it een schop nodig heeft om op gang te komen.
Refreshen kan wel eens helpen.

Polylines werken nu enkel via een workaround die de developer heeft aangekaart.
Dit is enkel mogelijk door de api direct aan te spreken en deze moet worden geinclude in de Google-Map-React Component
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCVaY96z82QyROvA7BvgOLIZs_rtkWeD2A",
            libraries: ["geometry"]
          }};
<GoogleMapReact/>

Bij Deze kan de library tijdig worden geladen en is hierdoor de html script tag met de library erin niet van toepassing.
Vervolgens kan er door middel van de map functie de juiste polyline worden decode en hierdoor worden er nu wel lijnen op de kaart getekend.
Naast de lijnen zijn er ook gebruiksvriendelijke opties toegevoegd aan de kaart namelijk:

- Custom icons
- InfowWindow's (gestyled)
- Kleuren van polylines voor specifieke files
- Hover effecten voor Markers, Polylines en de lijst met files.
- Synchrone klik effecten tussen de lijst en de iconen & polylines.
- Totaal aantal files, Flitsers en wegwerkzaamheden.
- ZoomEffect wanneer er op de kaarten worden geklikt.
- Eventlisteners toegevoegd voor de animaties van specifieke markers en polylines

Er zijn nog wijzigingen in de code gemaakt om de kaart sneller te laten laden.
Er zit namelijk een fout in de library die het laden van de iconen en polylines extreem traag maken.
Door een div met een display: none erin te zetten, is dit probleem verholpen.

Op basis van deze veranderingen heb ik toch extra tijd besteed aan het bestuderen van de Google-Map-React API en de API op Google Maps zelf.
Daarnaast heb ik nog even op Lynda/Linkedin de tijd genomen om wat Typescript react toe te passen.

Hiermee heb ik wat betreft de requirements voor opdracht:

3a, 3b, 3d gedeeltelijk mee afgedekt en natuurlijk nog wat extra dingen voor puntje 4.

Voor meer informatie over mijn werkwijze: "zie mijn AzureBoards"




