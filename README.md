# Data_visualisation
Data visualisation

1.	Uvod
Ovaj projekt analizira problem nedostatka darivatelja krvi i regionalne neusklađenosti. Cilj vizualizacije je identificirati ključne prepreke koje utječu na sudjelovanje u darivanju krvi, s fokusom na demografiju donatora, regionalne razlike u dostupnosti krvi. Vizualizacija omogućava jasnu i intuitivnu sliku trenutnog stanja, pomažući prepoznati područja s nedovoljnom opskrbom krvi, demografske skupine s niskim postotkom darivatelja.
Primjene ove vizualizacije su široke: zdravstvene organizacije i banke krvi mogu optimizirati kampanje za prikupljanje krvi; vladine institucije mogu kreirati politike koje potiču darivanje krvi; istraživači mogu analizirati faktore koji utječu na darivanje, a šira javnost može bolje razumjeti važnost darivanja krvi. Potencijalni korisnici uključuju zdravstvene organizacije, vladine agencije, nevladine organizacije, istraživače, medije i javnost. Ova vizualizacija pruža uvide koji pomažu u donošenju informiranih odluka i strategija za poboljšanje sustava darivanja krvi, osiguravajući stabilnu i adekvatnu opskrbu krvi za one kojima je najpotrebnija.
2. Metodologija
Globalna distribucija krvnih grupa: skup podataka pruža sveobuhvatan pregled distribucije raznih krvnih grupa u različitim regijama svijeta. Popratna slika ilustrira postotnu distribuciju ABO i Rh krvne grupe (uključujući O+, A+, B+, AB+, O-, A-, B-, AB-) na globalnoj razini. Ova informacija je ključna za razumijevanje prevalencije različite krvi tipova u populacijama diljem svijeta, što je bitno za medicinska istraživanja i planiranje zdravstvene zaštite. Ovaj set podataka je preuzet sa wikipedije. Set podataka sadrži podatke iz 126 zemalja diljem svijeta. Za vizualizaciju će se koristiti cijeli skup koji će prikazivati na karti svijeta podatke o krvnim grupama za svaku državu.
 
Slika 1. Izgled podataka
Za izradu ove vizualizacije koristit ćemo koristiti D3.js. JavaScript knjižnica koja omogućava stvaranje dinamičnih i interaktivnih vizualizacija podataka. D3.js je odabran zbog svoje fleksibilnosti i mogućnosti rada s SVG formatom, što je idealno za kreiranje složenih vizualizacija poput interaktivnih karti. Za crtanje karte koristit ćemo geoJSON podatke sa sljedećeg URL-a: https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson. Za tehnike vizualizacije koristi smo nijanse boja za prikaz kvantitativnih podataka preko geografskog prostora. To nam omogućuje jednostavno prepoznavanje regionalnih razlika u postotcima krvnih grupa. Drugi alat smo koristili tooltip. To je interaktivni elementi koji se pojavljuju kada korisnik prelazi mišem preko određene države na karti. Tooltip će prikazivati detaljne podatke o postotcima za odabranu krvnu grupu, što omogućuje korisnicima da brzo dobiju potrebne informacije bez pretrpavanja vizualizacije previše tekstualnih podataka. Za odabir krvnih grupa koristili smo slider na kojem su prikazane sve vrste krvnih grupa. On omogućuje korisnicima da lako promijene prikaz prema svojim interesima, poboljšavajući korisničko iskustvo i interaktivnost vizualizacije.
Drugi set podataka koji smo koristili je ukupno.csv. Ova datoteka sadrži podatke koliko doza krvi se koristi u koje medicinske svrhe. Vizualizacija će se implementirati koristeći D3.js za crtanje bar charta s podacima o broju doza krvi korištenih u različite svrhe. Kategorije kao što su ginekologija, pedijatrija, hitna medicina itd. bit će prikazane na X osi, dok će broj doza krvi biti prikazan na Y osi. Kada korisnik prelazi mišem preko stupca, tooltip će prikazati točan broj doza krvi za tu kategoriju.
Odabrani alati i tehnike omogućuju stvaranje vizualizacije koja je intuitivna, interaktivna i informativna. Bar chart jasno prikazuje podatke, omogućujući korisnicima da brzo prepoznaju razlike u broju doza krvi korištenih u različite svrhe, dok interaktivni tooltip pruža dodatne informacije na zahtjev, poboljšavajući korisničko iskustvo i razumijevanje podataka.
Treći set podataka koji smo koristili za vizualizaciju nalazi se u datoteci eu_donacije.csv. U datoteci imamo podatke za države europske unije točnije njih 27. Za te države imamo navedene podatke o ukupnom broju stanovnika države i broj doniranih doza krvi. Podatke smo preuzeli iz „BLOOD DONATION IN THE EU: EXPLORING BEHAVIOURAL INSIGHTS FOR INNOVATIVE INTERVENTIONS“ koji se nalazi na ovoj poveznici:  www.centronazionalesangue.it.  Vizualizacija će se implementirati koristeći D3.js za crtanje horizontalnog bar charta s podacima o broju doniranih doza krvi u državama Europske unije. Države će biti prikazane na Y osi, dok će broj doza krvi biti prikazan na X osi. Podaci će biti sortirani od države s najviše doniranih doza do one s najmanje. Kada korisnik prelazi mišem preko stupca, tooltip će prikazati točan broj doza krvi za tu državu.
Odabrani alati i tehnike omogućuju stvaranje vizualizacije koja je intuitivna, interaktivna i informativna. Horizontalni bar chart jasno prikazuje podatke, omogućujući korisnicima da brzo prepoznaju razlike u broju doniranih doza krvi među državama, dok interaktivni tooltip pruža dodatne informacije na zahtjev, poboljšavajući korisničko iskustvo i razumijevanje podataka.
Četvrti set podataka se nalazi u datoteci podaci.csv i sadrži podatke u postocima za muške i ženske donatore krvi za svaku državu u europskoj uniji. Statistički podaci su preuzeti na istoj poveznici gdje i treći set podataka. Za prikaz podataka korišten je pie chart i odabran  je jer jasno i jednostavno prikazuje distribuciju postotaka, omogućujući korisnicima da brzo vide udio muških i ženskih donatora krvi u odabranoj državi. Postavljen je i padajući izbornik koji omogućuje korisnicima da odaberu državu za koju žele vidjeti podatke. Ovaj element poboljšava interaktivnost vizualizacije, omogućujući korisnicima da istraže podatke za različite države prema vlastitom interesu. Korišten je pita grafikon jer je idealan za prikazivanje udjela unutar cijele kategorije, čime se jasno vizualizira omjer muških i ženskih donatora krvi u odabranoj državi.
 
