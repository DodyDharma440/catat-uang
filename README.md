# CATAT UANG - PROJECT WILDCARD PEMROGRAMAN MOBILE

![App screenshot](./assets/docs/app-screenshot.png)

## DESKRIPSI

Aplikasi Catat Uang adalah aplikasi sederhana berbasis mobile yang membantu pengguna mencatat pemasukan dan pengeluaran secara praktis. Pengguna dapat menambahkan transaksi keuangan harian dengan kategori, nominal, tanggal, dan catatan tambahan. Aplikasi ini juga dilengkapi fitur ringkasan keuangan bulanan untuk memantau balance, total pemasukan, dan total pengeluaran. Pengguna dapat memfilter transaksi berdasarkan bulan dan tanggal sehingga mudah dalam melakukan pengecekan riwayat keuangan. Aplikasi ini menggunakan Firebase Firestore sebagai basis data sehingga data pengguna tersimpan secara aman dan dapat diakses kapan saja.

## TECH STACK

- React Native
- Expo
- Firebase Auth
- Firebase Firestore

## FOLDER STRUCTURE

`.husky` <br>
Di dalam project ini saya memasang package `husky pre-commit` yang berguna untuk melakukan pengecekan sebelum commit. Yang saya cek adalah error dari TypeScript untuk memastikan agar sebelum dicommit tidak ada error dari TypeScript. Pengecekan dilakukan dengan command

```
yarn tsc
```

<br>

`.vscode` <br>
Folder ini berisi konfigurasi vscode sebagai text editor. Disini saya hanya menambahkan beberapa snippets custom, dengan menggunakan ekstensi file `.code-snippets` dan membuat snippets sesuai ketentuan dari vscode.

<br>

`assets` <br>
Folder untuk menyimpan assets yang bersifat public seperti gambar, icon, dan font

`src` <br>
Berisi seluruh source code dari project ini.

- `app`, Folder yang berisi semua route files dari `expo-router` <br>
- `common`, Folder untuk menyimpan code yang bersifat general dan yang akan digunakan berulang-ulang. <br>

  - `components`, Menyimpan file untuk UI
  - `configs`, Berisi file konfigurasi seperti theme, dan toast
  - `constants`, Menyimpan file yang berisi variable yang tetap
  - `declarations`, Berisi file TypeScript declaration dengan ekstensi `.d.ts`, untuk melakukan definisi types dari package yang dipakai dari npm secara custom.
  - `hocs`, Hoc adalah singkatan dari higher order components. Jadi folder ini menyimpan file hoc yang bersifat global.
  - `hooks`, Menyimpan code untuk custom react hooks.
  - `interfaces`, Menyimpan types dan interfaces.
  - `utils`, Berisi utility functions yang sering digunakan.

- `modules`, Folder yang berisi sub-folder didalamnya berupa folder-folder per fitur. Di dalam fitur, ada folder yang sudah terstruktur yaitu:
  - `components`, Menyimpan code yang berisi UI.
  - `constants`, Menyimpan variable yang bersifat tetap
  - `hooks`, Menyimpan react hooks
  - `interfaces`, Menyimpan types dan interfaces
  - `contexts` (optional), Menyimpan konfigurasi react context untuk case-case tertentu.
  - `utils` (optional), Berisi utility function yang khusus untuk fitur tersebut.

<br>

`.env.example` <br>
File contoh isian dari env variables <br>

`.gitignore` <br>
File untuk ignore push ke git <br>

`app.json` <br>
Konfigurasi expo app <br>

`eas.json` <br>
Konfigurasi EAS sebagai tools untuk melakukan build <br>

`eslint.config.mjs` <br>
File konfigurasi eslint <br>

`firebaseConfig.ts` <br>
Konfigurasi dan inisiasi firebase auth dan firebase firestore <br>

`metro.config.js` <br>
Konfigurasi metro bundler, bawaan React Native ketika init project <br>

`package.json` <br>
File yang selalu ada di setiap project menggunakan node js. Dapat berisi informasi penting tentang project ini serta daftar packages dan script npm yang digunakan.

`README.md` <br>
File dokumentasi project

`tsconfig.json` <br>
File konfigurasi TypeScript

`yarn.lock` <br>
Auto generated lockfile. File ini adalah hasil generate setelah melakukan instalasi dependencies

## RUN THIS PROJECT

### Pre requisite

Pastikan di laptop/komputernya sudah terinstall Node.js v20 keatas.
Adapun extension vscode yang perlu diinstall adalah

- Prettier (required)
- Eslint (required)
- Error lens (optional)
- Auto rename tag (optional)

### Setup environment variables

Buat file `.env` di root directory. Contoh isian file env ini dapat dilihat dari file `.env.example`

### Install dependencies

Install dependencies boleh menggunakan `yarn` atau `npm`, namun saya lebih prefer menggunakan `yarn`.

```
yarn
```

atau dengan npm

```
npm install
```

#### Jalankan expo app

```
yarn start
```

Kemudian lanjutkan menggunakan aplikasi sesuai dengan fitur-fitur yang tersedia
