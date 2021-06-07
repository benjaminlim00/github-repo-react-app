interface RepoItemProps {
  name: string;
  link: string;
  description: string;
  language: string;
  stars: number;
}

export default function RepoItem({
  name,
  link,
  description,
  language,
  stars,
}: RepoItemProps) {
  return (
    <div>
      <a
        href={link}
        className="text-xl font-bold text-blue-600 hover:underline hover:text-blue-800 visited:text-purple-600"
      >
        {name}
      </a>
      <h3 className="text-gray-700">{description}</h3>
      <h3 className="mt-1 text-sm text-gray-500">{language}</h3>
      <div className="flex flex-row items-center mt-1 text-gray-500">
        <h3 className="mr-1 text-sm">{stars}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    </div>
  );
}
