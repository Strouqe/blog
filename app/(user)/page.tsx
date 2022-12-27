import { previewData } from "next/headers"
import { groq } from "next-sanity"
import { client } from "../../lib/sanity.client"
import PreviewSuspence from "../../components/PreviewSuspence"
import PreviewBlogList from "../../components/PreviewBlogList"
import BlogList from "../../components/BlogList"

const query = groq`
*[_type == "post"] {
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`

async function HomePage() {
  if (previewData()) {
    return (
      <PreviewSuspence
        fallback={
          <div role="status">
            <p className="text-center text-lg animate-pulse text-[#F7AB0A]">
              Loading Preview Data...
            </p>
          </div>
        }
      >
        <PreviewBlogList query={query} />
      </PreviewSuspence>
    )
  }

  const posts = await client.fetch(query)
  return <BlogList posts={posts} />
}

export default HomePage
