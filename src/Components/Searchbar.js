import React from "react";

const Search = () => {
  return (
    <div className="flex items-center">
      <div
        className=" ml-auto p-1 flex rounded-2xl bg-white 
        md:border-2 md:border-gray-300"
      >
        <svg
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="60px"
          height="60px"
          className="object-contain h-7 fill-gray-400"
        >
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
        </svg>

        <input
          type="text"
          className="outline-none rounded-md"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default Search;
