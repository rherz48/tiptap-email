"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, Schema, z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/Tiptap";

const formSchema = z.object({
  date: z.string().min(1, {
    message: "Date must be at least 1 character",
  }),
  body: z.string().min(1, {
    message: "Body must be at least 1 character",
  }),
  subject: z.string().min(1, {
    message: "Subject must be at least 1 character",
  }),
  recipient: z
    .string()
    .min(1, {
      message: "Recipient email must be at least 1 character",
    })
    .email(),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      body: "",
      subject: "",
      recipient: "",
      date: "",
    },
  });

  const { register, setValue, getValues } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { date, body, subject, recipient } = values;

    console.log("Submitted: ->");
    console.log("Date: ", date);
    console.log("Body: ", body);
    console.log("Subject: ", subject);
    console.log("Recipient: ", recipient);
  }

  const handleBodyChange = (body: string) => {
    form.setValue("body", body);
  };

  console.log(form.formState.errors);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-8xl items-center justify-between font-mono text-sm lg:flex">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <div className="grid grid-rows-2 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                    {/* Body */}
                    <FormField
                      control={form.control}
                      name="body"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Body</FormLabel>
                          {/* <hr/> */}
                          <FormControl>
                            <div>
                              <Tiptap
                                body={field.name}
                                onChange={handleBodyChange}
                              ></Tiptap>
                              <input type="hidden" {...register("body")} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-rows-3 grid-flow-col gap-4 flex justify-center">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden ">
                      {/* Subject */}
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Subject</FormLabel>
                            <FormControl>
                              <div>
                                <input
                                  className="focus:outline-none"
                                  type="text"
                                  {...register("subject")}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Recipient */}
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Recipient
                            </FormLabel>
                            <FormControl>
                              <div>
                                <input
                                  className="focus:outline-none"
                                  type="text"
                                  {...register("recipient")}
                                />
                              </div>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Schedule */}
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Schedule
                            </FormLabel>
                            <FormControl>
                              <div>
                                <input
                                  className="focus:outline-none"
                                  type="datetime-local"
                                  {...register("date")}
                                />
                              </div>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom buttons */}
                <div className="grid grid-cols-3 gap-10 flex items-center h-96 w-100">
                  <div className="grid grid-cols-2 gap-2">
                    <Button type="submit">Publish</Button>
                    <Button type="submit" className="bg-slate-400">
                      Save draft
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="duplicate" />
                    <label
                      htmlFor="duplicate"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Make a duplication
                    </label>
                  </div>

                  <div className="">
                    <Button
                      type="submit"
                      className="flex items-center bg-slate-400"
                    >
                      Send Test Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
