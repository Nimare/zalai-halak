export type FishFact = {
  identification: string;
  habitat?: string;
  occurrence?: string;
};

const kisBalaton =
  'A 2008-as Kis-Balaton térségi felmérés zalai mintavételi helyein dokumentálták.';
const mura =
  'A Mura Zala vármegyei szakaszának Natura 2000 fenntartási terve dokumentálja.';

export const fishFacts: Record<string, FishFact> = {
  'vladykov-ingola': {
    identification:
      'Vékony, angolnaszerű, pikkelytelen állkapocs nélküli gerinces. Páros úszói nincsenek, szája szívótölcsér, feje mögött hét pár kopoltyúnyílás sorakozik. A rokon ingoláktól képről nehéz biztosan elkülöníteni.',
  },
  simatok: {
    identification:
      'Testén öt sor csontvért fut, farka aszimmetrikus. Alsó ajka középen folytonos, négy rojtos bajuszszála a szájáig ér; ez a tokfélék közötti elkülönítés fontos bélyege.',
  },
  kecsege: {
    identification:
      'Karcsú tokféle hosszú, hegyes orral, alul nyíló szájjal és négy rojtos bajuszszállal. Oldalán sok apró csontvért sorakozik, farokúszójának felső karéja hosszabb.',
  },
  angolna: {
    identification:
      'Kígyószerű teste hátul oldalról lapított. Hát-, farok- és farok alatti úszója összefüggő szegélyt alkot; mellúszója van, hasúszója nincs.',
  },
  leanykoncer: {
    identification:
      'Ezüstös, oldalról lapított test, kis alsó állású száj és tompa orr jellemzi. Szeme ezüstös; az ívó hím fején és pikkelyein feltűnő nászkiütések fejlődnek.',
  },
  nyuldomolyko: {
    identification:
      'Karcsú, ezüstös hal viszonylag kis fejjel és szűk szájjal. A domolykótól kisebb szája és a farok alatti úszó homorú széle különíti el.',
  },
  jaszkeszeg: {
    identification:
      'Zömökebb, ezüstös-aranyos testű hal vörhenyes alsó úszókkal. Pikkelyei a domolykóénál apróbbak, feje és szája kisebb.',
  },
  'sujtasos-kusz': {
    identification:
      'Ezüstös oldalán a lefelé ívelő oldalvonalat két sor sötét pont szegélyezi, mintha varrás futna rajta. Teste a küszénél magasabb, szája kevésbé felfelé nyíló.',
  },
  'kurta-baing': {
    identification:
      'Apró, ezüstös, erősen felső állású szájú hal. Oldalvonala csak néhány elülső pikkelyen látszik, a test hátsó részén fényes hosszanti sáv húzódik.',
  },
  'furge-cselle': {
    identification:
      'Kis termetű, hengeres testű hal nagyon apró pikkelyekkel. Oldalán szabálytalan sötét foltok sorakoznak; az ívó hím hasa és úszótövei élénkpirosak lehetnek.',
  },
  laposkeszeg: {
    identification:
      'Erősen lapított, ezüstös keszeg feltűnően hosszú farok alatti úszóval. Szája felfelé nyílik, szeme a bagolykeszegénél kisebb.',
  },
  bagolykeszeg: {
    identification:
      'Nagy, világos szivárványhártyájú szem, tompa orr és kis alsó állású száj jellemzi. Farok alatti úszója igen hosszú; a laposkeszeg szája ezzel szemben felfelé nyílik.',
  },
  garda: {
    identification:
      'Hosszú, oldalról erősen lapított, kard alakú testű hal. Háta csaknem egyenes, hasa ívelten kidomborodik; mellúszói hosszúak, szája felfelé nyílik.',
  },
  'szilvaorru-keszeg': {
    identification:
      'Húsos, sötét orra a kis alsó állású száj elé nyúlik. Ezüstös, lapított teste és megnyúlt farok alatti úszója keszegszerű; szája nem olyan egyenes rés, mint a paducé.',
  },
  paduc: {
    identification:
      'Megnyúlt, ezüstös hal előrenyúló, tompa orral. Alsó állású szája jellegzetesen harántirányú, egyenes rés; alsó ajkának kemény peremével az aljzatot kaparja.',
  },
  marna: {
    identification:
      'Erős, megnyúlt test, alsó állású húsos száj és négy bajuszszál jellemzi. Úszói gyakran vörhenyesek, hátúszójának erős csontsugara hátul fogazott.',
  },
  ponty: {
    identification:
      'Változóan magas hátú, nagy pikkelyű hal hosszú hátúszóval. Szája körül két pár bajuszszál van; ez a bajusz nélküli kárászoktól könnyen megkülönbözteti.',
  },
  'szeles-karasz': {
    identification:
      'Magas, oldalról lapított, többnyire aranybarna testű, bajusz nélküli hal. Hosszú hátúszójának felső széle domború, míg az ezüstkárászé inkább egyenes vagy homorú.',
  },
  'fenekjaro-kullo': {
    identification:
      'Kis termetű, fenéklakó hal alsó állású szájjal és egy pár bajuszszállal. Oldalán nagy sötét foltok, hát- és farokúszóján jól látható pettyek sorakoznak.',
  },
  'halvanyfoltu-kullo': {
    identification:
      'Karcsú küllő egy pár bajuszszállal és oldalsó foltsorral. Úszói csaknem színtelenek, a farokúszó feltűnő pettyezése hiányzik; biztos azonosításához apró bélyegek vizsgálata is kellhet.',
  },
  'homoki-kullo': {
    identification:
      'Nyúlánk, vékony faroknyelű küllő hosszú bajuszszálakkal. Oldalán sötét foltsor, farokúszóján több sorba rendeződő pettyezés látszik; közeli rokonaitól képről nehéz elkülöníteni.',
  },
  'felpillanto-kullo': {
    identification:
      'Megnyúlt testű küllő feltűnően felfelé tekintő szemekkel és hosszú bajuszszálakkal. Faroknyele vékony, farokúszóján halvány foltokból álló sáv látható.',
  },
  amur: {
    identification:
      'Hosszúkás, hengeres testű, nagy pikkelyű hal széles, tompa fejjel. Szája körül nincs bajusz, hátúszója a pontyénál jóval rövidebb.',
  },
  'feher-busa': {
    identification:
      'Ezüstös testű, nagy fejű hal a fej alsó részén ülő szemmel. Hasán a toroktól a végbélnyílásig éles él fut, testén nincsenek a pettyes busára jellemző sötét márványfoltok.',
  },
  'pettyes-busa': {
    identification:
      'Igen nagy fejű busa mélyen ülő szemmel és többnyire sötéten márványozott oldallal. Hasi éle csak a hasúszók mögött kezdődik; mellúszója hosszú.',
  },
  'busa-hibrid': {
    identification:
      'A fehér és a pettyes busa kereszteződése: alacsonyan ülő szem, nagy fej és változó foltozottság jellemzi. Bélyegei köztesek lehetnek; egy fénykép önmagában nem bizonyítja a hibrid eredetet.',
  },
  vagocsik: {
    identification:
      'Vékony, oldalról lapított csík három pár rövid bajuszszállal, oldalán rendezett sötét foltsorral. Farokúszója tövének felső részén sötét folt ül; rokonai és hibridjei képről nem mindig különíthetők el.',
  },
  torpecsik: {
    identification:
      'Apró, sárgásbarna csík, oldalán egymástól világos közökkel elválasztott nagy sötét foltokkal. Háti foltsora is határozott; faroknyelének felső részén alacsony bőrél húzódik.',
  },
  kovicsik: {
    identification:
      'Hengeres, barnán márványozott testű csík hat bajuszszállal. Szabálytalan foltozása nem alkot olyan rendezett oldalsort, mint a vágócsíké; farka csak enyhén bemetszett.',
  },
  torpeharcsa: {
    identification:
      'Pikkelytelen, barnán márványozott test, nyolc bajuszszál és zsírúszó jellemzi. Mellúszótüskéjének belső szélén erős fogak vannak; a fekete törpeharcsától e bélyeg segít elkülöníteni.',
  },
  menyhal: {
    identification:
      'Nyúlánk, barnán márványozott hal egyetlen állbajusszal. Két hátúszója közül a második nagyon hosszú, hasúszói messze elöl helyezkednek el.',
  },
  'magyar-buco': {
    identification:
      'Megnyúlt, fenéklakó hal két különálló hátúszóval és sötét, ferde harántsávokkal. Feje lapos, faroknyele a német bucóénál rövidebb és vaskosabb.',
  },
  'botos-kolonte': {
    identification:
      'Széles, lapított fejű, barnán foltozott fenéklakó hal nagy, legyezőszerű mellúszókkal és két hátúszóval. Hasúszói különállók, nem alkotnak a gébekére jellemző tapadókorongot.',
  },
  karikakeszeg: {
    identification:
      'Magas, oldalról lapított, ezüstös testű keszeg. Páros úszói gyakran vörhenyesek, szeme a dévérkeszegénél feltűnően nagyobb.',
    habitat:
      'Álló- és lassan áramló, növényzetben gazdag vizek rajokban élő hala.',
    occurrence: kisBalaton,
  },
  deverkeszeg: {
    identification:
      'Magas, erősen lapított teste és feltűnően hosszú farok alatti úszója árulkodó; úszói többnyire szürkék.',
    habitat:
      'Meleg, lassú folyószakaszok, holtágak és sekély tavak fenékközeli lakója.',
    occurrence: kisBalaton,
  },
  kusz: {
    identification:
      'Karcsú, ezüstös hal, felfelé nyíló szájjal és hosszú, éles haséllel. Pikkelyei könnyen leválnak.',
    habitat:
      'Tavak és lassú folyók felszínközeli vizében, többnyire nagy rajokban mozog.',
    occurrence: kisBalaton,
  },
  'fekete-torpeharcsa': {
    identification:
      'Sötét, pikkelytelen test, nyolc bajuszszál és különálló zsírúszó jellemzi; mellúszójának első sugara erős tüske.',
    habitat:
      'Iszapos aljú, felmelegedő álló- és lassú vizeket kedvelő idegenhonos faj.',
    occurrence: kisBalaton,
  },
  balin: {
    identification:
      'Nyúlánk, áramvonalas ragadozó, nagy szájjal és előreugró alsó állkapoccsal; farokúszója mélyen bemetszett.',
    habitat:
      'Nagyobb folyók és tavak nyílt vizének gyors mozgású, felszín közelében vadászó hala.',
    occurrence: kisBalaton,
  },
  ezustkarasz: {
    identification:
      'Magas hátú, ezüstös-szürke kárászféle bajuszszálak nélkül; hosszú hátúszójának széle többnyire enyhén homorú.',
    habitat:
      'Sekély, növényes állóvizekben és lassú csatornákban is jól boldoguló idegenhonos faj.',
    occurrence: kisBalaton,
  },
  nyurgaponty: {
    identification:
      'A ponty nyúlánk, alacsony hátú formája. Száján két pár bajuszszál, hátán hosszú hátúszó látható.',
    habitat:
      'Meleg tavak, holtágak és lassú folyók növényes, iszapos részeit kedveli.',
    occurrence: kisBalaton,
  },
  csuka: {
    identification:
      'Hosszú, torpedó alakú test, kacsacsőrszerű fej és egészen hátul ülő hátúszó teszi könnyen felismerhetővé.',
    habitat:
      'Növényzettel benőtt tavak, holtágak és lassú folyórészek lesből támadó ragadozója.',
    occurrence: kisBalaton,
  },
  vagodurbincs: {
    identification:
      'Zömök, érdes tapintású hal összefüggő, tüskés hátúszóval és apró, szabálytalan sötét foltokkal.',
    habitat:
      'Tavak és lassúbb folyók fenekén él, ahol alkonyatkor keres apró állati táplálékot.',
    occurrence: kisBalaton,
  },
  'szeles-durbincs': {
    identification:
      'A vágódurbincsnál magasabb és zömökebb testű; oldalán szabálytalan, nagyobb sötét foltok sorakoznak.',
    habitat:
      'Nagyobb folyók mélyebb, mérsékelten áramló, keményebb aljzatú szakaszain él.',
    occurrence: mura,
  },
  'selymes-durbincs': {
    identification:
      'Hosszúkás testén három-négy keskeny, sötét hosszanti csík fut; ilyen mintázata más hazai durbincsnak nincs.',
    habitat: 'Közepes és nagy folyók sodráskedvelő, fenékközeli hala.',
    occurrence: mura,
  },
  naphal: {
    identification:
      'Magas, színes testén kékeszöld pontok, kopoltyúfedőjén sötét, vörös szegélyű „fülfolt” látszik.',
    habitat: 'Meleg, tiszta, növényes álló- és lassú vizek idegenhonos hala.',
    occurrence: kisBalaton,
  },
  domolyko: {
    identification:
      'Erős, hengeres testű hal nagy fejjel, széles szájjal és sötét szegélyű, hálómintát rajzoló nagy pikkelyekkel.',
    habitat:
      'Patakok és folyók áramló, köves vagy kavicsos szakaszain gyakori.',
    occurrence: kisBalaton,
  },
  reticsik: {
    identification:
      'Angolnaszerűen hosszú, barnán mintázott testű hal tíz szájszéli bajuszszállal és apró pikkelyekkel.',
    habitat:
      'Sekély, iszapos, oxigénszegény lápok, mocsarak és csatornák jellegzetes hala.',
    occurrence: kisBalaton,
  },
  'folyami-geb': {
    identification:
      'Fenékhez simuló, megnyúlt hal nagy fejjel; hasúszói tapadókoronggá nőttek össze, oldalán halvány foltsor fut.',
    habitat:
      'Nagyobb folyók és csatornák homokos-iszapos fenekét kedvelő idegenhonos faj.',
    occurrence: kisBalaton,
  },
  csaposuger: {
    identification:
      'Két hátúszója, oldalának sötét harántsávjai és vöröses alsó úszói könnyen felismerhetővé teszik.',
    habitat: 'Tavak, holtágak és folyók növényes vagy akadós részein vadászik.',
    occurrence: kisBalaton,
  },
  amurgeb: {
    identification:
      'Zömök, nagy fejű, barnán márványozott hal két különálló hátúszóval; hasúszói nem alkotnak tapadókorongot.',
    habitat:
      'Sűrű növényzetű, sekély és oxigénszegény állóvizeket is elviselő idegenhonos ragadozó.',
    occurrence: kisBalaton,
  },
  razbora: {
    identification:
      'Apró, karcsú hal felfelé nyíló szájjal és az orrtól a farokig húzódó sötét oldalsávval.',
    habitat:
      'Sekély tavak, csatornák és lassú folyórészek rajokban élő idegenhonos faja.',
    occurrence: kisBalaton,
  },
  'szivarvanyos-okle': {
    identification:
      'Apró, magas testű hal kékeszöld faroknyélcsíkkal; az ívó hím szivárványosan színeződik.',
    habitat:
      'Kagylókban szaporodik, ezért lassú vagy álló, kagylókban gazdag vizekhez kötődik.',
    occurrence: kisBalaton,
  },
  bodorka: {
    identification:
      'Ezüstös test, vöröses szem és narancsvörös has- valamint farok alatti úszók jellemzik.',
    habitat:
      'Tavakban, holtágakban és lassú folyókban élő, alkalmazkodó rajhal.',
    occurrence: kisBalaton,
  },
  sullo: {
    identification:
      'Nyúlánk ragadozó két különálló hátúszóval, sötét harántsávokkal és jól látható ebfogakkal.',
    habitat:
      'Nagy tavak és folyók nyíltabb, oxigéndús, kemény aljzatú részeit kedveli.',
    occurrence: kisBalaton,
  },
  kosullo: {
    identification:
      'A süllőhöz hasonló, de kisebb termetű, sötétebb és nincsenek nagy ebfogai; harántsávjai élesebbek.',
    habitat:
      'Nagyobb folyók és tavak mélyebb, kemény aljzatú részeinek fenékközeli ragadozója.',
    occurrence: kisBalaton,
  },
  'vorosszarnyu-keszeg': {
    identification:
      'Aranyosan csillogó test, felfelé nyíló száj és élénkvörös úszók jellemzik; hátúszója a hasúszó mögött kezdődik.',
    habitat: 'Hínárral és náddal sűrűn benőtt álló- és lassú vizek hala.',
    occurrence: kisBalaton,
  },
  harcsa: {
    identification:
      'Nagy, pikkelytelen testű hal széles, lapos fejjel, hosszú farok alatti úszóval és hat bajuszszállal.',
    habitat:
      'Nagy tavak és lassabb folyók mély, akadós részeinek éjszakai csúcsragadozója.',
    occurrence: kisBalaton,
  },
  compo: {
    identification:
      'Olívzöld-bronzos, nyálkás testét apró pikkelyek fedik; szeme vöröses, szájszegletében egy-egy rövid bajuszszál ül.',
    habitat:
      'Dús növényzetű, iszapos tavak, holtágak és csatornák oxigénszegény vizét is tűri.',
    occurrence: kisBalaton,
  },
  'lapi-poc': {
    identification:
      'Kis termetű, zömök, barnán márványozott hal lekerekített farokúszóval és a test végén ülő hátúszóval.',
    habitat:
      'Sekély, sűrű növényzetű lápok és mocsári csatornák fokozottan védett hala.',
    occurrence: kisBalaton,
  },
};
