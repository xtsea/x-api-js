const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AkenoXJs',
      version: '1.0.0',
      description: "Free API by @xtdevs",
      contact: {
        name: "RandyDev",
        url: "",
        email: ""
      },
      license: {
        name: "MIT LICENSE",
        url: "https://github.com/xtsea/x-api-js/blob/main/LICENSE"
      }
    },
    servers: [
      { 
        url: 'https://randydev-ryu-js.hf.space', 
        description: 'url' 
      }
    ],
    tags: [
      { name: "AI" }
    ]
  },
  apis: [
    "./routes/*.js",
    "./plugins/*.js",
    "./routes/*.route.js"
  ]
};

export { swaggerOptions };
