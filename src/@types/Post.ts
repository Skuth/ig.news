type Post = {
  alternate_languages: any[]
  data: {
    title: {
      spans: any[]
      text: string
      type: "heading1"
    }[]
    content: {
      spans: any[]
      text: string
      type: 
      | "paragraph"
      | "preformatted"
      | "heading1"
      | "heading2"
      | "heading3"
      | "heading4"
      | "heading5"
      | "heading6"
      | "strong"
      | "em"
      | "hyperlink"
      | "image"
      | "embed"
      | "list-item"
      | "o-list-item"
      | "rtl"
    }[]
  }
  first_publication_date: string
  href: string
  id: string
  lang: "pt-br"
  last_publication_date: string
  linked_documents: any[]
  slugs: string[]
  tags: string[]
  type: "post"
  uid: string
  url: string | null
}

export type { Post }