3. Opis praktičnog dijela
3.1. Karta svijeta sa prikazom krvnih grupa

1. Postavke i inicijalizacija SVG elementa:
Prvo smo inicijalizirali SVG element sa postavkama visine i širine. Korištena je projekcija geoMercator za prikaz mape svijeta. Geomercator je komponenta za crtanje interaktivnih svjetskih mapa u D3.js. Definiran je geoPath koji koristi definiranu projekciju za crtanje putanja (granica zemalja). GeoPath je metoda u D3.js koja pretvara geografske podatke u SVG putove koristeći projekciju. To omogućava crtanje geografskih objekata, kao što su granice država. Inicijaliziran je tooltip element za prikaz dodatnih informacija kada korisnik pređe mišem preko određene države. 
2. Definiranje skale boja:
Definirana je colorScale skala boja koja koristi pragove (threshold) za mapiranje postotaka krvnih grupa na različite nijanse plave boje. Skala Threshold je metoda u D3.js koja omogućava mapiranje vrijednosti na diskretne kategorije boja ili veličina. Ova metoda se često koristi kada želite klasificirati kontinuirane podatke u više kategorija i prikazati ih različitim bojama ili veličinama, što je vrlo korisno u vizualizaciji podataka poput karata ili grafova.
3. Učitavanje podataka:
 Učitavamo podatke i koristimo Promise.all za istovremeno učitavanje geoJSON podataka o mapi i CSV podataka o distribuciji krvnih grupa po državama. Nakon učitavanja podataka, dodan je bloodGroupSelect element koji omogućava odabir krvne grupe. Prilikom promjene odabira ažuriraju se mapa i legenda. 
4. Funkcija za ažuriranje mape:
UpdateMap funkcija uklanja prethodno nacrtane putanje i ponovno crta granice država prema odabranoj krvnoj grupi. Boje se države prema postotku odabrane krvne grupe u svakoj državi, koristeći colorScale. Kada korisnik pređe mišem preko države, tooltip prikazuje naziv države i postotak odabrane krvne grupe.
5. Funkcija za ažuriranje legende:
UpdateLegend funkcija ažurira legendu koja prikazuje pragove boja korištenih za mapiranje postotaka krvnih grupa. Kreiraju se elementi legende koji prikazuju boje i pridružene tekstualne opise pragova postotaka.


 
Slika 2. Prikaz podtaka i karta svijeta
3.2. Graf za prikaz podataka donirane krvi

1. Postavke i inicijalizacija SVG elementa:
Definirana su margina, širina i visina za barchart. Dodan je naslov za barchart. Inicijaliziran je SVG element za barchart s postavljenim marginama.
2. Definiranje skala:
  x skala je scaleBand koja mapira kategorije (Specialty) na širinu grafikona.
  y skala je scaleLinear koja mapira brojeve kreveta (Beds) na visinu grafikona.
