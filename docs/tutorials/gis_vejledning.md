# Vejledning GIS klienter - Vector Tiles - Skærmkort

Herunder beskrives det hvordan Vector Tiles Skærmkort kan tilgåes igennem forskellige GIS klienter. Desuden præsenteres link til stylefilerne, som skal bruges for at tilgå Vector Tiles i eksempelvis ArcGIS Pro. 
- [Style filer](#stylefiler)
- [ArcGIS Pro](#arcgis)
- [QGIS](#qgis)

## Style filer <a name="stylefiler"></a>
Udover at du kan downloade stylefilerne direkte ned fra [styles](https://github.com/SDFIdk/vector_tiles_assets/tree/main/styles/official), så kan du bruge disse nedenstående links til at indlæse i GIS klienter som ArcGIS Pro. 

Læs mere om indlæsning af style filer direkte under afsnittet [ArcGIS Pro](#arcgis)

### Style filer i  UTM zone 32N (EPSG: 25832)
[https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/skaermkort_klassisk.json](https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/skaermkort_klassisk.json)

[https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/skaermkort_daempet.json](https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/skaermkort_daempet.json)

[https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/skaermkort_graa.json](https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/skaermkort_graa.json)

[https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/skaermkort_moerkt.json](https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/skaermkort_moerkt.json)


### Style filer i Webmercator (EPSG: 3857) 
[https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/3857_skaermkort_klassisk.json](https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/3857_skaermkort_klassisk.json)

[https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/3857_skaermkort_daempet.json](https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/3857_skaermkort_daempet.json)

[https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/3857_skaermkort_graa.json](https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/3857_skaermkort_graa.json)

[https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/3857_skaermkort_moerkt.json](https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/latest/styles/official/3857_skaermkort_moerkt.json)


herovenfor henvises der til de aktuelle udgaver af stylefilerne (latest). Der kan også linkes til tidligere style filer (fra v0.2.1) ved at definere en specifik version, eksempelvis [https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/v0.2.1/styles/official/skaermkort_klassisk.json](https://cdn.dataforsyningen.dk/assets/vector_tiles_assets/v0.2.1/styles/official/skaermkort_klassisk.json). Se overblik over versioner under [tags](https://github.com/SDFIdk/vector_tiles_assets/tags).


## ArcGIS Pro <a name="arcgis"></a>

For at tilgå Vector Tiles Skærmkort I ArcGIS Pro, skal du i stedet for APIét, bruge style filen direkte. Du skal bruge style filerne i Webmercator (EPSG:3857), som er linket til i afsnitet her ovenfor [style filer](#stylefiler).  

Find 'Data From Path' under: 
Map - Add Data - Data from path

![billede](https://github.com/user-attachments/assets/a155d9e4-8227-4154-a27b-27e0949f7f1d)

Derefter dukker der en boks op, som først kun har ’Path’, som udfyldes med link til [style file](#stylefiler) i webmercator. 

Når linket er kopieret ind, dukker der efter et par milisekunder endnu en mulighed op – service type – her skal du udfylde 'Vector Tile Service'.  

![billede](https://github.com/user-attachments/assets/193cfd10-ba39-4aa9-9a43-3d67f48d33f5)

Til sidst skal du udfylde ’Custom parameter’ 
Her skal du skrive ’token’ ud for parameter, og så finde det dit token fra dataforsyning og kopiere ind. Tilsidst klikker du på add. 

### Sådan får du vist Vector Tiles - Skærmkort i UTM zone 32N (EPSG:25832) i ArcGIS pro

Når du indlæser Vector Tiles med Webmercator stile filerne, kan du stadigvæk sætte projektionen i map view til at være UTM zone 32N (EPSG:25832), og ArcGIS Pro vil så lave en reprojektering, ligesom den eksemeplvis gør med det standard baggrundkort der indlæses. 
Du kan desværre ikke bruge stile flilerne med UTM dirkete i ArcGIS Pro. 


## QGIS <b name="qgis"></b>

Brug Vector Tiles i QGIS med Dataforsyningens QGIS-plugin: https://confluence.sdfi.dk/display/MYD/Dataforsyning-plugin+til+QGIS
Find vejledningen her: https://confluence.sdfi.dk/x/vIBwCQ
