const cheerio = require("cheerio"); // khai báo module cheerio
const axios = require("axios");
const fs = require("fs");

async function loadData(link) {
  const pageHTML = await axios.get(link);

  return pageHTML;
}

let data_link = [
  "https://www.sport9.vn/nike-zoom-mercurial-vapor-15-academy-xxv-tf-bacxanh-la-fb8396-060",
  "https://www.sport9.vn/nike-zoom-mercurial-vapor-15-academy-tf-trangdendo-dj5635-600",
  "https://www.sport9.vn/nike-zoom-mercurial-vapor-15-academy-tf-hongxanh-dj5635-605",
  "https://www.sport9.vn/nike-air-zoom-mercurial-vapor-15-academy-tf-generation-dr5949-810-world-cup",
  "https://www.sport9.vn/nike-zoom-mercurial-vapor-15-academy-tf-xanh-lo-tim-dj5635-300",
  "https://www.sport9.vn/nike-zoom-mercurial-vapor-15-academy-tf-lemonde-mau-tra-sua-dj5635-700",
  "https://www.sport9.vn/nike-phantom-gx-academy-df-tf-doden-dd9476-600",
  "https://www.sport9.vn/adidas-x-speedflow-1-tf-meteorite-dotrang-fy3280",
  "https://www.sport9.vn/adidas-predator-accuracy-1-tf-marine-rush-xanh-duongtrang-gz0008",
  "https://www.sport9.vn/adidas-predator-accuracy-1-tf-crazyrush-xanhtrang-gz0009",
  "https://www.sport9.vn/adidas-x-speedportal1-tf-own-your-football-hong-den-gz2440",
  "https://www.sport9.vn/x-speedportal-1-tf-game-data-xanh-la-gw8973",
  "https://www.sport9.vn/puma-ultra-match-tt-fastest-xanh-ma-non-106903-01",
  "https://www.sport9.vn/puma-future-ultimate-cage-tt-supercharge-xanhcam-107174-01",
  "https://www.sport9.vn/puma-future-match-tt-breakthrough-tranghong-107374-01",
  "https://www.sport9.vn/puma-future-ultimate-cage-tt-gear-up-xanh-than-107374-03",
  "https://www.sport9.vn/bo-quan-ao-bong-da-draha-santafe-mau-vang-2",
  "https://www.sport9.vn/bo-quan-ao-bong-da-liverpool-mau-vang",
  "https://www.sport9.vn/quan-body-giu-nhiet-wika-mau-den",
  "https://www.sport9.vn/jogarbola-colorlux-ultra-20-xanh-ngocvang-2",
  "https://www.sport9.vn/jogarbola-colorlux-ultra-20-xanh-navydo",
  "https://www.sport9.vn/jogarbola-colorlux-ultra-20-trangvangxanh",
  "https://www.sport9.vn/giay-da-bong-jogarbola-koha-2103-mau-ghi",
  "https://www.sport9.vn/giay-da-bong-jogarbola-koha-2103-mau-xanh-ngocc",
  "https://www.sport9.vn/kamito-qh19-mau-tim-trang",
  "https://www.sport9.vn/kamito-qh19-premium-trang-do",
  "https://www.sport9.vn/kamito-qh19-mau-trang-vang",
  "https://www.sport9.vn/zocker-inspire-pro-mau-hong-xanh",
  "https://www.sport9.vn/zocker-inspire-pro-mau-xanh-chuoi",
  "https://www.sport9.vn/zocker-inspire-pro-mau-cam",
  "https://www.sport9.vn/zocker-inspire-pro-mau-trang",
  "https://www.sport9.vn/zocker-inspire-pro-mau-xanh-cam",
  "https://www.sport9.vn/zocker-inspire-pro-mau-den-hong",
  "https://www.sport9.vn/mizuno-alpha-select-as-p1gd236509-xamtrang",
  "https://www.sport9.vn/mizuno-alpha-%CE%B1-select-as-sr4-dendo-p1gd236904",
  "https://www.sport9.vn/mizuno-alpha-%CE%B1-select-as-p1gd236501-mau-den",
  "https://www.sport9.vn/mizuno-morelia-neo-iii-pro-as-p1gd228446-trangvangden",
  "https://www.sport9.vn/mizuno-morelia-neo-iii-pro-as-p1gd228401-vang-den",
  "https://www.sport9.vn/mizuno-morelia-neo-iii-pro-as-p1gd228409-trang-den",
  "https://www.sport9.vn/mizuno-morelia-neo-iii-pro-as-p1gd228444-lac-viet-limited-edition",
  "https://www.sport9.vn/mizuno-morelia-neo-iii-pro-as-p1gd238452-vang-trang",
  "https://www.sport9.vn/mizuno-monarcida-neo-sala-pro-tf-vang-trang-q1gb232101",
  "https://www.sport9.vn/mizuno-monarcida-neo-sala-pro-tf-q1gb232163-do-xanh-tim-than-2",
  "https://www.sport9.vn/mizuno-monarcida-neo-sala-pro-tf-vang-trang-q1gb232101",
  "https://www.sport9.vn/mizuno-morelia-tf-q1gb190209-trang-den",
];

async function get() {
  let craw_data = await Promise.all(
    data_link.map((link) =>
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
        .then((data) => data[0]),
    ),
  );

  fs.writeFileSync("craw-date.json", JSON.stringify(craw_data));
}

get();
