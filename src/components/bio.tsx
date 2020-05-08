/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import React from "react"
import styled from "styled-components"
import { grayColor } from "../utils/color"
import { rhythm, scale } from "../utils/typography"

const BioInner: React.FunctionComponent<{
  className?: string
}> = ({ className }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div className={className}>
      <a
        href={`https://twitter.com/${social.twitter}`}
        target="_blank"
        rel="external noopener"
      >
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author.name}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 50,
            borderRadius: `100%`,
          }}
          imgStyle={{
            margin: "0",
            borderRadius: `50%`,
          }}
        />
      </a>
      <div>
        <b>{author.name}</b>: {author.summary}
      </div>
    </div>
  )
}

const Bio = styled(BioInner)`
  display: flex;
  align-items: center;
  padding: ${rhythm(0.5)} ${rhythm(0.25)};
  font-style: italic;
  color: ${grayColor.darkest};
  ${scale(-3 / 8)};

  & > a {
    line-height: 0;
  }
`

export default Bio
