// Shared character-assessment content + scoring (Stage 2 of the recruitment
// funnel — see doc/recruitment-funnel.md). Originally built for the standalone
// startup-builder track; now the same instrument is shared across all tracks
// (job, internship, builder) so every candidate is read against the same bar.
//
// Pure data + pure functions only — no DOM — so this can run both in the
// browser (via define:vars) and on the server (api/assessment.ts) if needed.

export type Lang = 'en' | 'id';

export const AREAS = [
  { value: 'engineering', en: 'Engineering',         id: 'Engineering' },
  { value: 'product',     en: 'Product',             id: 'Produk' },
  { value: 'growth',      en: 'Growth',               id: 'Growth' },
  { value: 'operations',  en: 'Operations',          id: 'Operasional' },
  { value: 'open',        en: 'Open / Not sure yet',  id: 'Terbuka / Belum yakin' },
];

export type SJTScenario = {
  key: string;
  best: number;
  worst: number;
  trait?: string;
  en: { scenario: string; options: string[] };
  id: { scenario: string; options: string[] };
};

export const SJT: SJTScenario[] = [
  {
    key: 's1', best: 1, worst: 0,
    en: {
      scenario: 'Three days into a new project you realize the goal you were given is vague — and the person who assigned it just went offline for a week.',
      options: [
        "Wait until they're back so you don't build the wrong thing.",
        'Pick the most likely reading, write down your assumptions, start building, and share progress early so it can be corrected.',
        'Ask a teammate to make the call for you.',
        'Build two quick throwaway versions of the likeliest interpretations to pull feedback fast.',
      ],
    },
    id: {
      scenario: 'Tiga hari mengerjakan proyek baru, kamu sadar tujuan yang diberikan masih kabur — dan orang yang memberi tugas baru saja tidak bisa dihubungi selama seminggu.',
      options: [
        'Menunggu sampai dia kembali agar tidak salah membangun.',
        'Pilih tafsiran yang paling mungkin, catat asumsimu, mulai mengerjakan, dan bagikan progres lebih awal agar bisa dikoreksi.',
        'Minta rekan kerja yang memutuskan untukmu.',
        'Bangun dua versi cepat sekali pakai dari tafsiran yang paling mungkin untuk menarik masukan dengan cepat.',
      ],
    },
  },
  {
    key: 's2', best: 1, worst: 0,
    en: {
      scenario: "You're 80% done with a feature you're proud of. Leadership says the market shifted — it's deprioritized, and they need something else by Friday.",
      options: [
        "Push to finish yours first — you're so close.",
        'Feel the sting, reprioritize immediately, salvage anything reusable, and start the new thing.',
        'Do the new thing, but slowly and resentfully.',
        'Quietly keep working on your original feature on the side.',
      ],
    },
    id: {
      scenario: 'Kamu sudah 80% menyelesaikan fitur yang kamu banggakan. Pimpinan bilang pasar berubah — fitur itu diturunkan prioritasnya, dan mereka butuh hal lain hari Jumat.',
      options: [
        'Tetap selesaikan fiturmu dulu — kan tinggal sedikit.',
        'Meski berat, langsung atur ulang prioritas, selamatkan bagian yang bisa dipakai ulang, dan mulai yang baru.',
        'Kerjakan yang baru, tapi lambat dan dengan setengah hati.',
        'Diam-diam tetap mengerjakan fitur awalmu di samping.',
      ],
    },
  },
  {
    key: 's3', best: 1, worst: 0,
    en: {
      scenario: 'In a review, a junior teammate points out a real flaw in your work — in front of the whole team.',
      options: [
        'Explain why your approach is actually fine, to protect your standing.',
        'Thank them, dig into the flaw on the spot, fix it, and say publicly they were right.',
        'Acknowledge it briefly and move on without changing anything.',
        'Get a little defensive, but quietly fix it later.',
      ],
    },
    id: {
      scenario: 'Dalam review, rekan junior menunjukkan kelemahan nyata pada hasil kerjamu — di depan seluruh tim.',
      options: [
        'Jelaskan kenapa pendekatanmu sebenarnya sudah benar, demi menjaga reputasimu.',
        'Berterima kasih, telusuri kelemahannya saat itu juga, perbaiki, dan akui di depan umum bahwa dia benar.',
        'Akui sekilas lalu lanjut tanpa mengubah apa pun.',
        'Sedikit defensif, tapi diam-diam memperbaikinya nanti.',
      ],
    },
  },
  {
    key: 's4', best: 1, worst: 0,
    en: {
      scenario: "You need a result that normally requires a tool or budget you don't have and won't get this quarter. The deadline is real.",
      options: [
        "Report that it can't be done without the budget.",
        'Find a scrappy 80% workaround with what’s available, ship it, and flag the limitation.',
        'Wait and hope the budget gets approved in time.',
        'Grind it out manually every single time, without looking for leverage.',
      ],
    },
    id: {
      scenario: 'Kamu butuh hasil yang biasanya memerlukan alat atau anggaran yang tidak kamu punya dan tidak akan didapat kuartal ini. Tenggatnya nyata.',
      options: [
        'Laporkan bahwa ini tidak bisa dikerjakan tanpa anggaran.',
        'Cari solusi akal-akalan 80% dengan yang ada, rilis, lalu sampaikan keterbatasannya.',
        'Menunggu dan berharap anggaran disetujui tepat waktu.',
        'Kerjakan manual terus-menerus, tanpa mencari cara yang lebih efisien.',
      ],
    },
  },
  {
    key: 's5', best: 1, worst: 0,
    en: {
      scenario: "You can hit the deadline by shipping something you know is mediocre, or slip two days for work you'd be proud of. Leadership hasn't said which they want.",
      options: [
        'Silently ship the mediocre version to make the date.',
        'Surface the trade-off, give a recommendation, and ship the smallest thing that truly clears the bar.',
        'Silently slip the deadline to protect the quality.',
        'Ship mediocre now and plan to fix it “later.”',
      ],
    },
    id: {
      scenario: 'Kamu bisa mengejar tenggat dengan merilis sesuatu yang kamu tahu biasa-biasa saja, atau mundur dua hari demi hasil yang kamu banggakan. Pimpinan belum bilang mana yang mereka mau.',
      options: [
        'Diam-diam rilis versi biasa-biasa saja demi mengejar tanggal.',
        'Sampaikan trade-off-nya, beri rekomendasi, dan rilis hal terkecil yang benar-benar memenuhi standar.',
        'Diam-diam mundurkan tenggat demi menjaga kualitas.',
        'Rilis yang biasa-biasa saja sekarang dan berencana memperbaikinya “nanti”.',
      ],
    },
  },
  {
    key: 's6', best: 2, worst: 0, trait: 'loyalty',
    en: {
      scenario: 'Six months in — after the company invested real time and money training you — a competitor offers 40% more for a similar role. The startup is doing okay, but cash is still tight.',
      options: [
        'Take it. Salary is the main reason anyone works.',
        'Use the offer as leverage to demand a matching raise, and leave if they cannot.',
        'Talk openly with the founder about your growth and the path ahead before deciding anything.',
        'Say nothing, keep interviewing quietly, and jump the moment something even higher appears.',
      ],
    },
    id: {
      scenario: 'Enam bulan berjalan — setelah perusahaan benar-benar menginvestasikan waktu dan uang untuk melatihmu — pesaing menawarkan 40% lebih besar untuk peran serupa. Startup ini baik-baik saja, tapi arus kasnya masih ketat.',
      options: [
        'Ambil saja. Gaji adalah alasan utama orang bekerja.',
        'Pakai tawaran itu sebagai daya tawar untuk menuntut kenaikan setara, dan pergi kalau tidak bisa.',
        'Bicara terbuka dengan founder soal pertumbuhanmu dan arah ke depan sebelum memutuskan apa pun.',
        'Diam saja, terus melamar diam-diam, dan langsung pindah begitu ada yang lebih tinggi lagi.',
      ],
    },
  },
  {
    key: 's7', best: 1, worst: 3, trait: 'loyalty',
    en: {
      scenario: "The company hits a rough quarter. Salaries are still paid, but bonuses are frozen and everyone is stretched thin. No one would blame you for leaving.",
      options: [
        'Quietly start interviewing elsewhere right away — protect yourself first.',
        'Ask leadership for an honest picture, and if the mission still holds, dig in and help fix it.',
        'Stay, but quietly do the minimum until things get better.',
        'Demand guarantees about your own compensation before you commit any further.',
      ],
    },
    id: {
      scenario: 'Perusahaan mengalami kuartal yang berat. Gaji tetap dibayar, tapi bonus dibekukan dan semua orang kewalahan. Tidak ada yang akan menyalahkanmu kalau memilih pergi.',
      options: [
        'Diam-diam langsung mulai melamar ke tempat lain — selamatkan diri dulu.',
        'Minta gambaran jujur dari pimpinan, dan kalau misinya masih relevan, turun tangan dan bantu memperbaikinya.',
        'Tetap bertahan, tapi diam-diam mengerjakan seminimal mungkin sampai keadaan membaik.',
        'Menuntut jaminan atas kompensasimu sendiri sebelum berkomitmen lebih jauh.',
      ],
    },
  },
  {
    key: 's8', best: 2, worst: 1, trait: 'drive',
    en: {
      scenario: 'A boring, invisible task lands on you — cleaning up months of messy records. No one will praise it, but the team keeps tripping over the mess. Three days in, it is as dull as you feared.',
      options: [
        'Do the obvious half, then quietly move to something more visible.',
        'Push it back — argue it is not really your job and someone junior should do it.',
        'Set a steady pace, finish it properly because it matters, and tighten the process so it stays clean.',
        'Rush it to "done" and move on, even knowing it is still half-broken.',
      ],
    },
    id: {
      scenario: 'Tugas membosankan dan tak terlihat jatuh ke tanganmu — merapikan catatan berantakan berbulan-bulan. Tak ada yang akan memuji, tapi tim terus terhambat karenanya. Tiga hari berjalan, ternyata memang semembosankan yang kamu bayangkan.',
      options: [
        'Kerjakan bagian yang mudah saja, lalu diam-diam pindah ke hal yang lebih terlihat.',
        'Tolak — beralasan ini bukan tugasmu dan seharusnya dikerjakan yang lebih junior.',
        'Atur ritme yang stabil, selesaikan dengan benar karena ini penting, dan rapikan prosesnya agar tetap bersih.',
        'Buru-buru sampai "selesai" lalu lanjut, walau tahu masih setengah rusak.',
      ],
    },
  },
  {
    key: 's9', best: 1, worst: 2, trait: 'ambition',
    en: {
      scenario: 'You committed to a hard 12-month goal you believe in. Four months in — progress is slow and unglamorous — a flashier new opportunity appears that would reset you to month zero.',
      options: [
        'Drop the goal and chase the new thing; it feels more exciting right now.',
        'Stay the course, finish what you started, and only switch if it is genuinely more important — not just newer.',
        'Quietly half-do both, losing momentum on each.',
        'Keep the old goal but stop really trying, waiting for the next shiny thing.',
      ],
    },
    id: {
      scenario: 'Kamu berkomitmen pada tujuan berat 12 bulan yang kamu yakini. Empat bulan berjalan — progresnya lambat dan tidak keren — muncul peluang baru yang lebih menggiurkan, tapi membuatmu mulai lagi dari nol.',
      options: [
        'Tinggalkan tujuan lama dan kejar yang baru; sekarang terasa lebih seru.',
        'Tetap pada jalurmu, selesaikan yang sudah dimulai, dan baru beralih kalau memang benar-benar lebih penting — bukan sekadar lebih baru.',
        'Diam-diam mengerjakan keduanya setengah-setengah, kehilangan momentum di kedua sisi.',
        'Pertahankan tujuan lama tapi berhenti sungguh-sungguh berusaha, menunggu hal menarik berikutnya.',
      ],
    },
  },
  {
    key: 's10', best: 0, worst: 3, trait: 'growth',
    en: {
      scenario: 'You are offered a project clearly above your current level. You might struggle in front of everyone. Turning it down is easy and no one would think less of you.',
      options: [
        'Take it, be open about what you do not know yet, and close the gap fast with help and hard work.',
        'Take it, but hide your gaps and hope no one notices you are out of your depth.',
        'Take it only if they lower what is expected of you first.',
        'Decline, and stick to what already makes you look competent.',
      ],
    },
    id: {
      scenario: 'Kamu ditawari proyek yang jelas di atas levelmu saat ini. Kamu mungkin kesulitan di depan semua orang. Menolaknya mudah dan tak ada yang akan memandangmu rendah.',
      options: [
        'Ambil, terbuka soal apa yang belum kamu kuasai, dan kejar ketertinggalan dengan bantuan dan kerja keras.',
        'Ambil, tapi sembunyikan kekuranganmu dan berharap tak ada yang sadar kamu kewalahan.',
        'Ambil hanya kalau ekspektasi terhadapmu diturunkan dulu.',
        'Tolak, dan tetap pada hal yang sudah membuatmu terlihat kompeten.',
      ],
    },
  },
  {
    key: 's11', best: 2, worst: 0, trait: 'ownership',
    en: {
      scenario: "You notice something important quietly breaking. It's clearly outside your role, nobody asked you to touch it, and dealing with it will eat into your own work this week.",
      options: [
        "Leave it — it's genuinely not your job, and you have your own targets to hit.",
        'Mention it to whoever owns it and go back to your own tasks.',
        "Take it on (or pull in the right people) because it's hurting the company, and flex your own work to make room.",
        'Wait until someone officially makes it your responsibility.',
      ],
    },
    id: {
      scenario: 'Kamu menyadari ada hal penting yang diam-diam mulai rusak. Jelas di luar peranmu, tak ada yang memintamu menyentuhnya, dan menanganinya akan memakan waktu kerjamu sendiri minggu ini.',
      options: [
        'Biarkan saja — ini memang bukan tugasmu, dan kamu punya target sendiri.',
        'Sampaikan ke orang yang bertanggung jawab lalu kembali ke tugasmu sendiri.',
        'Tangani (atau ajak orang yang tepat) karena ini merugikan perusahaan, dan sesuaikan pekerjaanmu sendiri agar ada ruang.',
        'Tunggu sampai ada yang resmi menjadikannya tanggung jawabmu.',
      ],
    },
  },
  {
    key: 's12', best: 1, worst: 0, trait: 'growth',
    en: {
      scenario: "You're handed a tool you've never used, with a real deadline. There's no training planned and no one free to teach you right now.",
      options: [
        'Wait until the company arranges proper training before you really start.',
        'Dig into the docs and tutorials, try it straight away, build a small test, and ask for help only once you are genuinely stuck.',
        'Find one person who knows it and get them to walk you through every step.',
        'Do the parts you already know and leave the unfamiliar parts undone.',
      ],
    },
    id: {
      scenario: 'Kamu diberi alat yang belum pernah kamu pakai, dengan tenggat nyata. Tidak ada rencana pelatihan dan tak ada yang sempat mengajarimu sekarang.',
      options: [
        'Menunggu sampai perusahaan mengatur pelatihan yang layak sebelum benar-benar mulai.',
        'Telusuri dokumentasi dan tutorial, langsung coba, buat uji kecil, dan minta bantuan hanya saat benar-benar buntu.',
        'Cari satu orang yang menguasainya dan minta dia memandumu langkah demi langkah.',
        'Kerjakan bagian yang sudah kamu kuasai dan biarkan bagian yang asing tidak selesai.',
      ],
    },
  },
];

