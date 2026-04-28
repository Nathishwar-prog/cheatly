hexo.extend.helper.register('request_cheatsheet', () => {
  return 'https://github.com/Nathishwar-prog/cheatly/issues/new?title=Cheatsheet+request%3A+&labels=request&template=cheatsheet-request.md&assignee=Nathishwar-prog';
});

hexo.extend.helper.register('contributing', () => {
  return 'https://github.com/Nathishwar-prog/cheatly';
});

hexo.extend.helper.register('edit_page', function () {
  const postPage = this.page.layout === 'post';
  let url = 'https://github.com/Nathishwar-prog/cheatly';
  if (postPage) {
    url += `/blob/main/source/_posts/${this.page.slug}.md`;
  }
  return url;
});
