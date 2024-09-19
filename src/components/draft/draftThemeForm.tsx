"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { FormFieldContainer, Input, Label, Message } from "../ui/form";
import { Button } from "../ui/button";

const cssValueRegex = /^[a-zA-Z0-9#,\-\s]+$/; // Only allow alphanumeric characters, #, comma, hyphen, and space
const cssValueErrorMessages = {
  "string.pattern.base":
    "Invalid CSS value. Only alphanumeric characters, #, comma, hyphen, and space are allowed.",
};
const colorValueRegex = /^#[a-fA-F0-9]{3,9}$/; // only allow hex color values
const colorErrorMessages = {
  "string.pattern.base": "Invalid color value (ex. #ff0000)",
};

const schema = Joi.object({
  containerBgColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  contentBgColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  contentBorderColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  primaryFontFamily: Joi.string()
    .pattern(cssValueRegex)
    .required()
    .messages(cssValueErrorMessages),
  primaryTextColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  linkTextColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  headingFontFamily: Joi.string()
    .pattern(cssValueRegex)
    .required()
    .messages(cssValueErrorMessages),
  tagFontFamily: Joi.string()
    .pattern(cssValueRegex)
    .required()
    .messages(cssValueErrorMessages),
  tagBgColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  tagBorderColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  tagTextColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  horizontalRuleColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  blockBorderColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  buttonFontFamily: Joi.string()
    .pattern(cssValueRegex)
    .required()
    .messages(cssValueErrorMessages),
  buttonBgColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  buttonTextColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  quoteFontFamily: Joi.string()
    .pattern(cssValueRegex)
    .required()
    .messages(cssValueErrorMessages),
  quoteBgColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  quoteTextColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  codeBgColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  codeTextColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
  captionFontFamily: Joi.string()
    .pattern(cssValueRegex)
    .required()
    .messages(cssValueErrorMessages),
  captionTextColor: Joi.string()
    .pattern(colorValueRegex)
    .required()
    .messages(colorErrorMessages),
});

type ThemeFormValues = {
  [key: string]: string;
};

const ThemeForm = ({
  theme,
  onSubmit,
}: {
  theme: string;
  onSubmit: (theme: string) => void;
}) => {
  const themeObject = parseThemeString(theme);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ThemeFormValues>({
    resolver: joiResolver(schema),
    defaultValues: themeObject,
  });

  const handleFormSubmit = (data: ThemeFormValues) => {
    const themeString = convertThemeObjectToString(data);
    onSubmit(themeString);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-row gap-2 w-full justify-end">
          <Button size="lg" type="submit">
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Save
            </span>
          </Button>
        </div>
        <div className="bg-white w-full p-8 rounded-sm shadow-sm">
          {/* Loop through each theme key-value pair */}
          {Object.keys(themeObject).map((key) => (
            <FormFieldContainer key={key}>
              <Label htmlFor={key}>{formatLabel(key)}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id={key}
                  {...register(key)}
                  className={errors[key] ? "border-red-500" : ""}
                />
                <div
                  className="ml-4 border p-2 rounded-sm"
                  style={createPreviewStyle(key, watch(key))}
                >
                  <span className="bg-white/30">Sample</span>
                </div>
              </div>
              <Message error={errors[key]?.message} />
            </FormFieldContainer>
          ))}
        </div>
      </div>
    </form>
  );
};

export default ThemeForm;

function parseThemeString(theme: string): ThemeFormValues {
  const regex = /--([\w-]+):\s*([^;]+)/g;
  const themeObject: ThemeFormValues = {};
  let match;
  while ((match = regex.exec(theme)) !== null) {
    themeObject[match[1]] = match[2].trim();
  }
  return themeObject;
}

function convertThemeObjectToString(themeObject: ThemeFormValues): string {
  const themeString = Object.entries(themeObject)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n");
  return `:root {\n${themeString}\n}`;
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/-/g, " ");
}

function createPreviewStyle(key: string, value: string | undefined) {
  switch (key) {
    case "primaryFontFamily":
    case "headingFontFamily":
    case "tagFontFamily":
    case "buttonFontFamily":
    case "quoteFontFamily":
    case "captionFontFamily":
      return { fontFamily: value || "inherit" };
    case "primaryTextColor":
    case "linkTextColor":
    case "tagTextColor":
    case "quoteTextColor":
    case "codeTextColor":
    case "captionTextColor":
    case "buttonTextColor":
      return { color: value || "inherit" };
    case "containerBgColor":
    case "contentBgColor":
    case "tagBgColor":
    case "buttonBgColor":
    case "quoteBgColor":
    case "codeBgColor":
      return { backgroundColor: value || "inherit" };
    case "contentBorderColor":
    case "tagBorderColor":
    case "horizontalRuleColor":
    case "blockBorderColor":
      return { borderColor: value || "inherit" };
    default:
      return {};
  }
}
