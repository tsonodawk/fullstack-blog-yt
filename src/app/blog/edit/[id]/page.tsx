'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const editblog = async (
  id: number,
  title: string | undefined,
  description: string | undefined,
) => {
  const apiBase = process.env.API_BASE
  const res = await fetch(`${apiBase}/api/blog/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      title,
      description,
    }),
  })

  return await res.json()
}

const getblogById = async (id: number) => {
  const apiBase = process.env.API_BASE
  const res = await fetch(`${apiBase}/api/blog/${id}`, {
    method: 'GET',
  })

  const data = await res.json()

  return data.post
}

const deleteblog = async (id: number) => {
  const apiBase = process.env.API_BASE
  const res = await fetch(`${apiBase}/api/blog/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await res.json()
}

const EditPost = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descripttionRef = useRef<HTMLTextAreaElement | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    toast.loading('編集中です...', { id: '1' })
    await editblog(
      parseInt(params.id),
      titleRef.current?.value,
      descripttionRef.current?.value,
    )
    toast.success('編集に成功しました', { id: '1' })

    router.push('/')
    router.refresh()
  }

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    toast.loading('削除中です...', { id: '2' })
    await deleteblog(parseInt(params.id))
    toast.success('削除に成功しました', { id: '2' })

    router.push('/')
    router.refresh()
  }

  useEffect(() => {
    // router.refresh()
    getblogById(parseInt(params.id))
      .then((post) => {
        titleRef.current!.value = post.title
        descripttionRef.current!.value = post.description
      })
      .catch((err) => {
        toast.error('エラーが発生しました')
        // router.push('/')
      })
  }, [])

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            ブログの編集 🚀
          </p>
          <form>
            <input
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
              ref={titleRef}
            />
            <textarea
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
              ref={descripttionRef}
            ></textarea>
            <button
              onClick={handleSubmit}
              className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"
            >
              更新
            </button>
            <button
              onClick={handleDelete}
              className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100"
            >
              削除
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditPost
