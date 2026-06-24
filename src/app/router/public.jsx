const publicRoutes = {
  id: "public",
  children: [
    {
      path: "links",
      lazy: async () => ({
        Component: (await import("app/pages/public/LinkTree")).default,
      }),
    },
    {
      path: "politica-de-privacidade",
      lazy: async () => ({
        Component: (await import("app/pages/public/PrivacyPolicy")).default,
      }),
    },
    {
      path: "exclusao-de-conta",
      lazy: async () => ({
        Component: (await import("app/pages/public/AccountDeletion")).default,
      }),
    },
    {
      path: "pix",
      lazy: async () => ({
        Component: (await import("app/pages/public/Pix")).default,
      }),
    },
  ],
};

export { publicRoutes };
