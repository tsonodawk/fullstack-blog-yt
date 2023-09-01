import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
import { main } from '../route'

// ブログの取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = Number(req.url.split('/blog/')[1])
    await main()
    const post = await prisma.post.findFirst({
      where: { id: id },
    })
    return NextResponse.json({ message: 'success', post }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// ブログの修正
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: number = Number(req.url.split('/blog/')[1])
    const { title, description } = await req.json()

    await main()
    const posts = await prisma.post.update({
      where: { id: id },
      data: {
        title: title,
        description: description,
      },
    })

    return NextResponse.json({ message: 'success', posts }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// ブログの削除
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id: number = Number(req.url.split('/blog/')[1])

    await main()
    const post = await prisma.post.delete({
      where: { id: id },
    })

    return NextResponse.json({ message: 'success', post }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