3. Dodavanje osi:
Dodane su x i y osi koristeći d3.axisBottom i d3.axisLeft, s podešenim veličinama fonta za oznake osi.
4. Crtanje pravokutnika (stupaca):
Dodani su rect elementi se dodaju za svaki podatak (data).

5. Interaktivnost:
Kada korisnik pređe mišem preko stupca, tooltip prikazuje broj doniranih jedinica krvi za tu kategoriju tooltip se pojavljuje i nestaje s glatkom tranzicijom.
6. Dodavanje labela za osi:
Dodane su tekstualne oznake za x i y osi s odgovarajućim veličinama fonta.
 
Slika 3. Prikaz podataka za graf

3.3. Donacije krvi u EU

1. Inicijalizacija SVG elementa:
Prvo smo definirali margine, širinu i visinu SVG elementa kako bismo omogućili prostor za osovine i naslove. Dodali smo SVG element unutar HTML elementa s ID-om bloodDonationChartEU i dodali grupni element (<g>) za grafikon.
 
2. Učitavanje i priprema podataka:
Podaci su učitani iz CSV datoteke eu_donacije.csv. Podaci su sortirani silazno prema broju donacija krvi kako bi se države s najviše donacija prikazale na vrhu.
3. Dodavanje osi:
Za x-os koristili smo linearni skalu (d3.scaleLinear()) kako bismo prikazali broj doza krvi. Za y-os koristili smo skalu band (d3.scaleBand()) koja omogućava jednoliku raspodjelu država na osi.
4. Prikaz podataka:
Dodali smo pravokutnike (<rect>) za svaki redak podataka. Boja barova je postavljena na plavu, a kada se korisnik mišem pređe preko bara, boja se mijenja u tamniju nijansu plave. Dodali smo tooltip koji prikazuje broj donacija kada korisnik pređe mišem preko bara.
 
Slika 4. Prikaz podataka za donacije krvi u EU
 
3.3. Pie chart sa postocima muških i ženskih donatora krvi

1. Učitavanje podataka i kreiranje padajućeg izbornika:
Podaci su učitani iz CSV datoteke postoci.csv. Kreiran je padajući izbornik s nazivima država. Izborom države ažurira se pie chart. 
2. Funkcija za ažuriranje pie chart-a:
Funkcija updatePieChart ažurira prikaz pie chart-a na temelju odabrane države. Pronalazi podatke za odabranu državu, izračunava postotke muških i ženskih donora, te kreira pie chart.
3. Dodavanje naslova i kreiranje pie chart-a:
Dodali smo naslov grafikona i definirali funkcije za pie chart. Funkcija d3.pie se koristi za izračunavanje dijelova pie chart-a, a d3.arc za crtanje lukova.
4. Dodavanje lukova i tekstualnih oznaka:
Dodali smo lukove u pie chart koristeći path elemente. Svakom luku pridružili smo odgovarajuću boju i tekstualnu oznaku koja prikazuje postotak.
 
Slika 5. Postoci donora prema državi
 
4. Rezultati
Izrađena vizualizacija omogućuje korisnicima da lako pregledaju i analiziraju podatke o donacijama krvi u Europskoj uniji te omjer muških i ženskih donora po državama. Glavni cilj bio je pružiti jasne i intuitivne vizualizacije koje omogućavaju bolje razumijevanje distribucije krvnih grupa, broja donacija po državama, te rodne strukture donora.
Vizualizacija pomaže rješavanju problema opisanog u uvodu na sljedeće načine:
1. Distribucija krvnih grupa po državama:
Mapa svijeta prikazuje distribuciju odabrane krvne grupe po državama. Boje na karti omogućuju brzo vizualno prepoznavanje država s većim ili manjim postotkom određene krvne grupe.
2. Pregled broja donacija krvi po državama:
Horizontalni bar chart omogućuje korisnicima da brzo uoče koje države imaju najveći broj donacija krvi. Stupci su poredani od države s najviše doza prema onoj s najmanje, što omogućava jednostavno uspoređivanje.
3. Rodna struktura donora:
Pie chart omogućuje korisnicima da vide omjer muških i ženskih donora u odabranoj državi. Padajući izbornik omogućuje lako prebacivanje između država i usporedbu njihovih rodnih struktura.
Ograničenja sustava: Vizualizacija je ograničena točnošću i potpunosti podataka. Ako podaci nisu ažurirani ili točni, vizualizacije mogu pružiti pogrešne ili zastarjele informacije. Padajući izbornik može postati nepraktičan za vrlo veliki broj država ili regija. Boje koje se koriste u karti i pie chart-u možda nisu idealne za sve korisnike, posebno one s oštećenjima vida (npr. daltonizam). Također, pie chart-ovi mogu postati nepregledni ako postoji veliki broj kategorija ili vrlo male razlike u postocima.
 
