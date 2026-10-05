import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { FiArrowLeft, FiEye } from "react-icons/fi";
import { blogApi } from "../../api/services";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/common/Loader";
import { formatLongDate, looksLikeHtml, textToHtml } from "../../utils/format";

const BlogDetails = () => {
  const { slug } = useParams();
  const { data: post, loading, error } = useFetch(() => blogApi.getBySlug(slug), [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!post) return undefined;
    const previous = document.title;
    document.title = post.title;
    return () => {
      document.title = previous;
    };
  }, [post]);

  const html = useMemo(() => {
    if (!post?.content) return "";
    const raw = looksLikeHtml(post.content) ? post.content : textToHtml(post.content);
    return DOMPurify.sanitize(raw, { FORBID_ATTR: ["target"] });
  }, [post]);

  if (loading) return <Loader fullScreen />;

  if (error || !post) {
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center gap-4 pt-24 text-center">
        <h1 className="font-display text-5xl font-semibold">Article not found</h1>
        <p className="text-muted">The article you are looking for does not exist or is no longer available.</p>
        <Link to="/#blog" className="btn-primary">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-20 pt-28 sm:pt-32">
      <div className="container-x max-w-3xl">
        <Link to="/#blog" className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-accent hover:text-gold">
          <FiArrowLeft size={16} /> Back to blog
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-widest text-brass">
            <time dateTime={post.createdAt}>{formatLongDate(post.createdAt)}</time>
            <span className="flex items-center gap-1.5 normal-case tracking-normal text-muted">
              <FiEye size={14} /> {post.views} views
            </span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
          {post.tags?.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        {post.image?.url && (
          <img
            src={post.image.url}
            alt={post.title}
            className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
          />
        )}

        <div className="prose-lux mt-8 break-words text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
};

export default BlogDetails;