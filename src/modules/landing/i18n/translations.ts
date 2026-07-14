/**
 * Landing-page translations. English is the source of truth; `Dict = typeof en`
 * forces Arabic and Farsi to stay structurally identical at compile time.
 * Proper nouns (brand, people's names, port names, emails) stay in Latin.
 */

export type Lang = "en" | "ar" | "fa";

export const LANGS: { code: Lang; label: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "fa", label: "فارسی", dir: "rtl" },
];

const en = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    values: "Values",
    faq: "FAQ",
    contact: "Contact",
    portalLogin: "Portal Login",
    getQuote: "Get a Quote",
    subBrand: "Shipping & Logistics",
  },
  hero: {
    region: "UAE",
    kicker: "Global Shipping & Logistics",
    titlePre: "Moving Trust Across",
    titleHighlight: "Borders",
    subtitle:
      "Al Waris Shipping Lines LLC — NVOCC, freight forwarding, project cargo, transportation and 3PL warehousing, managed with integrity, precision and unwavering reliability.",
    requestQuote: "Request a Quote",
    exploreServices: "Explore Services",
    trustLine: "Trusted handling · transparent pricing · 24/7 operations",
  },
  stats: {
    coreServices: "Core Services",
    onTrust: "On Trust",
    operationsSupport: "Operations Support",
    reachNetwork: "Reach & Network",
    globalValue: "Global",
  },
  widget: {
    instantQuote: "Instant Quote",
    trackShipment: "Track Shipment",
    cargoType: "Cargo type",
    origin: "Origin",
    destination: "Destination",
    originPh: "e.g. Jebel Ali",
    destinationPh: "e.g. Nhava Sheva",
    getMyQuote: "Get My Quote",
    bookingNumber: "Booking / B-L number",
    trackTrace: "Track & Trace",
    trackHint:
      "Enter your reference and our team will confirm the latest status.",
    cargoTypes: [
      "FCL — Full Container Load",
      "LCL — Less than Container Load",
      "Project / Over-Dimension Cargo",
      "Warehousing / 3PL",
      "Inland Transportation",
    ],
    quoteToast: "Great! Opening your email so our pricing desk can respond.",
    trackToast: (ref: string) =>
      `Tracking ${ref}: our operations team will share the latest status with you shortly.`,
  },
  about: {
    kicker: "Who We Are",
    title: "A partner you can rely on",
    paragraphs: [
      "At Al Waris Shipping Lines LLC, we believe that true success in the shipping and logistics industry is not measured solely by the movement of cargo, but by the trust we build with every shipment we handle. Our values are deeply inspired by the timeless teachings of Haji Waris Ali Shah, a symbol of humility, sincerity and unwavering faith, whose life emphasised honesty, simplicity and service to humanity.",
      "Guided by these principles, we are committed to conducting our business with integrity, transparency and respect. In an industry where time, precision and reliability are critical, we ensure that every consignment is managed with the highest level of care, responsibility and professionalism.",
      "We strive to build lasting relationships based on trust, fairness and clear communication. Every shipment entrusted to us is not just cargo — it represents confidence placed in us, and we honour that trust with dedication and accountability.",
      "Inspired by these enduring values, we believe that sincere intentions, ethical conduct and service to others are the true foundations of success. With humility in our approach and excellence in execution, we continue to move forward — connecting businesses across borders, supporting global trade and contributing positively to society.",
    ],
    badge: "Trust",
    badgeSub: "at the heart of every shipment",
    pillars: [
      {
        title: "Integrity",
        description:
          "Honesty in every dealing. We do what we say and stand behind every commitment we make.",
      },
      {
        title: "Transparency",
        description:
          "Clear communication and open processes, so you always know exactly where your cargo stands.",
      },
      {
        title: "Trust",
        description:
          "Every shipment represents confidence placed in us — we honour it with dedication and accountability.",
      },
    ],
  },
  why: {
    kicker: "Why Choose Us",
    title: "Built on trust, engineered for reliability",
    description:
      "The strengths that make every shipment dependable — from first quote to final delivery.",
    features: [
      {
        title: "Own Container Fleet",
        description:
          "As an NVOCC with our own containers, we offer dependable space and competitive, transparent rates.",
      },
      {
        title: "24/7 Operations Support",
        description:
          "A dedicated operations team you can call directly — every consignment tracked with care and accountability.",
      },
      {
        title: "Integrity in Every Deal",
        description:
          "Honest dealings and clear documentation. We do exactly what we commit to, every single time.",
      },
      {
        title: "Global Reach",
        description:
          "From Dubai to ports worldwide, we connect your business across borders through a trusted network.",
      },
      {
        title: "Transparent Pricing",
        description:
          "Clear, fair quotes with no hidden surprises — a dedicated pricing desk ready to respond fast.",
      },
      {
        title: "Project Cargo Expertise",
        description:
          "Heavy-lift and over-dimension cargo engineered and executed with precision and full responsibility.",
      },
    ],
  },
  services: {
    kicker: "What We Offer",
    title: "End-to-end logistics, under one roof",
    description:
      "From containers to project cargo and warehousing — every solution delivered with care, responsibility and professionalism.",
    items: [
      {
        title: "NVOCC — Own Containers",
        description:
          "Non-Vessel Operating Common Carrier services with our own container fleet, giving you greater control, competitive rates and dependable space.",
      },
      {
        title: "NVOCC — Shipping Agency",
        description:
          "Full shipping-agency representation — bookings, documentation and port coordination handled with precision and accountability.",
      },
      {
        title: "Over Dimension / Project Cargo",
        description:
          "Specialised handling of heavy-lift, out-of-gauge and project cargo, engineered and executed with the highest level of care.",
      },
      {
        title: "Freight Forwarding",
        description:
          "End-to-end sea and multimodal freight forwarding, connecting your business across borders with clear communication at every step.",
      },
      {
        title: "Transportation",
        description:
          "Reliable inland transportation and last-mile delivery, ensuring every consignment moves on time and arrives in perfect condition.",
      },
      {
        title: "3PL Warehousing",
        description:
          "Third-party logistics and warehousing solutions — storage, inventory and distribution managed with responsibility and transparency.",
      },
    ],
  },
  process: {
    kicker: "How It Works",
    title: "From enquiry to delivery",
    description:
      "A clear, transparent process — so you always know exactly where your cargo stands.",
    steps: [
      {
        title: "Share Your Requirement",
        description:
          "Tell us your cargo, route and timeline. Our pricing desk responds with a clear, competitive quote.",
      },
      {
        title: "We Plan the Route",
        description:
          "We design the optimal sea and multimodal route, handle bookings and prepare all documentation.",
      },
      {
        title: "Cargo in Motion",
        description:
          "Your shipment moves under our watch — coordinated at every port with precision and reliability.",
      },
      {
        title: "Delivered with Trust",
        description:
          "Safe, on-time delivery and clear final reconciliation — confidence honoured from origin to destination.",
      },
    ],
  },
  values: {
    kicker: "Our Guiding Values",
    title: "Inspired by timeless teachings",
    description:
      "The principles of Haji Waris Ali Shah — humility, sincerity and unwavering faith — shape the way we serve every client.",
  },
  cta: {
    kicker: "Time, precision & reliability",
    title: "Ready to move your cargo with a partner you can trust?",
    subtitle:
      "Let's connect your business across borders. Our team is ready to handle every consignment with dedication and accountability.",
    button: "Get Started Today",
  },
  faq: {
    kicker: "FAQ",
    title: "Questions, answered",
    items: [
      {
        q: "What shipping services do you provide?",
        a: "We offer NVOCC services with our own containers, shipping-agency representation, freight forwarding, over-dimension and project cargo handling, inland transportation, and 3PL warehousing — end to end under one roof.",
      },
      {
        q: "How do I get a quote?",
        a: "Use the Instant Quote request on this page or contact our pricing desk directly. Share your cargo type, origin, destination and preferred timeline, and we'll respond with a clear, competitive rate as quickly as possible.",
      },
      {
        q: "Can you handle over-dimension or heavy project cargo?",
        a: "Yes. Out-of-gauge, heavy-lift and project cargo is one of our specialities — each consignment is planned and executed with engineering precision and the highest level of care.",
      },
      {
        q: "Where are you based and which regions do you cover?",
        a: "Our head office is in Bur Dubai, UAE, and through our trusted agency network we connect businesses to ports across the globe.",
      },
      {
        q: "How do you ensure my cargo is handled reliably?",
        a: "Every shipment is managed by a dedicated operations team with clear communication, careful documentation and full accountability — because every consignment represents confidence placed in us.",
      },
    ],
  },
  contact: {
    kicker: "Get In Touch",
    title: "Let's move forward together",
    description:
      "Reach out for quotes, partnerships or any logistics requirement. We respond with clarity and care.",
    headOffice: "Head Office",
    offices: "Our Offices",
    sendEnquiry: "Send an Enquiry",
    namePh: "Your name",
    emailPh: "Email address",
    messagePh: "Tell us about your shipment or requirement...",
    sendBtn: "Send Enquiry",
    ourTeam: "Our Team",
    ourTeamSub: "Speak directly with the people who handle your shipments.",
    onRequest: "On request",
    contactToast: "Thank you! Opening your email to send the enquiry.",
    roles: {
      md: "Manager",
      pricingHead: "Pricing Head",
      opHead: "Operation Head",
      pricingManager: "Pricing Manager",
      salesManager: "Sales Manager",
    },
  },
  footer: {
    company: "Company",
    services: "Services",
    contact: "Contact",
    blurb:
      "Global shipping & logistics built on integrity, transparency and reliability. Every shipment entrusted to us is honoured with dedication and accountability.",
    rights: "All rights reserved.",
  },
};

