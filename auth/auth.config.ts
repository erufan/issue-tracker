import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client";
import { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";

const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [google],
  session: { strategy: "jwt" },
};
export default authConfig;
