# 🚀 [BackOffice]

📝 **Description**

The Backoffice of the Dédale mobile application is a web platform dedicated to
managing and administering tours, as well as consulting visitor statistics. This
centralized tool allows administrators and managers to create, modify, and
organize interactive tours while providing in-depth insights into user
engagement and the attendance of various points of interest.

---

## About

> Project [@Dédale][UrlPj] By the association:
> [_Ludi Museo_](https://www.ludimuseo.fr/lassociation/) (French URL)

[UrlPj]: https://github.com/ludimuseo/dedale_backend/

---

## 🎯 Fonctionnalités

✅ **[Feature 1]** – Creation and Management of Tours.

• Tour Creation: Administrators can design customized tours by adding points of
interest, challenges, riddles, or contextual information. Each tour can be
configured with specific parameters (duration, difficulty, theme, etc.). •
Editing and Updating: Existing tours can be modified, steps can be added or
removed, and content can be updated in real-time. • Tour Organization: Tours can
be categorized, archived, or activated/deactivated as needed.

    Tour Administration:
    •	User Management: Administrators can assign specific roles (creator, moderator, etc.) and manage access to different tours.
    •	Progress Tracking: Real-time tracking of users’ progress within tours, viewing their answers to riddles, and managing rewards or badges

✅ **[Feature 2]** – Statistics and Analytics.

    •	Visitor Attendance: The back-office provides detailed dashboards to analyze the attendance of points of interest, average visit duration, and peak activity periods.
    •	User Engagement: Statistics help measure user engagement, including the number of completed tours, challenge success rates, and feedback.
    •	Custom Reports: Administrators can generate customized reports to analyze trends, identify the most popular points of interest, and make data-driven decisions to optimize tours.

✅ **[Feature 3]** – Intuitive User Interface.

    •	Ergonomic Design: The back-office interface is designed to be intuitive and easy to use, ensuring quick onboarding even for non-technical users.
    •	Responsive Design: The platform is accessible from various devices (computers, tablets) for flexible and mobile management.

✅ **[Feature 3]** – Security and Access Management.

    •	Secure Authentication: The back-office integrates a robust authentication system to ensure data security and access control.
    •	Permission Management: Access rights are configured based on roles, ensuring that only authorized users can make critical modifications.

---

## Team! 🥇

| ~                                                                                                            | Contributors               |
| ------------------------------------------------------------------------------------------------------------ | -------------------------- |
| <img src="https://avatars.githubusercontent.com/u/128374528?v=4" width="50" alt="@A-Fidele avatar" />        | [@A-Fidele][User01]        |
| <img src="https://avatars.githubusercontent.com/u/167294285?v=4" width="50" alt="@Maeva-RODRIGUES avatar" /> | [@Maeva-RODRIGUES][User02] |
| <img src="https://avatars.githubusercontent.com/u/91600327?v=4" width="50" alt="@Eternal-Grace avatar" />    | [@Eternal-Grace][User03]   |
| <img src="https://avatars.githubusercontent.com/u/13797688?v=4" width="50" alt="@Okkunsama avatar" />        | [@Okkunsama][User04]       |
| <img src="https://avatars.githubusercontent.com/u/128263899?v=4" width="50" alt="@Lily87280 avatar" />       | [@Lily87280][User05]       |
| <img src="https://avatars.githubusercontent.com/u/151648856?v=4" width="50" alt="@Mouad-Maataoui avatar" />  | [@Mouad-Maataoui][User06]  |
| <img src="https://avatars.githubusercontent.com/u/18648482?v=4" width="50" alt="@echo-vic avatar" />         | [@echo-vic][User07]        |
| <img src="https://avatars.githubusercontent.com/u/88055801?v=4" width="50" alt="@CYL-B avatar" />            | [@CYL-B][User08]           |
| <img src="https://avatars.githubusercontent.com/u/3463006?v=4" width="50" alt="@fred2541 avatar" />          | [@fred2541][User09]        |
| <img src="https://avatars.githubusercontent.com/u/122387449?v=4" width="50" alt="@ananas122 avatar" />       | [@ananas122][User10]       |

[User01]: https://github.com/A-Fidele/
[User02]: https://github.com/Maeva-RODRIGUES/
[User03]: https://github.com/Eternal-Grace/
[User04]: https://github.com/okkunsama/
[User05]: https://github.com/Lily87280/
[User06]: https://github.com/Mouad-Maataoui/
[User07]: https://github.com/echo-vic/
[User08]: https://github.com/CYL-B/
[User09]: https://github.com/fred2541/
[User10]: https://github.com/ananas122/

---

## 🛠️ Stack & Outils

![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat)  
![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=white&style=flat)  
![Tailwind CSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white&style=flat)  
![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white&style=flat)

---

## Install

1 - Execute git clone script:

```bash
git clone git@github.com:ludimuseo/dedale_backend.git
```

2 - Do not forget to switches to your developpment branch

- `git branch -a` => To view all branches
- `git checkout [BRANCH NAME]` => To enter an existing branch
- `git checkout -b [BRANCH NAME]` => To create and enter a **NEW** branch

3 - Enter the project directory

```bash
cd dedale_backend
```

4 - Install all dependancies at the root of the project

```bash
yarn install
```

5 - Generate a `.env.development` or `.env` file at the root of the project.

```bash
echo "NODE_ENV=\"development\"" >> .env.development
```

6 - Inside the file, add the following environment variables then set their
values :

```env
NODE_ENV="development"

VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_APP_ID=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_MEASURE_ID=""
VITE_FIREBASE_MSID=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
```

7 - 🎉 DONE! You can now launch the project:

```bash
yarn dev --open
```

---

## 📸 Aperçus

Ajoutez ici des captures d’écran ou GIFs du projet en action.

📌 **Exemple 1 : Page d’accueil du projet**  
<img src="./src/assets/imgs/BackOffice Dedale.png" alt="dedale" width="500" height="180"/>

---
