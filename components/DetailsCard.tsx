"use client";
import ProgressBar from "./LineChart";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be at most 500 characters"),
  avatarUrl: z.string().url("Please upload a valid avatar image"),
});

const AttendeeDetails = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      avatarUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.success("Form submitted successfully!");

    const queryParams = new URLSearchParams();
    queryParams.append("name", values.name);
    queryParams.append("email", values.email);
    queryParams.append("message", values.message);
    queryParams.append("avatarUrl", values.avatarUrl);

    router.push(`/booked?${queryParams.toString()}`);
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
      const data = await uploadToCloudinary(file);
      form.setValue("avatarUrl", data.secure_url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Image upload failed");
      form.setError("avatarUrl", {
        type: "manual",
        message: "Failed to upload image",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) await handleImageUpload(e.target.files[0]);
  };

  const onFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0])
      await handleImageUpload(e.dataTransfer.files[0]);
  };

  const uploadToCloudinary = async (file: File) => {
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    ) {
      throw new Error("Cloudinary environment variables are missing.");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    console.log("Cloudinary Cloud Name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    console.log("Cloudinary Upload Preset:", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const data = await response.json();
    if (!response.ok) {
      console.error("Cloudinary Error:", data);
      throw new Error(data.error?.message || "Upload failed");
    }
    return data;
  };

  return (
    <div className="max-w-lg mx-auto bg-custom-teal bg-opacity-20 border border-custom-cyan/20 text-white p-6 rounded-3xl shadow-lg">
      <ProgressBar
        title="Attendee Details"
        currentStep={2}
        totalSteps={3}
        width="100%"
      />
      <div className="border border-opacity-20 border-custom-cyan p-3 mt-4 rounded-3xl">
        <div className="flex max-sm:items-center flex-col mb-3 p-4 border border-custom-cyan/20 rounded-2xl">
          <p className="text-xs text-left text-white mb-1">
            Upload Profile Photo
          </p>
          <div className="md:bg-custom-dark md:px-[100px]">
            <label
              htmlFor="fileUpload"
              className="cursor-pointer border border-custom-cyan md:ml-5 px-2 py-5 md:py-10 rounded-xl text-center bg-custom-cyan/30 hover:bg-custom-teal/20 transition flex flex-col items-center justify-center w-40 h-50"
            >
              <div
                className="w-full h-full flex flex-col items-center justify-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={onFileDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="fileUpload"
                  onChange={onFileInputChange}
                />
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="Uploaded"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                ) : (
                  <>
                    <UploadCloud className="w-5 h-5 text-white mb-2" />
                    <p className="text-[8px] text-white">
                      Drag & drop or click to upload
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>
        </div>

        <div className="border border-opacity-20 border-custom-cyan w-full my-5"></div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-xs"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Chinedu Taiwo Musa"
                      {...field}
                      className="border border-custom-cyan/20 bg-transparent text-white p-2 rounded-md"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="hello@oche.ng"
                      {...field}
                      className="border border-custom-cyan/20 bg-transparent text-white p-2 rounded-md"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Request?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Textarea"
                      {...field}
                      className="border border-custom-cyan/20 bg-transparent text-white p-2 rounded-md w-full h-24"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4 w-full">
              <Button variant="ocx" className="w-full sm:w-1/2 asChild">
                <Link href="/">Back</Link>
              </Button>
              <Button variant="berry" className="w-full sm:w-1/2" type="submit">
                Get My Free Ticket
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AttendeeDetails;
