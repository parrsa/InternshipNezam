// data/iranLocations.ts

export interface CityOption {
  value: string;
  label: string;
}

export interface ProvinceOption {
  value: string;
  label: string;
  cities: CityOption[];
}

export const IRAN_PROVINCES: ProvinceOption[] = [
  {
    value: "east-azerbaijan",
    label: "آذربایجان شرقی",
    cities: [
      { value: "tabriz", label: "تبریز" },
      { value: "maragheh", label: "مراغه" },
      { value: "mianeh", label: "میانه" },
      { value: "ahar", label: "اهر" },
      { value: "marand", label: "مرند" },
      { value: "bonab", label: "بناب" },
    ],
  },
  {
    value: "west-azerbaijan",
    label: "آذربایجان غربی",
    cities: [
      { value: "urmia", label: "ارومیه" },
      { value: "khoy", label: "خوی" },
      { value: "bukan", label: "بوکان" },
      { value: "mahabad", label: "مهاباد" },
      { value: "salmas", label: "سلماس" },
      { value: "miandoab", label: "میاندوآب" },
    ],
  },
  {
    value: "ardabil",
    label: "اردبیل",
    cities: [
      { value: "ardabil-city", label: "اردبیل" },
      { value: "parsabad", label: "پارس‌آباد" },
      { value: "meshgin-shahr", label: "مشگین‌شهر" },
      { value: "khalkhal", label: "خلخال" },
      { value: "germi", label: "گرمی" },
    ],
  },
  {
    value: "isfahan",
    label: "اصفهان",
    cities: [
      { value: "isfahan-city", label: "اصفهان" },
      { value: "kashan", label: "کاشان" },
      { value: "najafabad", label: "نجف‌آباد" },
      { value: "khomeinishahr", label: "خمینی‌شهر" },
      { value: "shahin-shahr", label: "شاهین‌شهر" },
      { value: "natanz", label: "نطنز" },
    ],
  },
  {
    value: "alborz",
    label: "البرز",
    cities: [
      { value: "karaj", label: "کرج" },
      { value: "fardis", label: "فردیس" },
      { value: "nazarabad", label: "نظرآباد" },
      { value: "eshtehard", label: "اشتهارد" },
      { value: "savojbolagh", label: "ساوجبلاغ" },
    ],
  },
  {
    value: "ilam",
    label: "ایلام",
    cities: [
      { value: "ilam-city", label: "ایلام" },
      { value: "dehloran", label: "دهلران" },
      { value: "abdanan", label: "آبدانان" },
      { value: "eyvan", label: "ایوان" },
    ],
  },
  {
    value: "bushehr",
    label: "بوشهر",
    cities: [
      { value: "bushehr-city", label: "بوشهر" },
      { value: "borazjan", label: "برازجان" },
      { value: "genaveh", label: "گناوه" },
      { value: "kangan", label: "کنگان" },
      { value: "deylam", label: "دیلم" },
    ],
  },
  {
    value: "tehran",
    label: "تهران",
    cities: [
      { value: "tehran-city", label: "تهران" },
      { value: "rey", label: "ری" },
      { value: "eslamshahr", label: "اسلام‌شهر" },
      { value: "varamin", label: "ورامین" },
      { value: "shahriar", label: "شهریار" },
      { value: "pakdasht", label: "پاکدشت" },
      { value: "damavand", label: "دماوند" },
    ],
  },
  {
    value: "chaharmahal-bakhtiari",
    label: "چهارمحال و بختیاری",
    cities: [
      { value: "shahrekord", label: "شهرکرد" },
      { value: "borujen", label: "بروجن" },
      { value: "farsan", label: "فارسان" },
      { value: "lordegan", label: "لردگان" },
    ],
  },
  {
    value: "south-khorasan",
    label: "خراسان جنوبی",
    cities: [
      { value: "birjand", label: "بیرجند" },
      { value: "qaenat", label: "قائنات" },
      { value: "tabas", label: "طبس" },
      { value: "ferdows", label: "فردوس" },
    ],
  },
  {
    value: "razavi-khorasan",
    label: "خراسان رضوی",
    cities: [
      { value: "mashhad", label: "مشهد" },
      { value: "neyshabur", label: "نیشابور" },
      { value: "sabzevar", label: "سبزوار" },
      { value: "torbat-heydarieh", label: "تربت‌حیدریه" },
      { value: "quchan", label: "قوچان" },
      { value: "kashmar", label: "کاشمر" },
    ],
  },
  {
    value: "north-khorasan",
    label: "خراسان شمالی",
    cities: [
      { value: "bojnord", label: "بجنورد" },
      { value: "shirvan", label: "شیروان" },
      { value: "esfarayen", label: "اسفراین" },
      { value: "jajarm", label: "جاجرم" },
    ],
  },
  {
    value: "khuzestan",
    label: "خوزستان",
    cities: [
      { value: "ahvaz", label: "اهواز" },
      { value: "abadan", label: "آبادان" },
      { value: "khorramshahr", label: "خرمشهر" },
      { value: "dezful", label: "دزفول" },
      { value: "andimeshk", label: "اندیمشک" },
      { value: "mahshahr", label: "ماهشهر" },
    ],
  },
  {
    value: "zanjan",
    label: "زنجان",
    cities: [
      { value: "zanjan-city", label: "زنجان" },
      { value: "abhar", label: "ابهر" },
      { value: "khodabandeh", label: "خدابنده" },
      { value: "mahneshan", label: "ماهنشان" },
    ],
  },
  {
    value: "semnan",
    label: "سمنان",
    cities: [
      { value: "semnan-city", label: "سمنان" },
      { value: "shahrud", label: "شاهرود" },
      { value: "damghan", label: "دامغان" },
      { value: "garmsar", label: "گرمسار" },
    ],
  },
  {
    value: "sistan-baluchestan",
    label: "سیستان و بلوچستان",
    cities: [
      { value: "zahedan", label: "زاهدان" },
      { value: "zabol", label: "زابل" },
      { value: "iranshahr", label: "ایرانشهر" },
      { value: "chabahar", label: "چابهار" },
      { value: "saravan", label: "سراوان" },
    ],
  },
  {
    value: "fars",
    label: "فارس",
    cities: [
      { value: "shiraz", label: "شیراز" },
      { value: "marvdasht", label: "مرودشت" },
      { value: "jahrom", label: "جهرم" },
      { value: "kazerun", label: "کازرون" },
      { value: "fasa", label: "فسا" },
      { value: "lar", label: "لار" },
    ],
  },
  {
    value: "qazvin",
    label: "قزوین",
    cities: [
      { value: "qazvin-city", label: "قزوین" },
      { value: "takestan", label: "تاکستان" },
      { value: "alborz-qazvin", label: "البرز" },
      { value: "abyek", label: "آبیک" },
    ],
  },
  {
    value: "qom",
    label: "قم",
    cities: [{ value: "qom-city", label: "قم" }],
  },
  {
    value: "kurdistan",
    label: "کردستان",
    cities: [
      { value: "sanandaj", label: "سنندج" },
      { value: "saqqez", label: "سقز" },
      { value: "marivan", label: "مریوان" },
      { value: "baneh", label: "بانه" },
      { value: "qorveh", label: "قروه" },
    ],
  },
  {
    value: "kerman",
    label: "کرمان",
    cities: [
      { value: "kerman-city", label: "کرمان" },
      { value: "rafsanjan", label: "رفسنجان" },
      { value: "sirjan", label: "سیرجان" },
      { value: "bam", label: "بم" },
      { value: "jiroft", label: "جیرفت" },
      { value: "zarand", label: "زرند" },
    ],
  },
  {
    value: "kermanshah",
    label: "کرمانشاه",
    cities: [
      { value: "kermanshah-city", label: "کرمانشاه" },
      { value: "eslamabad-gharb", label: "اسلام‌آباد غرب" },
      { value: "kangavar", label: "کنگاور" },
      { value: "sonqor", label: "سنقر" },
      { value: "paveh", label: "پاوه" },
    ],
  },
  {
    value: "kohgiluyeh-boyerahmad",
    label: "کهگیلویه و بویراحمد",
    cities: [
      { value: "yasuj", label: "یاسوج" },
      { value: "dogonbadan", label: "دوگنبدان" },
      { value: "dehdasht", label: "دهدشت" },
    ],
  },
  {
    value: "golestan",
    label: "گلستان",
    cities: [
      { value: "gorgan", label: "گرگان" },
      { value: "gonbad-kavus", label: "گنبد کاووس" },
      { value: "aliabad", label: "علی‌آباد" },
      { value: "kordkuy", label: "کردکوی" },
      { value: "bandar-torkaman", label: "بندرترکمن" },
    ],
  },
  {
    value: "gilan",
    label: "گیلان",
    cities: [
      { value: "rasht", label: "رشت" },
      { value: "bandar-anzali", label: "بندر انزلی" },
      { value: "lahijan", label: "لاهیجان" },
      { value: "langarud", label: "لنگرود" },
      { value: "astara", label: "آستارا" },
      { value: "talesh", label: "تالش" },
    ],
  },
  {
    value: "lorestan",
    label: "لرستان",
    cities: [
      { value: "khorramabad", label: "خرم‌آباد" },
      { value: "borujerd", label: "بروجرد" },
      { value: "dorud", label: "دورود" },
      { value: "aligudarz", label: "الیگودرز" },
      { value: "kuhdasht", label: "کوهدشت" },
    ],
  },
  {
    value: "mazandaran",
    label: "مازندران",
    cities: [
      { value: "sari", label: "ساری" },
      { value: "babol", label: "بابل" },
      { value: "amol", label: "آمل" },
      { value: "qaemshahr", label: "قائم‌شهر" },
      { value: "behshahr", label: "بهشهر" },
      { value: "chalus", label: "چالوس" },
      { value: "nowshahr", label: "نوشهر" },
      { value: "ramsar", label: "رامسر" },
    ],
  },
  {
    value: "markazi",
    label: "مرکزی",
    cities: [
      { value: "arak", label: "اراک" },
      { value: "saveh", label: "ساوه" },
      { value: "khomein", label: "خمین" },
      { value: "mahallat", label: "محلات" },
      { value: "delijan", label: "دلیجان" },
    ],
  },
  {
    value: "hormozgan",
    label: "هرمزگان",
    cities: [
      { value: "bandar-abbas", label: "بندرعباس" },
      { value: "minab", label: "میناب" },
      { value: "bandar-lengeh", label: "بندرلنگه" },
      { value: "qeshm", label: "قشم" },
      { value: "kish", label: "کیش" },
    ],
  },
  {
    value: "hamadan",
    label: "همدان",
    cities: [
      { value: "hamadan-city", label: "همدان" },
      { value: "malayer", label: "ملایر" },
      { value: "nahavand", label: "نهاوند" },
      { value: "tuyserkan", label: "تویسرکان" },
      { value: "asadabad", label: "اسدآباد" },
    ],
  },
  {
    value: "yazd",
    label: "یزد",
    cities: [
      { value: "yazd-city", label: "یزد" },
      { value: "meybod", label: "میبد" },
      { value: "ardakan", label: "اردکان" },
      { value: "bafq", label: "بافق" },
      { value: "taft", label: "تفت" },
    ],
  },
];