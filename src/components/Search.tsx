import Fuse from "fuse.js";
import { For, createSignal } from "solid-js";
import { debounce } from "lodash-es";
import Card from "~/components/Card";
import slugify from "~/utils/slugify";
import type { BlogFrontmatter } from "~/content/_schemas";

type SearchItem = {
  title: string;
  description: string;
  data: BlogFrontmatter;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar(props: Props) {
  let inputRef: HTMLInputElement | undefined = undefined;
  const [searchResults, setSearchResults] = createSignal<SearchResult[] | null>(null);

  const handleKeyDown = debounce((currentTarget: HTMLInputElement) => {
    const inputVal = currentTarget.value;
    let inputResult = inputVal.length > 1 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    // Update search string in URL
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
      history.replaceState(null, "", newRelativePathQuery);
    } else {
      history.replaceState(null, "", window.location.pathname);
    }
  }, 250);

  // TOOO: replicate the search params effect from https://github.com/satnaing/astro-paper/blob/main/src/components/Search.tsx#L44
  const fuse = new Fuse(props.searchList, {
    keys: ["title", "description", "tags"], // TODO: I added "tags" to the template -- does this cause any issues?
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.2,
  });

  return (
    <>
      {/* TODO: fix the a11y by not nesting the label */}
      <label class="relative block">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
          </svg>
        </span>
        {/* @ts-expect-error figure out this ts issue from inputRef*/}
        <input
          class="block w-full rounded border border-skin-fill 
        border-opacity-40 bg-skin-fill py-3 pl-10
        pr-3 placeholder:italic placeholder:text-opacity-75 
        focus:border-skin-accent focus:outline-none"
          placeholder="Search by post name or tag"
          type="search"
          name="search"
          onKeyDown={(e) => handleKeyDown(e.currentTarget)}
          ref={inputRef}
        />
      </label>

      {/* @ts-expect-error figure out this ts issue */}
      {inputRef?.value.length > 1 && (
        <div class="mt-8">
          Found {searchResults?.length}
          {searchResults?.length === 1 ? " result" : " results"} for '
          {/* @ts-expect-error figure out this ts issue */}
          {inputRef.value}'
        </div>
      )}

      <ul>
        <For each={searchResults()}>
          {(result) => (
            <Card href={`/posts/${slugify(result.item.data)}`} frontmatter={result.item.data} />
          )}
        </For>
      </ul>
    </>
  );
}
