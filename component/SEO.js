import Head from 'next/head'
import React from 'react'

const SEO = () => {

    const seo = {
        title: "VTU CGPA Calculator🤖",
        description: "Open 😃 source Application 🚀 to calculate CGPA 🗒️ and SGPA of VTU Students 🎉",
        image: "https://raw.githubusercontent.com/akash-aman/CGPA_Calculator/main/image/img2.png",
        url: "https://cgpacalculator.vercel.app/",
        twitterUsername: "sirakashaman"
    }

    return (
        <Head>

            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />

            <meta property="og:url" content={seo.url} />
            <meta property="og:type" content="Markdown" />
            <meta property="og:title" content={seo.title} />

            <meta property="og:description" content={seo.description} />

            <meta property="og:image" content={seo.image} />

            <meta name="twitter:card" content="summary_large_image" />

            <meta name="twitter:creator" content={seo.twitterUsername} />

            <meta name="twitter:title" content={seo.title} />

            <meta name="twitter:description" content={seo.description} />

            <meta name="twitter:image" content={seo.image} />
        </Head>
    )
}

export default SEO