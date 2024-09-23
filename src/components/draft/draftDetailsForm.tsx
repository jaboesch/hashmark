import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { BlogPostMetadata } from "@/utils/applicationTypes";
import {
  CharacterCounter,
  FormFieldContainer,
  Input,
  Label,
  Message,
  TextArea,
} from "../ui/form";
import { Button } from "../ui/button";
import { HASHMARK_COVER_IMAGE_URL } from "@/utils/applicationConstants";

type Props = {
  address: string;
  metadata: BlogPostMetadata | null;
  setMetadata: React.Dispatch<React.SetStateAction<BlogPostMetadata | null>>;
  onContinue: () => void;
};

const schema = Joi.object({
  title: Joi.string()
    .regex(/^[^"]+$/)
    .required()
    .messages({
      "string.pattern.base": 'Title cannot contain double quotes (").',
      "string.required": "Title is required.",
    }),
  description: Joi.string()
    .regex(/^[^"]+$/)
    .required()
    .messages({
      "string.pattern.base": 'Description cannot contain double quotes (").',
      "string.required": "Description is required.",
    }),
  keywords: Joi.string()
    .regex(/^[a-zA-Z0-9\s,]+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Keywords must be comma-separated and only contain letters, numbers, and spaces.",
      "string.required": "Keywords are required.",
    }),
  coverImageUrl: Joi.string()
    .uri()
    .regex(/^[^"]+$/)
    .allow("")
    .messages({
      "string.uri": "Please provide a valid URL.",
      "string.pattern.base": 'URL cannot contain double quotes (").',
      "string.required": "Cover image URL is required.",
    }),
  slug: Joi.string()
    .regex(/^[a-z0-9-]+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Slug must only contain lowercase letters, numbers, and dashes.",
      "string.required": "Slug is required.",
    }),
  canonicalUrlPrefix: Joi.string().uri().allow("").messages({
    "string.uri": "Please provide a valid URL.",
  }),
  authorName: Joi.string()
    .regex(/^[a-zA-Z0-9\s]+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Author name can only contain letters, numbers, and spaces.",
      "string.required": "Author name is required.",
    }),
  publication: Joi.string()
    .regex(/^[a-zA-Z0-9\s]+$/)
    .allow("")
    .messages({
      "string.pattern.base":
        "Author name can only contain letters, numbers, and spaces.",
    }),
});

const DraftDetailsForm = ({
  address,
  metadata,
  setMetadata,
  onContinue,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BlogPostMetadata>({
    resolver: joiResolver(schema),
    defaultValues: metadata || {},
  });
  const defaultCanonicalUrlPrefix = `https://www.hashmark.xyz/post/${address}/`;
  const titleValue = watch("title");
  const slug = watch("slug");
  const canonicalUrlPrefix = watch("canonicalUrlPrefix");

  // Set a default slug based on the title
  useEffect(() => {
    if (titleValue) {
      const slug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setValue("slug", slug);
    }
  }, [titleValue]);

  const onSubmit = (data: BlogPostMetadata) => {
    // Use the default canonical URL if none is provided by the user
    if (!data.canonicalUrlPrefix?.length) {
      data.canonicalUrlPrefix = defaultCanonicalUrlPrefix;
    }
    if (!data.publication?.length) {
      data.publication = "Default";
    }
    if (!data.coverImageUrl?.length) {
      data.coverImageUrl = HASHMARK_COVER_IMAGE_URL;
    }
    setMetadata(data);
    onContinue();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-row gap-2 w-full justify-end">
          <Button size="lg" type="submit">
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Save
            </span>
          </Button>
        </div>
        <div className="bg-white w-full p-8 rounded-sm shadow-sm">
          {/* Title */}
          <FormFieldContainer>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Your Title"
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            <CharacterCounter value={watch("title") || ""} maxLength={60} />
            <Message
              message="Aim for 50-60 characters and include your primary keyword."
              error={errors.title?.message}
            />
          </FormFieldContainer>

          {/* Slug */}
          <FormFieldContainer>
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              placeholder="your-title"
              {...register("slug")}
              className={errors.slug ? "border-red-500" : ""}
            />
            <Message
              message={`This will be the article identifier in the URL.`}
              error={errors.slug?.message}
            />
          </FormFieldContainer>

          {/* Description */}
          <FormFieldContainer>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              placeholder="A brief description of your article."
              {...register("description")}
              className={errors.description ? "border-red-500" : ""}
            />
            <CharacterCounter
              value={watch("description") || ""}
              maxLength={160}
            />
            <Message
              message="Aim for 100-160 characters and include a couple keywords."
              error={errors.description?.message}
            />
          </FormFieldContainer>

          {/* Keywords */}
          <FormFieldContainer>
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              placeholder="Hashmark, Decentralized Blog, No Business Model"
              {...register("keywords")}
              className={errors.keywords ? "border-red-500" : ""}
            />
            <Message
              message="Include 3-5 keywords or phrases separated by commas."
              error={errors.keywords?.message}
            />
          </FormFieldContainer>

          {/* Author Name */}
          <FormFieldContainer>
            <Label htmlFor="authorName">Author Name</Label>
            <Input
              id="authorName"
              placeholder="Your Name"
              {...register("authorName")}
              className={errors.authorName ? "border-red-500" : ""}
            />
            <Message error={errors.authorName?.message} />
          </FormFieldContainer>

          {/* Cover Image URL */}
          <FormFieldContainer>
            <Label htmlFor="coverImageUrl">Cover Image URL</Label>
            <Input
              id="coverImageUrl"
              placeholder={HASHMARK_COVER_IMAGE_URL}
              {...register("coverImageUrl")}
              className={errors.coverImageUrl ? "border-red-500" : ""}
            />
            <Message
              message="Optional."
              error={errors.coverImageUrl?.message}
            />
          </FormFieldContainer>

          {/* Publication */}
          <FormFieldContainer>
            <Label htmlFor="publication">Publication</Label>
            <Input
              id="publication"
              {...register("publication")}
              placeholder="Default"
              className={errors.publication ? "border-red-500" : ""}
            />
            <Message
              message={`Optional. A publication title may be used to group a series of articles.`}
              error={errors.publication?.message}
            />
          </FormFieldContainer>

          {/* Canonical URL */}
          <FormFieldContainer>
            <Label htmlFor="canonicalUrlPrefix">
              Advanced: Canonical URL Prefix
            </Label>
            <Input
              id="canonicalUrlPrefix"
              {...register("canonicalUrlPrefix")}
              placeholder={defaultCanonicalUrlPrefix}
              className={errors.canonicalUrlPrefix ? "border-red-500" : ""}
            />
            <Message
              message={`Optional. If you are cross-posting on your own domain, set the intended URL prefix here.`}
              error={errors.canonicalUrlPrefix?.message}
            />
          </FormFieldContainer>

          <p className="text-black/50 text-xs font-mono">
            Canonical URL:{" "}
            {canonicalUrlPrefix && canonicalUrlPrefix.length
              ? canonicalUrlPrefix
              : defaultCanonicalUrlPrefix}
            {slug}
          </p>
        </div>
      </div>
    </form>
  );
};

export default DraftDetailsForm;
