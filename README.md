# anwbsollicitatie-latest

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/anwbsollicitatie-latest)

Voor de client kant heb ik gekozen om gebruik te maken van Typescript in combinatie met React.
Dit vanwege de flexibele rendingsmethodieken en de aan rijke tools die kan worden gebruikt.
Voor de kaart heb ik een Google Maps API gebruikt en dit is tevens de eerste keer dat ik hiermee werk.
Daarnaast heb ik er ook gekozen om vooral met states te werken in combinatie met fetch requests uit de gemaakte backend, puur omdat het goed met elkaar aansluit.
Er is dus vooral Data uit de: segments, roadworks, radars, jams en de polyline gehaald.
De Google Maps File had wel iets generieker gemogen....


#TODO Het enige wat er niet gelukt is, is het buienradar effect na te doen. Dit had als gevolg dat de database ernstig onder druk werd gezet en hierdoor de client kant een aantal keer crashte.
#Decoden van de Polyline's gingen niet zoals verwacht. Dit leverde ook wee foutmeldingen op vanwege de plugin google-maps-react. Zie ook dit probleem: https://stackoverflow.com/questions/5930630/google-maps-display-an-encoded-polyline Ik heb een poging gewaagd om eerst een polyline toe te voegen en deze vervolgens door een map heen te halen met een decoder... maar aangezien de decoder foutmeldingen geeft blijft het een raadsel.