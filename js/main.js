var city=["基隆","台北","新北市","桃園","新竹","苗栗","台中","彰化","雲林","嘉義","台南","高雄","屏東","宜蘭","花蓮","台東","南投"],
sub={"基隆":["七堵"],"台北":["內湖","新店"],"新北市":["淡水","鶯歌","金山","三芝","萬里","雙溪"],"桃園":["大園","中壢","觀音","龍潭","桃園國際機場"],"新竹":["東區"],"苗栗":["三灣"],"台中":["西屯","石岡","清水","新社","大甲"],"彰化":["彰化市","二林","鹿港"],"雲林":["斗南","虎尾"],"嘉義":["布袋"],"台南":["安平","佳里","麻豆","新化","玉井"],"高雄":["左營","岡山","高雄國際機場"],"屏東":["屏東市","東港","枋山"],"宜蘭":["宜蘭市","蘇澳","南澳"],"花蓮":["花蓮市"],"台東":["台東市","關山"],"南投":["南投市"]},
town={"七堵":2306188,"內湖":2306179,"淡水":2306211,"新店":2306186,"鶯歌":2306214,"金山":2306223,"三芝":2306228,"萬里":2306231,"雙溪":2306251,"大園":2306209,"中壢":2306184,"觀音":2306200,"龍潭":2306202,"桃園國際機場":2306254,"東區":2306185,"三灣":2306229,"西屯":2306181,"石岡":2306207,"清水":2306194,"新社":2306218,"大甲":2306210,"彰化市":2306183,"二林":2306195,"鹿港":2306201,"斗南":2306212,"虎尾":2306250,"布袋":2306206,"安平":2306182,"佳里":2306193,"麻豆":2306203,"新化":2306217,"玉井":2306232,"左營":2306180,"岡山":2306199,"高雄國際機場":2306255,"屏東市":2306189,"東港":2306213,"枋山":2306224,"宜蘭市":2306198,"蘇澳":2306208,"南澳":2306243,"花蓮市":2306187,"台東市":2306190,"關山":2306227,"南投市":2306204},
Init=function(){
var a=[],t;for(t in town)a.push('<div class="btn" id="'+town[t]+'">'+t+"</div>");
$("#click").append(a);
var b=[],c;for(c in city)b.push("<option>"+city[c]+"</option>");
$("#first").append(b);
$("#first").trigger("change");
$(".selectpicker").selectpicker()},
renew=function(a){$.getJSON("http://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid="+a,
function(a){
$("#result #title").text(a.query.results.channel.location.city);
$("#result #date").text(a.query.results.channel.item.pubDate);
$("#result #location").text("latitude:"+a.query.results.channel.item.lat+"°N, longitude:"+a.query.results.channel.item.long+"°E");
$("#result #temp").text(Math.round((a.query.results.channel.item.condition.temp-32)*5/9)+"℃");
$("#result #text").text(a.query.results.channel.item.condition.text);
})};

$("#click").on("click","div.btn",function(a){renew(a.target.id)});
$("#first").change(function(){
var a=$(this).find(":selected").text(),b,c=[];
for(b in sub[a])c.push("<option>"+sub[a][b]+"</option>");
$("#second").children().remove();
$("#second").append(c);
renew(town[sub[a][0]]);
$(".selectpicker").selectpicker()});
$("#second").change(function(){
var a=$(this).find(":selected").text();renew(town[a])});
