const publicRoutes = {
  id: "public",
  children: [
    {
      path: "links",
      lazy: async () => ({
        Component: (await import("app/pages/public/LinkTree")).default,
      }),
    },
  ],
};

export { publicRoutes };
