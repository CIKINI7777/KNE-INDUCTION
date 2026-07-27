import React, { useState, useRef } from "react";
import {
  HardHat,
  Calculator,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  User,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Siren,
  PhoneCall,
  Flame,
  MapPin,
  Users,
  Download,
  Share2,
  Home,
  Award,
  ClipboardList,
  Wrench,
  Glasses,
  Footprints,
  Hand,
  Ear,
  RotateCcw,
  Heart,
  Gauge,
} from "lucide-react";

/* ============================================================
   DATA STATIS
   ============================================================ */

const MODUL_APD = [
  { icon: HardHat, nama: "Helm Keselamatan (Safety Helmet)", ket: "Wajib SNI/ANSI, ganti tiap 3 tahun atau jika retak." },
  { icon: Footprints, nama: "Sepatu Safety (Steel Toe)", ket: "Melindungi kaki dari benturan, tusukan, dan tumpahan." },
  { icon: ShieldCheck, nama: "Rompi Reflektif", ket: "Wajib dipakai agar terlihat jelas oleh operator alat berat." },
  { icon: Glasses, nama: "Kacamata Safety", ket: "Melindungi mata dari debu, percikan, dan serpihan material." },
  { icon: Hand, nama: "Sarung Tangan Kerja", ket: "Disesuaikan dengan jenis pekerjaan (kimia, mekanik, listrik)." },
  { icon: Ear, nama: "Pelindung Telinga (Ear Plug/Muff)", ket: "Wajib di area dengan kebisingan di atas 85 dB." },
];

const LANGKAH_P2H = [
  "Periksa kondisi sekeliling unit sebelum menyalakan mesin (walk-around check).",
  "Periksa level oli mesin, air radiator, dan bahan bakar.",
  "Periksa kondisi ban/track, tekanan angin, dan keausan.",
  "Uji fungsi rem utama dan rem parkir sebelum unit bergerak.",
  "Periksa lampu, klakson, alarm mundur (reverse alarm), dan kaca spion.",
  "Pastikan APAR (Alat Pemadam Api Ringan) tersedia dan masih layak pakai.",
  "Catat seluruh hasil pemeriksaan pada Form P2H dan laporkan temuan ke atasan sebelum unit dioperasikan.",
];

const SKENARIO = {
  cerita:
    "Anda melihat bahu jalan tambang (safety berm) di tikungan tampak longsor sebagian akibat hujan semalam. Target ritase hari ini cukup ketat. Apa yang Anda lakukan?",
  opsi: [
    {
      teks: "Melapor ke petugas K3 dan menghentikan sementara jalur tersebut sebelum dilewati.",
      benar: true,
      feedback:
        "Tepat. Melapor dan menghentikan sementara adalah wujud amanah — mencegah bahaya lebih besar meski target sedikit tertunda.",
    },
    {
      teks: "Tetap melanjutkan karena 'biasanya juga aman' dan takut dianggap menghambat target.",
      benar: false,
      feedback:
        "Kurang tepat. Mengabaikan tanda bahaya demi target berisiko besar bagi keselamatan Anda dan rekan kerja lain.",
    },
    {
      teks: "Melintas pelan-pelan tanpa melapor, berharap tidak terjadi apa-apa.",
      benar: false,
      feedback:
        "Kurang tepat. Risiko yang diketahui namun tidak dilaporkan tetap menjadi bahaya laten bagi shift berikutnya.",
    },
  ],
};

const PROSEDUR_DARURAT = [
  {
    icon: Flame,
    judul: "Kebakaran",
    isi: "Aktifkan alarm, gunakan APAR sesuai metode PASS (Pull, Aim, Squeeze, Sweep) jika api masih kecil, dan segera menuju titik kumpul jika api membesar.",
  },
  {
    icon: AlertTriangle,
    judul: "Kecelakaan Kerja / Korban Cedera",
    isi: "Jangan panik, amankan area, hubungi tim medis melalui radio/HP darurat, jangan memindahkan korban kecuali ada bahaya lanjutan.",
  },
  {
    icon: MapPin,
    judul: "Evakuasi (Longsor/Gempa)",
    isi: "Tinggalkan area kerja menuju jalur evakuasi terdekat, ikuti rambu arah, dan berkumpul di titik kumpul (muster point) yang ditentukan.",
  },
  {
    icon: Users,
    judul: "Setelah Berkumpul",
    isi: "Petugas K3 akan melakukan penghitungan jumlah personel (roll call). Tetap di titik kumpul sampai ada instruksi resmi selanjutnya.",
  },
];

