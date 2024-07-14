// app/posts/slug.loader.ts
import fs from 'fs';
import { redirect } from 'next/navigation';
import path from 'path';
type LoaderFunction = ({ slug }: { slug: string }) => Promise<string>;

export const loader: LoaderFunction = async ({ slug }) => {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  // check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  if (slug === 'index') {
    redirect('/');
  }
  const markdown = fs.readFileSync(filePath, 'utf8');
  return markdown;
};
