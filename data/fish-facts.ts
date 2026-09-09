export type FishFact = {
  identification: string;
  habitat: string;
  occurrence: string;
};

const kisBalaton = 'A 2008-as Kis-Balaton térségi felmérés zalai mintavételi helyein dokumentálták.';
const mura = 'A Mura Zala vármegyei szakaszának Natura 2000 fenntartási terve dokumentálja.';

export const fishFacts: Record<string, FishFact> = {
  karikakeszeg: {
    identification: 'Magas, oldalról lapított, ezüstös testű keszeg. Páros úszói gyakran vörhenyesek, szeme a dévérkeszegénél feltűnően nagyobb.',
    habitat: 'Álló- és lassan áramló, növényzetben gazdag vizek rajokban élő hala.',
    occurrence: kisBalaton,
  },
  deverkeszeg: {
    identification: 'Magas, erősen lapított teste és feltűnően hosszú farok alatti úszója árulkodó; úszói többnyire szürkék.',
    habitat: 'Meleg, lassú folyószakaszok, holtágak és sekély tavak fenékközeli lakója.',
    occurrence: kisBalaton,
  },
  kusz: {
    identification: 'Karcsú, ezüstös hal, felfelé nyíló szájjal és hosszú, éles haséllel. Pikkelyei könnyen leválnak.',
    habitat: 'Tavak és lassú folyók felszínközeli vizében, többnyire nagy rajokban mozog.',
    occurrence: kisBalaton,
  },
  'fekete-torpeharcsa': {
    identification: 'Sötét, pikkelytelen test, nyolc bajuszszál és különálló zsírúszó jellemzi; mellúszójának első sugara erős tüske.',
    habitat: 'Iszapos aljú, felmelegedő álló- és lassú vizeket kedvelő idegenhonos faj.',
    occurrence: kisBalaton,
  },
  balin: {
    identification: 'Nyúlánk, áramvonalas ragadozó, nagy szájjal és előreugró alsó állkapoccsal; farokúszója mélyen bemetszett.',
    habitat: 'Nagyobb folyók és tavak nyílt vizének gyors mozgású, felszín közelében vadászó hala.',
    occurrence: kisBalaton,
  },
  ezustkarasz: {
    identification: 'Magas hátú, ezüstös-szürke kárászféle bajuszszálak nélkül; hosszú hátúszójának széle többnyire enyhén homorú.',
    habitat: 'Sekély, növényes állóvizekben és lassú csatornákban is jól boldoguló idegenhonos faj.',
    occurrence: kisBalaton,
  },
  nyurgaponty: {
    identification: 'A ponty nyúlánk, alacsony hátú formája. Száján két pár bajuszszál, hátán hosszú hátúszó látható.',
    habitat: 'Meleg tavak, holtágak és lassú folyók növényes, iszapos részeit kedveli.',
    occurrence: kisBalaton,
  },
  csuka: {
    identification: 'Hosszú, torpedó alakú test, kacsacsőrszerű fej és egészen hátul ülő hátúszó teszi könnyen felismerhetővé.',
    habitat: 'Növényzettel benőtt tavak, holtágak és lassú folyórészek lesből támadó ragadozója.',
    occurrence: kisBalaton,
  },
  vagodurbincs: {
    identification: 'Zömök, érdes tapintású hal összefüggő, tüskés hátúszóval és apró, szabálytalan sötét foltokkal.',
    habitat: 'Tavak és lassúbb folyók fenekén él, ahol alkonyatkor keres apró állati táplálékot.',
    occurrence: kisBalaton,
  },
  'szeles-durbincs': {
    identification: 'A vágódurbincsnál magasabb és zömökebb testű; oldalán szabálytalan, nagyobb sötét foltok sorakoznak.',
    habitat: 'Nagyobb folyók mélyebb, mérsékelten áramló, keményebb aljzatú szakaszain él.',
    occurrence: mura,
  },
  'selymes-durbincs': {
    identification: 'Hosszúkás testén három-négy keskeny, sötét hosszanti csík fut; ilyen mintázata más hazai durbincsnak nincs.',
    habitat: 'Közepes és nagy folyók sodráskedvelő, fenékközeli hala.',
    occurrence: mura,
  },
  naphal: {
    identification: 'Magas, színes testén kékeszöld pontok, kopoltyúfedőjén sötét, vörös szegélyű „fülfolt” látszik.',
    habitat: 'Meleg, tiszta, növényes álló- és lassú vizek idegenhonos hala.',
    occurrence: kisBalaton,
  },
  domolyko: {
    identification: 'Erős, hengeres testű hal nagy fejjel, széles szájjal és sötét szegélyű, hálómintát rajzoló nagy pikkelyekkel.',
    habitat: 'Patakok és folyók áramló, köves vagy kavicsos szakaszain gyakori.',
    occurrence: kisBalaton,
  },
  reticsik: {
    identification: 'Angolnaszerűen hosszú, barnán mintázott testű hal tíz szájszéli bajuszszállal és apró pikkelyekkel.',
    habitat: 'Sekély, iszapos, oxigénszegény lápok, mocsarak és csatornák jellegzetes hala.',
    occurrence: kisBalaton,
  },
  'folyami-geb': {
    identification: 'Fenékhez simuló, megnyúlt hal nagy fejjel; hasúszói tapadókoronggá nőttek össze, oldalán halvány foltsor fut.',
    habitat: 'Nagyobb folyók és csatornák homokos-iszapos fenekét kedvelő idegenhonos faj.',
    occurrence: kisBalaton,
  },
  csaposuger: {
    identification: 'Két hátúszója, oldalának sötét harántsávjai és vöröses alsó úszói könnyen felismerhetővé teszik.',
    habitat: 'Tavak, holtágak és folyók növényes vagy akadós részein vadászik.',
    occurrence: kisBalaton,
  },
  amurgeb: {
    identification: 'Zömök, nagy fejű, barnán márványozott hal két különálló hátúszóval; hasúszói nem alkotnak tapadókorongot.',
    habitat: 'Sűrű növényzetű, sekély és oxigénszegény állóvizeket is elviselő idegenhonos ragadozó.',
    occurrence: kisBalaton,
  },
  razbora: {
    identification: 'Apró, karcsú hal felfelé nyíló szájjal és az orrtól a farokig húzódó sötét oldalsávval.',
    habitat: 'Sekély tavak, csatornák és lassú folyórészek rajokban élő idegenhonos faja.',
    occurrence: kisBalaton,
  },
  'szivarvanyos-okle': {
    identification: 'Apró, magas testű hal kékeszöld faroknyélcsíkkal; az ívó hím szivárványosan színeződik.',
    habitat: 'Kagylókban szaporodik, ezért lassú vagy álló, kagylókban gazdag vizekhez kötődik.',
    occurrence: kisBalaton,
  },
  bodorka: {
    identification: 'Ezüstös test, vöröses szem és narancsvörös has- valamint farok alatti úszók jellemzik.',
    habitat: 'Tavakban, holtágakban és lassú folyókban élő, alkalmazkodó rajhal.',
    occurrence: kisBalaton,
  },
  sullo: {
    identification: 'Nyúlánk ragadozó két különálló hátúszóval, sötét harántsávokkal és jól látható ebfogakkal.',
    habitat: 'Nagy tavak és folyók nyíltabb, oxigéndús, kemény aljzatú részeit kedveli.',
    occurrence: kisBalaton,
  },
  kosullo: {
    identification: 'A süllőhöz hasonló, de kisebb termetű, sötétebb és nincsenek nagy ebfogai; harántsávjai élesebbek.',
    habitat: 'Nagyobb folyók és tavak mélyebb, kemény aljzatú részeinek fenékközeli ragadozója.',
    occurrence: kisBalaton,
  },
  'vorosszarnyu-keszeg': {
    identification: 'Aranyosan csillogó test, felfelé nyíló száj és élénkvörös úszók jellemzik; hátúszója a hasúszó mögött kezdődik.',
    habitat: 'Hínárral és náddal sűrűn benőtt álló- és lassú vizek hala.',
    occurrence: kisBalaton,
  },
  harcsa: {
    identification: 'Nagy, pikkelytelen testű hal széles, lapos fejjel, hosszú farok alatti úszóval és hat bajuszszállal.',
    habitat: 'Nagy tavak és lassabb folyók mély, akadós részeinek éjszakai csúcsragadozója.',
    occurrence: kisBalaton,
  },
  compo: {
    identification: 'Olívzöld-bronzos, nyálkás testét apró pikkelyek fedik; szeme vöröses, szájszegletében egy-egy rövid bajuszszál ül.',
    habitat: 'Dús növényzetű, iszapos tavak, holtágak és csatornák oxigénszegény vizét is tűri.',
    occurrence: kisBalaton,
  },
  'lapi-poc': {
    identification: 'Kis termetű, zömök, barnán márványozott hal lekerekített farokúszóval és a test végén ülő hátúszóval.',
    habitat: 'Sekély, sűrű növényzetű lápok és mocsári csatornák fokozottan védett hala.',
    occurrence: kisBalaton,
  },
};
