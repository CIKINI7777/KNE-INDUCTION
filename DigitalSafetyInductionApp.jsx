<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Safety Induction - PT. Kaltim Nusa Etika</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { font-family: 'Inter', sans-serif; }
        body { background: #f8fafc; }
        .fade-in { animation: fadeIn 0.4s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .slide-in { animation: slideIn 0.4s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .progress-fill { transition: width 0.5s ease; }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .btn-primary { background: linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%); transition: all 0.3s; }
        .btn-primary:hover { transform: scale(1.02); box-shadow: 0 10px 25px rgba(37,99,235,0.4); }
        .btn-accent { background: linear-gradient(135deg, #FACC15 0%, #eab308 100%); color: #1e293b; transition: all 0.3s; }
        .btn-accent:hover { transform: scale(1.02); box-shadow: 0 10px 25px rgba(250,204,21,0.4); }
        .quiz-option { transition: all 0.2s; cursor: pointer; }
        .quiz-option:hover { background: #eff6ff; transform: translateX(4px); }
        .quiz-option.correct { background: #d1fae5; border-color: #10B981; }
        .quiz-option.wrong { background: #fee2e2; border-color: #EF4444; }
        .risk-low { background: #10B981; color: white; }
        .risk-medium { background: #FACC15; color: #1e293b; }
        .risk-high { background: #F97316; color: white; }
        .risk-critical { background: #EF4444; color: white; }
        .hidden-section { display: none; }
        .active-section { display: block; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    </style>
</head>
<body>
    <div id="app">
        <header class="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
            <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div class="flex items-center space-x-3 cursor-pointer" onclick="showHome()">
                    <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span class="text-2xl">⛑️</span>
                    </div>
                    <div>
                        <p class="text-xs text-blue-200">Portal Keselamatan Digital</p>
                        <h1 class="text-lg font-bold">PT. Kaltim Nusa Etika</h1>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-sm font-semibold">Halo, Rekan Kerja!</p>
                    <div class="flex items-center space-x-2 mt-1">
                        <div class="w-24 bg-white/20 rounded-full h-2">
                            <div id="progressBar" class="bg-yellow-400 h-2 rounded-full progress-fill" style="width: 0%"></div>
                        </div>
                        <span id="progressText" class="text-sm font-bold">0%</span>
                    </div>
                </div>
            </div>
        </header>

        <main class="max-w-6xl mx-auto px-4 py-8">
            <section id="homePage" class="active-section fade-in">
                <div class="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white mb-8 shadow-xl">
                    <div class="flex items-center space-x-2 mb-4">
                        <span class="text-2xl">🛡️</span>
                        <span class="font-semibold text-blue-100">SAFETY IS OUR AMANAH</span>
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">Selamat Datang di Portal Keselamatan Digital</h2>
                    <p class="text-blue-100 text-lg">Keselamatan bukan sekadar aturan, melainkan <strong>amanah</strong> untuk menjaga diri dan keluarga. Mari mulai perjalanan kerja aman kita hari ini.</p>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-white rounded-2xl p-6 shadow-lg card-hover cursor-pointer" onclick="showModules()">
                        <div class="flex items-start space-x-4">
                            <div class="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center">
                                <span class="text-2xl">📚</span>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Mulai Induksi K3</h3>
                                <p class="text-gray-600 text-sm mb-3">5 modul wajib: nilai amanah, APD, P2H, skenario bahaya, dan tanggap darurat.</p>
                                <span id="moduleStatus" class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">0/5 modul selesai</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-6 shadow-lg card-hover cursor-pointer" onclick="showRiskCalculator()">
                        <div class="flex items-start space-x-4">
                            <div class="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                                <span class="text-2xl">🧮</span>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Kalkulator Risiko 5x5</h3>
                                <p class="text-gray-600 text-sm mb-3">Hitung tingkat risiko dari kemungkinan dan keparahan, lengkap dengan rekomendasi.</p>
                                <span class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Alat bantu penilaian</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-6 shadow-lg card-hover cursor-pointer md:col-span-2" onclick="showIkrar()">
                        <div class="flex items-start space-x-4">
                            <div class="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center text-white">
                                <span class="text-2xl">❤️</span>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Ikrar Amanah Digital</h3>
                                <p class="text-gray-600 text-sm mb-3">Tandatangani komitmen keselamatan dan dapatkan sertifikat digital.</p>
                                <div class="flex space-x-2">
                                    <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Sertifikat Digital</span>
                                    <span class="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">Share WhatsApp</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-8 text-center text-gray-500 text-sm">
                    <p>💡 Keselamatan bukan sekadar aturan, melainkan <strong>amanah</strong> untuk menjaga diri dan keluarga.</p>
                </div>
            </section>

            <section id="modulesPage" class="hidden-section">
                <button onclick="showHome()" class="text-blue-600 hover:text-blue-800 mb-4 font-semibold">← Kembali ke Dashboard</button>
                <div class="mb-6">
                    <h2 class="text-3xl font-bold text-gray-800">Modul Induksi K3</h2>
                    <p class="text-gray-600">Selesaikan semua modul untuk menyelesaikan induksi</p>
                </div>
                <div id="moduleList" class="space-y-4 mb-6"></div>
                <div id="moduleContent" class="bg-white rounded-2xl p-6 md:p-8 shadow-lg hidden-section"></div>
            </section>

            <section id="riskPage" class="hidden-section">
                <button onclick="showHome()" class="text-blue-600 hover:text-blue-800 mb-4 font-semibold">← Kembali ke Dashboard</button>
                <div class="bg-white rounded-2xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto">
                    <h2 class="text-3xl font-bold text-gray-800 mb-2">Kalkulator Risiko 5x5</h2>
                    <p class="text-gray-600 mb-6">Hitung tingkat risiko berdasarkan kemungkinan dan keparahan</p>
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Kemungkinan Terjadi (Likelihood)</label>
                            <select id="likelihood" class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
                                <option value="1">1 - Hampir Tidak Mungkin</option>
                                <option value="2">2 - Jarang Terjadi</option>
                                <option value="3">3 - Kadang-kadang</option>
                                <option value="4">4 - Sering Terjadi</option>
                                <option value="5">5 - Hampir Pasti Terjadi</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Keparahan Dampak (Severity)</label>
                            <select id="severity" class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
                                <option value="1">1 - Tidak Berarti</option>
                                <option value="2">2 - Minor</option>
                                <option value="3">3 - Sedang</option>
                                <option value="4">4 - Mayor</option>
                                <option value="5">5 - Katastropik</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <button onclick="calculateRisk()" class="btn-primary text-white font-bold py-4 rounded-lg text-lg">Hitung Risiko</button>
                            <button onclick="resetRisk()" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 rounded-lg text-lg">Reset</button>
                        </div>
                        <div id="riskResult" class="hidden-section rounded-xl p-6 text-center"></div>
                    </div>
                </div>
            </section>

            <section id="ikrarPage" class="hidden-section">
                <button onclick="showHome()" class="text-blue-600 hover:text-blue-800 mb-4 font-semibold">← Kembali ke Dashboard</button>
                <div class="bg-white rounded-2xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto">
                    <div id="ikrarForm">
                        <h2 class="text-3xl font-bold text-gray-800 mb-2">Ikrar Amanah Digital</h2>
                        <p class="text-gray-600 mb-6">Tandatangani komitmen keselamatan kerja Anda</p>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                                <input type="text" id="userName" class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Masukkan nama lengkap">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">NRP / NIP</label>
                                <input type="text" id="userNRP" class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Masukkan NRP/NIP">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Posisi/Jabatan</label>
                                <input type="text" id="userPosition" class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Masukkan posisi/jabatan">
                            </div>
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <label class="flex items-start space-x-3 cursor-pointer">
                                    <input type="checkbox" id="userCommitment" class="mt-1 w-5 h-5 text-blue-600 rounded">
                                    <span class="text-sm text-gray-700">Saya berkomitmen untuk selalu mematuhi seluruh prosedur keselamatan kerja, menggunakan APD dengan benar, dan menjaga keselamatan diri serta rekan kerja.</span>
                                </label>
                            </div>
                            <button id="btnSignIkrar" onclick="signIkrar()" class="btn-accent w-full font-bold py-4 rounded-lg text-lg btn">Tandatangan Ikrar</button>
                        </div>
                    </div>

                    <div id="certificateSection" class="hidden-section">
                        <div class="text-center mb-6">
                            <div class="text-6xl mb-4">🎉</div>
                            <h3 class="text-2xl font-bold text-gray-800">Selamat!</h3>
                            <p class="text-gray-600">Ikrar Anda telah ditandatangani. Berikut sertifikat digital Anda:</p>
                        </div>
                        <canvas id="certificateCanvas" class="w-full rounded-lg shadow-lg mb-4"></canvas>
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <button onclick="downloadCertificate()" class="btn-primary text-white font-bold py-3 rounded-lg">⬇️ Download PNG</button>
                            <button onclick="shareWhatsApp()" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg">📱 Share WhatsApp</button>
                        </div>

                        <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
                            <h4 class="text-xl font-bold mb-2">✅ Data Otomatis Tersimpan!</h4>
                            <p class="text-sm mb-4">Nama dan data Anda telah tercatat di sistem. Silakan buka formulir konfirmasi untuk melengkapi data resmi.</p>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSd3bxfdzJtl1wKhBiUpdyHx1heV-1NJdqlH6CX8YzbT5Ci3Lg/viewform?usp=header" 
                               target="_blank" 
                               class="inline-block bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-yellow-300 transition">
                                Buka Formulir Konfirmasi →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class="text-center py-6 text-gray-500 text-sm">
            <p>© 2026 PT. Kaltim Nusa Etika - Portal Keselamatan Digital</p>
            <p class="mt-1">Kerja Aman, Pulang dengan Selamat</p>
        </footer>
    </div>

    <script>
        const modules = [
            {
                id: 1, title: "Nilai Amanah Keselamatan", icon: "🎯",
                content: `<h3 class="text-2xl font-bold mb-4">Nilai Amanah Keselamatan</h3>
                    <p class="mb-4">Keselamatan kerja adalah <strong>amanah</strong> yang harus dijaga oleh setiap pekerja. Di PT. Kaltim Nusa Etika, kami percaya bahwa:</p>
                    <ul class="list-disc pl-6 space-y-2 mb-4">
                        <li>Setiap pekerja berhak pulang dengan selamat</li>
                        <li>Keselamatan adalah tanggung jawab bersama</li>
                        <li>Tidak ada pekerjaan yang mendesak hingga mengabaikan keselamatan</li>
                        <li>Setiap kecelakaan dapat dicegah</li>
                    </ul>
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                        <p class="font-semibold">Prinsip Utama:</p>
                        <p>"Safety First, Production Second"</p>
                    </div>`
            },
            {
                id: 2, title: "Alat Pelindung Diri (APD)", icon: "🦺",
                content: `<h3 class="text-2xl font-bold mb-4">Alat Pelindung Diri (APD)</h3>
                    <p class="mb-4">APD adalah peralatan yang wajib digunakan untuk melindungi diri dari bahaya di tempat kerja.</p>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="bg-blue-50 p-4 rounded-lg"><div class="text-3xl mb-2">️</div><p class="font-semibold">Helm Safety</p><p class="text-sm text-gray-600">Melindungi kepala dari benturan</p></div>
                        <div class="bg-blue-50 p-4 rounded-lg"><div class="text-3xl mb-2">🥽</div><p class="font-semibold">Kacamata Safety</p><p class="text-sm text-gray-600">Melindungi mata dari debu/spatter</p></div>
                        <div class="bg-blue-50 p-4 rounded-lg"><div class="text-3xl mb-2">🧤</div><p class="font-semibold">Sarung Tangan</p><p class="text-sm text-gray-600">Melindungi tangan dari luka</p></div>
                        <div class="bg-blue-50 p-4 rounded-lg"><div class="text-3xl mb-2">👢</div><p class="font-semibold">Safety Boots</p><p class="text-sm text-gray-600">Melindungi kaki dari benda tajam</p></div>
                    </div>
                    <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                        <p class="font-semibold text-red-700">⚠️ Penting:</p>
                        <p class="text-red-700">Wajib menggunakan APD lengkap sebelum memasuki area kerja!</p>
                    </div>`
            },
            {
                id: 3, title: "Pemeriksaan Sebelum Bekerja (P2H)", icon: "🔍",
                content: `<h3 class="text-2xl font-bold mb-4">Pemeriksaan Sebelum Bekerja (P2H)</h3>
                    <p class="mb-4">P2H adalah pemeriksaan harian yang wajib dilakukan sebelum memulai pekerjaan untuk memastikan kondisi aman.</p>
                    <div class="space-y-3 mb-4">
                        <div class="flex items-start space-x-3 bg-green-50 p-3 rounded-lg"><span class="text-2xl">✅</span><div><p class="font-semibold">Cek Kondisi Alat</p><p class="text-sm text-gray-600">Pastikan semua alat dalam kondisi baik</p></div></div>
                        <div class="flex items-start space-x-3 bg-green-50 p-3 rounded-lg"><span class="text-2xl">✅</span><div><p class="font-semibold">Cek Area Kerja</p><p class="text-sm text-gray-600">Identifikasi potensi bahaya di sekitar</p></div></div>
                        <div class="flex items-start space-x-3 bg-green-50 p-3 rounded-lg"><span class="text-2xl">✅</span><div><p class="font-semibold">Cek APD</p><p class="text-sm text-gray-600">Pastikan APD lengkap dan berfungsi</p></div></div>
                        <div class="flex items-start space-x-3 bg-green-50 p-3 rounded-lg"><span class="text-2xl">✅</span><div><p class="font-semibold">Cek Kesehatan Diri</p><p class="text-sm text-gray-600">Pastikan kondisi fisik prima</p></div></div>
                    </div>`
            },
            {
                id: 4, title: "Skenario Bahaya", icon: "⚠️",
                content: `<h3 class="text-2xl font-bold mb-4">Skenario Bahaya</h3>
                    <p class="mb-4">Kenali potensi bahaya di area kerja tambang:</p>
                    <div class="space-y-3 mb-6">
                        <div class="bg-orange-50 border-l-4 border-orange-400 p-4 rounded"><p class="font-semibold">️ Bahaya Longsor</p><p class="text-sm">Waspadai dinding tambang yang tidak stabil</p></div>
                        <div class="bg-orange-50 border-l-4 border-orange-400 p-4 rounded"><p class="font-semibold">🚗 Bahaya Kendaraan</p><p class="text-sm">Perhatikan blind spot alat berat</p></div>
                        <div class="bg-orange-50 border-l-4 border-orange-400 p-4 rounded"><p class="font-semibold">⚡ Bahaya Listrik</p><p class="text-sm">Hindari kontak dengan kabel listrik</p></div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg mb-4">
                        <p class="font-bold mb-2">📝 Kuis: Apa yang harus dilakukan jika melihat kondisi tidak aman?</p>
                        <div class="space-y-2">
                            <div class="quiz-option border-2 border-gray-200 p-3 rounded-lg" onclick="checkAnswer(this, false)">A. Melanjutkan pekerjaan dengan hati-hati</div>
                            <div class="quiz-option border-2 border-gray-200 p-3 rounded-lg" onclick="checkAnswer(this, true)">B. Berhenti bekerja dan laporkan ke supervisor</div>
                            <div class="quiz-option border-2 border-gray-200 p-3 rounded-lg" onclick="checkAnswer(this, false)">C. Mengabaikan dan bekerja seperti biasa</div>
                        </div>
                        <div id="quizFeedback" class="mt-3 hidden-section"></div>
                    </div>`
            },
            {
                id: 5, title: "Tanggap Darurat", icon: "🚨",
                content: `<h3 class="text-2xl font-bold mb-4">Tanggap Darurat</h3>
                    <p class="mb-4">Prosedur yang harus dilakukan saat terjadi keadaan darurat:</p>
                    <div class="space-y-3 mb-4">
                        <div class="flex items-center space-x-3 bg-red-50 p-4 rounded-lg"><div class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">1</div><div><p class="font-semibold">Tetap Tenang</p><p class="text-sm text-gray-600">Jangan panik, pikirkan dengan jernih</p></div></div>
                        <div class="flex items-center space-x-3 bg-red-50 p-4 rounded-lg"><div class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">2</div><div><p class="font-semibold">Aktifkan Alarm</p><p class="text-sm text-gray-600">Tekan tombol emergency atau teriak minta tolong</p></div></div>
                        <div class="flex items-center space-x-3 bg-red-50 p-4 rounded-lg"><div class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">3</div><div><p class="font-semibold">Evakuasi</p><p class="text-sm text-gray-600">Ikuti jalur evakuasi ke assembly point</p></div></div>
                        <div class="flex items-center space-x-3 bg-red-50 p-4 rounded-lg"><div class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">4</div><div><p class="font-semibold">Lapor ke Supervisor</p><p class="text-sm text-gray-600">Berikan informasi lengkap tentang kejadian</p></div></div>
                    </div>
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                        <p class="font-semibold">📞 Nomor Darurat:</p>
                        <p>Emergency Response: <strong>119</strong></p>
                        <p>Medical Team: <strong>118</strong></p>
                    </div>`
            }
        ];

        let currentModule = null;
        let completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');

        function showHome() { hideAll(); document.getElementById('homePage').classList.remove('hidden-section'); document.getElementById('homePage').classList.add('active-section'); updateProgress(); }
        function showModules() { hideAll(); document.getElementById('modulesPage').classList.remove('hidden-section'); document.getElementById('modulesPage').classList.add('active-section'); renderModuleList(); }
        function showRiskCalculator() { hideAll(); document.getElementById('riskPage').classList.remove('hidden-section'); document.getElementById('riskPage').classList.add('active-section'); }
        function showIkrar() { hideAll(); document.getElementById('ikrarPage').classList.remove('hidden-section'); document.getElementById('ikrarPage').classList.add('active-section'); }
        function hideAll() { document.querySelectorAll('section').forEach(s => { s.classList.remove('active-section'); s.classList.add('hidden-section'); }); }

        function renderModuleList() {
            const list = document.getElementById('moduleList');
            list.innerHTML = modules.map((m, i) => `
                <div class="bg-white p-4 rounded-lg shadow cursor-pointer ${completedModules.includes(m.id) ? 'border-l-4 border-green-500 bg-green-50' : 'border-l-4 border-blue-500'}" onclick="openModule(${i})">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <span class="text-2xl">${m.icon}</span>
                            <div>
                                <h4 class="font-bold text-gray-800">Modul ${m.id}: ${m.title}</h4>
                                <p class="text-sm text-gray-600">${completedModules.includes(m.id) ? '✅ Selesai' : 'Klik untuk mulai'}</p>
                            </div>
                        </div>
                        <span class="text-gray-400">→</span>
                    </div>
                </div>
            `).join('');
        }

        function openModule(index) {
            currentModule = index;
            const m = modules[index];
            const content = document.getElementById('moduleContent');
            content.classList.remove('hidden-section');
            content.classList.add('active-section');
            content.innerHTML = `
                ${m.content}
                <div class="flex justify-between mt-6">
                    <button onclick="prevModule()" class="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 ${index === 0 ? 'invisible' : ''}">← Sebelumnya</button>
                    <button onclick="completeModule()" class="btn-primary text-white px-6 py-3 rounded-lg font-semibold">
                        ${completedModules.includes(m.id) ? '✓ Selesai' : 'Tandai Selesai →'}
                    </button>
                </div>
            `;
            content.scrollIntoView({ behavior: 'smooth' });
        }

        function prevModule() { if (currentModule > 0) openModule(currentModule - 1); }

        function completeModule() {
            const m = modules[currentModule];
            if (!completedModules.includes(m.id)) {
                completedModules.push(m.id);
                localStorage.setItem('completedModules', JSON.stringify(completedModules));
            }
            updateProgress();
            renderModuleList();
            if (currentModule < modules.length - 1) {
                openModule(currentModule + 1);
            } else {
                alert('🎉 Selamat! Semua modul telah diselesaikan!');
                showModules();
            }
        }

        function checkAnswer(element, isCorrect) {
            const feedback = document.getElementById('quizFeedback');
            document.querySelectorAll('.quiz-option').forEach(opt => { opt.classList.remove('correct', 'wrong'); opt.onclick = null; });
            if (isCorrect) {
                element.classList.add('correct');
                feedback.innerHTML = '<div class="bg-green-100 text-green-700 p-3 rounded-lg">✅ Benar! Selalu laporkan kondisi tidak aman ke supervisor.</div>';
            } else {
                element.classList.add('wrong');
                feedback.innerHTML = '<div class="bg-red-100 text-red-700 p-3 rounded-lg">❌ Kurang tepat. Jawaban yang benar adalah B.</div>';
            }
            feedback.classList.remove('hidden-section');
        }

        function updateProgress() {
            const progress = (completedModules.length / modules.length) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('progressText').textContent = Math.round(progress) + '%';
            document.getElementById('moduleStatus').textContent = completedModules.length + '/5 modul selesai';
        }

        function calculateRisk() {
            const likelihood = parseInt(document.getElementById('likelihood').value);
            const severity = parseInt(document.getElementById('severity').value);
            const score = likelihood * severity;
            let category, recommendation, colorClass;
            if (score <= 6) { category = 'RISIKO RENDAH'; recommendation = 'Dapat diterima. Lanjutkan pekerjaan dengan pengawasan rutin.'; colorClass = 'risk-low'; }
            else if (score <= 12) { category = 'RISIKO SEDANG'; recommendation = 'Perlu tindakan pengendalian. Lakukan mitigasi sebelum bekerja.'; colorClass = 'risk-medium'; }
            else if (score <= 20) { category = 'RISIKO TINGGI'; recommendation = 'Tindakan pengendalian mendesak diperlukan. Pekerjaan hanya dengan izin khusus.'; colorClass = 'risk-high'; }
            else { category = 'RISIKO KRITIS'; recommendation = 'STOP! Pekerjaan tidak boleh dilanjutkan tanpa tindakan pengendalian penuh.'; colorClass = 'risk-critical'; }
            const result = document.getElementById('riskResult');
            result.classList.remove('hidden-section');
            result.className = `rounded-xl p-6 text-center ${colorClass} fade-in`;
            result.innerHTML = `<div class="text-6xl font-bold mb-2">${score}</div><div class="text-xl font-semibold mb-2">${category}</div><div class="text-sm opacity-90">${recommendation}</div>`;
        }

        function resetRisk() {
            document.getElementById('likelihood').value = 1;
            document.getElementById('severity').value = 1;
            document.getElementById('riskResult').classList.add('hidden-section');
        }

        function signIkrar() {
            const name = document.getElementById('userName').value.trim();
            const nrp = document.getElementById('userNRP').value.trim();
            const position = document.getElementById('userPosition').value.trim();
            const commitment = document.getElementById('userCommitment').checked;

            if (!name || !nrp || !position) {
                alert('Mohon lengkapi nama, NRP, dan posisi!');
                return;
            }
            if (!commitment) {
                alert('Mohon centang komitmen keselamatan!');
                return;
            }

            const btn = document.getElementById('btnSignIkrar');
            btn.innerText = '⏳ Memproses...';
            btn.disabled = true;

            setTimeout(() => {
                document.getElementById('ikrarForm').classList.add('hidden-section');
                document.getElementById('certificateSection').classList.remove('hidden-section');
                generateCertificate(name, position);
                btn.innerText = 'Tandatangan Ikrar';
                btn.disabled = false;
            }, 1000);
        }

        function generateCertificate(name, position) {
            const canvas = document.getElementById('certificateCanvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 800; canvas.height = 600;
            const gradient = ctx.createLinearGradient(0, 0, 800, 600);
            gradient.addColorStop(0, '#2563EB'); gradient.addColorStop(1, '#1e40af');
            ctx.fillStyle = gradient; ctx.fillRect(0, 0, 800, 600);
            ctx.strokeStyle = '#FACC15'; ctx.lineWidth = 8; ctx.strokeRect(20, 20, 760, 560);
            ctx.fillStyle = '#FACC15'; ctx.font = 'bold 36px Inter'; ctx.textAlign = 'center';
            ctx.fillText('SERTIFIKAT IKRAR AMANAH', 400, 100);
            ctx.fillStyle = 'white'; ctx.font = '24px Inter'; ctx.fillText('PT. KALTIM NUSA ETIKA', 400, 150);
            ctx.font = '20px Inter'; ctx.fillText('Dengan ini menyatakan bahwa:', 400, 220);
            ctx.font = 'bold 32px Inter'; ctx.fillStyle = '#FACC15'; ctx.fillText(name, 400, 280);
            ctx.fillStyle = 'white'; ctx.font = '20px Inter'; ctx.fillText(position, 400, 320);
            ctx.font = '18px Inter'; ctx.fillText('telah menyelesaikan Induksi Keselamatan Digital', 400, 380);
            ctx.fillText('dan berkomitmen untuk selalu mematuhi prosedur K3.', 400, 410);
            const date = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
            ctx.font = '16px Inter'; ctx.fillText('Ditandatangani pada: ' + date, 400, 470);
            ctx.fillStyle = '#FACC15'; ctx.font = 'bold 18px Inter'; ctx.fillText('Kerja Aman, Pulang dengan Selamat', 400, 540);
        }

        function downloadCertificate() {
            const canvas = document.getElementById('certificateCanvas');
            const link = document.createElement('a');
            link.download = 'Sertifikat-Ikrar-Amanah.png';
            link.href = canvas.toDataURL();
            link.click();
        }

        function shareWhatsApp() {
            const name = document.getElementById('userName').value;
            const message = `Saya ${name} telah menyelesaikan Induksi Keselamatan Digital PT. Kaltim Nusa Etika dan menandatangani Ikrar Amanah. Kerja Aman, Pulang dengan Selamat! ️`;
            window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        }

        updateProgress();
    </script>
</body>
</html>