const NOMOR_DARURAT = [
  { label: "Pos K3 / HSE", nomor: "0800-1-K3-AMAN" },
  { label: "Klinik Site", nomor: "0800-1-MEDIS" },
  { label: "Security / Portir", nomor: "0800-1-SECURE" },
];

/* ============================================================
   KOMPONEN HEADER
   ============================================================ */

function Header({ progress, onHome, showBack, onBack }) {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 shrink-0">
          {showBack ? (
            <button
              onClick={onBack}
              className="w-11 h-11 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer border border-gray-200"
              aria-label="Kembali ke Dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          ) : (
            <button
              onClick={onHome}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FACC15] to-yellow-400 flex items-center justify-center shadow-md ring-2 ring-white cursor-pointer"
            >
              <HardHat className="w-6 h-6 text-gray-900" strokeWidth={2.2} />
            </button>
          )}
          <div className="hidden sm:block">
            <p className="text-xs text-gray-400 leading-none">Portal Keselamatan Digital</p>
            <p className="text-sm font-bold text-[#2563EB] leading-tight">PT. Kaltim Nusa Etika</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 min-w-[140px] sm:min-w-[220px]">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-semibold text-gray-700">Halo, Rekan Kerja!</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <User className="w-4 h-4 text-[#10B981]" />
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#10B981] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap w-9 text-right">{progress}%</span>
          </div>
          <span className="text-[11px] text-gray-400">Progres Induksi</span>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   HALAMAN: DASHBOARD
   ============================================================ */

