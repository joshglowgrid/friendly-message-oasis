
import { defineSchema } from "tinacms";

export default defineSchema({
  collections: [
    {
      name: "post",
      label: "Blog Posts",
      path: "content/posts",
      format: "md",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          isTitle: true,
          required: true,
        },
        {
          type: "string",
          name: "slug",
          label: "Slug",
          required: true,
        },
        {
          type: "string",
          name: "excerpt",
          label: "Excerpt",
        },
        {
          type: "string",
          name: "author",
          label: "Author",
        },
        {
          type: "datetime",
          name: "date",
          label: "Date",
        },
        {
          type: "string",
          name: "readTime",
          label: "Read Time",
        },
        {
          type: "string",
          name: "category",
          label: "Category",
          options: [
            { label: "Social Media", value: "Social Media" },
            { label: "Email", value: "Email" },
            { label: "Video", value: "Video" },
            { label: "Website", value: "Website" },
            { label: "Dental", value: "Dental" },
          ],
        },
        {
          type: "boolean",
          name: "featured",
          label: "Featured",
        },
        {
          type: "image",
          name: "image",
          label: "Cover Image",
        },
        {
          type: "rich-text",
          name: "content",
          label: "Content",
          isBody: true,
        },
      ],
      ui: {
        router: ({ document }) => {
          return `/blog/${document._sys.filename}`;
        },
      },
    },
    {
      name: "page",
      label: "Pages",
      path: "content/pages",
      format: "json",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Page Title",
          isTitle: true,
          required: true,
        },
        {
          type: "string",
          name: "slug",
          label: "Slug",
          required: true,
        },
        {
          type: "string",
          name: "description",
          label: "SEO Description",
        },
        {
          type: "image",
          name: "ogImage",
          label: "Open Graph Image",
        },
        {
          type: "object",
          name: "hero",
          label: "Hero Section",
          fields: [
            {
              type: "string",
              name: "heading",
              label: "Heading",
            },
            {
              type: "string",
              name: "subheading",
              label: "Subheading",
            },
            {
              type: "string",
              name: "buttonText",
              label: "Button Text",
            },
            {
              type: "string",
              name: "buttonLink",
              label: "Button Link",
            },
            {
              type: "image",
              name: "backgroundImage",
              label: "Background Image",
            },
          ],
        },
        {
          type: "object",
          name: "sections",
          label: "Content Sections",
          list: true,
          templates: [
            {
              name: "textSection",
              label: "Text Section",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading",
                },
                {
                  type: "rich-text",
                  name: "content",
                  label: "Content",
                },
              ],
            },
            {
              name: "imageSection",
              label: "Image Section",
              fields: [
                {
                  type: "string",
                  name: "caption",
                  label: "Caption",
                },
                {
                  type: "image",
                  name: "image",
                  label: "Image",
                },
              ],
            },
          ],
        },
      ],
      ui: {
        router: ({ document }) => {
          if (document._sys.filename === "home") {
            return "/";
          }
          return `/${document._sys.filename}`;
        },
      },
    },
  ],
});
