// Sample cn utility for styling consistency
import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      className={cn(
        "border w-full rounded-md px-3 py-2 focus:border focus:border-black/80 focus:outline-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "border w-full rounded-md px-3 py-2 focus:border focus:border-black/80 focus:outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";

const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <label htmlFor={htmlFor} className="block text-base font-medium text-black/80">
    {children}
  </label>
);

const Message = ({ message, error }: { message?: string; error?: string }) => (
  <p className={cn(error ? "text-red-500" : "text-gray-500", "text-sm mt-1")}>
    {error || message}
  </p>
);

const FormFieldContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 md:mb-5 relative">{children}</div>
);

const CharacterCounter = ({
  value,
  maxLength,
}: {
  value: string;
  maxLength: number;
}) => (
  <span className="absolute top-0 right-2 text-sm text-gray-500">
    {value.length}/{maxLength}
  </span>
);

export {
  Input,
  TextArea,
  Label,
  Message,
  FormFieldContainer,
  CharacterCounter,
};
