# sia.codes blog

This blog started with the [Eleventy](https://github.com/11ty/eleventy) 11ty blog starter and Hylia. It's a mish-mash with a lot of custom code.

## Design inspiration

General
- https://hankchizljaw.com/
- https://mxb.dev/
- https://www.zachleat.com/

Cards
- https://paulrobertlloyd.com/articles/
- https://inclusive-components.design/cards/



## Demos

* [Netlify](https://eleventy-base-blog.netlify.com/)
* [Get your own Eleventy web site on Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/11ty/eleventy-base-blog)—seriously, just click OK a few times and it’s live—Netlify is amazing.
* [GitHub Pages](https://11ty.github.io/eleventy-base-blog/)

## Getting Started

### 1. Clone this repository:

```
git clone https://github.com/11ty/eleventy-base-blog.git my-blog-name
```


### 2. Navigate to the directory

```
cd my-blog-name
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies

```
npm install
```

### 4. Edit _data/metadata.json

### 5. Run Eleventy

```
npx eleventy
```

Or build and host locally for local development on localhost:8080:
```
npx eleventy --serve
```

Or build automatically when a template changes:
```
npx eleventy --watch
```

Or in debug mode:
```
DEBUG=* npx eleventy
```

### Implementation Notes

* `about/index.md` shows how to add a content page.
* `posts/` has the blog posts but really they can live in any directory. They need only the `post` tag to be added to this collection.
* Add the `nav` tag to add a template to the top level site navigation. For example, this is in use on `index.njk` and `about/index.md`.
* Content can be any template format (blog posts needn’t be markdown, for example). Configure your supported templates in `.eleventy.js` -> `templateFormats`.
	* Because `css` and `png` are listed in `templateFormats` but are not supported template types, any files with these extensions will be copied without modification to the output (while keeping the same directory structure).
* The blog post feed template is in `feed/feed.njk`. This is also a good example of using a global data files in that it uses `_data/metadata.json`.
* This example uses three layouts:
  * `_includes/layouts/base.njk`: the top level HTML structure
  * `_includes/layouts/home.njk`: the home page template (wrapped into `base.njk`)
  * `_includes/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
* `_includes/postlist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `index.njk` has an example of how to use it.

## License
For all sia.codes enhancements: [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

For the eleventy-base-blog: MIT

## Old links
Add redirections - also grab stats for popularity
http://siatex.blogspot.com/2010/11/for-love-of-japanese-crochet.html
http://siatex.blogspot.com/2010/11/on-wings-of-japanese-butterfly.html
http://siatex.blogspot.com/2014/06/phone-cozy.html
http://siatex.blogspot.com/2010/12/out-of-control-crafty-christmas.html
http://siatex.blogspot.com/2010/11/sharing-art-of-crochet.html
http://siatex.blogspot.com/2014/01/sneaux-day-activity-pups-in-cups.html
http://siatex.blogspot.com/2013/11/team-colors-earflap-hat-pattern-release.html
http://siatex.blogspot.com/2011/10/new-orleansnot-crochet-friendly.html
http://siatex.blogspot.com/2011/11/missing-greece.html
http://siatex.blogspot.com/2014/01/2014-year-of-health-and-discovery.html
http://siatex.blogspot.com/2012/11/a-tribute-to-greece.html
https://siatex.blogspot.com/2011/01/big-life-updates.html
https://siatex.blogspot.com/2010/11/coffee-in-garden.html
http://siatex.blogspot.com/2011/11/craft-bazaar-bracelet-antique-lace.html
http://siatex.blogspot.com/2013/02/designing-pineapple-crochet-cuffs.html
https://siatex.blogspot.com/2010/11/excuse-to-buy-yarn.html
https://siatex.blogspot.com/2010/12/finally-i-can-share-my-crafty-christmas.html
https://siatex.blogspot.com/2010/12/fun-with-crazy-yarn.html
http://siatex.blogspot.com/2013/12/hellas-cowl-pattern-release.html
http://siatex.blogspot.com/2014/10/its-crochet-season.html
http://siatex.blogspot.com/2010/12/luxe-washcloth-pattern.html
http://siatex.blogspot.com/2014/11/lylas-cowls-pattern-just-released.html
http://siatex.blogspot.com/2014/11/mosaic-potholderwashcloth-pattern.html
https://siatex.blogspot.com/2010/11/my-first-pattern-sale-woo-hoo.html
http://siatex.blogspot.com/2014/01/new-pattern-release-andras-man-scarf.html
http://siatex.blogspot.com/2012/12/nola-christmas-baskets.html
https://siatex.blogspot.com/2010/11/nouveau-thanksgiving.html
https://siatex.blogspot.com/2010/11/peer-pressure.html
https://siatex.blogspot.com/2010/12/picot-tutorial.html
http://siatex.blogspot.com/2013/02/pineapple-wrist-cuff-1.html
http://siatex.blogspot.com/2013/02/pineapple-wrist-cuff-2.html
http://siatex.blogspot.com/2014/01/resolutions-update.html
https://siatex.blogspot.com/2010/11/reviving-fugly-projects.html
http://siatex.blogspot.com/2010/11/single-woman-on-road-to-ironman.html
http://siatex.blogspot.com/2010/11/single-woman-on-road-to-ironman-part-2.html
http://siatex.blogspot.com/2010/12/single-woman-on-road-to-ironman-part-3.html
http://siatex.blogspot.com/2010/12/spa-washcloth-crochet-pattern.html
http://siatex.blogspot.com/2014/11/square-key-scarf-pattern-release.html
http://siatex.blogspot.com/2013/10/the-12-hats-of-christmas.html
http://siatex.blogspot.com/2013/11/the-fifth-and-sixth-hats-of-christmas.html
http://siatex.blogspot.com/2013/11/the-first-and-second-hats-of-christmas.html
http://siatex.blogspot.com/2013/11/the-third-and-fourth-hats-of-christmas.html
http://siatex.blogspot.com/2012/10/my-thoughts-on-lance-armstrong.html
http://siatex.blogspot.com/2013/11/vieux-carre-towel.html
http://siatex.blogspot.com/2010/12/why-i-like-being-slow-ironman.html
