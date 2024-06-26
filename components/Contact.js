import React, { useState } from "react";
import userData from "@constants/data";
import { SiDiscord, SiGithub, SiLinkedin } from "react-icons/si";
import emailjs from "@emailjs/browser";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LoadingButton } from "./ui/loading-button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Required.",
  }),
  email: z.string().min(1, {
    message: "Required.",
  }),
  message: z.string().min(1, {
    message: "Required.",
  }),
});

export default function Contact() {
  const [showLoader, setShowLoader] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    const templateParams = data;
    setShowLoader(true);
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        (response) => {
          setShowLoader(false);
          toast({
            title: "Message sent successfully. I'll get back to you soon.",
          });
        },
        (err) => {
          setShowLoader(false);
          toast({
            variant: "destructive",
            title: err,
          });
        }
      );
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800 antialiased">
        <h1 className=" text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
          Contact
        </h1>
      </div>
      <div className="relative z-10 rounded-md shadow-md bg-[#02044A] p-4 md:p-10 lg:p-20 max-w-6xl mx-auto mb-20 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:ml-4">
            <header className="">
              <h1 className="text-gray-50 font-semibold text-2xl">
                Get in touch, let's talk.
              </h1>
              <p className="font-light text-base text-gray-200 mt-2">
                Fill in the details and I'll get back to you as soon as I can.
              </p>
            </header>
            <div className="icons-container inline-flex flex-col my-20">
              <div className="flex flex-row items-center space-x-6 rounded-md border border-[#02044A] hover:border hover:border-blue-500 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-telephone-fill h-4 w-4 text-blue-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                  />
                </svg>
                <p className="text-gray-50 font-light text-sm">
                  {userData.phone}
                </p>
              </div>
              <div className="flex flex-row items-center space-x-6 rounded-md border border-[#02044A] hover:border hover:border-blue-500 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-envelope-fill h-4 w-4 text-blue-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                </svg>
                <p className="text-gray-50 font-light text-sm">
                  {userData.email}
                </p>
              </div>
              <div className="flex flex-row items-center space-x-6 rounded-md border border-[#02044A] hover:border hover:border-blue-500 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pin-fill h-4 w-4 text-blue-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354z" />
                </svg>
                <p className="text-gray-50 font-light text-sm">
                  {userData.address}
                </p>
              </div>
            </div>
            <div className="social-icons flex flex-row space-x-8">
              <a
                href={userData.socialLinks.discord}
                target="_blank"
                className="h-10 w-10 rounded-full text-white hover:bg-blue-500 flex items-center justify-center cursor-pointer"
              >
                <SiDiscord className="h-5 w-5" />
              </a>
              <a
                href={userData.socialLinks.linkedin}
                target="_blank"
                className="h-10 w-10 rounded-full text-white hover:bg-blue-500 flex items-center justify-center cursor-pointer"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a
                href={userData.socialLinks.github}
                target="_blank"
                className="h-10 w-10 rounded-full text-white hover:bg-blue-500 flex items-center justify-center cursor-pointer"
              >
                <SiGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="form rounded-lg bg-white p-8 flex flex-col space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-600">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="font-light rounded-md border focus:outline-none py-2 mt-2 px-1 focus:ring-2 focus:border-none ring-blue-500 dark:bg-white"
                        {...field}
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
                    <FormLabel className="text-sm text-gray-600 mt-4">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="font-light rounded-md border focus:outline-none py-2 mt-2 px-1 focus:ring-2 focus:border-none ring-blue-500"
                        {...field}
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
                    <FormLabel className="text-sm text-gray-600 mt-4">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="font-light rounded-md border focus:outline-none py-2 mt-2 px-1 focus:ring-2 focus:border-none ring-blue-500 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <LoadingButton
                className="bg-blue-500 rounded-md w-1/2 mt-8 py-2 text-gray-50 text-xs font-bold"
                type="submit"
                loading={showLoader}
              >
                Send Message
              </LoadingButton>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
