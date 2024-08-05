'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchPosts } from "../../api/posts";
import Loading from './pageLoading';
import Pagination from './paginationPosts';

export default function CardPost({ typeLogement }) {
  const [postes, setPostes] = useState([]);
  const [meta, setMeta] = useState({
    current_page: 1,
    next_page: null,
    prev_page: null,
    total_pages: 0,
    total_count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load posts for a specific page
  const loadPosts = async (page = 1) => {
    setLoading(true);
    try {
      const data = await fetchPosts(page, typeLogement);
      setPostes(data.posts);
      setMeta(data.meta);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(); // Load posts when component mounts or typeLogement changes
  }, [typeLogement]);

  // Handle page change
  const handlePageChange = (page) => {
    loadPosts(page);
  };

  if (loading) return <Loading />;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <div>

    <div className="pb-5 grid xl:grid-cols-5 lg:grid-cols-4 gap-4 md:grid-cols-3 sm:justify-items-center px-5">
      {postes.map((post) => (
        <Link href={`http://localhost:4000/post/${post.id}`} key={post.id}>
          <div className="block rounded-md bg-white w-60 h-[19.5rem] dark:bg-slate-900 shadow-lg cursor-pointer">
            <div className="relative overflow-hidden bg-cover bg-no-repeat p-1.5 pb-0" data-te-ripple-init data-te-ripple-color="light">
              {post.images && post.images.length > 0 ? (
                <img
                  className="rounded-sm h-40 sm:m-h-64 md:h-58 w-full"
                  src={`http://localhost:3000${post.images[0].url}`}
                  alt={post.titre}
                />
              ) : (
                <img
                  className="rounded-sm h-40 sm:m-h-64 md:h-58 w-full"
                  src="/images/unnamed.png"
                  alt="Default Image"
                />
              )}
            </div>
            <div className="p-2  dark:bg-slate-900 rounded-lg">
              <div className="flex justify-between">
                <h5 className="mb-2 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                  {post.titre}
                </h5>
                <h5 className="mb-2 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50 flex">
                  {post.moyenneNote}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </h5>
              </div>
              <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-200">{post.description}</p>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">Date Range - {post.owner.name} </p>
              <h5 className="mb-2 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50">{post.prix}€ par nuit</h5>
              {post.type_logement && 
              <div>
                <h5 className='text-sm font-medium' >{post.type_logement.type}</h5>
                <h5 className='text-sm font-medium ml-2' >{post.type_logement.typePlace}</h5>
              </div>
              }
            </div>
          </div>
        </Link>
      ))}

    </div>
    <div className='flex justify-center pb-5 '  >
      <Pagination meta={meta} onPageChange={handlePageChange} />
    </div>
    </div>

  );
}