export const WORK_SAMPLE = {
  en: 'A mid-sized Indonesian retailer signs with us on Monday. They want “AI to cut customer-service costs,” but the data is messy, three of their teams disagree on priorities, and the CEO expects to see something real within two weeks.',
  id: 'Sebuah peritel menengah Indonesia tanda tangan kontrak hari Senin. Mereka ingin “AI untuk menekan biaya layanan pelanggan,” tapi datanya berantakan, tiga tim mereka berbeda pendapat soal prioritas, dan CEO berharap melihat sesuatu yang nyata dalam dua minggu.',
};

export const CHARACTER_TRAITS = [
  { key: 'drive',     en: 'Drive & Motivation',     id: 'Dorongan & Motivasi' },
  { key: 'growth',    en: 'Growth & Learning',      id: 'Pertumbuhan & Belajar' },
  { key: 'ownership', en: 'Ownership & Hard Work',  id: 'Rasa Memiliki & Kerja Keras' },
  { key: 'tolerance', en: 'Startup Tolerance',      id: 'Toleransi Startup' },
  { key: 'ego',       en: 'Low Ego, High Standard', id: 'Ego Rendah, Standar Tinggi' },
  { key: 'ambition',  en: 'Long-term Ambition',     id: 'Ambisi Jangka Panjang' },
  { key: 'loyalty',   en: 'Loyalty & Commitment',   id: 'Loyalitas & Komitmen' },
];

