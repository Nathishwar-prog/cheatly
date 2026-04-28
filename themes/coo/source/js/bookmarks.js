/**
 * Cheatly Bookmarks Logic
 * Handles starring and persisting favorites using localStorage
 */

const Bookmarks = (function () {
  const STORAGE_KEY = 'cheatly-bookmarks';

  function getBookmarks() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  function saveBookmarks(bookmarks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }

  function toggleBookmark(id, title, url, slug) {
    let bookmarks = getBookmarks();
    const index = bookmarks.findIndex((b) => b.id === id);

    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push({ id, title, url, slug, timestamp: Date.now() });
    }

    saveBookmarks(bookmarks);
    updateUI(id);
    return index === -1; // Added
  }

  function isBookmarked(id) {
    return getBookmarks().some((b) => b.id === id);
  }

  function updateUI(id) {
    const buttons = document.querySelectorAll(`[data-bookmark-id="${id}"]`);
    const bookmarked = isBookmarked(id);

    buttons.forEach((btn) => {
      const icon = btn.querySelector('.bookmark-icon');
      if (bookmarked) {
        btn.classList.add('bookmarked');
        if (icon) icon.classList.add('text-yellow-400', 'fill-yellow-400');
      } else {
        btn.classList.remove('bookmarked');
        if (icon) icon.classList.remove('text-yellow-400', 'fill-yellow-400');
      }
    });

    // Update Bookmarks Section if it exists
    renderBookmarksSection();
  }

  function renderBookmarksSection() {
    const container = document.getElementById('bookmarks-grid');
    if (!container) return;

    const bookmarks = getBookmarks();
    if (bookmarks.length === 0) {
      container.parentElement.classList.add('hidden');
      return;
    }

    container.parentElement.classList.remove('hidden');
    container.innerHTML = bookmarks
      .map(
        (b) => `
      <div class="card-wrap relative group scale-in">
        <a href="${b.url}" title="${b.title} Cheatsheet" class="block h-full">
            <div class="card bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center h-full">
                <i class="text-3xl mr-4 text-indigo-400 opacity-80 group-hover:opacity-100 transition-opacity">
                  <!-- Icon placeholder for JS-injected content -->
                  <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                </i>
                <p class="font-medium text-zinc-100">${b.title}</p>
            </div>
        </a>
        <button class="bookmark-trigger absolute top-3 right-3 p-2 rounded-full glass-panel active:scale-90 shadow-lg z-10 bookmarked" 
                data-bookmark-id="${b.id}" 
                data-title="${b.title}" 
                data-url="${b.url}" 
                data-slug="${b.slug}">
            <span class="bookmark-icon text-yellow-400 fill-yellow-400 w-4 h-4 block">
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </span>
        </button>
      </div>
    `
      )
      .join('');

    // Re-attach triggers for newly rendered items
    attachTriggers();
  }

  function attachTriggers() {
    document.querySelectorAll('.bookmark-trigger').forEach((btn) => {
      // Avoid multiple listeners
      if (btn.dataset.listenerAttached) return;
      btn.dataset.listenerAttached = 'true';

      const id = btn.dataset.bookmarkId;
      if (isBookmarked(id)) {
        const icon = btn.querySelector('.bookmark-icon');
        btn.classList.add('bookmarked');
        if (icon) icon.classList.add('text-yellow-400', 'fill-yellow-400');
      }

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(id, btn.dataset.title, btn.dataset.url, btn.dataset.slug);
      });
    });
  }

  function init() {
    attachTriggers();
    renderBookmarksSection();
  }

  return { init };
})();

window.addEventListener('load', () => {
  Bookmarks.init();
});
