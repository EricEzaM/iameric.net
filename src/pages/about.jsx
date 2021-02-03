import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => {
  return (
    <Layout>
      <SEO title="About" />
      <h3 className="subtitle">
        A mechanical engineer who loves programming.
      </h3>
      <p>
        This site is a place for me to document some of the things I do - for myself to reference and look back on in the future, but also for others too if they find it useful.
      </p>
      <p>
        I'm based in Australia. If you would like to contact me, feel free to send me an email at <a href="mailto:eric@iameric.net">eric@iameric.net</a>.
      </p>
    </Layout>
  )
}

export default AboutPage