export type Dict = typeof en;

const ar: Dict = {
  nav: {
    home: "الرئيسية",
    about: "من نحن",
    services: "الخدمات",
    values: "قيمنا",
    faq: "الأسئلة الشائعة",
    contact: "تواصل معنا",
    portalLogin: "دخول البوابة",
    getQuote: "احصل على عرض سعر",
    subBrand: "الشحن والخدمات اللوجستية",
  },
  hero: {
    region: "الإمارات",
    kicker: "الشحن والخدمات اللوجستية العالمية",
    titlePre: "ننقل الثقة عبر",
    titleHighlight: "الحدود",
    subtitle:
      "الواريث شيبنغ لاينز ش.ذ.م.م — خدمات NVOCC، والشحن والتخليص، والبضائع المشاريعية، والنقل، والتخزين اللوجستي 3PL، تُدار بنزاهة ودقة وموثوقية لا تتزعزع.",
    requestQuote: "اطلب عرض سعر",
    exploreServices: "استكشف خدماتنا",
    trustLine: "مناولة موثوقة · تسعير شفّاف · عمليات على مدار الساعة",
  },
  stats: {
    coreServices: "خدمات أساسية",
    onTrust: "على الثقة",
    operationsSupport: "دعم العمليات",
    reachNetwork: "حضور وشبكة",
    globalValue: "عالمي",
  },
  widget: {
    instantQuote: "عرض سعر فوري",
    trackShipment: "تتبّع الشحنة",
    cargoType: "نوع البضاعة",
    origin: "المنشأ",
    destination: "الوجهة",
    originPh: "مثال: جبل علي",
    destinationPh: "مثال: نهافا شيفا",
    getMyQuote: "احصل على عرضي",
    bookingNumber: "رقم الحجز / بوليصة الشحن",
    trackTrace: "تتبّع وتعقّب",
    trackHint: "أدخل رقمك المرجعي وسيؤكّد فريقنا آخر حالة.",
    cargoTypes: [
      "FCL — حمولة حاوية كاملة",
      "LCL — أقل من حمولة حاوية",
      "بضائع مشاريعية / غير قياسية الأبعاد",
      "تخزين / 3PL",
      "النقل البري",
    ],
    quoteToast: "رائع! يتم فتح بريدك الإلكتروني ليتمكّن فريق التسعير من الرد.",
    trackToast: (ref: string) =>
      `جارٍ تتبّع ${ref}: سيوافيك فريق العمليات بآخر حالة قريبًا.`,
  },
  about: {
    kicker: "من نحن",
    title: "شريك يمكنك الاعتماد عليه",
    paragraphs: [
      "في الواريث شيبنغ لاينز ش.ذ.م.م، نؤمن بأن النجاح الحقيقي في قطاع الشحن والخدمات اللوجستية لا يُقاس بحركة البضائع فحسب، بل بالثقة التي نبنيها مع كل شحنة نتولّاها. تستلهم قيمنا بعمق من تعاليم الحاج وارث علي شاه الخالدة، رمز التواضع والإخلاص والإيمان الراسخ، الذي شدّدت حياته على الصدق والبساطة وخدمة الإنسانية.",
      "واسترشادًا بهذه المبادئ، نلتزم بإدارة أعمالنا بنزاهة وشفافية واحترام. وفي قطاع يُعدّ فيه الوقت والدقة والموثوقية أمورًا حاسمة، نحرص على إدارة كل شحنة بأعلى مستويات العناية والمسؤولية والاحترافية.",
      "نسعى لبناء علاقات دائمة قائمة على الثقة والإنصاف والتواصل الواضح. فكل شحنة تُوكَل إلينا ليست مجرد بضاعة، بل تمثّل ثقةً مُنحت لنا، ونحن نصون تلك الثقة بالتفاني والمساءلة.",
      "واستلهامًا من هذه القيم الراسخة، نؤمن بأن النوايا الصادقة والسلوك الأخلاقي وخدمة الآخرين هي الأسس الحقيقية للنجاح. وبتواضع في نهجنا وتميّز في التنفيذ، نمضي قُدمًا — نربط الأعمال عبر الحدود، وندعم التجارة العالمية، ونسهم إيجابًا في المجتمع.",
    ],
    badge: "ثقة",
    badgeSub: "في قلب كل شحنة",
    pillars: [
      {
        title: "النزاهة",
        description: "الصدق في كل تعامل. نفعل ما نقوله ونلتزم بكل تعهّد نقطعه.",
      },
      {
        title: "الشفافية",
        description: "تواصل واضح وعمليات مفتوحة، لتعرف دائمًا أين وصلت بضاعتك.",
      },
      {
        title: "الثقة",
        description:
          "كل شحنة تمثّل ثقةً مُنحت لنا — نصونها بالتفاني والمساءلة.",
      },
    ],
  },
  why: {
    kicker: "لماذا تختارنا",
    title: "مبنيّ على الثقة، مصمّم للموثوقية",
    description:
      "نقاط القوة التي تجعل كل شحنة جديرة بالثقة — من أول عرض سعر حتى التسليم النهائي.",
    features: [
      {
        title: "أسطول حاويات خاص",
        description:
          "بصفتنا NVOCC نملك حاوياتنا، نوفّر مساحة موثوقة وأسعارًا تنافسية وشفّافة.",
      },
      {
        title: "دعم تشغيلي على مدار الساعة",
        description:
          "فريق عمليات مخصّص يمكنك الاتصال به مباشرة — كل شحنة تُتابَع بعناية ومساءلة.",
      },
      {
        title: "نزاهة في كل صفقة",
        description:
          "تعاملات صادقة ووثائق واضحة. ننفّذ ما نتعهّد به تمامًا، في كل مرة.",
      },
      {
        title: "حضور عالمي",
        description:
          "من دبي إلى موانئ العالم، نربط أعمالك عبر الحدود من خلال شبكة موثوقة.",
      },
      {
        title: "تسعير شفّاف",
        description:
          "عروض أسعار واضحة وعادلة دون مفاجآت خفية — مكتب تسعير مخصّص جاهز للرد بسرعة.",
      },
      {
        title: "خبرة في البضائع المشاريعية",
        description:
          "البضائع الثقيلة وغير القياسية الأبعاد تُخطَّط وتُنفَّذ بدقة ومسؤولية كاملة.",
      },
    ],
  },
  services: {
    kicker: "ما نقدّمه",
    title: "خدمات لوجستية متكاملة تحت سقف واحد",
    description:
      "من الحاويات إلى البضائع المشاريعية والتخزين — كل حل يُقدَّم بعناية ومسؤولية واحترافية.",
    items: [
      {
        title: "NVOCC — حاويات خاصة",
        description:
          "خدمات الناقل العام غير المشغّل للسفن بأسطول حاوياتنا الخاص، ما يمنحك تحكّمًا أكبر وأسعارًا تنافسية ومساحة موثوقة.",
      },
      {
        title: "NVOCC — وكالة شحن",
        description:
          "تمثيل وكالة شحن متكامل — الحجوزات والوثائق وتنسيق الموانئ بدقة ومسؤولية.",
      },
      {
        title: "بضائع غير قياسية / مشاريعية",
        description:
          "مناولة متخصّصة للبضائع الثقيلة وغير القياسية والمشاريعية، تُهندَس وتُنفَّذ بأعلى درجات العناية.",
      },
      {
        title: "الشحن والتخليص",
        description:
          "شحن بحري ومتعدّد الوسائط من الباب إلى الباب، يربط أعمالك عبر الحدود بتواصل واضح في كل خطوة.",
      },
      {
        title: "النقل",
        description:
          "نقل برّي موثوق وتسليم حتى الميل الأخير، لضمان وصول كل شحنة في وقتها وبحالة مثالية.",
      },
      {
        title: "تخزين لوجستي 3PL",
        description:
          "حلول الطرف الثالث للخدمات اللوجستية والتخزين — تخزين وجرد وتوزيع يُدار بمسؤولية وشفافية.",
      },
    ],
  },
  process: {
    kicker: "كيف نعمل",
    title: "من الاستفسار حتى التسليم",
    description: "عملية واضحة وشفّافة — لتعرف دائمًا أين وصلت بضاعتك بالضبط.",
    steps: [
      {
        title: "شارِكنا متطلباتك",
        description:
          "أخبرنا ببضاعتك ومسارك وجدولك الزمني، وسيردّ مكتب التسعير لدينا بعرض واضح وتنافسي.",
      },
      {
        title: "نخطّط للمسار",
        description:
          "نصمّم المسار البحري والمتعدّد الوسائط الأمثل، ونتولّى الحجوزات ونُعدّ جميع الوثائق.",
      },
      {
        title: "البضاعة في الطريق",
        description:
          "تتحرّك شحنتك تحت إشرافنا — بتنسيق في كل ميناء بدقة وموثوقية.",
      },
      {
        title: "تسليم بثقة",
        description:
          "تسليم آمن وفي الموعد مع تسوية نهائية واضحة — ثقة مصونة من المنشأ حتى الوجهة.",
      },
    ],
  },
  values: {
    kicker: "قيمنا الموجِّهة",
    title: "مستلهَمة من تعاليم خالدة",
    description:
      "مبادئ الحاج وارث علي شاه — التواضع والإخلاص والإيمان الراسخ — تُشكّل طريقتنا في خدمة كل عميل.",
  },
  cta: {
    kicker: "الوقت والدقة والموثوقية",
    title: "هل أنت مستعد لنقل بضاعتك مع شريك تثق به؟",
    subtitle:
      "لنربط أعمالك عبر الحدود. فريقنا جاهز للتعامل مع كل شحنة بتفانٍ ومساءلة.",
    button: "ابدأ اليوم",
  },
  faq: {
    kicker: "الأسئلة الشائعة",
    title: "إجابات على أسئلتك",
    items: [
      {
        q: "ما الخدمات التي تقدّمونها في الشحن؟",
        a: "نقدّم خدمات NVOCC بحاوياتنا الخاصة، وتمثيل وكالة الشحن، والشحن والتخليص، ومناولة البضائع غير القياسية والمشاريعية، والنقل البري، والتخزين اللوجستي 3PL — من البداية إلى النهاية تحت سقف واحد.",
      },
      {
        q: "كيف أحصل على عرض سعر؟",
        a: "استخدم خيار «عرض سعر فوري» في هذه الصفحة أو تواصل مع مكتب التسعير مباشرة. أخبرنا بنوع البضاعة والمنشأ والوجهة والجدول الزمني المفضّل، وسنردّ بسعر واضح وتنافسي بأسرع وقت ممكن.",
      },
      {
        q: "هل يمكنكم التعامل مع البضائع غير القياسية أو المشاريعية الثقيلة؟",
        a: "نعم. البضائع غير القياسية والثقيلة والمشاريعية من تخصّصاتنا — تُخطَّط وتُنفَّذ كل شحنة بدقة هندسية وأعلى درجات العناية.",
      },
      {
        q: "أين مقرّكم وما المناطق التي تغطّونها؟",
        a: "مقرّنا الرئيسي في بر دبي بالإمارات، ومن خلال شبكة وكالتنا الموثوقة نربط الأعمال بموانئ حول العالم.",
      },
      {
        q: "كيف تضمنون التعامل مع بضاعتي بموثوقية؟",
        a: "يُدار كل شحنة فريق عمليات مخصّص بتواصل واضح ووثائق دقيقة ومساءلة كاملة — لأن كل شحنة تمثّل ثقةً مُنحت لنا.",
      },
    ],
  },
  contact: {
    kicker: "تواصل معنا",
    title: "لنمضِ قُدمًا معًا",
    description:
      "تواصل معنا للحصول على عروض الأسعار أو الشراكات أو أي متطلّب لوجستي. نردّ بوضوح وعناية.",
    headOffice: "المكتب الرئيسي",
    offices: "مكاتبنا",
    sendEnquiry: "أرسل استفسارًا",
    namePh: "اسمك",
    emailPh: "البريد الإلكتروني",
    messagePh: "أخبرنا عن شحنتك أو متطلّبك...",
    sendBtn: "إرسال الاستفسار",
    ourTeam: "فريقنا",
    ourTeamSub: "تحدّث مباشرة مع من يتولّون شحناتك.",
    onRequest: "عند الطلب",
    contactToast: "شكرًا لك! يتم فتح بريدك الإلكتروني لإرسال الاستفسار.",
    roles: {
      md: "مدير",
      pricingHead: "رئيس التسعير",
      opHead: "رئيس العمليات",
      pricingManager: "مدير التسعير",
      salesManager: "مدير المبيعات",
    },
  },
  footer: {
    company: "الشركة",
    services: "الخدمات",
    contact: "تواصل معنا",
    blurb:
      "شحن وخدمات لوجستية عالمية مبنية على النزاهة والشفافية والموثوقية. كل شحنة تُوكَل إلينا نصونها بالتفاني والمساءلة.",
    rights: "جميع الحقوق محفوظة.",
  },
};

