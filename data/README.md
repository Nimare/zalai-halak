# A zalai fajlista bővítése

A 2026. szeptember 10-én megadott 58 soros táblázat eredeti mezőit a `species-table.tsv` őrzi. A játék és a Források és impresszum oldal közös adatforrása a `fishes.json`; a felismerési leírások a `fish-facts.ts` fájlban találhatók.

## Összevetés

A korábbi 26 bejegyzésből 25 megfelel a táblázat egy-egy sorának. A névváltozatokat összevezettük: csapósügér → sügér, razbóra → kínai razbóra, Aspius aspius → Leuciscus aspius (balin). A régi magyar nevek továbbra is elfogadott válaszok. A korábbi bejegyzések azonosítói és felismerési leírásai megmaradtak.

**33 új bejegyzés:** Vladykov-ingola, simatok, kecsege, angolna, leánykoncér, nyúldomolykó, jászkeszeg, sujtásos küsz, kurta baing, fürge cselle, laposkeszeg, bagolykeszeg, garda, szilvaorrú keszeg, paduc, márna, ponty, széles kárász, fenékjáró küllő, halványfoltú küllő, homoki küllő, felpillantó küllő, amur, fehér busa, pettyes busa, busahibrid, vágócsík, törpecsík, kövicsík, törpeharcsa, menyhal, magyar bucó, botos kölönte.

**Megőrzött többlettétel:** nyurgaponty. A ponty testformája, nem önálló faj. Külön szakértő bejegyzésként maradt meg; a ponty kezdő bejegyzést kapott. Eredetét, élőhelyét és méretét a ponty faj adatai alapján egészítettük ki, külön jelezve a maximális méret értelmezését. A Gébárti-tavi előfordulást a zalai horgászszövetség közli, a forma külön zalai gyakoriságára nem adtunk megalapozatlan becslést. A részletes forráshivatkozások a `dataSources` mezőben szerepelnek.

## Játékmódok és adatlap

- Kezdő: 20 különböző hal a táblázat 36 kezdő tételéből. A három téves válasz között a képen látható halhoz hasonló szakértő tételek neve is megjelenhet; a kapcsolódó nevek nagyobb eséllyel szerepelnek.
- Szakértő: 20 különböző, véletlenszerűen kiválasztott hal az 59 tételes teljes listából (a táblázat 58 tétele és a nyurgaponty).
- Az adatlap tartalmazza a sorszámot, magyar és tudományos nevet, eredetet, védelmet/státuszt, zalai előfordulást, helyi élőhelyet, maximális méretet és a felismerési leírást. A kategóriát nem mutatja.
- A bővített lista eredményei külön rekordkulcsot használnak; a régi rekordok tárolt adatait nem töröljük.
- A 20 kérdéses szakértő mód rekordja külön tárolódik a korábbi, 59 kérdéses eredményektől. A játék válasz utáni adatlapjairól és az eredményoldalról nincs forráslink; a forrásoldal a főoldal láblécéből érhető el.

Jóváhagyott jelmagyarázat: ●●● gyakori; ●● közepesen gyakori; ● ritka; ◐ történeti vagy bizonytalan előfordulás. A táblázati adatok szerkesztői besorolások; nem helyettesítettük őket más forrás eltérő adataival.

## Hasonló válaszlehetőségek kezdő módban

A `lib/game-rules.ts` fájl `beginnerConfusionGroups` listája szerkesztői, felismerést gyakorló csoportokat rögzít, nem rendszertani alfajokat. A kapcsolatok kölcsönösek. A szoros csoportok súlya 8, a tágabbaké 4, minden más kezdő halé 1. Átfedésnél a nagyobb súly érvényesül, a súlyok nem adódnak össze.

| Súly | Csoportok                                                                                                                                           |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8    | Karikakeszeg–dévérkeszeg–laposkeszeg–bagolykeszeg; bodorka–vörösszárnyú keszeg–leánykoncér; domolykó–nyúldomolykó–jászkeszeg; küsz–sujtásos küsz    |
| 8    | Széles kárász–ezüstkárász; ponty–nyurgaponty; a négy küllő; fehér busa–pettyes busa–busa-hibrid; a négy csík; harcsa–törpeharcsa–fekete törpeharcsa |
| 8    | Süllő–kősüllő; a három durbincs; folyami géb–amurgéb; kecsege–simatok; paduc–szilvaorrú keszeg                                                      |
| 4    | A négy fenti keszeg + szilvaorrú keszeg, vörösszárnyú keszeg, jászkeszeg, bodorka; domolykó–nyúldomolykó–jászkeszeg–balin–amur                      |
| 4    | Küsz–sujtásos küsz–kurta baing–fürge cselle–kínai razbóra–szivárványos ökle; küsz–garda–balin                                                       |
| 4    | Ponty–nyurgaponty–széles kárász–ezüstkárász–compó; márna és a négy küllő; a három harcsa és menyhal                                                 |
| 4    | Sügér–süllő–kősüllő és a három durbincs; folyami géb–amurgéb–botos kölönte–lápi póc                                                                 |

A három téves nevet súlyozottan, visszatevés nélkül sorsoljuk, majd a helyes válasszal együtt megkeverjük. A 8-as súly egy adott húzásnál nyolcszor akkora esélyt jelent, mint egy még bent lévő, 1-es súlyú jelölté; nem a teljes kérdésre vonatkozó megjelenési százalék. Egy kapcsolódó név sem garantált, és a többi kezdő hal továbbra is megjelenhet. Kapcsolat nélküli szakértő nevek nem kerülnek a kezdő válaszok közé. A gébek jelenleg szakértő képek, de a lápi póc kezdő kérdésénél már megjelenhetnek téves válaszként.

## Képek és ellenőrzés

Minden bejegyzéshez helyi kép, szerző, licenc és eredeti képoldal tartozik. Az ingola pontosan azonosított SNSB-ZSM múzeumi példány, a busahibrid tudományos tanulmányban azonosított hibrid. A nyurgaponty régi, magasabb hátú képe a pontyhoz került; a nyurgaponty külön, dokumentált vadponty-testformát bemutató képet kapott. A képek felhasználási részleteit a `public/fish/README.md` foglalja össze.

A `pnpm test` ellenőrzi a teljes táblázategyezést, a képfájlokat és metaadatokat, a kategóriaszűrést, az ismétlésmentes köröket, a válaszlehetőségeket, a súlyozott sorsolás eloszlását rögzített véletlenszám-sorozattal és a névváltozatok elfogadását.
