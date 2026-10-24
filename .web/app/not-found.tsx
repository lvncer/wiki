import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="mb-4 font-serif text-3xl font-bold text-ink-900">ページが見つかりません</h1>
      <p className="mb-6 text-ink-600">指定されたノートは存在しないか、移動した可能性があります。</p>
      <Link href="/" className="underline">
        トップページへ戻る
      </Link>
    </div>
  );
}
