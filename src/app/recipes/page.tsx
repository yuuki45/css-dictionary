import { Metadata } from 'next';
import Link from 'next/link';
import { Blocks, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Navigation } from '@/components/Navigation';
import { recipes, recipeCategories } from '@/data/recipes';
import { buildSrcDoc } from '@/utils/sandboxDoc';

export const metadata: Metadata = {
  title: `UIレシピ集【全${recipes.length}例・コピペ&編集OK】 | CSS辞書`,
  description:
    'ボタン・カード・フォーム・モーダルなど、完成されたUI部品のHTML/CSSレシピ集。すべてライブプレビュー付きで、その場で編集して試せます。使用プロパティの辞書リンクとBaseline対応状況、AIへの依頼文例も収録。',
  alternates: {
    canonical: '/recipes/',
  },
  openGraph: {
    title: `UIレシピ集【全${recipes.length}例】`,
    description:
      '完成されたUI部品のHTML/CSSレシピ集。ライブプレビュー付き・その場で編集可能。',
    url: 'https://www.css-dictionary.com/recipes/',
  },
};

export default function RecipesPage() {
  const grouped = recipeCategories
    .map((category) => ({
      category,
      items: recipes.filter((r) => r.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <Layout>
      <div className="py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Blocks className="w-6 h-6 text-vermillion-500 dark:text-gold-400" />
            <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100">
              UIレシピ集
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            ボタン・カード・フォームなど、完成されたUI部品のレシピ{recipes.length}例。
            すべて動くプレビュー付きで、各ページではコードをその場で書き換えて試せます。
            使っているプロパティは辞書の解説ページにつながっています。
          </p>
        </div>

        <div className="space-y-12">
          {grouped.map(({ category, items }) => (
            <section key={category}>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="entry-marker" aria-hidden="true" />
                <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {category}
                </h2>
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                  {items.length}例
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((recipe) => (
                  <Link
                    key={recipe.id}
                    href={`/recipes/${recipe.id}/`}
                    className="group block bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-vermillion-400 dark:hover:border-gold-500 transition-colors"
                  >
                    {/* ライブプレビュー（サンドボックス・遅延読込。一覧ではJSは実行しない） */}
                    <div className="h-40 border-b border-gray-200 dark:border-gray-700 bg-[#fdfaf3]">
                      <iframe
                        srcDoc={buildSrcDoc(recipe.html, recipe.css)}
                        sandbox=""
                        loading="lazy"
                        title={`${recipe.title}のプレビュー`}
                        className="w-full h-full pointer-events-none"
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-vermillion-600 dark:group-hover:text-gold-300 transition-colors">
                        {recipe.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {recipe.description}
                      </p>
                      <div className="flex items-center justify-end text-vermillion-600 dark:text-gold-400 text-xs">
                        編集して試す
                        <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <div style={{ height: '64px' }} aria-hidden="true" />
      <Navigation />
    </Layout>
  );
}
