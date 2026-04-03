/* ============================================
   Chapter Data
   Edit this file to add/change chapter content.
   ============================================

   Each chapter has:
     title       — chapter heading
     subtitle    — optional line under the title (omit or set to null)
     navLabel    — short label for the top overview bar
     open        — set true to have it expanded on load (usually just chapter 1)
     body        — array of content blocks (see types below)

   Body block types:
     { type: "p",       text: "Plain text" }
     { type: "p",       html: "Text with <a href='...'>links</a>" }
     { type: "img",     src: "images/file.png", alt: "Description" }
     { type: "tip",     text: "Helpful tip text" }
     { type: "warning", text: "Warning text" }
   ============================================ */

const chapters = [
  {
    title: "Create a GitHub account",
    navLabel: "Create account",
    open: true,
    body: [
      {
        type: "p",
        html: "Go to <a href='https://github.com/signup' target='_blank'>https://github.com/signup</a> and create an account",
      },
      { type: "p", text: "Choose a good username (can change it later)" },
      {
        type: "img",
        src: "images/step1_create_account.png",
        alt: "Screenshot of GitHub sign-up page",
      },
      { type: "p", text: "Then log in with your created account" },
    ],
  },
  {
    title: "Create the repository",
    subtitle: 'Fancy dev way of calling a "folder"',
    navLabel: "Create repo",
    body: [
      {
        type: "p",
        html: "After log in, go to <a href='https://github.com/repos' target='_blank'>https://github.com/repos</a>",
      },
      {
        type: "p",
        text: "Or click on the book icon on the top right of the screen",
      },
      {
        type: "img",
        src: "images/step2_book_icon_screen_corner.webp",
        alt: "Repo button top bar",
      },
      {
        type: "p",
        text: "Click on [ New repository ] button to create new repository",
      },
      {
        type: "img",
        src: "images/step2_create_new_repo.webp",
        alt: "Create new repo button",
      },
      {
        type: "p",
        text: "Create a new repository with settings similar to the picture",
      },
      {
        type: "img",
        src: "images/step2_new_repo_setup.webp",
        alt: "Create new repo button",
      },
    ],
  },
  {
    title: "The settings stuff",
    navLabel: "Settings",
    body: [
      {
        type: "p",
        text: "After creating, you will be redirect to the repo page. If not, you can always find it in the repo list (the book icon at the top right of the screen)",
      },
      {
        type: "p",
        text: "In the repo, click on the [ Settings ]  button at the top bar of the repo",
      },
      {
        type: "img",
        src: "images/step3_repo_settings.webp",
        alt: "Repo settings button",
      },
      {
        type: "p",
        text: "In the settings, click on tab [ Collaborators ], then click on [ Add people ]",
      },
      {
        type: "img",
        src: "images/step3_settings_add_collaborator.webp",
        alt: "Repo settings add collaborator button",
      },
      {
        type: "p",
        text: "Type my email in: <em>voidrainbowcockroach@gmail.com</em>, then click invite to add the dev to your repo",
      },
    ],
  },
];
