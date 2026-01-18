# WDAI_PATLA_PARTYKA

## Projekt aplikacji sklepu internetowego "Pat&Par"

Aplikacja jest kompletnym sklepem internetowym umożliwiającym przeglądanie produktów, dodawanie ich do koszyka, dodawanie ocen do produktów, składanie zamówień oraz zarządzanie kontem użytkownika.

### Autorzy

Krzysztof Patla & Mateusz Partyka

## Użyte technologie + biblioteki

### Frontend

- **Framework**: React
- **Build**: Vite
- **Style**: TailwindCSS, Material UI

### Backend

- **Środowisko**: Node.js
- **Framework**: Express.js
- **Baza danych**: SQLite3
- **ORM**: Sequelize
- **Uwierzytelnianie**: JWT

## Setup projektu

Aby korzystać z aplikacji należy uruchomić zarówno frontend jak i backend

### 1. Backend

```bash
cd project/backend
npm install
npm start
```

### 2. Frontend (Klient)

```bash
cd project/frontend
npm install
npm run dev
```

## Funkcjonalności

### Strona główna ~ Krzysztof Patla

Reprezentacyjna strona startowa sklepu.

### Strona sklepu ~ Krzysztof Patla

Przegląd dostępnych produktów z możliwością filtracji/wyszukiwania.

_Produkty są automatycznie pobierane z zewnętrznego API (fakestoreapi.com) przy pierwszym uruchomieniu serwera, jeśli baza danych jest pusta._

### Strona detali produktu ~ Krzysztof Patla

Szczegółowe informacje o wybranym produkcie.

### Oceny ~ Krzysztof Patla + Mateusz Partyka

System wystawiania i wyświetlania ocen produktów.

_Oceny są generowane losowo._

### Koszyk ~ Krzysztof Patla

Zarządzanie produktami w koszyku (dodawanie, usuwanie, zmienianie ilości, podsumowanie).

### Dodawanie zamówień ~ Krzysztof Patla

Proces finalizacji zakupów i tworzenia zamówienia.

### Strona szczegółów zamówienia ~ Mateusz Partyka

Podgląd szczegółów zamówienia.

### Rejestracja ~ Mateusz Partyka

Walidacja danych i tworzenie nowego użytkownika w bazie danych.

Automatycznie stworzeni użytkownicy:

- mjarosz@agh.edu.pl hasło: mjarosz123
- mpartyka@student.agh.edu.pl hasło: mpartyka123
- kpatla@student.agh.edu.pl hasło: kpatla123

### Logowanie ~ Mateusz Partyka

Uwierzytelnianie danych wpisanych przez użytkownika.

Generowanie tokena JWT (ważnego 2h), zapisanego w ciasteczkach.

### Strona użytkownika ~ Mateusz Partyka

Umożliwia podgląd danych osobowych oraz bezpieczne wylogowanie.

### Historia zamówień ~ Mateusz Partyka

Pełna historia zamówień pobierana z bazy danych.

_Dla użytkowników testowych generowane są przykładowe zamówienia (historia)._