export const DRIVERS = [
  { key: 'build',   en: 'Building something that outlasts me',     id: 'Membangun sesuatu yang bertahan lebih lama dari saya' },
  { key: 'learn',   en: 'Getting much better, fast',                 id: 'Menjadi jauh lebih baik, dengan cepat' },
  { key: 'own',     en: 'Being trusted to own big things',           id: 'Dipercaya memegang tanggung jawab besar' },
  { key: 'money',   en: 'Earning well, soon',                        id: 'Berpenghasilan baik, secepatnya' },
  { key: 'status',  en: 'A respected title and recognition',        id: 'Jabatan dan pengakuan yang dihormati' },
  { key: 'comfort', en: 'Comfort, balance, and stability',          id: 'Kenyamanan, keseimbangan, dan kestabilan' },
];

export type SJTPicks = Record<string, { best: number | null; worst: number | null }>;
export type DriverPicks = { most: string | null; least: string | null };

export function countWords(s: string) {
  const t = (s ?? '').trim();
  return t ? t.split(/\s+/).filter(w => w.length > 0).length : 0;
}

function clamp(n: number) { return Math.max(0, Math.min(100, n)); }
function depth(wc: number, target: number) { return clamp((wc / target) * 100); }

function sjtTrait(picks: SJTPicks, key: string): number {
  const scenario = SJT.find(s => s.key === key);
  const pick = picks[key];
  if (!scenario || !pick) return 0;
  let hits = 0;
  if (pick.best  != null) hits += (pick.best  === scenario.best)  ? 1 : 0;
  if (pick.worst != null) hits += (pick.worst === scenario.worst) ? 1 : 0;
  return (hits / 2) * 100;
}

