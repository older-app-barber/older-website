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
  ],
};

export { publicRoutes };
