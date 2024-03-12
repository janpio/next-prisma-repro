import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest): Promise<NextResponse> {

  const libsql = createClient({
    url: `${process.env.DATABASE_URL}`,
  })
  const adapter = new PrismaLibSQL(libsql)
  const prisma = new PrismaClient({ adapter })
  const user = await prisma.user.findFirst();
  return NextResponse.next();
}
