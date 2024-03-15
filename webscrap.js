const axios = require("axios");
const { JSDOM } = require("jsdom");
const XLSX = require("xlsx");

async function scrapData(webUrl) {
  const response = await axios.request({
    method: "GET",
    url: webUrl,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  //   Finding the elements
  const dom = new JSDOM(response.data);
  const HtmlObject = dom.window.document.getElementsByClassName("ipc-title__text");

  //   Convert HTMLCollection to an Array
  const Scraped_data = Array.from(HtmlObject).map((list) => {
    return [list.textContent];
  });
  console.log(Scraped_data);

  //   Adding Data to excel
  let workbook = XLSX.utils.book_new();
  let sheet1 = XLSX.utils.aoa_to_sheet(Scraped_data, { origin: "A1" });
  XLSX.utils.book_append_sheet(workbook, sheet1, "Movies Name");
  XLSX.writeFile(workbook, "Test2.xlsx");
}
scrapData("https://www.imdb.com/chart/top/");