const fa: Dict = {
  nav: {
    home: "خانه",
    about: "درباره ما",
    services: "خدمات",
    values: "ارزش‌ها",
    faq: "سوالات متداول",
    contact: "تماس",
    portalLogin: "ورود به پورتال",
    getQuote: "دریافت قیمت",
    subBrand: "حمل‌ونقل و لجستیک",
  },
  hero: {
    region: "امارات",
    kicker: "حمل‌ونقل و لجستیک جهانی",
    titlePre: "انتقال اعتماد فراتر از",
    titleHighlight: "مرزها",
    subtitle:
      "شرکت الواریث شیپینگ لاینز — NVOCC، حمل‌ونقل بار، محموله‌های پروژه‌ای، ترابری و انبارداری ۳PL، با درستکاری، دقت و قابلیت اطمینان بی‌وقفه مدیریت می‌شود.",
    requestQuote: "درخواست قیمت",
    exploreServices: "مشاهده خدمات",
    trustLine: "جابجایی مطمئن · قیمت‌گذاری شفاف · عملیات ۲۴/۷",
  },
  stats: {
    coreServices: "خدمات اصلی",
    onTrust: "بر پایه‌ی اعتماد",
    operationsSupport: "پشتیبانی عملیات",
    reachNetwork: "گستره و شبکه",
    globalValue: "جهانی",
  },
  widget: {
    instantQuote: "قیمت فوری",
    trackShipment: "رهگیری محموله",
    cargoType: "نوع بار",
    origin: "مبدأ",
    destination: "مقصد",
    originPh: "مثال: جبل علی",
    destinationPh: "مثال: نهاوا شیوا",
    getMyQuote: "دریافت قیمت من",
    bookingNumber: "شماره رزرو / بارنامه",
    trackTrace: "رهگیری و پیگیری",
    trackHint:
      "شماره مرجع خود را وارد کنید تا تیم ما آخرین وضعیت را اعلام کند.",
    cargoTypes: [
      "FCL — بار کامل کانتینر",
      "LCL — کمتر از یک کانتینر",
      "محموله پروژه‌ای / فوق‌ابعاد",
      "انبارداری / 3PL",
      "حمل‌ونقل زمینی",
    ],
    quoteToast: "عالی! ایمیل شما باز می‌شود تا واحد قیمت‌گذاری ما پاسخ دهد.",
    trackToast: (ref: string) =>
      `در حال رهگیری ${ref}: تیم عملیات ما به‌زودی آخرین وضعیت را به شما اعلام می‌کند.`,
  },
  about: {
    kicker: "ما که هستیم",
    title: "شریکی که می‌توانید به آن تکیه کنید",
    paragraphs: [
      "در شرکت الواریث شیپینگ لاینز، باور داریم که موفقیت واقعی در صنعت حمل‌ونقل و لجستیک تنها با جابجایی بار سنجیده نمی‌شود، بلکه با اعتمادی که در هر محموله می‌سازیم. ارزش‌های ما عمیقاً از آموزه‌های ماندگار حاجی وارث علی شاه، نماد فروتنی، خلوص و ایمان استوار، الهام گرفته‌اند؛ کسی که زندگی‌اش بر صداقت، سادگی و خدمت به بشریت تأکید داشت.",
      "با پیروی از این اصول، متعهدیم کسب‌وکار خود را با درستکاری، شفافیت و احترام پیش ببریم. در صنعتی که زمان، دقت و قابلیت اطمینان حیاتی است، اطمینان می‌دهیم که هر محموله با بالاترین سطح مراقبت، مسئولیت و حرفه‌ای‌گری مدیریت شود.",
      "ما در تلاشیم روابطی پایدار بر پایه‌ی اعتماد، انصاف و ارتباط شفاف بسازیم. هر محموله‌ای که به ما سپرده می‌شود تنها بار نیست — نشان‌دهنده‌ی اعتمادی است که به ما شده، و ما این اعتماد را با تعهد و پاسخ‌گویی پاس می‌داریم.",
      "با الهام از این ارزش‌های پایدار، باور داریم که نیت‌های صادقانه، رفتار اخلاقی و خدمت به دیگران، بنیان‌های واقعی موفقیت‌اند. با فروتنی در رویکرد و تعالی در اجرا، رو به جلو حرکت می‌کنیم — کسب‌وکارها را فراتر از مرزها به هم پیوند می‌دهیم، از تجارت جهانی پشتیبانی می‌کنیم و سهمی مثبت در جامعه داریم.",
    ],
    badge: "اعتماد",
    badgeSub: "در قلب هر محموله",
    pillars: [
      {
        title: "درستکاری",
        description:
          "صداقت در هر معامله. به آنچه می‌گوییم عمل می‌کنیم و پای هر تعهد می‌ایستیم.",
      },
      {
        title: "شفافیت",
        description:
          "ارتباط شفاف و فرایندهای روشن، تا همیشه بدانید بارتان دقیقاً کجاست.",
      },
      {
        title: "اعتماد",
        description:
          "هر محموله نشان اعتمادی است که به ما شده — آن را با تعهد و پاسخ‌گویی پاس می‌داریم.",
      },
    ],
  },
  why: {
    kicker: "چرا ما",
    title: "ساخته‌شده بر اعتماد، مهندسی‌شده برای اطمینان",
    description:
      "نقاط قوتی که هر محموله را قابل‌اعتماد می‌کند — از نخستین قیمت تا تحویل نهایی.",
    features: [
      {
        title: "ناوگان کانتینری اختصاصی",
        description:
          "به‌عنوان NVOCC با کانتینرهای خودمان، فضای مطمئن و نرخ‌های رقابتی و شفاف ارائه می‌دهیم.",
      },
      {
        title: "پشتیبانی عملیاتی ۲۴/۷",
        description:
          "تیم عملیاتی اختصاصی که می‌توانید مستقیم تماس بگیرید — هر محموله با دقت و پاسخ‌گویی رهگیری می‌شود.",
      },
      {
        title: "درستکاری در هر معامله",
        description:
          "معاملات صادقانه و اسناد شفاف. دقیقاً به آنچه تعهد می‌دهیم عمل می‌کنیم، هر بار.",
      },
      {
        title: "گستره‌ی جهانی",
        description:
          "از دبی تا بنادر جهان، کسب‌وکار شما را از طریق شبکه‌ای مطمئن فراتر از مرزها پیوند می‌دهیم.",
      },
      {
        title: "قیمت‌گذاری شفاف",
        description:
          "قیمت‌های روشن و منصفانه بدون هزینه‌ی پنهان — واحد قیمت‌گذاری اختصاصی برای پاسخ سریع.",
      },
      {
        title: "تخصص در محموله‌های پروژه‌ای",
        description:
          "بارهای سنگین و فوق‌ابعاد با دقت و مسئولیت کامل طراحی و اجرا می‌شوند.",
      },
    ],
  },
  services: {
    kicker: "آنچه ارائه می‌دهیم",
    title: "لجستیک سرتاسری، زیر یک سقف",
    description:
      "از کانتینر تا محموله‌ی پروژه‌ای و انبارداری — هر راهکار با دقت، مسئولیت و حرفه‌ای‌گری ارائه می‌شود.",
    items: [
      {
        title: "NVOCC — کانتینرهای اختصاصی",
        description:
          "خدمات حامل عمومی بدون کشتی با ناوگان کانتینری خودمان، که کنترل بیشتر، نرخ رقابتی و فضای مطمئن می‌دهد.",
      },
      {
        title: "NVOCC — نمایندگی کشتیرانی",
        description:
          "نمایندگی کامل کشتیرانی — رزرو، اسناد و هماهنگی بندری با دقت و پاسخ‌گویی.",
      },
      {
        title: "محموله فوق‌ابعاد / پروژه‌ای",
        description:
          "جابجایی تخصصی بارهای سنگین، فوق‌ابعاد و پروژه‌ای، با بالاترین دقت طراحی و اجرا می‌شود.",
      },
      {
        title: "حمل‌ونقل بار",
        description:
          "حمل دریایی و چندوجهی سرتاسری که کسب‌وکار شما را با ارتباط شفاف در هر مرحله، فراتر از مرزها پیوند می‌دهد.",
      },
      {
        title: "ترابری",
        description:
          "حمل زمینی مطمئن و تحویل تا آخرین مرحله، تا هر محموله به‌موقع و در وضعیت عالی برسد.",
      },
      {
        title: "انبارداری 3PL",
        description:
          "راهکارهای لجستیک شخص ثالث و انبارداری — نگهداری، موجودی و توزیع با مسئولیت و شفافیت.",
      },
    ],
  },
  process: {
    kicker: "چگونه کار می‌کنیم",
    title: "از استعلام تا تحویل",
    description: "فرایندی روشن و شفاف — تا همیشه دقیقاً بدانید بارتان کجاست.",
    steps: [
      {
        title: "نیاز خود را بگویید",
        description:
          "بار، مسیر و زمان‌بندی خود را بگویید تا واحد قیمت‌گذاری ما با پیشنهادی روشن و رقابتی پاسخ دهد.",
      },
      {
        title: "مسیر را برنامه‌ریزی می‌کنیم",
        description:
          "بهترین مسیر دریایی و چندوجهی را طراحی می‌کنیم، رزرو را انجام می‌دهیم و همه‌ی اسناد را آماده می‌کنیم.",
      },
      {
        title: "بار در حرکت",
        description:
          "محموله‌ی شما زیر نظر ما حرکت می‌کند — با هماهنگی دقیق و مطمئن در هر بندر.",
      },
      {
        title: "تحویل با اعتماد",
        description:
          "تحویل ایمن و به‌موقع همراه با تسویه‌ی نهایی شفاف — اعتمادی پاس‌داشته از مبدأ تا مقصد.",
      },
    ],
  },
  values: {
    kicker: "ارزش‌های راهنمای ما",
    title: "برگرفته از آموزه‌های ماندگار",
    description:
      "اصول حاجی وارث علی شاه — فروتنی، خلوص و ایمان استوار — شیوه‌ی خدمت ما به هر مشتری را شکل می‌دهد.",
  },
  cta: {
    kicker: "زمان، دقت و اطمینان",
    title: "آماده‌اید بارتان را با شریکی قابل‌اعتماد جابجا کنید؟",
    subtitle:
      "بیایید کسب‌وکار شما را فراتر از مرزها پیوند دهیم. تیم ما آماده است هر محموله را با تعهد و پاسخ‌گویی مدیریت کند.",
    button: "همین امروز شروع کنید",
  },
  faq: {
    kicker: "سوالات متداول",
    title: "پاسخ به پرسش‌ها",
    items: [
      {
        q: "چه خدمات حمل‌ونقلی ارائه می‌دهید؟",
        a: "خدمات NVOCC با کانتینرهای اختصاصی، نمایندگی کشتیرانی، حمل‌ونقل بار، جابجایی محموله‌های فوق‌ابعاد و پروژه‌ای، ترابری زمینی و انبارداری 3PL — سرتاسری و زیر یک سقف.",
      },
      {
        q: "چگونه قیمت بگیرم؟",
        a: "از گزینه‌ی «قیمت فوری» در این صفحه استفاده کنید یا مستقیم با واحد قیمت‌گذاری تماس بگیرید. نوع بار، مبدأ، مقصد و زمان‌بندی دلخواه را بگویید تا در سریع‌ترین زمان قیمتی روشن و رقابتی ارائه دهیم.",
      },
      {
        q: "آیا می‌توانید محموله‌های فوق‌ابعاد یا پروژه‌ای سنگین را جابجا کنید؟",
        a: "بله. بارهای فوق‌ابعاد، سنگین و پروژه‌ای از تخصص‌های ماست — هر محموله با دقت مهندسی و بالاترین مراقبت طراحی و اجرا می‌شود.",
      },
      {
        q: "دفتر شما کجاست و چه مناطقی را پوشش می‌دهید؟",
        a: "دفتر مرکزی ما در بر دبی، امارات است و از طریق شبکه‌ی نمایندگی مطمئن خود، کسب‌وکارها را به بنادر سراسر جهان پیوند می‌دهیم.",
      },
      {
        q: "چگونه از جابجایی مطمئن بار من اطمینان می‌دهید؟",
        a: "هر محموله توسط تیم عملیاتی اختصاصی با ارتباط شفاف، اسناد دقیق و پاسخ‌گویی کامل مدیریت می‌شود — چون هر محموله نشان اعتمادی است که به ما شده.",
      },
    ],
  },
  contact: {
    kicker: "با ما در تماس باشید",
    title: "بیایید با هم پیش برویم",
    description:
      "برای دریافت قیمت، همکاری یا هر نیاز لجستیکی با ما تماس بگیرید. با شفافیت و دقت پاسخ می‌دهیم.",
    headOffice: "دفتر مرکزی",
    offices: "دفاتر ما",
    sendEnquiry: "ارسال استعلام",
    namePh: "نام شما",
    emailPh: "نشانی ایمیل",
    messagePh: "درباره‌ی محموله یا نیاز خود به ما بگویید...",
    sendBtn: "ارسال استعلام",
    ourTeam: "تیم ما",
    ourTeamSub:
      "مستقیم با کسانی که محموله‌های شما را مدیریت می‌کنند صحبت کنید.",
    onRequest: "در صورت درخواست",
    contactToast: "سپاس! ایمیل شما برای ارسال استعلام باز می‌شود.",
    roles: {
      md: "مدیر",
      pricingHead: "سرپرست قیمت‌گذاری",
      opHead: "مدیر عملیات",
      pricingManager: "مدیر قیمت‌گذاری",
      salesManager: "مدیر فروش",
    },
  },
  footer: {
    company: "شرکت",
    services: "خدمات",
    contact: "تماس",
    blurb:
      "حمل‌ونقل و لجستیک جهانی بر پایه‌ی درستکاری، شفافیت و اطمینان. هر محموله‌ای که به ما سپرده می‌شود با تعهد و پاسخ‌گویی پاس داشته می‌شود.",
    rights: "همه‌ی حقوق محفوظ است.",
  },
};

export const TRANSLATIONS: Record<Lang, Dict> = { en, ar, fa };
