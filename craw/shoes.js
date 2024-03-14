const cheerio = require("cheerio"); // khai báo module cheerio
const axios = require("axios");
const fs = require("fs");

async function loadData(link) {
  const pageHTML = await axios.get(link);

  return pageHTML;
}

loadData(link)
  .then((pageHTML) => {
    const $ = cheerio.load(pageHTML.data);
    let data = [];

    $(".product-essential").each((index, el) => {
      const title = $(el).find(".bk-product-name").text();
      const brand = $(el).find(".value a").text();

      let list_size = [];
      $(el)
        .find(".option-list > li > label > span[data-key='eu']")
        .each(function () {
          list_size.push($(this).text());
        });

      const oldPrice = $(el).find(".old-product-price").text();
      const actualPrice = $(el).find(".bk-product-price").text();
      const short_desc = $(el).find(".short-description > ul");
      let list_short_desc = "";
      short_desc.each(function () {
        let mini_desc = $(this).find("li").text();
        list_short_desc += mini_desc + "-";
      });

      // color -> ok
      const img_color = [];
      $(el)
        .find(".colour-selection > a > img")
        .each(function () {
          let img_link = $(this).attr("src");
          img_color.push(img_link);
        });

      //slide -> ok
      const album = [];
      $(el)
        .find(".img-responsivev")
        .each(function () {
          let slideImgLink = $(this).attr("src");
          album.push(slideImgLink);
        });

      //full - desc
      let full_desc = [];
      $(el)
        .find(".description-content")
        .each(function () {
          full_desc.push($(this).find("p").text());
        });

      data.push({
        title,
        brand,
        list_size,
        oldPrice,
        actualPrice,
        short_desc: list_short_desc,
        long_desc: full_desc,
        color: img_color,
        album,
      });
    });

    return data;
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
