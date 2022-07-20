import { createRouter } from "./context";
import { z } from "zod";

export const todoRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.todo.findMany();
    }
  })
  .mutation("create", {
    input: z
      .object({
        title: z.string(),
      }),
    async resolve({input, ctx}) {
        if (ctx.session?.user?.id) {
            return await ctx.prisma.todo.create({
                data: {
                    title: input.title,
                    completed: false,
                    userId: ctx.session?.user.id
                }
            });
        }
    },
  })
  .mutation("complete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.todo.update({
        where: { id: input.id },
        data: {
          completed: true,
        },
      });
    }
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
    }
  });
