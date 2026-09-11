# A zalai fajlista bővítése

A 2026. szeptember 10-én megadott 58 soros táblázat eredeti mezőit a `species-table.tsv` őrzi. A játék és a Források és impresszum oldal közös adatforrása a `fishes.json`; a felismerési leírások a `fish-facts.ts` fájlban találhatók.

## Összevetés

A korábbi 26 bejegyzésből 25 megfelel a táblázat egy-egy sorának. A névváltozatokat összevezettük: csapósügér → sügér, razbóra → kínai razbóra, Aspius aspius → Leuciscus aspius (balin). A régi magyar nevek továbbra is elfogadott válaszok. A korábbi bejegyzések azonosítói és felismerési leírásai megmaradtak.

**33 új bejegyzés:** Vladykov-ingola, simatok, kecsege, angolna, leánykoncér, nyúldomolykó, jászkeszeg, sujtásos küsz, kurta baing, fürge cselle, laposkeszeg, bagolykeszeg, garda, szilvaorrú keszeg, paduc, márna, ponty, széles kárász, fenékjáró küllő, halványfoltú küllő, homoki küllő, felpillantó küllő, amur, fehér busa, pettyes busa, busahibrid, vágócsík, törpecsík, kövicsík, törpeharcsa, menyhal, magyar bucó, botos kölönte.

**Megőrzött többlettétel:** nyurgaponty. A ponty testformája, nem önálló faj. Külön szakértő bejegyzésként maradt meg; a ponty kezdő bejegyzést kapott. Eredetét, élőhelyét és méretét a ponty faj adatai alapján egészítettük ki, külön jelezve a maximális méret értelmezését. A Gébárti-tavi előfordulást a zalai horgászszövetség közli, a forma külön zalai gyakoriságára nem adtunk megalapozatlan becslést. A részletes forráshivatkozások a `dataSources` mezőben szerepelnek.

## Játékmódok és adatlap

- Kezdő: 20 különböző hal a táblázat 36 kezdő tételéből; mind a négy válaszlehetőség ebből a kategóriából származik.
- Szakértő: a táblázat 58 tétele és a nyurgaponty, összesen 59 különböző bejegyzés.
- Az adatlap tartalmazza a sorszámot, magyar és tudományos nevet, eredetet, védelmet/státuszt, zalai előfordulást, helyi élőhelyet, maximális méretet és a felismerési leírást. A kategóriát nem mutatja.
- A bővített lista eredményei külön rekordkulcsot használnak; a régi rekordok tárolt adatait nem töröljük.

Jóváhagyott jelmagyarázat: ●●● gyakori; ●● közepesen gyakori; ● ritka; ◐ történeti vagy bizonytalan előfordulás. A táblázati adatok szerkesztői besorolások; nem helyettesítettük őket más forrás eltérő adataival.

## Képek és ellenőrzés

Minden bejegyzéshez helyi kép, szerző, licenc és eredeti képoldal tartozik. Az ingola pontosan azonosított SNSB-ZSM múzeumi példány, a busahibrid tudományos tanulmányban azonosított hibrid. A nyurgaponty régi, magasabb hátú képe a pontyhoz került; a nyurgaponty külön, dokumentált vadponty-testformát bemutató képet kapott. A képek felhasználási részleteit a `public/fish/README.md` foglalja össze.

A `node scripts/validate-fishes.mjs` ellenőrzi a teljes táblázategyezést, a képfájlokat és metaadatokat, a kategóriaszűrést, az ismétlésmentes köröket, a válaszlehetőségeket és a névváltozatok elfogadását.
