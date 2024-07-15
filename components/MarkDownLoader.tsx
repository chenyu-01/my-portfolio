// @/components/MarkDownLoader
import fs from 'fs';
import { redirect } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkFrontmatter from 'remark-frontmatter';
import path from 'path';
import CodeBlock from '@/components/CodeBlock';
export default async function MarkDownLoader({ slug }: { slug: string }) {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  // check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  if (slug === 'index') {
    redirect('/posts');
  }
  const markdown = fs.readFileSync(filePath, 'utf8');
  return (
    <ReactMarkdown
      className={`prose mx-2 max-w-[90%] dark:prose-invert`}
      remarkPlugins={[remarkFrontmatter]}
      components={{
        pre: ({ children }) => (
          <pre className="not-prose overflow-x-hidden">{children}</pre>
        ),
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          return match ? (
            <CodeBlock
              language={language}
              value={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <code
              className={`not-prose rounded bg-slate-300 px-1 text-xs italic text-slate-800 ${className}`}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
