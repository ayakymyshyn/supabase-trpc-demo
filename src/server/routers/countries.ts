import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "../prisma";

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultCountriesSelect = Prisma.validator<Prisma.CountriesSelect>()({
  id: true,
  name: true,
  code: true,
});

export const countriesRouter = createRouter()
  // create
  .mutation("add", {
    input: z.object({
      name: z.string().min(3).max(32),
      code: z.string().length(2),
    }),
    async resolve({ input }) {
      const country = await prisma.countries.create({
        data: input,
        select: defaultCountriesSelect,
      });
      return country;
    },
  })
  // read
  .query("all", {
    async resolve() {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      return prisma.countries.findMany({
        select: defaultCountriesSelect,
      });
    },
  })
  .query("byId", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const { id } = input;

      const country = await prisma.countries.findUnique({
        where: { id },
        select: defaultCountriesSelect,
      });

      if (!country) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with id '${id}'`,
        });
      }

      return country;
    },
  })
  // update
  .mutation("edit", {
    input: z.object({
      id: z.number(),
      data: z.object({
        name: z.string().min(3).max(32),
        code: z.string().length(2),
      }),
    }),
    async resolve({ input }) {
      const { id, data } = input;
      const post = await prisma.countries.update({
        where: { id },
        data,
        select: defaultCountriesSelect,
      });
      return post;
    },
  })
  // delete
  .mutation("delete", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.countries.delete({ where: { id } });
      return {
        id,
      };
    },
  });