export type AssessmentScores = {
  traitScores: Record<string, number>;
  builderScore: number;
  loyaltyScore: number;
  moneyOrientation: number;
  sjtScore: number;
};

// Same math as the original startup-builder assessment — see
// doc/builder-selection-strategy.md §5. No self-report: every trait is driven
// by hidden-key situational picks and the depth of hand-read written answers.
export function computeAssessmentScores(input: {
  sjtPicks: SJTPicks;
  driverPicks: DriverPicks;
  workSample: string;
  storyLearning: string;
  vision: string;
  noMoneyStory: string;
}): AssessmentScores {
  const { sjtPicks, driverPicks, workSample, storyLearning, vision, noMoneyStory } = input;

  const wsDepth = depth(countWords(workSample), 80);
  const slDepth = depth(countWords(storyLearning), 70);
  const viDepth = depth(countWords(vision), 55);
  const nmDepth = depth(countWords(noMoneyStory), 60);

  const traitScores: Record<string, number> = {};
  traitScores.ownership = clamp(0.32 * sjtTrait(sjtPicks, 's1') + 0.30 * sjtTrait(sjtPicks, 's4') + 0.25 * sjtTrait(sjtPicks, 's11') + 0.13 * wsDepth);
  traitScores.tolerance = clamp(0.55 * sjtTrait(sjtPicks, 's2') + 0.30 * sjtTrait(sjtPicks, 's1') + 0.15 * wsDepth);
  traitScores.ego       = clamp(0.40 * sjtTrait(sjtPicks, 's3') + 0.35 * sjtTrait(sjtPicks, 's5') + 0.25 * sjtTrait(sjtPicks, 's10'));
  traitScores.growth    = clamp(0.40 * sjtTrait(sjtPicks, 's10') + 0.30 * sjtTrait(sjtPicks, 's12') + 0.30 * slDepth);
  traitScores.drive     = clamp(0.45 * sjtTrait(sjtPicks, 's8') + 0.30 * viDepth + 0.25 * nmDepth);
  traitScores.ambition  = clamp(0.55 * sjtTrait(sjtPicks, 's9') + 0.30 * viDepth + 0.15 * sjtTrait(sjtPicks, 's10'));

  const mostBuild  = ['build', 'own', 'learn'].includes(driverPicks.most ?? '');
  const mostMoney  = driverPicks.most  === 'money';
  const leastMoney = driverPicks.least === 'money';
  const driverLoyalty = mostBuild ? 100 : mostMoney ? 0 : 55;
  const sjtLoyalty = (sjtTrait(sjtPicks, 's6') + sjtTrait(sjtPicks, 's7')) / 2;

  traitScores.loyalty = clamp(0.40 * sjtTrait(sjtPicks, 's6') + 0.40 * sjtTrait(sjtPicks, 's7') + 0.10 * driverLoyalty + 0.10 * nmDepth);
  const loyaltyScore = Math.round(traitScores.loyalty);

  let money = 50;
  money += (100 - sjtLoyalty) * 0.35;
  if (mostMoney) money += 22;
  if (leastMoney) money -= 22;
  if (driverPicks.most === 'comfort') money += 8;
  if (driverPicks.most === 'status') money += 6;
  money -= nmDepth * 0.12;
  const moneyOrientation = Math.round(clamp(money));

  let bs =
    0.18 * traitScores.ownership + 0.17 * traitScores.tolerance + 0.15 * traitScores.ego +
    0.14 * traitScores.growth    + 0.11 * traitScores.drive     + 0.11 * traitScores.ambition +
    0.14 * traitScores.loyalty;
  if (moneyOrientation >= 75) bs -= (moneyOrientation - 75) * 0.4;
  const builderScore = Math.round(clamp(bs));

  let sjtHits = 0;
  SJT.forEach(s => {
    const p = sjtPicks[s.key];
    if (!p) return;
    if (p.best === s.best) sjtHits++;
    if (p.worst === s.worst) sjtHits++;
  });
  const sjtScore = Math.round((sjtHits / (SJT.length * 2)) * 100);

  return { traitScores, builderScore, loyaltyScore, moneyOrientation, sjtScore };
}
