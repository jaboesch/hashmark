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

type Props = {
  metadata: BlogPostMetadata | null;
  setMetadata: React.Dispatch<React.SetStateAction<BlogPostMetadata | null>>;
  onContinue: () => void;
};

// Schema without hard rules for length
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
    .required()
    .messages({
      "string.uri": "Please provide a valid URL.",
      "string.pattern.base": 'URL cannot contain double quotes (").',
      "string.required": "Cover image URL is required.",
    }),
  canonicalUrl: Joi.string().uri().allow("").messages({
    "string.uri": "Please provide a valid URL.",
  }),
  authorName: Joi.string()
    .regex(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.pattern.base": "Author name can only contain letters and spaces.",
      "string.required": "Author name is required.",
    }),
});

const DraftDetailsForm = ({ metadata, setMetadata, onContinue }: Props) => {
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

  const [previewCanonicalUrl, setPreviewCanonicalUrl] = useState(
    "https://www.hashmark.xyz/author/slug"
  );

  const titleValue = watch("title");
  const canonicalUrlValue = watch("canonicalUrl");

  // Generate the canonical URL preview from the title or use the manually set value
  useEffect(() => {
    if (titleValue && !canonicalUrlValue) {
      const slug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setPreviewCanonicalUrl(`https://www.hashmark.xyz/author/${slug}`);
    }
  }, [titleValue, canonicalUrlValue]);

  const onSubmit = (data: BlogPostMetadata) => {
    // Use the default canonical URL if none is provided by the user
    if (!data.canonicalUrl) {
      data.canonicalUrl = previewCanonicalUrl;
    }
    setMetadata(data);
    onContinue();
  };

  return (
    <div className="bg-white w-full p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <FormFieldContainer>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register("title")}
            className={errors.title ? "border-red-500" : ""}
          />
          <CharacterCounter value={watch("title") || ""} maxLength={60} />
          <Message
            message="Aim for 50-60 characters and include your primary keyword."
            error={errors.title?.message}
          />
        </FormFieldContainer>

        {/* Description */}
        <FormFieldContainer>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
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
            {...register("coverImageUrl")}
            className={errors.coverImageUrl ? "border-red-500" : ""}
          />
          <Message message="Optional." error={errors.coverImageUrl?.message} />
        </FormFieldContainer>

        {/* Canonical URL */}
        <FormFieldContainer>
          <Label htmlFor="canonicalUrl">Advanced: Canonical URL</Label>
          <Input
            id="canonicalUrl"
            {...register("canonicalUrl")}
            placeholder={previewCanonicalUrl}
            className={errors.canonicalUrl ? "border-red-500" : ""}
          />
          <Message
            message={`Optional. If you are cross-posting on your own domain, set the intended URL here.`}
            error={errors.canonicalUrl?.message}
          />
        </FormFieldContainer>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-bold rounded-md hover:bg-black/80"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default DraftDetailsForm;
