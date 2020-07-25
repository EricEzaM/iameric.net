module.exports = {
  siteMetadata: {
    title: `I am Eric`,
    description: `Programming n stuff`,
    author: `Eric Michaels`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // Sass/Scss support
    `gatsby-plugin-sass`,
    // File system sources
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    /*
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },
    */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/content/articles`,
      },
    },
    /*
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    */
    // Images
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    // Markdown related
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
          },
          "gatsby-remark-prismjs",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/, // See below to configure properly
        },
      },
    },
  ],
}
