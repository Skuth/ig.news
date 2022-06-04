import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-dom"

import { getPrismicClient } from "../../services/prismic";

import { Post } from "../../@types/Post";

import styles from "./styles.module.scss"

interface PostsProps {
  posts: {
    slug: string
    title: string
    excerpt: string
    updatedAt: string
  }[]
}

const Posts: NextPage<PostsProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              passHref
            >
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const prismic = getPrismicClient({ previewData })

  const response = await prismic.getByType("post", {
    fetch: ["post.title", "post.content"],
    pageSize: 100
  })
  
  const posts = response.results.map((post: Post) => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt: post.data.content.find(content => content.type === "paragraph")?.text ?? "",
    updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  })) 

  return {
    props: {
      posts
    },
    revalidate: (60 * 60) * 1
  }
}

export default Posts;