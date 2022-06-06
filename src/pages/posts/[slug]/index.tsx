import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { RichText } from "prismic-dom"
import { getSession } from "next-auth/react";

import { Post } from "../../../@types/Post";

import { getPrismicClient } from "../../../services/prismic";

import styles from "../post.module.scss"

interface PostsProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

const PostPage: NextPage<PostsProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.post__content}
            dangerouslySetInnerHTML={{
              __html: post.content
            }}
          />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, previewData, params }) => {
  const session = await getSession({ req })

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${params.slug}`,
        permanent: false
      }
    }
  }
  
  const prismic = getPrismicClient({ previewData })

  const response: Post = await prismic.getByUID("post", String(params.slug))

  const post = {
    slug: response.uid,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  }

  return {
    props: {
      post
    }
  }
}

export default PostPage;