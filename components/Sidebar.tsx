import { register } from "module";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, Schema, z } from "zod";

// import { Page} from "../app/page"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  date: z.string().min(1, {
    message: "Date must be at least 1 character",
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

export default function Sidebar() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      subject: "",
      recipient: "",
      date: "",
    },
  });

  const { register } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { subject, recipient, date } = values;

    console.log("Submitted: ->");
    console.log("Subject: ", subject);
    console.log("Recipient: ", recipient);
    console.log("Date: ", date);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden p-4 min-h-96">

            <div className="grid grid-rows-3 grid-flow-col gap-4 flex justify-center">

            <div>
              {/* Subject */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Subject</FormLabel>
                    <FormControl>
                      <div>
                        <Input
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
              </div>


              <div>
              {/* Recipient */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Recipient</FormLabel>
                    <FormControl>
                      <div>
                        <Input
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
              </div>

              <div>
              {/* Schedule */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Schedule</FormLabel>
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
        </div>
      </form>
    </Form>
  );
}
