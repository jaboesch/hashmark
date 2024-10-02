import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { FormFieldContainer, Label, Input, Message } from "./ui/form";
import { Button } from "./ui/button";

type ImageData = {
  src: string;
  alt: string;
};

type ImageModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: ImageData) => void;
};

const ImageModal = ({ isOpen, onRequestClose, onSubmit }: ImageModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ImageData>();
  const imageSrc = watch("src");

  const onSubmitForm = (data: ImageData) => {
    onSubmit(data);
    onRequestClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <h2 className="font-semibold text-lg mb-3">Image Details</h2>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        {/* Image URL Field */}
        <FormFieldContainer>
          <Label htmlFor="src">Image URL</Label>
          <Input
            id="src"
            placeholder="https://example.com/image.jpg"
            {...register("src", {
              required: "Image URL is required",
            })}
            className={errors.src ? "border-red-500" : ""}
          />
          <Message
            message="Enter the direct URL of the image."
            error={errors.src?.message}
          />
        </FormFieldContainer>

        {/* Alt Text Field */}
        <FormFieldContainer>
          <Label htmlFor="alt">Alt Text</Label>
          <Input
            id="alt"
            placeholder="Describe the image"
            {...register("alt", {
              required: "Alt text is required",
            })}
            className={errors.alt ? "border-red-500" : ""}
          />
          <Message
            message="This text will be used for accessibility purposes."
            error={errors.alt?.message}
          />
        </FormFieldContainer>

        {/* Image Preview */}
        {imageSrc && (
          <div className="mt-4">
            <p>Image Preview:</p>
            <img
              src={imageSrc}
              alt="Preview"
              className="w-[200px] border border-dashed"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-4">
          <Button size="lg" type="submit">
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Save
            </span>
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ImageModal;
