const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


async function searchMosques(zipcode) {
    const start = Date.now();
    // const browser = await puppeteer.launch(); 
    const browser = await puppeteer.launch({
    //    headless: false,
        // headless: "new",
        // devtools: true,
        executablePath: "", // your path here
      });
    const page = await browser.newPage();

    const searchUrl = `https://www.google.com/maps/search/10+mosques+near+${zipcode}`;
    try {
        await page.goto(
          searchUrl
        );
      } catch (error) {
        console.log("error going to page");
      }
  
      async function autoScroll(page) {
        await page.evaluate(async () => {
          const wrapper = document.querySelector('div[role="feed"]');
  
          await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 1000;
            var scrollDelay = 0;
  
            var timer = setInterval(async () => {
              var scrollHeightBefore = wrapper.scrollHeight;
              wrapper.scrollBy(0, distance);
              totalHeight += distance;
  
              if (totalHeight >= scrollHeightBefore) {
                totalHeight = 0;
                await new Promise((resolve) => setTimeout(resolve, scrollDelay));
  
                // Calculate scrollHeight after waiting
                var scrollHeightAfter = wrapper.scrollHeight;
  
                if (scrollHeightAfter > scrollHeightBefore) {
                  // More content loaded, keep scrolling
                  return;
                } else {
                  // No more content loaded, stop scrolling
                  clearInterval(timer);
                  resolve();
                }
              }
            }, 200);
          });
        });
      }
  
      await autoScroll(page);
      
      const html = await page.content();
      const pages = await browser.pages();
      await Promise.all(pages.map((page) => page.close()));

      await browser.close();
      console.log("browser closed");
    

    // get all a tag parent where a tag href includes /maps/place/
    const $ = cheerio.load(html);
    const aTags = $("a");
    const parents = [];
    aTags.each((i, el) => {
      const href = $(el).attr("href");
      if (!href) {
        return;
      }
      if (href.includes("/maps/place/")) {
        parents.push($(el).parent());
      }
    });

    console.log("parents", parents.length);

    const buisnesses = [];

    parents.forEach((parent) => {
      const url = parent.find("a").attr("href");
      // get a tag where data-value="Website"
      const website = parent.find('a[data-value="Website"]').attr("href");
      // find a div that includes the class fontHeadlineSmall
      const title = parent.find("div.fontHeadlineSmall").text();
      // find span that includes class fontBodyMedium
      const ratingText = parent
        .find("span.fontBodyMedium > span")
        .attr("aria-label");

      // get the first div that includes the class fontBodyMedium
      const bodyDiv = parent.find("div.fontBodyMedium").first();
      const children = bodyDiv.children();
      const lastChild = children.last();
      const firstOfLast = lastChild.children().first();
      const lastOfLast = lastChild.children().last();

      buisnesses.push({
        title,
        // placeId: `ChI${url?.split("?")?.[0]?.split("ChI")?.[1]}`,
        address: firstOfLast?.text()?.split("·")?.[1]?.trim(),
        // category: firstOfLast?.text()?.split("·")?.[0]?.trim(),
        // phone: lastOfLast?.text()?.split("·")?.[1]?.trim(),
        gUrl: url,
        // bizWebsite: website,
        
        // ratingText,
        // stars: ratingText?.split("stars")?.[0]?.trim()
        //   ? Number(ratingText?.split("stars")?.[0]?.trim())
        //   : null,  // add later
        // numberOfReviews: ratingText
        //   ?.split("stars")?.[1]
        //   ?.replace("Reviews", "")
        //   ?.trim()
        //   ? Number(
        //       ratingText?.split("stars")?.[1]?.replace("Reviews", "")?.trim()
        //     )
        //   : null,
      });
    });
    const end = Date.now();

    console.log(`time in seconds ${Math.floor((end - start) / 1000)}`);

    return buisnesses;
  }

//   const scrapeController = async (req, res) => {
//     const zipcode = req.query.zipcode; // Get the zipcode from the query parameter

//     try {
//         const scrapedData = await searchMosque(zipcode);
//         res.status(200).json(scrapedData);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while scraping data.' });
//     }
// };



module.exports = {searchMosques}