function Dashboard({ progress, ikrarSubmitted, goTo }) {
  return (
    <div key="dashboard" className="animate-fade-in">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-16 sm:pb-10 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-50 border border-yellow-200 text-xs sm:text-sm font-semibold text-yellow-700 mb-5">
          Kerja Aman, Pulang dengan Selamat
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight max-w-3xl mx-auto">
          Selamat Datang di Portal Keselamatan Digital
        </h1>
        <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Keselamatan bukan sekadar aturan, melainkan{" "}
          <span className="text-gray-700 font-medium">amanah</span> untuk menjaga diri dan
          keluarga. Mari mulai perjalanan kerja aman kita hari ini.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* KARTU 1 */}
          <button
            onClick={() => goTo("induksi")}
            className="group relative text-left flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-[#FACC15] p-6 sm:p-7 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span className="absolute -top-3 left-6 bg-[#FACC15] text-gray-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
              {progress > 0 && progress < 100 ? "Lanjutkan" : progress === 100 ? "Selesai" : "Mulai di Sini"}
            </span>
            <p className="text-xs font-bold tracking-wide text-[#2563EB] mb-4 mt-1">PT. KALTIM NUSA ETIKA</p>
            <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center mb-5">
              <HardHat className="w-7 h-7 text-yellow-600" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Mulai Induksi K3</h3>
            <p className="text-sm text-gray-500 leading-relaxed flex-1">
              Pelajari prosedur keselamatan kerja dengan metode simulasi interaktif yang mudah
              dipahami. Wujudkan kerja aman sebagai bentuk tanggung jawab bersama.
            </p>
            <div className="mt-4 w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-[#10B981] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <span className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#FACC15] group-hover:bg-yellow-400 text-gray-900 font-semibold text-sm px-5 py-3 rounded-xl transition-colors duration-200">
              {progress > 0 && progress < 100 ? "Lanjutkan Modul" : progress === 100 ? "Ulas Kembali" : "Mulai Sekarang"}
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          {/* KARTU 2 */}
          <button
            onClick={() => goTo("kalkulator")}
            className="group text-left flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 sm:p-7 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5">
              <Calculator className="w-7 h-7 text-[#10B981]" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Kalkulator Matriks Risiko 5x5</h3>
            <p className="text-sm text-gray-500 leading-relaxed flex-1">
              Evaluasi potensi bahaya di area kerja Anda secara mandiri sebelum memulai tugas.
              Kenali risikonya, kendalikan bahayanya.
            </p>
            <span className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-white group-hover:bg-emerald-50 text-[#10B981] font-semibold text-sm px-5 py-3 rounded-xl border-2 border-[#10B981] transition-colors duration-200">
              Hitung Risiko
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          {/* KARTU 3 */}
          <button
            onClick={() => goTo("ikrar")}
            className="group text-left flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 sm:p-7 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
              <ShieldCheck className="w-7 h-7 text-[#2563EB]" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ikrar Amanah Digital</h3>
            <p className="text-sm text-gray-500 leading-relaxed flex-1">
              Komitmen pribadi untuk menjaga diri dan rekan kerja. Karena keselamatan adalah
              wujud cinta dan amanah, bukan sekadar kepatuhan.
            </p>
            <span className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-white group-hover:bg-blue-50 text-[#2563EB] font-semibold text-sm px-5 py-3 rounded-xl border-2 border-[#2563EB] transition-colors duration-200">
              {ikrarSubmitted ? "Lihat Sertifikat" : "Buat Ikrar"}
              <ArrowRight className="w-4 h-4" />
            </span>
            {ikrarSubmitted && (
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#10B981]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Sudah ditandatangani
              </span>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   HALAMAN: INDUKSI K3 (5 MODUL)
   ============================================================ */

function InduksiPage({ moduleIndex, setModuleIndex, maxReached, setMaxReached, onSelesai }) {
  const [jawaban, setJawaban] = useState(null);

  const totalModul = 5;
  const isLast = moduleIndex === totalModul - 1;
  const bisaLanjut = moduleIndex !== 3 || jawaban !== null; // modul 4 (index 3) butuh jawaban dulu

  const handleNext = () => {
    if (isLast) {
      onSelesai();
      return;
    }
    const next = moduleIndex + 1;
    setModuleIndex(next);
    setMaxReached((prev) => Math.max(prev, next));
    setJawaban(null);
  };

  const handlePrev = () => {
    setModuleIndex(Math.max(0, moduleIndex - 1));
    setJawaban(null);
  };

  return (
    <div key={`induksi-${moduleIndex}`} className="animate-fade-in max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-6">
        {Array.from({ length: totalModul }).map((_, i) => (
          <div key={i} className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                i < moduleIndex || i <= maxReached
                  ? "bg-[#10B981] text-white"
                  : i === moduleIndex
                  ? "bg-[#FACC15] text-gray-900"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i < moduleIndex || i < maxReached ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            {i < totalModul - 1 && (
              <div className={`h-1 flex-1 mx-1 rounded-full ${i < moduleIndex || i < maxReached ? "bg-[#10B981]" : "bg-gray-100"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {moduleIndex === 0 && (
          <>
            <Badge icon={ShieldCheck} label="Modul 1 dari 5" />
            <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-4">Pengenalan K3 & Nilai Amanah</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>
                Keselamatan dan Kesehatan Kerja (K3) adalah upaya bersama untuk melindungi
                setiap pekerja dari risiko cedera, penyakit akibat kerja, hingga kehilangan
                nyawa. Di lingkungan tambang, risiko yang dihadapi jauh lebih besar dibanding
                pekerjaan pada umumnya — mulai dari alat berat, area terbuka, hingga cuaca
                yang berubah-ubah.
              </p>
              <p>
                Namun lebih dari sekadar aturan tertulis, keselamatan kerja adalah bentuk{" "}
                <span className="font-semibold text-gray-800">amanah</span> — kepercayaan yang
                dititipkan oleh keluarga yang menunggu di rumah, oleh rekan kerja yang bekerja
                berdampingan dengan kita, dan oleh perusahaan yang mempercayakan tugas kepada
                kita.
              </p>
              <p>
                Setiap prosedur K3 yang kita jalankan bukan untuk mempersulit pekerjaan,
                melainkan untuk memastikan setiap orang yang berangkat kerja pagi ini, pulang
                dengan selamat ke rumahnya masing-masing sore atau malam harinya.
              </p>
            </div>
          </>
        )}

        {moduleIndex === 1 && (
          <>
            <Badge icon={HardHat} label="Modul 2 dari 5" />
            <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-4">APD Wajib di Tambang</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-5">
              Alat Pelindung Diri (APD) adalah perlengkapan minimum yang wajib digunakan setiap
              saat berada di area kerja tambang. Kenali fungsi masing-masing berikut ini:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MODUL_APD.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center shrink-0">
                    <item.icon className="w-4.5 h-4.5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.nama}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.ket}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {moduleIndex === 2 && (
          <>
            <Badge icon={Wrench} label="Modul 3 dari 5" />
            <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-4">Prosedur P2H Alat Berat</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-5">
              P2H (Pemeriksaan sebelum Pengoperasian) wajib dilakukan setiap operator sebelum
              menyalakan unit. Ikuti langkah berikut secara berurutan:
            </p>
            <ol className="space-y-3">
              {LANGKAH_P2H.map((langkah, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-50 text-[#10B981] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm sm:text-base text-gray-600 leading-relaxed">{langkah}</span>
                </li>
              ))}
            </ol>
          </>
        )}

        {moduleIndex === 3 && (
          <>
            <Badge icon={AlertTriangle} label="Modul 4 dari 5 — Skenario Interaktif" />
            <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-4">Skenario Bahaya & Keputusan</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-5">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{SKENARIO.cerita}</p>
            </div>
            <div className="space-y-3">
              {SKENARIO.opsi.map((opsi, i) => {
                const dipilih = jawaban === i;
                return (
                  <button
                    key={i}
                    onClick={() => setJawaban(i)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      dipilih
                        ? opsi.benar
                          ? "border-[#10B981] bg-emerald-50"
                          : "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    {dipilih ? (
                      opsi.benar ? (
                        <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      )
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm sm:text-base text-gray-700">{opsi.teks}</span>
                  </button>
                );
              })}
            </div>
            {jawaban !== null && (
              <div
                className={`mt-4 p-4 rounded-xl text-sm sm:text-base leading-relaxed ${
                  SKENARIO.opsi[jawaban].benar
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-orange-50 text-orange-800 border border-orange-200"
                }`}
              >
                {SKENARIO.opsi[jawaban].feedback}
              </div>
            )}
          </>
        )}

        {moduleIndex === 4 && (
          <>
            <Badge icon={Siren} label="Modul 5 dari 5" />
            <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-4">Emergency Response</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-5">
              Ketahui langkah-langkah dasar tanggap darurat berikut agar Anda dapat bertindak
              tenang dan tepat dalam situasi kritis:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {PROSEDUR_DARURAT.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-4.5 h-4.5 text-red-500" />
                    <p className="text-sm font-bold text-gray-800">{item.judul}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.isi}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <PhoneCall className="w-4.5 h-4.5 text-[#2563EB]" />
                <p className="text-sm font-bold text-gray-800">Kontak Darurat</p>
              </div>
              <div className="space-y-1">
                {NOMOR_DARURAT.map((n, i) => (
                  <p key={i} className="text-xs sm:text-sm text-gray-600">
                    {n.label}: <span className="font-semibold text-gray-800">{n.nomor}</span>
                  </p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigasi */}
      <div className="flex items-center justify-between mt-6 gap-3">
        <button
          onClick={handlePrev}
          disabled={moduleIndex === 0}
          className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-3 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${
            moduleIndex === 0
              ? "bg-gray-50 text-gray-300 cursor-not-allowed"
              : "bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300"
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Sebelumnya
        </button>

        <button
          onClick={handleNext}
          disabled={!bisaLanjut}
          className={`inline-flex items-center gap-1.5 px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${
            !bisaLanjut
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : isLast
              ? "bg-[#10B981] hover:bg-emerald-600 text-white"
              : "bg-[#FACC15] hover:bg-yellow-400 text-gray-900"
          }`}
        >
          {isLast ? "Selesai" : "Selanjutnya"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Badge({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-xs font-semibold text-yellow-700">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

/* ============================================================
   HALAMAN: KALKULATOR MATRIKS RISIKO 5x5
   ============================================================ */

const LEVEL_KEMUNGKINAN = [
  { v: 1, label: "1 - Jarang Terjadi" },
  { v: 2, label: "2 - Kadang Terjadi" },
  { v: 3, label: "3 - Bisa Terjadi" },
  { v: 4, label: "4 - Sering Terjadi" },
  { v: 5, label: "5 - Hampir Pasti Terjadi" },
];

const LEVEL_KEPARAHAN = [
  { v: 1, label: "1 - Ringan (P3K)" },
  { v: 2, label: "2 - Sedang (Rawat Jalan)" },
  { v: 3, label: "3 - Berat (Rawat Inap)" },
  { v: 4, label: "4 - Sangat Berat (Cacat Permanen)" },
  { v: 5, label: "5 - Bencana (Fatal/Meninggal)" },
];

function getKategoriRisiko(skor) {
  if (skor <= 4)
    return {
      nama: "Rendah",
      warna: "bg-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      teks: "text-emerald-700",
      rekomendasi:
        "Risiko dapat diterima. Lanjutkan pekerjaan dengan pengawasan rutin dan tetap patuhi prosedur standar.",
    };
  if (skor <= 9)
    return {
      nama: "Sedang",
      warna: "bg-yellow-400",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      teks: "text-yellow-700",
      rekomendasi:
        "Perlu tindakan pengendalian tambahan (APD khusus, rambu peringatan, atau pengawasan berkala) sebelum melanjutkan pekerjaan.",
    };
  if (skor <= 15)
    return {
      nama: "Tinggi",
      warna: "bg-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-200",
      teks: "text-orange-700",
      rekomendasi:
        "Perlu tindakan segera. Laporkan ke supervisor/HSE, hentikan sementara pekerjaan jika pengendalian belum tersedia.",
    };
  return {
    nama: "Ekstrim",
    warna: "bg-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    teks: "text-red-700",
    rekomendasi:
      "STOP! Hentikan pekerjaan sekarang juga. Laporkan ke KTT/HSE dan lakukan pengendalian menyeluruh sebelum pekerjaan dilanjutkan.",
  };
}

function KalkulatorPage() {
  const [kemungkinan, setKemungkinan] = useState("");
  const [keparahan, setKeparahan] = useState("");
  const [hasil, setHasil] = useState(null);

  const handleHitung = () => {
    if (!kemungkinan || !keparahan) return;
    const skor = Number(kemungkinan) * Number(keparahan);
    setHasil({ skor, ...getKategoriRisiko(skor) });
  };

  const handleReset = () => {
    setKemungkinan("");
    setKeparahan("");
    setHasil(null);
  };

  return (
    <div key="kalkulator" className="animate-fade-in max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-7 h-7 text-[#10B981]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Kalkulator Matriks Risiko 5x5</h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Kenali risikonya, kendalikan bahayanya — evaluasi sebelum memulai pekerjaan.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Kemungkinan (Likelihood)</label>
          <select
            value={kemungkinan}
            onChange={(e) => setKemungkinan(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#10B981] focus:outline-none text-sm sm:text-base text-gray-700 cursor-pointer bg-white"
          >
            <option value="">Pilih tingkat kemungkinan...</option>
            {LEVEL_KEMUNGKINAN.map((l) => (
              <option key={l.v} value={l.v}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Keparahan (Severity)</label>
          <select
            value={keparahan}
            onChange={(e) => setKeparahan(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#10B981] focus:outline-none text-sm sm:text-base text-gray-700 cursor-pointer bg-white"
          >
            <option value="">Pilih tingkat keparahan...</option>
            {LEVEL_KEPARAHAN.map((l) => (
              <option key={l.v} value={l.v}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleHitung}
            disabled={!kemungkinan || !keparahan}
            className={`flex-1 inline-flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer ${
              !kemungkinan || !keparahan
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#10B981] hover:bg-emerald-600 text-white"
            }`}
          >
            <Gauge className="w-4 h-4" /> Hitung Risiko
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>

        {hasil && (
          <div className={`mt-2 rounded-2xl border-2 ${hasil.border} ${hasil.bg} p-5 sm:p-6 animate-fade-in`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Skor Risiko</p>
                <p className="text-3xl font-extrabold text-gray-900">
                  {kemungkinan} × {keparahan} = {hasil.skor}
                </p>
              </div>
              <span className={`inline-flex items-center gap-1.5 ${hasil.warna} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                Kategori {hasil.nama}
              </span>
            </div>
            <div>
              <p className={`text-xs font-bold ${hasil.teks} mb-1`}>Rekomendasi Tindakan:</p>
              <p className="text-sm text-gray-700 leading-relaxed">{hasil.rekomendasi}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   HALAMAN: IKRAR AMANAH DIGITAL
   ============================================================ */

function IkrarPage({ submitted, data, onSubmit, onReset }) {
  const [nama, setNama] = useState("");
  const [posisi, setPosisi] = useState("");
  const [setuju, setSetuju] = useState(false);
  const canvasRef = useRef(null);

  const handleTandaTangan = () => {
    if (!nama.trim() || !posisi.trim() || !setuju) return;
    const tanggal = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    onSubmit({ nama: nama.trim(), posisi: posisi.trim(), tanggal });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;
    const ctx = canvas.getContext("2d");
    const W = 1000;
    const H = 700;
    canvas.width = W;
    canvas.height = H;

    // background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);

    // border kuning
    ctx.strokeStyle = "#FACC15";
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, W - 40, H - 40);
    ctx.strokeStyle = "#10B981";
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    // header text
    ctx.textAlign = "center";
    ctx.fillStyle = "#2563EB";
    ctx.font = "bold 22px Arial";
    ctx.fillText("PT. KALTIM NUSA ETIKA", W / 2, 110);

    ctx.fillStyle = "#111827";
    ctx.font = "bold 40px Arial";
    ctx.fillText("SERTIFIKAT IKRAR AMANAH DIGITAL", W / 2, 170);

    ctx.fillStyle = "#6B7280";
    ctx.font = "18px Arial";
    ctx.fillText("Dengan ini menyatakan bahwa", W / 2, 230);

    // nama
    ctx.fillStyle = "#111827";
    ctx.font = "bold 46px Georgia";
    ctx.fillText(data.nama, W / 2, 310);

    // garis bawah nama
    ctx.strokeStyle = "#FACC15";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 220, 330);
    ctx.lineTo(W / 2 + 220, 330);
    ctx.stroke();

    ctx.fillStyle = "#374151";
    ctx.font = "20px Arial";
    ctx.fillText(data.posisi, W / 2, 365);

    ctx.fillStyle = "#6B7280";
    ctx.font = "16px Arial";
    const wrapLines = [
      "telah berkomitmen menjaga keselamatan diri, rekan kerja, dan",
      "lingkungan sebagai bentuk AMANAH dalam setiap aktivitas kerja",
      "di lingkungan pertambangan PT. Kaltim Nusa Etika.",
    ];
    wrapLines.forEach((line, i) => ctx.fillText(line, W / 2, 410 + i * 26));

    ctx.fillStyle = "#10B981";
    ctx.font = "bold 18px Arial";
    ctx.fillText("\u2713 Kerja Aman, Pulang dengan Selamat", W / 2, 520);

    ctx.fillStyle = "#9CA3AF";
    ctx.font = "16px Arial";
    ctx.fillText(`Ditandatangani secara digital pada ${data.tanggal}`, W / 2, 610);

    const link = document.createElement("a");
    link.download = `Sertifikat-Ikrar-Amanah-${data.nama.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleShareWA = () => {
    if (!data) return;
    const pesan = `Saya, ${data.nama} (${data.posisi}), telah menandatangani *Ikrar Amanah Keselamatan Kerja* di PT. Kaltim Nusa Etika pada ${data.tanggal}. Mari bersama menjaga keselamatan kerja sebagai amanah bersama! 🦺✅`;
    window.open(`https://wa.me/?text=${encodeURIComponent(pesan)}`, "_blank");
  };

  if (submitted && data) {
    return (
      <div key="sertifikat" className="animate-fade-in max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <canvas ref={canvasRef} className="hidden" />
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-4 border-[#FACC15] m-4 rounded-xl">
            <div className="border-2 border-[#10B981] m-2 rounded-lg p-6 sm:p-10 text-center">
              <p className="text-xs sm:text-sm font-bold text-[#2563EB] tracking-wide">PT. KALTIM NUSA ETIKA</p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">
                Sertifikat Ikrar Amanah Digital
              </h2>
              <div className="flex justify-center my-4">
                <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center">
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <p className="text-sm text-gray-500">Dengan ini menyatakan bahwa</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 my-2 font-serif border-b-2 border-yellow-300 inline-block pb-1 px-4">
                {data.nama}
              </p>
              <p className="text-sm text-gray-600 mb-4">{data.posisi}</p>
              <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
                telah berkomitmen menjaga keselamatan diri, rekan kerja, dan lingkungan sebagai
                bentuk <span className="font-semibold text-gray-700">amanah</span> dalam setiap
                aktivitas kerja di lingkungan pertambangan.
              </p>
              <p className="text-sm font-semibold text-[#10B981] mt-4 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Kerja Aman, Pulang dengan Selamat
              </p>
              <p className="text-xs text-gray-400 mt-4">
                Ditandatangani secara digital pada {data.tanggal}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FACC15] hover:bg-yellow-400 text-gray-900 font-semibold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download Sertifikat
          </button>
          <button
            onClick={handleShareWA}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-[#10B981] font-semibold text-sm px-5 py-3 rounded-xl border-2 border-[#10B981] transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" /> Share ke WhatsApp
          </button>
        </div>
        <button
          onClick={onReset}
          className="w-full mt-3 inline-flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 font-medium text-xs px-5 py-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Buat ikrar baru
        </button>
      </div>
    );
  }

  return (
    <div key="ikrar-form" className="animate-fade-in max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <Heart className="w-7 h-7 text-[#2563EB]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Ikrar Amanah Digital</h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Wujud komitmen pribadi Anda untuk menjaga diri dan rekan kerja.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Contoh: Rudianto Saputra"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2563EB] focus:outline-none text-sm sm:text-base text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Posisi / Jabatan</label>
          <input
            type="text"
            value={posisi}
            onChange={(e) => setPosisi(e.target.value)}
            placeholder="Contoh: Operator Dump Truck"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2563EB] focus:outline-none text-sm sm:text-base text-gray-700"
          />
        </div>

        <label className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 cursor-pointer">
          <input
            type="checkbox"
            checked={setuju}
            onChange={(e) => setSetuju(e.target.checked)}
            className="mt-1 w-4 h-4 accent-[#2563EB] cursor-pointer shrink-0"
          />
          <span className="text-sm text-gray-600 leading-relaxed">
            Saya berkomitmen untuk mematuhi seluruh prosedur keselamatan kerja, menggunakan APD
            dengan benar, saling mengingatkan sesama rekan kerja, dan menjadikan keselamatan
            sebagai amanah yang saya jaga setiap hari.
          </span>
        </label>

        <button
          onClick={handleTandaTangan}
          disabled={!nama.trim() || !posisi.trim() || !setuju}
          className={`w-full inline-flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3.5 rounded-xl transition-colors cursor-pointer ${
            !nama.trim() || !posisi.trim() || !setuju
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#2563EB] hover:bg-blue-700 text-white"
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Tandatangani Ikrar
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center">
        <p className="text-xs sm:text-sm text-gray-400">
          © 2026 Digital Safety Induction —{" "}
          <span className="text-[#2563EB] font-semibold">PT. Kaltim Nusa Etika</span>. Dibangun
          dengan pendekatan Humanistik & Nilai Amanah.
        </p>
      </div>
    </footer>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */

export default function DigitalSafetyInductionApp() {
  const [page, setPage] = useState("dashboard");
  const [moduleIndex, setModuleIndex] = useState(0);
  // -1 berarti belum ada modul yang pernah dibuka (progres 0%)
  const [maxReached, setMaxReached] = useState(-1);
  const [ikrarSubmitted, setIkrarSubmitted] = useState(false);
  const [ikrarData, setIkrarData] = useState(null);

  // Progres = jumlah modul yang sudah pernah dicapai / 5 modul
  const progress = maxReached < 0 ? 0 : Math.round(((maxReached + 1) / 5) * 100);

  const goTo = (target) => {
    // saat pertama kali membuka induksi, tandai modul 1 sudah "dibuka"
    if (target === "induksi" && maxReached < 0) setMaxReached(0);
    setPage(target);
  };
  const goHome = () => setPage("dashboard");

  const handleSelesaiInduksi = () => {
    setMaxReached(4);
    setPage("dashboard");
  };

  const handleSubmitIkrar = (data) => {
    setIkrarData(data);
    setIkrarSubmitted(true);
  };

  const handleResetIkrar = () => {
    setIkrarSubmitted(false);
    setIkrarData(null);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-800 flex flex-col">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.35s ease-out;
        }
      `}</style>

      <Header progress={progress} onHome={goHome} showBack={page !== "dashboard"} onBack={goHome} />

      <main className="flex-1">
        {page === "dashboard" && (
          <Dashboard progress={progress} ikrarSubmitted={ikrarSubmitted} goTo={goTo} />
        )}

        {page === "induksi" && (
          <InduksiPage
            moduleIndex={moduleIndex}
            setModuleIndex={setModuleIndex}
            maxReached={maxReached}
            setMaxReached={setMaxReached}
            onSelesai={handleSelesaiInduksi}
          />
        )}

        {page === "kalkulator" && <KalkulatorPage />}

        {page === "ikrar" && (
          <IkrarPage
            submitted={ikrarSubmitted}
            data={ikrarData}
            onSubmit={handleSubmitIkrar}
            onReset={handleResetIkrar}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
