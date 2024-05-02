/**
 * @param {string} project
 * @param {number} dateCompartmentHour 日付変更する時間 AM6:00に日付が変わってほしい場合は6と指定する, default=0.
 */
const scrapAsDiary = (project, dateCompartmentHour = 0) => {
  const today = new Date(new Date().getTime() - (1000 * 60 * 60 * dateCompartmentHour));
  const title = `${today.toLocaleDateString('sv-SE')}`;
  const body = (() => {
    if (isLocationGooglePhoto(location)) {
      const imgUrl = getLargestImageUrl(document);
      return `?body=${encodeURIComponent(`[${imgUrl}#.jpg]`)}`;
    }
  })();
  window.open(`https://scrapbox.io/${project}/${title}${body ?? ''}`);
}

/**
 * @param {Location} location 
 * @returns {boolean}
 */
const isLocationGooglePhoto = (location) => (
  location.host == "photos.google.com" && Boolean(location.pathname.match(/\/u\/[0-9]\/photo\/[0-9A-z_\-]+/))
);

/**
 * 最も表示面積の多いimgのsrcを取得する
 * @param {Document} document 
 * @returns {string} srcUrl
 */
const getLargestImageUrl = (document) => {
  const imgTags = [...document.querySelectorAll('img[src]')];
  const largestImgTag = imgTags.sort((a, b) => b.width * b.height - a.width * a.height)[0]
  return /** @type {string} */ (largestImgTag.getAttribute('src'));
};

export scrapAsDiary as default;
