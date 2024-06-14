// fetch("https://www.chrono24.com/api/product/suggest.json?query=SNXS77K1", {
//     "headers": {
//       "accept": "application/json, text/plain, */*",
//       "accept-language": "en-US,en;q=0.9",
//       "priority": "u=1, i",
//       "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": "\"macOS\"",
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-origin",
//       "x-csrf-token": "1718109286.YAHPHCA11hkqgvd510FF3WtFIHp0cpa2L7kzvaq8Yc4.AXG1Vdht25OzNL8JPLW8YRXmGvnJ",
//       "cookie": "chronosessid=8d3aff04-cecc-40d8-9cf7-06fcb66fb29f; timezone=America/New_York; __ssid=ea0c66ba2035c901af7c9029558d7b4; rskxRunCookie=0; rCookie=kotn06ymptal5vmsnngazlx7l3rlc; c24-consent=AAAAI4/vwf4O; _fbp=fb.1.1717940058528.478843666290038372; _pin_unauth=dWlkPU1tUXdNamhqT0RNdFl6ZGpaaTAwWVRGa0xUbGxZVEV0TjJNeVlqWmpPRGhrWldNMA; FPID=FPID2.2.%2FoVs2EZaYmQz0yCzdQlenqdoEJ1rcnTt5hvedbpSZKE%3D.1717940058; FPAU=1.2.1402036449.1717940059; _hjSessionUser_72519=eyJpZCI6IjI3OGJmMjViLWQ4ZTUtNWQyNy1hZDIyLTg1MWE1NzdlZWJkZSIsImNyZWF0ZWQiOjE3MTc5NDAwNTg1ODMsImV4aXN0aW5nIjp0cnVlfQ==; pu=true; csrf-token=1718109286.YAHPHCA11hkqgvd510FF3WtFIHp0cpa2L7kzvaq8Yc4.AXG1Vdht25OzNL8JPLW8YRXmGvnJ; __cflb=04dToURFh1eSYhojxs4uSYatQYKVBXinr7fmsBp2uM; _gid=GA1.2.357103921.1718109287; _hjSession_72519=eyJpZCI6ImNmNmQwYjU3LWY5MjUtNDVjOC1hMjcwLTQxMTRmMDMwNWI5MiIsImMiOjE3MTgxMDkyODY3MDEsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; FPLC=75x552NUYqatfphUzWz5fZhIXB9BYqIsihopSKSQfynLVWGqPAotanfBCJ1QAK6s%2F1Zca3Gw7rGprKvZ1wTSKaxx9DfJm9F8Qln6rB5jXiY8wrlQ5dc%2F05wRDiUzJw%3D%3D; filter-combinations=4:Man|CaM|DIC|Qry,4:Man|CaM|DIC|Qry; last-search-result-ids=16586581; FPGSID=1.1718109286.1718109364.G-B8CPBTKGPW.Hl0iiPGWELgIJQwDHaELuQ; __gads=ID=fef03ecbcce3fe8b:T=1717940581:RT=1718109364:S=ALNI_MaKhFlVglEpwjfDf5fRWQxcgoJ_-g; __eoi=ID=469f5c79289c9a65:T=1717940581:RT=1718109364:S=AA-AfjY4zC1FwgaW94XCfUh08rPZ; userHistory=16586581|1718109371856|1; cfctGroup=WACA01%3D%26AAAESIV02%3D%26ABSI01%3D%26SOLR01%3D%26AAAISIV01%3D%26LTRS00%3D%26CDCO00%3D; tracker_device=22ece45f-b713-42b9-9de1-c2f83f932fde; cto_bundle=gWQf_F90TnRaZ2Y2dnkyamt4QjJubjJSSTRpVWRYNnd3eng4NWFJWE11RjRJdnpBVlprN2tQZnloTDZ3cks5UkglMkZLUGxyb2dQam14OTZEZiUyQjRnc0RFRTRhdjclMkJsd2oyQW45cXhtJTJCVCUyRk1ad2pvUFF5MnpWT0dyWXZ4Sno0SzNaNUlzWHJaaExNRHZQWE96byUyRjBjcmw3cmNoU3UwNXdzMWVlMjhjZTE1TVNCbjNFQVNjT2xDVGxyREclMkJNUm12NlJ1OVBBbk5NTlFoaiUyRnZrWkk2RjlPcnNQYmR4WWF0QXIyMThsSnlVTFI5TmJycXJZNWNEZ1NZd0xJak9ITnBOcll1VnhKSw; lastRskxRun=1718109372792; _ga=GA1.2.495871233.1717940058; _ga_B8CPBTKGPW=GS1.1.1718109286.4.1.1718109412.0.0.1015684566; c24-data=eyI1Ijp7ImUiOiIxNzIwNzAxMzcyIiwidiI6IjUifSwiNiI6eyJlIjoiMTcyMDcwMTM3MiIsInYiOiI1In0sIjkiOnsiZSI6IjE3MTkyMzY1NDYiLCJ2IjoiMTcxNzk0MDU0MzI0MSJ9LCIxMiI6eyJlIjoiMTcxOTIzNjU4MiIsInYiOiIxNzE3OTQwNTgwMTkzIn0sIjI3Ijp7ImUiOiIxNzQ5NjQ1Mjg2IiwidiI6IjQifSwiMzAiOnsiZSI6IjE3MTkyMzY1NDYiLCJ2IjoiMSJ9LCIzMyI6eyJlIjoiMTcxOTIzNjU4MiIsInYiOiIxIn0sIjM2Ijp7ImUiOiIxNzQ5NjQ1MjkwIiwidiI6IjE3MTgxMDkyOTAwNjAifSwiMzciOnsiZSI6IjE3NDk2NDUyODYiLCJ2IjoiMTcxODEwOTI4NjEyNiJ9LCIzOCI6eyJlIjoiMTc0OTQ3NTk3MiIsInYiOiIxNzE1MjYxNTcyMjQwIn0sIjQxIjp7ImUiOiIxNzQ5NDc1OTcyIiwidiI6IjE3MTc5Mzk5NzIwMDAifSwiNDQiOnsiZSI6IjE3MTkyMzY1NDYiLCJ2IjoiMSJ9LCI5OCI6eyJlIjoiMTc0OTY0NTM3MiIsInYiOiI1In0sIjExNSI6eyJ2Ijoic20iLCJlIjoiMTczMzY2MTQ1MSJ9LCIyMzIiOnsiZSI6IjE3NDk0NzY1NDUiLCJ2IjoiMTcxNzk0MDU0MzI0MSJ9LCI0MzMiOnsiZSI6IjE3MjA3MDEzNjMiLCJ2IjoiMyJ9LCI0NjUiOnsiZSI6IjE4MTI1NDgwNTciLCJ2IjoiMTgxMjU0ODA1Nzk4OCJ9fQ==",
//       "Referer": "https://www.chrono24.com/info/valuation.htm",
//       "Referrer-Policy": "strict-origin-when-cross-origin"
//     },
//     "body": null,
//     "method": "GET"
//   });

fetch("https://www.chrono24.com/info/valuation.htm", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "priority": "u=0, i",
      "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "Referer": "https://www.chrono24.com/info/valuation.htm",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "model=Seiko+5+Automatic+Snxs77++Snxs77k+Men%27s+Watch&condition=Unworn&scopeOfDelivery=WithBoxAndPapers&templateProductId=134179&dialColorId=710&caseMaterialId=4&searchInput=SNXS77K1&calculateStats=",
    "method": "POST"
}).then(d => d.text()).then(html => console.log(html)).catch(e => console.log(e));