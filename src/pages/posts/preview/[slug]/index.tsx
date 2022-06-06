import { useEffect } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom"

import { Post } from "../../../../@types/Post";

import { getPrismicClient } from "../../../../services/prismic";

import styles from "../../post.module.scss"

interface PostsProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

const PostPage: NextPage<PostsProps> = ({ post }) => {
  const { data: session } = useSession()

  const router = useRouter()

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session, router, post.slug])

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
            className={`${styles.post__content} ${styles.preview__content}`}
            dangerouslySetInnerHTML={{
              __html: post.content
            }}
          />

          <div className={styles.continue__reading}>
            <p>Wanna continue reading?</p>

            <Link href="/" passHref>
              <a>
                Subscribe now &#x1F917;
              </a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({  previewData, params }) => {  
  const prismic = getPrismicClient({ previewData })

  const response: Post = await prismic.getByUID("post", String(params.slug))

  const post = {
    slug: response.uid,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  }

  return {
    props: {
      post
    },
    revalidate: (60 * 60) * 1
  }
}

export default PostPage;